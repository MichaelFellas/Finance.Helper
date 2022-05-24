import React from "react";

import { Form, Input, Button } from "antd";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Navbar from "../components/Navbar";
import Auth from "../utils/auth";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 50,
    },
    sm: {
      span: 150,
    },
  },
  wrapperCol: {
    xs: {
      span: 50,
    },
    sm: {
      span: 100,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 50,
      offset: 0,
    },
    sm: {
      span: 50,
      offset: 9,
    },
  },
};

const SignupPage = () => {
  const [addUser, { error }] = useMutation(ADD_USER);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const { data } = await addUser({
        variables: { ...values },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Navbar className="navbar" />

      <div className="containerSign">
        <div className="containedSign">
          <h1 class="whiteText">Please Sign Up!</h1>
          <Form
            size="large"
            className="widening"
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item
              name="email"
              label={
                <label style={{ color: "white", fontSize: "25px" }}>
                  Email
                </label>
              }
              rules={[
                {
                  type: "email",
                  message: "The input is not a valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <label style={{ color: "white", fontSize: "25px" }}>
                  Password
                </label>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item
              name="name"
              label={
                <label style={{ color: "white", fontSize: "25px" }}>Name</label>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                  whitespace: true,
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Sign Up!
              </Button>
            </Form.Item>
          </Form>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          {error ? (
            <p class="whiteText">Failed to Sign Up! Something went Wrong!</p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default SignupPage;
