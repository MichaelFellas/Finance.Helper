import { Layout } from "antd";
import { Navigate, NavLink } from "react-router-dom";
import { Button } from "antd";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Auth from "../utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { QUERY_ME_BILLS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import moment from "moment";

const { Header, Footer, Sider, Content } = Layout;

const Bills = () => {
  const { loading, data } = useQuery(QUERY_ME_BILLS);

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const userData = data?.meBill;

  const sortUser = userData.Bills;

  const sortArray = [];

  for (let i = 0; sortUser[i]; i++) {
    sortArray.push(sortUser[i]);
  }

  const sortedAsc = sortArray.sort(
    (objA, objB) => Number(objA.billDate) - Number(objB.billDate)
  );

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
                <div className="containerBills">
                  <h1>BILL TRACKER</h1>

                  <div className="loadBills">
                    <div className="billsTable">
                      <div className="leftBillsTable whiteText">
                        <div className="borderBottomTitle">BILL DATE</div>
                        {sortedAsc.map((bill) => {
                          return (
                            <p className="borderBottom">
                              {moment(bill.billDate).format("DD/MM/YYYY")}
                            </p>
                          );
                        })}
                      </div>
                      <div className="midBillsTable borderRL whiteText">
                        <div className="borderBottomTitle">BILL NAME</div>
                        <div>
                          {sortedAsc.map((bill) => {
                            return (
                              <NavLink to={`/editBill/${bill._id}`}>
                                <p className="borderBottom whiteText ">
                                  {bill.name}
                                </p>
                              </NavLink>
                            );
                          })}
                        </div>
                      </div>
                      <div className="rightBillsTable whiteText">
                        <div className="borderBottomTitle">BILL AMOUNT</div>
                        {sortedAsc.map((bill) => {
                          return <p className="borderBottom">${bill.amount}</p>;
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="addBill">
                    <NavLink className="addBillButton" to="/newBill">
                      <h2>ADD A BILL</h2>
                    </NavLink>
                  </div>
                </div>
              </Content>
            </div>
          </Layout>
          <Footer class="footer">
            {Auth.loggedIn() ? (
              <Button className="logOut" onClick={Auth.logout}>
                Logout
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

export default Bills;
