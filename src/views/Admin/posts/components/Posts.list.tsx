import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import { useStoreActions, useStoreState } from "hooks";

import parse from "html-react-parser";

type Props = {};

interface DataType {
    _id: string;
    title: string;
    description: string;
    status: string;
    author: any;
    content: any;
    video: string;
    image: any;
}

export const PostsList = (props: Props) => {
    const [appPosts, setAppPosts] = useState([] as DataType[]);

    const { loadingPosts, posts } = useStoreState((state) => state.posts);
    const { getPosts, deletePost } = useStoreActions(
        (actions) => actions.posts
    );

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    useEffect(() => {
        if (posts) {
            const datas: any = [];
            posts.map((ps) => {
                const data = {
                    key: ps._id,
                    ...ps,
                };
                return datas.push(data);
            });
            setAppPosts(datas);
        }
        return;
    }, [posts]);

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
            title: "Status",
            key: "status",
            dataIndex: "status",
            render: (_, { status }) => (
                <>
                    <Tag color={status === "draft" ? "volcano" : "green"}>
                        {status.toUpperCase()}
                    </Tag>
                </>
            ),
        },
        {
            title: "video",
            dataIndex: "video",
            key: "video",
            render: (text) => (
                <>
                    {text ? (
                        <a href={`${text}`}>video link</a>
                    ) : (
                        <span> - </span>
                    )}
                </>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <span
                        className="delete"
                        onClick={() => deletePost(record?._id as string)}
                    >
                        <DeleteOutlined />{" "}
                    </span>
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={appPosts}
            size="small"
            loading={loadingPosts}
            expandable={{
                expandedRowRender: (record) => (
                    <div style={{ margin: 0 }} key={record._id}>
                        {parse(record.content)}
                    </div>
                ),
                rowExpandable: (record) => record.title !== "Not Expandable",
            }}
        />
    );
};
