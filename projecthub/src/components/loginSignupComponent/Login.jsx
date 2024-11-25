import React, { useState } from "react";
import './LoginSignup.css';
import { Button, Form, Input } from 'antd';
import { loginUser,setAuthToken } from "../../services/api";
import { Alert } from 'antd';
import { useNavigate,Link } from "react-router-dom";


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

const LoginComponent = () =>{

    const [loginmessage, setMessage] = useState(null);
    const [result,setResult] = useState(0)
    const [alertType,setAlertType] = useState(null)
    const navigate = useNavigate();


    const handleSubmit = async (values) => {
        // console.log("Inside Handle Submit")
        // console.log(e)
        // e.preventDefault();
        // console.log(values)
        try {
            
        const data = await loginUser(values.username, values.password);
        console.log(data)
        setAuthToken(data.access); // Set JWT token in Axios
        localStorage.setItem("authToken", data.access); // Save token for persistence
        localStorage.setItem("userName",data.user);
        localStorage.setItem("userID",data.id);
        setMessage("Login successful! Redirecting...");
        setResult(1);
        setAlertType("success");
        setTimeout(() => navigate("/homepage"), 2000);
        } catch (error) {
            console.log("Login failed.",error);
        setMessage("Error: " + (error.response?.data?.detail || "Login failed."));
        setResult(1);
        setAlertType("error");
        }
    };

    return (
        <div className="container-login">
            <h1 className="text">Login</h1>
            <div className="underline"></div>
            <Form className="form-page"
        name="basic"
        labelCol={{
        span: 8,
        }}
        wrapperCol={{
        span: 16,
        }}
        style={{
        maxWidth: 600,
        }}
        initialValues={{
        remember: true,
        }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        // onFieldsChange={on}
        autoComplete="off"
        >
        <Form.Item
        label="Username"
        name="username"
        rules={[
            {
            required: true,
            message: 'Please input your username!',
            },
        ]}
        >
        <Input />
        </Form.Item>

        <Form.Item
        label="Password"
        name="password"
        rules={[
            {
            required: true,
            message: 'Please input your password!',
            },
        ]}
        >
        <Input.Password />
        </Form.Item>
        <Form.Item label={null}>
        <Button type="primary" htmlType="submit" className="login-button">
            Login
        </Button>
        <p>or</p> <Link to="/register-main">Register</Link>
        </Form.Item>
        {result?  <Form.Item>
            <Alert message={loginmessage} type={alertType}/>
        </Form.Item> :<></>}
    </Form>
  </div>
    )
}

export default LoginComponent