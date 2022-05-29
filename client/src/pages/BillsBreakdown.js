import { Layout } from "antd";
import { Navigate } from "react-router-dom";
import { Button } from "antd";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Auth from "../utils/auth";
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

import { QUERY_ME_BILLS } from "../utils/queries";
import { useQuery } from "@apollo/client";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#B8058D",
  "#D80303",
  "#01A09A",
  "#FFFFFF",
  "#000000",
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  name,
  value,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const nameLabel = name;
  const valueLabel = value;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="pieText"
    >
      {nameLabel} ${valueLabel} = {`${(percent * 100).toFixed(0)}%`} Total Bills
    </text>
  );
};

const { Header, Footer, Sider, Content } = Layout;

const BillsBreakdown = () => {
  const { loading, data } = useQuery(QUERY_ME_BILLS);

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const userData = data?.meBill || [];
  const sortUser = userData.Bills;

  const dataArray = [];

  if (userData.length !== 0) {
    for (let i = 0; sortUser[i]; i++) {
      const object = { name: sortUser[i].name, value: sortUser[i].amount };
      dataArray.push(object);
    }
  }

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
                <div className="containerBillsBreakdown">
                  <h1 className="whiteText">BILL BREAKDOWN</h1>
                  {dataArray.length === 0 && (
                    <h2 className="whiteText bigFont">
                      You have no bills added!
                    </h2>
                  )}
                  {
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={dataArray}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={250}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {dataArray.map((entry, index) => {
                            return (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            );
                          })}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  }
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

export default BillsBreakdown;
