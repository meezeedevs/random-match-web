import React, { useState, useEffect } from "react";
import { Alert, Spin } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import { useStoreActions, useStoreState } from "hooks";
import { useTitle } from "components/document-head";
import "./userView.css";
import { storage } from "utils";

class RandomPicker extends React.PureComponent {
    constructor() {
        super();

        this.state = {
            isRunning: false,
            currentChoice: "",
        };

        this.interval = null;
        this.intervalDuration = 25;
        this.duration = 2000;

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
        this.props.setMatch(this.state.currentChoice);
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
                <div
                    style={{
                        // marginRight: "20px",
                        cursor: "pointer",
                        // color: 'white',
                        background: "white",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        marginBottom: "15px",
                    }}
                    onClick={() => this.props.logout()}
                    className="delete"
                >
                    <LogoutOutlined />{" "}
                    <span
                        style={{
                            marginLeft: "5px",
                        }}
                    >
                        Logout
                    </span>
                </div>
                <div style={{ marginBottom: "10vh", maxWidth: "500px" }}>
                    {
                        this.props.voted ? '' :  <Alert
                        message="Information"
                        description={`Une personne n'a le droit de voter qu'une seule fois, une fois terminé, 
                        il n'est plus possible de voter à nouveau. Le processus de vote est aléatoire, 
                        ne suit pas d'ordre particulier et est effectué par une machine. Pour voter, 
                        appuyez sur 'start' et le compteur tournera pendant 2 secondes. 
                        Si vous le désirez, vous pouvez appuyer sur 'stop' pour arrêter le compteur là où il est, 
                        ou attendre qu'il s'arrête de lui-même.`}
                        type="info"
                        showIcon
                        closable
                    />
                    }
                   
                </div>
                <RandomPickerChoice choice={this.props.picked ? this.props.picked : currentChoice} />
                <RandomPickerControls
                    isRunning={isRunning}
                    hasChoice={currentChoice?.userName?.trim().length > 0}
                    start={this.start}
                    stop={this.stop}
                    reset={this.reset}
                    choice={currentChoice}
                    voted={this.props.voted}
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
        const content =
            choice?.userName?.trim().length > 0 ? choice.userName : "?";

        return (
            <div className="RandomPicker__choice">
                <span className="RandomPicker__choiceItem">{content}</span>
            </div>
        );
    }
}

class RandomPickerControls extends React.PureComponent {
    render() {
        const { isRunning, start, stop, voted, choice } = this.props;

        return (
            <div className="RandomPicker__controls">
                {voted ? (
                    <button className={`RandomPicker__button button-disabled`}>
                        {"Voted"}
                    </button>
                ) : isRunning ? (
                    <button
                        className={`RandomPicker__button "RandomPicker__button--stop"
                                ${choice && !isRunning ? "button-disabled" : ""}`}
                        onClick={stop}
                    >
                        {"stop"}
                    </button>
                ) : (
                    <button
                        disabled={choice ? true : false}
                        className={`RandomPicker__button ${
                            choice && !isRunning ? "button-disabled" : ""
                        }`}
                        onClick={start}
                    >
                        {"start"}
                    </button>
                )}

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

export const UserView = () => {
    const [appUnmatched, setAppUnmatched] = useState([]);

    const { loadingUnmatched, unmatched } = useStoreState(
        (state) => state.users
    );
    const { getUnmatched, sendMatch } = useStoreActions(
        (actions) => actions.users
    );

    const { logout } = useStoreActions((actions) => actions.auth);

    const user = JSON.parse(localStorage.getItem("currentUser"));
    console.log(user)
    useTitle("Roll");

    useEffect(() => {
        getUnmatched();
    }, [getUnmatched]);

    useEffect(() => {
        setAppUnmatched(unmatched);
    }, [unmatched]);

    return (
        <div className="picker-wrapper">
            <Spin spinning={loadingUnmatched} tip="Loading...">
                {appUnmatched.length > 0 && (
                    <RandomPicker
                        items={appUnmatched}
                        logout={logout}
                        setMatch={(val) => sendMatch(val._id)}
                        voted={user?.pick && user?.pick !== null && user?.pick !== undefined ? true : false}
                        picked={user?.pick && user?.pick !== null && user?.pick !== undefined ? user?.pick : null}
                    />
                )}
            </Spin>
        </div>
    );
};
