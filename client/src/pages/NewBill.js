import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Layout,
  Button,
  Radio,
  Select,
} from "antd";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Auth from "../utils/auth";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { ADD_BILL } from "../utils/mutations";
import React from "react";

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
};

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;
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

const dateFormat = "DD/MM/YYYY";

const NewBill = () => {
  const navigate = useNavigate();
  const [addBill, { error, data }] = useMutation(ADD_BILL);
  const [radioValue, setRadioValue] = useState("");
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values.billDate._d);
    try {
      const response = await addBill({
        variables: {
          name: values.billName,
          amount: values.billAmount,
          billDate: values.billDate.toDate(),
          recurring: values.billRecurring,
          recurringTime: values.billReccuringTime,
        },
      });
      if (!response.data) {
        throw new Error("something went wrong!");
      }
      navigate("/bills");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {Auth.loggedIn() ? (
        <Layout>
          <Header class="widening">
            <Navbar />
          </Header>
          <Layout>
            <Sider class="sider">
              <Sidebar />
            </Sider>
            <div>
              <Content class="content">
                <div className="containerNewGoals">
                  <h1>NEW BILL</h1>
                  <div className="newGoalsForm">
                    <Form
                      size="large"
                      {...formItemLayout}
                      form={form}
                      name="register"
                      onFinish={onFinish}
                      scrollToFirstError
                    >
                      <Form.Item
                        name="billName"
                        label={
                          <label style={{ color: "white", fontSize: "25px" }}>
                            Bill Name
                          </label>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Please input the name of your Bill!",
                            whitespace: true,
                          },
                        ]}
                      >
                        <Input size="large" />
                      </Form.Item>
                      <Form.Item
                        name="billAmount"
                        label={
                          <label style={{ color: "white", fontSize: "25px" }}>
                            Bill Amount
                          </label>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Please input the Goal Amount",
                            whitespace: true,
                            type: "number",
                            min: 0,
                          },
                        ]}
                      >
                        <InputNumber size="large" />
                      </Form.Item>

                      <Form.Item
                        name="billDate"
                        label={
                          <label style={{ color: "white", fontSize: "25px" }}>
                            Date you will be billed
                          </label>
                        }
                        rules={[
                          {
                            required: true,
                            type: "date",
                            whitespace: true,
                          },
                        ]}
                      >
                        <DatePicker
                          format={dateFormat}
                          disabledDate={disabledDate}
                          size="large"
                        />
                      </Form.Item>

                      <Form.Item
                        name="billRecurring"
                        label={
                          <label style={{ color: "white", fontSize: "25px" }}>
                            Is this a Re-occurring Bill?
                          </label>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Please input the Goal Amount",
                            whitespace: true,
                          },
                        ]}
                      >
                        <Radio.Group
                          onChange={(e) => setRadioValue(e.target.value)}
                        >
                          <Radio
                            style={{ color: "white", fontSize: "15px" }}
                            value="true"
                          >
                            YES
                          </Radio>
                          <Radio
                            style={{ color: "white", fontSize: "15px" }}
                            value="false"
                          >
                            NO
                          </Radio>
                        </Radio.Group>
                      </Form.Item>

                      {radioValue === "true" && (
                        <Form.Item
                          name="billReccuringTime"
                          label={
                            <label style={{ color: "white", fontSize: "25px" }}>
                              How often is this bill charged?
                            </label>
                          }
                          hasFeedback
                          rules={[
                            {
                              message:
                                "Please select how often you are charged this bill.",
                            },
                          ]}
                        >
                          <Select placeholder="Please select a time period">
                            <Option value="weekly">Weekly</Option>
                            <Option value="fortnightly">Fortnightly</Option>
                            <Option value="monthly">Monthly</Option>
                            <Option value="quarterly">Quarterly</Option>
                            <Option value="semi-annually">Semi Annually</Option>
                            <Option value="annually">Annually</Option>
                          </Select>
                        </Form.Item>
                      )}

                      <Form.Item {...tailFormItemLayout}>
                        <Button
                          type="default"
                          htmlType="submit"
                          style={{
                            color: "white",
                            background: "#323232",
                            borderColor: "white",
                            borderWidth: "3px",
                            fontSize: "15px",
                            height: "50px",
                            width: "200px",
                            textAlign: "center",
                            marginLeft: "-50px",
                          }}
                          block
                        >
                          Add Your Bill!
                        </Button>
                      </Form.Item>
                    </Form>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    {error ? (
                      <p class="whiteText">
                        Failed to Add Goal! Something went Wrong!
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </Content>
            </div>
          </Layout>
          <Footer class="footer">
            {Auth.loggedIn() ? (
              <Button
                className="logOut"
                onClick={Auth.logout}
                style={{
                  color: "white",
                  background: "#323232",
                  borderColor: "white",
                  borderWidth: "3px",
                  fontSize: "20px",
                  height: "50px",
                  width: "230px",
                  textAlign: "center",
                }}
              >
                LOGOUT
              </Button>
            ) : (
              <> </>
            )}
          </Footer>
        </Layout>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default NewBill;
