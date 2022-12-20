import { Button, Col, Form, Row } from "antd";
import { InputField, UsersSelect } from "components";
import { useStoreActions, useStoreState } from "hooks";

type Props = {};

export const EventsForm = (props: Props) => {
    const { loading } = useStoreState((state) => state.events);
    const { registerEvent } = useStoreActions((actions) => actions.events);

    const onFinish = (values: any) => {
        console.log("Received values of form: ", values);
        registerEvent(values);
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
                            name="location"
                            required={true}
                            message="Please input your place!"
                            placeholder="Enter your place"
                            type="text"
                            label="Place"
                        />
                    </Col>
                    <Col className="gutter-row" span={24}>
                        <InputField
                            name="description"
                            required={true}
                            message="Please input your description!"
                            placeholder="Enter your description"
                            type="text"
                            label="Description"
                            textArea
                        />
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <InputField
                            name="dueDate"
                            required={true}
                            message="Please input your due date!"
                            placeholder="Enter your due date"
                            type="text"
                            label="Due date"
                            datePicker
                            showTime
                        />
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <UsersSelect name="organiser" />
                    </Col>

                    <Col className="gutter-row" span={24}>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
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
