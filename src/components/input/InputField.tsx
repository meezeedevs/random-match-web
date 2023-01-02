import React, { ReactNode } from "react";
import { DatePicker, Form, Input, Select } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { SizeType } from "antd/lib/config-provider/SizeContext";
// import moment from "moment";

const { TextArea } = Input;
interface InputFieldProps {
    label?: string | ReactNode;
    name: string;
    required?: boolean;
    message?: string;
    prefix?: any;
    placeholder?: string;
    type?: string;
    isPassword?: boolean;
    error?: string;
    hasFeedback?: boolean;
    extra?: string | ReactNode;
    getInputValue?: any;
    max?: any;
    isPassword2?: boolean;
    isPasswordSingle?: boolean;
    dependencies?: any;
    value?: any;
    size?: SizeType;
    addonAfter?: ReactNode;
    addonBefore?: ReactNode;
    textArea?: boolean;
    datePicker?: boolean;
    showTime?: boolean;
    select?: boolean;
    disabled?: boolean;
    tooltip?: string;
    options?: Array<any>;
    selectOnChange?: any;
    selectOnSearch?: any;
    onSelect?: any;
    loading?: boolean;
    defaultValue?: any;
}

export const InputField = (props: InputFieldProps) => {
    return (
        <Form.Item
            label={props.label}
            name={props.name}
            rules={
                props.isPassword2
                    ? [
                          {
                              required: props.required,
                              message: props.message,
                          },
                          ({ getFieldValue }) => ({
                              validator(rule, value) {
                                  if (
                                      !value ||
                                      getFieldValue("password") === value
                                  ) {
                                      return Promise.resolve();
                                  }
                                  //   console.log(
                                  //       value,
                                  //       " HERE",
                                  //       getFieldValue("password")
                                  //   );
                                  return Promise.reject(
                                      "The two passwords that you entered do not match!"
                                  );
                              },
                          }),
                      ]
                    : [
                          {
                              required: props.required,
                              message: props.message,
                          },
                      ]
            }
            hasFeedback={props.hasFeedback}
            extra={props.extra}
            dependencies={props.dependencies}
            tooltip={props.tooltip}
        >
            {props.isPassword || props.isPassword2 || props.isPasswordSingle ? (
                <Input.Password
                    prefix={props.prefix}
                    placeholder={props.placeholder}
                    type={props.type}
                    iconRender={(visible: any) =>
                        visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                    }
                    onChange={(el) =>
                        props.getInputValue
                            ? props.getInputValue(el.target.value)
                            : null
                    }
                    size={props.size}
                />
            ) : props.textArea ? (
                <TextArea
                    placeholder={props.placeholder}
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    required={props.required}
                    onChange={(el) =>
                        props.getInputValue
                            ? props.getInputValue(el.target.value)
                            : null
                    }
                    disabled={props.disabled}
                />
            ) : props.datePicker ? (
                <DatePicker
                    size={props.size}
                    style={{ width: "100%" }}
                    onChange={(date, dateString) =>
                        props.getInputValue
                            ? props.getInputValue(dateString)
                            : null
                    }
                    format={
                        props.showTime ? "YYYY-MM-DD - HH:mm" : "YYYY-MM-DD"
                    }
                    disabled={props.disabled}
                    showTime={props.showTime}
                />
            ) : props.select ? (
                <Select
                    showSearch
                    placeholder={props.placeholder}
                    optionFilterProp="children"
                    onChange={props.selectOnChange}
                    onSearch={props.selectOnSearch}
                    filterOption={(input, option) =>
                        (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                    options={props.options}
                    loading={props.loading}
                    value={props.defaultValue}
                    onSelect={props.onSelect}
                />
            ) : (
                <Input
                    size={props.size}
                    maxLength={props.max ? props.max : undefined}
                    prefix={props.prefix}
                    placeholder={props.placeholder}
                    type={props.type}
                    onChange={(el) =>
                        props.getInputValue
                            ? props.getInputValue(el.target.value)
                            : props.value
                            ? props.getInputValue(el.target.value)
                            : null
                    }
                    addonAfter={props.addonAfter}
                    addonBefore={props.addonBefore}
                    max={props.max}
                    disabled={props.disabled}
                />
            )}
        </Form.Item>
    );
};
