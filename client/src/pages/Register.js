import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";


const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/users/register", {
        name: values.name,
        email: values.email.toLowerCase(),
        password: values.password,
      })
      message.success("Registeration Successfull");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
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
            <h1 className="heading">Register Form</h1>
            <Form.Item label="Name" name="name">
              <Input required />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input type="email" required />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" required />
            </Form.Item>
            <div className="bottom_link">
              <Link to="/login">Already Register ? Click ere to login</Link>
              <button className="btn btn-primary">Register</button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
