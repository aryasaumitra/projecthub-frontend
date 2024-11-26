import React, { useEffect, useState } from 'react';
import { UnorderedListOutlined, ProjectOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import './homePage.css'
import { useNavigate,Link } from "react-router-dom";
import ProjectListComponent from '../projectList/projectList';
import TaskListComponent from '../taskList/taskList';
import Logout from '../loginSignupComponent/Logout';


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
    }
  ];

const item = [
  {
    label: 'User Task List',
    key: 'usertasklist',
    icon: <UnorderedListOutlined />,
  },
]


const HomePageComponent = () => {
    const [current, setCurrent] = useState('projectlist');
    const onClick = (e) => {
      console.log('click ', e);
      setCurrent(e.key);
    };
    const userName = localStorage.getItem("userName")
    const userID = localStorage.getItem("userID")
    const is_staff = localStorage.getItem("isStaff")
    console.log(userName,userID,is_staff)
    const navigate = useNavigate();

    return <>{(is_staff === "true")?<div>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      {/* Displaying Either Project List or TaskList */}
      {
        (current === "projectlist")?<ProjectListComponent username = {userName} userid = {userID} is_staff={is_staff}/>:<TaskListComponent/>
      }
    
    </div>:<div>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={item} />
      <TaskListComponent/>
      </div>
    }
    
    <Logout/>
    </>;
  };
export default HomePageComponent;