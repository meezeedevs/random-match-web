import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "hooks";
import { Alert, Spin } from "antd";

import "./userView.css";

class RandomPicker extends React.PureComponent {
    constructor() {
        super();

        this.state = {
            isRunning: false,
            currentChoice: "",
        };

        this.interval = null;
        this.intervalDuration = 25;
        this.duration = 1000;

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
        this.pickChoice = this.pickChoice.bind(this);
        this.setChoice = this.setChoice.bind(this);
    }

    start() {
        clearInterval(this.interval);
        this.interval = setInterval(this.setChoice, this.intervalDuration);
        this.setState({ isRunning: true });
        setTimeout(() => {
            if (this.state.isRunning) {
                this.stop();
            }
        }, this.duration);
    }

    stop() {
        clearInterval(this.interval);
        this.setState({ isRunning: false });
    }

    reset() {
        clearInterval(this.interval);
        this.setState({ isRunning: false, currentChoice: "" });
    }

    pickChoice() {
        const { items } = this.props;
        const choice = items[Math.floor(Math.random() * items.length)];
        return choice;
    }

    setChoice() {
        this.setState({ currentChoice: this.pickChoice() });
    }

    render() {
        const { isRunning, currentChoice } = this.state;

        return (
            <div className="RandomPicker">
                <p style={{ marginBottom: "10vh", maxWidth: "500px" }}>
                    <Alert
                        message="Information"
                        description={`Une personne n'a le droit de voter qu'une seule fois, une fois terminé, 
                        il n'est plus possible de voter à nouveau. Le processus de vote est aléatoire, 
                        ne suit pas d'ordre particulier et est effectué par une machine. Pour voter, 
                        appuyez sur 'start' et le compteur tournera pendant une seconde. 
                        Si vous le désirez, vous pouvez appuyer sur 'stop' pour arrêter le compteur là où il est, 
                        ou attendre qu'il s'arrête de lui-même.`}
                        type="info"
                        showIcon
                        closable
                    />
                </p>
                <RandomPickerChoice choice={currentChoice} />
                <RandomPickerControls
                    isRunning={isRunning}
                    hasChoice={currentChoice.trim().length > 0}
                    start={this.start}
                    stop={this.stop}
                    reset={this.reset}
                    choice={currentChoice}
                />
                <p
                    style={{
                        fontSize: "12px",
                        color: "white",
                        position: "fixed",
                        bottom: "5vh",
                    }}
                >
                    Designed with
                    <span
                        style={{
                            fontSize: "15px",
                            color: "red",
                            "--darkreader-inline-color": "#ff1a1a",
                            margin: "5px",
                        }}
                        data-darkreader-inline-color=""
                    >
                        ♥
                    </span>
                    by Meezee
                </p>
            </div>
        );
    }
}
class RandomPickerChoice extends React.PureComponent {
    render() {
        const { choice } = this.props;
        const content = choice.trim().length > 0 ? choice : "?";

        return (
            <div className="RandomPicker__choice">
                <span className="RandomPicker__choiceItem">{content}</span>
            </div>
        );
    }
}

class RandomPickerControls extends React.PureComponent {
    render() {
        const { isRunning, hasChoice, start, stop, reset, choice } = this.props;

        return (
            <div className="RandomPicker__controls">
                <button
                    disabled={choice ? true : false}
                    className={`RandomPicker__button ${
                        isRunning && "RandomPicker__button--stop"
                    } ${choice && !isRunning ? "disabled" : ""}`}
                    onClick={isRunning ? stop : start}
                >
                    {isRunning ? "stop" : "start"}
                </button>
                {/* <button
                    disabled={isRunning || !hasChoice}
                    className="RandomPicker__button RandomPicker__button--reset"
                    onClick={reset}
                >
                    reset
                </button> */}
            </div>
        );
    }
}

const namesList = [
    "Marcelo",
    "Lizzette",
    "Pauline",
    "Fumiko",
    "Tomasa",
    "Bertha",
    "Antoinette",
    "Tianna",
    "Ammie",
    "Victorina",
    "Marlon",
    "Jules",
    "Arletha",
    "Ellyn",
    "Karol",
    "Corrin",
    "Josephine",
];

export const UserView = () => {
    const [appUnmatched, setAppUnmatched] = useState([]);

    const { loadingUnmatched, unmatched } = useStoreState((state) => state.users);
    const { getUnmatched} = useStoreActions(
        (actions) => actions.users
    );

    useEffect(() => {
        getUnmatched();
    }, [getUnmatched]);

    useEffect(() => {
        setAppUnmatched(unmatched);
    }, [unmatched]);

    return (
        <div className="picker-wrapper">
            <Spin spinning={loadingUnmatched} tip="Loading...">
             <RandomPicker items={appUnmatched} />
            </Spin>
        </div>
    );
};
