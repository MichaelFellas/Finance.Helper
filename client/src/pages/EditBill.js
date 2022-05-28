import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import moment from "moment";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
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
import { QUERY_SINGLE_BILL } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { EDIT_BILL } from "../utils/mutations";

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

const EditBill = () => {
  const navigate = useNavigate();
  const [editBill, { error, billData }] = useMutation(EDIT_BILL);
  const [form] = Form.useForm();
  const { billId } = useParams();
  const [radioValue, setRadioValue] = useState("");
  const { loading, data } = useQuery(QUERY_SINGLE_BILL, {
    variables: { _id: billId },
  });

  const bill = data?.bill;

  if (loading) {
    return <div>Loading...</div>;
  }

  const onFinish = async (values) => {
    try {
      const response = await editBill({
        variables: {
          _id: values.billId,
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
                  <h1>UPDATE BILL</h1>
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
                        initialValue={bill._id}
                        name="billId"
                        label={
                          <label style={{ color: "white", fontSize: "25px" }}>
                            Bill ID
                          </label>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Please input your name!",
                            whitespace: true,
                          },
                        ]}
                      >
                        <Input size="large" disabled={true} />
                      </Form.Item>
                      <Form.Item
                        initialValue={bill.name}
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
                        initialValue={bill.amount}
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
                        initialValue={moment(bill.billDate)}
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
                        initialValue={bill.recurring}
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
                          initialValue={bill.recurringTime}
                          name="billReccuringTime"
                          label={
                            <label style={{ color: "white", fontSize: "25px" }}>
                              How often is this bill charged?
                            </label>
                          }
                          hasFeedback
                          rules={[
                            {
                              required: true,
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
                          UPDATE BILL
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

export default EditBill;
