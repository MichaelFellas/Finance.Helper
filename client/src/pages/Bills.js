import { Layout } from "antd";
import { Link, Navigate, NavLink } from "react-router-dom";
import { Button } from "antd";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Auth from "../utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { QUERY_ME_BILLS } from "../utils/queries";
import { REMOVE_BILL } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import moment from "moment";

const { Header, Footer, Sider, Content } = Layout;

const Bills = () => {
  const { loading, data } = useQuery(QUERY_ME_BILLS);
  const [removeBill, { error }] = useMutation(REMOVE_BILL);

  const handleDeleteBill = async (_id) => {
    try {
      const response = await removeBill({
        variables: { _id },
      });
    } catch (err) {
      console.error(err);
    }
  };

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
                          return (
                            <p className="borderBottom">
                              ${bill.amount}
                              <FontAwesomeIcon
                                onClick={() => {
                                  handleDeleteBill(bill._id);
                                }}
                                className="whiteText billDeleteButton"
                                icon={faDeleteLeft}
                              ></FontAwesomeIcon>
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="billButtons">
                    <div className="addBill">
                      <NavLink className="addBillButton" to="/newBill">
                        <h2>ADD A BILL</h2>
                      </NavLink>
                    </div>
                    <div className="addBill">
                      <NavLink className="addBillButton" to="/billsBreakdown">
                        <h2>DETAILED BREAKDOWN</h2>
                      </NavLink>
                    </div>
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

export default Bills;
