import React, { useEffect, useState } from 'react';
import { UnorderedListOutlined, ProjectOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import './homePage.css'
import { useNavigate,Link } from "react-router-dom";


const items = [
    {
      label: 'Project List',
      key: 'projectlist',
      icon: <ProjectOutlined />,
    },
    {
      label: 'Task List',
      key: 'tasklist',
      icon: <UnorderedListOutlined />,
    },
  ];


const HomePageComponent = () => {
    const [current, setCurrent] = useState('projectlist');
    const onClick = (e) => {
      console.log('click ', e);
      setCurrent(e.key);
    };
    const userName = localStorage.getItem("userName")
    const userID = localStorage.getItem("userID")
    console.log(userName,userID)
    const navigate = useNavigate();

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
  };
export default HomePageComponent;