// see SignupForm.js for comments
import React from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import Navbar from "../components/Navbar";
import { Form, Input, Button } from "antd";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 50,
    },
    sm: {
      span: 100,
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

const LoginPage = () => {
  const [login, { error }] = useMutation(LOGIN_USER);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const { data } = await login({
        variables: { ...values },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Navbar className="navbar" />

      <div className="containerSign">
        <div className="containedSign">
          <h1 class="whiteText">Please Login!</h1>
          <Form
            size="large"
            className="widening"
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            class="whiteText"
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
              <Input />
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
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Login!
              </Button>
            </Form.Item>
          </Form>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          {error ? (
            <p class="whiteText">Failed to Login! Something went Wrong!</p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
