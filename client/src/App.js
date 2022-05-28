import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import WrongPage from "./pages/WrongPage";
import styled from "styled-components";
import Bills from "./pages/Bills";
import NewBill from "./pages/NewBill";
import EditBill from "./pages/EditBill";
import Goals from "./pages/Goals";
import NewGoal from "./pages/NewGoal";
import EditGoal from "./pages/EditGoal";
import HomePage from "./pages/HomePage";
import Budget from "./pages/Budget";

import Savings from "./pages/Savings";
import BillsBreakdown from "./pages/BillsBreakdown";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),

  cache: new InMemoryCache(),
});

console.log(client);
console.log(httpLink);

const Background = styled.body`
  background-color: #364d79;
  height: 100%;
`;

function App() {
  return (
    <Background>
      <ApolloProvider client={client}>
        <Router>
          <>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/bills" element={<Bills />} />
              <Route path="/billsBreakdown" element={<BillsBreakdown />} />
              <Route path="/newBill" element={<NewBill />} />
              <Route path="/editBill/:billId" element={<EditBill />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/newGoal" element={<NewGoal />} />
              <Route path="/editGoal/:goalId" element={<EditGoal />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/savings" element={<Savings />} />
              <Route path="*" element={<WrongPage />} />
            </Routes>
          </>
        </Router>
      </ApolloProvider>
    </Background>
  );
}

export default App;
