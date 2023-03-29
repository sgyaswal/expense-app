import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/users/login", {
        email: values.email.toLowerCase(),
        password: values.password,
      });
      setLoading(false);
      message.success("login success");
      const token = data?.data?.token;
      localStorage.setItem("token", token);
      //set token to axios common header
      console.log(token)
      if (token) {
        // Apply authorization token to every request if logged in
        axios.defaults.headers.common['Authorization'] = token;
      } else {
        // Delete auth header
        delete axios.defaults.headers.common['Authorization'];
      }
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.data, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Please Provide Valid credentials");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="root_wrapper">
        <div className="resgister-page ">
          {loading && <Spinner />}
          <Form layout="vertical" onFinish={submitHandler}>
            <h1 className="heading">Login Form</h1>

            <Form.Item label="Email" name="email">
              <Input type="email" required />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" required />
            </Form.Item>
            <div className="bottom_link">
              <Link to="/register">Not a user ? Click Here to register</Link>
              <button className="btn btn-primary">Login</button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
