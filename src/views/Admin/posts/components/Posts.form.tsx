import { Button, Col, Form, Input, Row } from "antd";
import { InputField, UsersSelect } from "components";
import { useStoreActions, useStoreState } from "hooks";
import React, { useEffect, useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Props = {};

export const PostsForm = (props: Props) => {
    const [appTags, setAppTags] = useState([] as unknown as any);

    const { loadingTags, tags, loadingPosts } = useStoreState(
        (state) => state.posts
    );
    const { getTags, registerTag, registerPost } = useStoreActions(
        (actions) => actions.posts
    );

    useEffect(() => {
        getTags();
    }, [getTags]);

    useEffect(() => {
        if (tags) {
            let datas: any = [];
            tags.map((tag) => {
                const data = {
                    value: tag._id,
                    label: `${tag.name}`,
                };
                return datas.push(data);
            });
            setAppTags(datas);
        }
        return;
    }, [tags]);

    const [isTag, setIsTag] = useState(false);
    const [newTag, setNewTag] = useState(false);
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null as unknown as any);
    const [tag, setTag] = useState(null as unknown as any);
    const [createdTag, setCreatedTag] = useState(null as unknown as any);

    const handleChange = (val: any) => {
        setContent(val);
    };

    const modules = {
        toolbar: [
            [
                {
                    header: [1, 2, 3, 4, 5, 6, false],
                    size: ["small", false, "large", "huge"],
                },
                { font: [] },
            ],
            [
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "code-block",
            ],
            // [
            //     {
            //         color: [
            //             'rgb(0, 0, 0)',
            //             'rgb(230, 0, 0)',
            //             'rgb(255, 153, 0)',
            //             'rgb(0, 138, 0)',
            //             'rgb(0, 102, 204)',
            //             'rgb(153, 51, 255)',
            //             'rgb(255, 255, 255)',
            //             'rgb(187, 187, 187)',
            //             'rgb(136, 136, 136)',
            //             'rgb(68, 68, 68)',
            //         ],
            //     },
            //     { background: [] },
            // ],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
                { align: [] },
            ],
            ["link", "image"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "header",
        "blockquote",
        "align",
        "code-block",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
    ];

    const onFinish = (values: any) => {
        const data = {
            title: values.title,
            status: values.status,
            description: values.description,
            author: values.author,
            content,
            video: values.video,
            image,
            tag,
        };
        registerPost(data);
    };

    const onAddImage = (e: any) => {
        // setImage(e.target.files[0]);
        const fd = new FormData();
        fd.append("image", e.target.files[0], e.target.files[0].name);
        // const newImageurl = URL.createObjectURL(e.target.files[0]);
        // setImageUrl(newImageurl);
        // uploadPhoto(fd as any);
        setImage(fd);
    };

    const onSelect = (val: any) => {
        setTag(val);
    };

    const onChangeTag = (e: any) => {
        e.preventDefault();
        setCreatedTag(e.target.value);
    };

    const addTag = async () => {
        if (createdTag === null || createdTag === undefined)
            return setCreatedTag(null);
        else {
            await registerTag({ name: createdTag } as any).then(() => {
                setCreatedTag(null);
                setNewTag(false);
            });
        }
    };

    return (
        <div>
            <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
                layout="vertical"
                noValidate
            >
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={12}>
                        <InputField
                            name="title"
                            required={true}
                            message="Please input your title!"
                            placeholder="Enter your title"
                            type="text"
                            label="Title"
                        />
                    </Col>

                    <Col className="gutter-row" span={12}>
                        <InputField
                            name="status"
                            required={true}
                            message="Please input the status!"
                            placeholder="Enter the status"
                            label="status"
                            select
                            options={[
                                {
                                    value: "draft",
                                    label: "Draft",
                                },
                                {
                                    value: "published",
                                    label: "Published",
                                },
                            ]}
                        />
                    </Col>

                    <Col className="gutter-row" span={24}>
                        <InputField
                            name="description"
                            required={true}
                            message="Please input your description!"
                            placeholder="Enter your Description"
                            type="text"
                            label="Description"
                        />
                    </Col>

                    <Col className="gutter-row" span={24}>
                        <p className="required">Content</p>
                        <Form.Item>
                            <ReactQuill
                                value={content}
                                onChange={(val: any) => handleChange(val)}
                                theme="snow"
                                modules={modules}
                                formats={formats}
                            />
                        </Form.Item>
                    </Col>

                    <Col className="gutter-row" span={12}>
                        <UsersSelect name="author" />
                    </Col>

                    <Col className="gutter-row" span={12}>
                        <InputField
                            name="video"
                            message="Please input your video Link!"
                            placeholder="Enter your video link"
                            type="text"
                            label="Video link"
                        />
                    </Col>

                    <Col className="gutter-row" span={12}>
                        {/* <InputField
                            name="image"
                            required={true}
                            message="Please input your image!"
                            placeholder="Enter your image"
                            type="file"
                            label="Image"
                            
                        /> */}
                        <Form.Item name="image" label="Image">
                            <Input
                                placeholder="upload your image"
                                type="file"
                                accept="image/*"
                                onChange={onAddImage}
                            />
                        </Form.Item>
                    </Col>

                    <Col className="gutter-row" span={12}>
                        {isTag ? (
                            newTag ? (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Form.Item
                                        name="createdTag"
                                        hasFeedback
                                        label="Tag"
                                        required
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please enter a tag title!",
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="Enter a tag title"
                                            type="text"
                                            onChange={onChangeTag}
                                        />
                                    </Form.Item>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginTop: "10px",
                                            marginLeft: "10px",
                                        }}
                                    >
                                        <Button
                                            type="primary"
                                            loading={loadingTags}
                                            size="small"
                                            style={{ fontSize: "10px" }}
                                            onClick={addTag}
                                        >
                                            Register
                                        </Button>
                                        <Button
                                            type="default"
                                            // loading={loading}
                                            size="small"
                                            onClick={() => setIsTag(false)}
                                            style={{
                                                marginLeft: "10px",
                                                fontSize: "10px",
                                            }}
                                        >
                                            cancel
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            minWidth: "70%",
                                            maxWidth: "200px",
                                        }}
                                    >
                                        <InputField
                                            name="tag"
                                            required={true}
                                            message="Please input your tag!"
                                            placeholder="Type the tag"
                                            label="Tag"
                                            select
                                            loading={loadingTags}
                                            options={appTags}
                                            onSelect={onSelect}
                                        />
                                    </div>
                                    <div>
                                        <Button
                                            type="default"
                                            // loading={loading}

                                            size="small"
                                            onClick={() => setIsTag(false)}
                                            style={{
                                                marginLeft: "10px",
                                                fontSize: "10px",
                                                marginTop: "10px",
                                            }}
                                        >
                                            cancel
                                        </Button>
                                    </div>
                                </div>
                            )
                        ) : (
                            <div>
                                <span className="required">Tags</span>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginTop: "15px",
                                    }}
                                >
                                    <Button
                                        type="default"
                                        size="small"
                                        onClick={() => {
                                            setNewTag(true);
                                            setIsTag(true);
                                        }}
                                        style={{ fontSize: "10px" }}
                                    >
                                        Nouveau tag
                                    </Button>
                                    <Button
                                        type="default"
                                        size="small"
                                        onClick={() => {
                                            setNewTag(false);
                                            setIsTag(true);
                                        }}
                                        style={{
                                            fontSize: "10px",
                                            marginLeft: "10px",
                                        }}
                                    >
                                        Lier un tag existant
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Col>

                    <Col className="gutter-row" span={24}>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loadingPosts}
                            >
                                Register
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};
