import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// import SearchBooks from "./pages/SearchBooks";
// import SavedBooks from "./pages/SavedBooks";
import Navbar from "./components/Navbar";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import HomePage from "./components/HomePage";

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

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            {/* <Route path="/" element={<SearchBooks />} />
            <Route path="/saved" element={<SavedBooks />} /> */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route
              path="*"
              element={<h1>Welcome to Finance.Helper! Please Sign Up!</h1>}
            />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
