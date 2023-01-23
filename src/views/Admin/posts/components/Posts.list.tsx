import React, { useEffect, useRef, useState } from "react";
import { Button, Input, InputRef, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { useStoreActions, useStoreState } from "hooks";
import Highlighter from "react-highlight-words";

import parse from "html-react-parser";
import { ColumnType, FilterConfirmProps } from "antd/es/table/interface";

type Props = {};

interface DataType {
    _id: string;
    title: string;
    description: string;
    status: string;
    author: any;
    tag: any;
    content: any;
    video: string;
    image: any;
}

type DataIndex = keyof DataType;

const Hack: any = Highlighter;

export const PostsList = (props: Props) => {
    const [appPosts, setAppPosts] = useState([] as DataType[]);
    const [appTags, setAppTags] = useState([] as unknown as any);

    const { loadingPosts, posts, tags } = useStoreState((state) => state.posts);
    const { getTags, getPosts, deletePost } = useStoreActions(
        (actions) => actions.posts
    );

    useEffect(() => {
        getPosts();
        getTags();
    }, [getPosts, getTags]);

    useEffect(() => {
        if (tags) {
            let datas: any = [];
            tags.map((tag) => {
                const data = {
                    value: tag._id,
                    text: `${tag.name}`,
                };
                return datas.push(data);
            });
            setAppTags(datas);
        }
        return;
    }, [tags]);

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

    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText("");
    };

    const getColumnSearchProps = (
        dataIndex: DataIndex
    ): ColumnType<DataType> => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(
                            selectedKeys as string[],
                            confirm,
                            dataIndex
                        )
                    }
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(
                                selectedKeys as string[],
                                confirm,
                                dataIndex
                            )
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? "#1890ff" : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Hack
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    // console.log(appPosts, "kj");

    const columns: ColumnsType<DataType> = [
        {
            title: "Titre",
            dataIndex: "title",
            key: "title",
            ...getColumnSearchProps("title"),
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (text) => <span style={{ color: "gray" }}>{text}</span>,
            ...getColumnSearchProps("description"),
        },
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
            render: (_, { status }) => (
                <>
                    <Tag color={status === "draft" ? "volcano" : "green"}>
                        {status?.toUpperCase()}
                    </Tag>
                </>
            ),
        },
        {
            title: "Tag",
            key: "tag",
            dataIndex: "tag",
            render: (_, { tag }) => (
                <>
                    <Tag>{tag?.name}</Tag>
                </>
            ),
            filters: appTags,
            onFilter: (value: any, record) => record.tag._id.startsWith(value),
            filterSearch: true,
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
