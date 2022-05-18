import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
      setShowAlert(true);
    }

    setUserFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return <>{<p>Sign Up Page</p>}</>;
};

export default SignupForm;
