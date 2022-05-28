import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import moment from "moment";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { Form, Input, InputNumber, DatePicker, Layout, Button } from "antd";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Auth from "../utils/auth";
import { QUERY_SINGLE_GOAL } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { EDIT_GOAL } from "../utils/mutations";

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
};

const { Header, Footer, Sider, Content } = Layout;
const radioValue = "false";
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

const EditGoal = () => {
  const navigate = useNavigate();
  const [editGoal, { error, editData }] = useMutation(EDIT_GOAL);
  const [form] = Form.useForm();
  const { goalId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_GOAL, {
    variables: { goalId: goalId },
  });

  const goal = data?.goal;

  if (loading) {
    return <div>Loading...</div>;
  }

  const onFinish = async (values) => {
    console.log(values);
    try {
      const response = await editGoal({
        variables: {
          goalId: values.goalId,
          goalName: values.goalName,
          amount: values.goalAmount,
          progress: values.goalInitial,
          dateBuy: values.purchaseDate.toDate(),
        },
      });
      if (!response.data) {
        throw new Error("something went wrong!");
      }

      navigate("/goals");
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
                  <h1>UPDATE YOUR GOAL</h1>
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
                        initialValue={goal._id}
                        name="goalId"
                        label={
                          <label style={{ color: "white", fontSize: "25px" }}>
                            Goal ID
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
                        initialValue={goal.goalName}
                        name="goalName"
                        label={
                          <label style={{ color: "white", fontSize: "25px" }}>
                            Goal Name
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
                        <Input size="large" />
                      </Form.Item>
                      <Form.Item
                        initialValue={goal.amount}
                        name="goalAmount"
                        label={
                          <label style={{ color: "white", fontSize: "25px" }}>
                            Amount Required
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
                        initialValue={goal.progress}
                        name="goalInitial"
                        label={
                          <label style={{ color: "white", fontSize: "25px" }}>
                            Progress
                          </label>
                        }
                        rules={[{ type: "number", min: 0, required: true }]}
                      >
                        <InputNumber size="large" />
                      </Form.Item>

                      <Form.Item
                        initialValue={moment(goal.dateBuy)}
                        name="purchaseDate"
                        label={
                          <label style={{ color: "white", fontSize: "25px" }}>
                            Date you would like to Purchase
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
                          Edit Savings Goal!
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

export default EditGoal;
