import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import { useStoreActions, useStoreState } from "hooks";

type Props = {};

interface DataType {
    _id?: string;
    title: string;
    description?: string;
    place: string;
    dueDate: Date | string;
    organiser: any;
}

export const EventsList = (props: Props) => {
    const [appEvents, setAppEvents] = useState([] as DataType[]);

    const { loading, events } = useStoreState((state) => state.events);
    const { getEvents, deleteEvent } = useStoreActions(
        (actions) => actions.events
    );

    useEffect(() => {
        getEvents();
    }, [getEvents]);

    useEffect(() => {
        if (events) setAppEvents(events);
        return;
    }, [events]);

    const columns: ColumnsType<DataType> = [
        {
            title: "Titre",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (text) => <span style={{ color: "gray" }}>{text}</span>,
        },
        {
            title: "location",
            key: "location",
            dataIndex: "location",
        },
        {
            title: "organiser",
            key: "organiser",
            dataIndex: "organiser",
            render: (text, record) => (
                <span className="text-primary">
                    {record.organiser?.firstName} {record.organiser?.lastName}
                </span>
            ),
        },
        {
            title: "Date",
            dataIndex: "dueDate",
            key: "dueDate",
            render: (text, record) => {
                return <span>{moment(record.dueDate).calendar()}</span>;
            },
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <span
                        className="delete"
                        onClick={() => deleteEvent(record?._id as string)}
                    >
                        <DeleteOutlined />{" "}
                    </span>
                </Space>
            ),
        },
    ];
    return <Table columns={columns} dataSource={appEvents} loading={loading} />;
};
