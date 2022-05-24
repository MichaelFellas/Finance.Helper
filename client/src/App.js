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
import Goals from "./pages/Goals";
import NewGoal from "./pages/NewGoal";
import HomePage from "./pages/HomePage";
import Budget from "./pages/Budget";
import Profile from "./pages/Profile";

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
  background-color: #ba3c3c;
  height: 100vh;
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
              <Route path="/newBill" element={<NewBill />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/newGoal" element={<NewGoal />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="*" element={<WrongPage />} />
            </Routes>
          </>
        </Router>
      </ApolloProvider>
    </Background>
  );
}

export default App;
