import React, { useState } from 'react';
import {
  Alert,
  Button,
  Checkbox,
  Form,
  Input,
} from 'antd';
import { useNavigate,Link } from "react-router-dom";
import { registerUser } from '../../services/api';
import './LoginSignup.css';


const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

const RegisterComponent = () => {
    const [form] = Form.useForm();
    const [loginmessage, setMessage] = useState(null);
    const [result,setResult] = useState(0)
    const [alertType,setAlertType] = useState(null)

    const onFinish = async (values) => {
    //   console.log('Received values of form: ', values);
    //   console.log(form)
    try {
        await registerUser(values.username, values.password, values.admin);
        setResult(1);
        setAlertType("success");
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/"), 2000);
      } catch (error) {
        setMessage("Error: " + (error.response?.data?.error || "Registration failed."));
        setResult(1);
        setAlertType("error");
      }
    };
    const navigate = useNavigate();
    
    return (
      <div className="container-login">
        <h1 className="text">Register</h1>
        <div className="underline"></div>
        
        <Form className='form-page'
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
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
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        className='form-item'>
          <Input.Password className='inputs'/>
        </Form.Item>
  
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          className='form-item'
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password className='inputs'/>
        </Form.Item>
  
  
        <Form.Item
          name="admin"
          valuePropName="checked"
          className='form-item'
        >
          <Checkbox>
            Are you an Admin ?
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className='register-button'>
            Register
          </Button>
        </Form.Item>
        <p>or</p> <Link to="/">Login</Link>
        {result?  <Form.Item>
            <Alert message={loginmessage} type={alertType}/>
        </Form.Item> :<></>}
      </Form>
      </div>
    );
  };
  export default RegisterComponent;
