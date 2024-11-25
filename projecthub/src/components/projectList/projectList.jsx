import React, { useEffect, useState } from "react";
import { getProjects,deleteProject } from "../../services/api";
import { UnorderedListOutlined,ProjectOutlined ,DeleteFilled,EditFilled} from '@ant-design/icons';
import { Col, Row, Statistic } from 'antd';
import { Card, List,Button } from 'antd';
import './projectList.css'
import ProjectAddComponent from "../projectAdd/projectAdd";
import ProjectUpdateComponent from "../projectUpdate/projectUpdate";


function ProjectListComponent(props){

    const [projects,setProjects] = useState([]);
    const userName = props.userName
    const userID = props.userid
    const isAdmin = props.is_staff

    // 1. Function to count the number of projects
    const countProjects = (projects) => projects.length;

    // 2. Function to count the total number of tasks
    const countTasks = (projects) =>
    projects.reduce((total, project) => total + project.tasks.length, 0);

    // 3. Function to count the number of completed tasks
    const countCompletedTasks = (projects) =>
    projects.reduce(
        (total, project) =>
        total +
        project.tasks.filter((task) => task.status === "Completed").length,
        0
    );


    // Compute counts
    const numberOfProjects = countProjects(projects);
    const numberOfTasks = countTasks(projects);
    const numberOfCompletedTasks = countCompletedTasks(projects);

    useEffect(()=>{
        async function fetchProjects() {
            const data = await getProjects();
            // console.log("Inside Project List",data)
            setProjects(data || []);
          }
          fetchProjects();
    })



    const handleDeleteProject = async (id) => {
        try {
            console.log("Deleting a project",id)
            const response = await deleteProject(id);

            console.log(response)
            } catch (error) {
            alert("Error deleting project: " + error.message);
            }
    };

    return <div className="project-page">
        <div>
            <Row gutter={16} className="stats" >
                <Col span={12} className="stats">
                <Statistic title="Projects" value={numberOfProjects} prefix={<ProjectOutlined />}/>
                </Col>
                <Col span={12} className="stats">
                <Statistic title="Completed Tasks" value={numberOfCompletedTasks} prefix = {<UnorderedListOutlined/>} suffix={"/"+numberOfTasks} />
                </Col>
            </Row>
        </div>
        <ProjectAddComponent/>
        
    <List className="projectlist"
        grid={{
        gutter: 16,
        column: 4,
        }}
        dataSource={projects}
        renderItem={(item) => (
        <List.Item>
            <Card title={item.name}>
            <p><strong>Project ID:</strong>  {item.id}</p>
            <p><strong>Description:</strong>  {item.description}</p>
            <p><strong>Start Date:</strong>  {item.start_date}</p>
            <p><strong>End Date:</strong>  {item.end_date}</p>
            <p><strong>Total Tasks:</strong>  {item.tasks.length}</p>
            <p><strong>Total Completed Tasks:</strong>  {(item.tasks.filter((task) => task.status === "Completed").length)}</p>
            <div className="buttons">
            <ProjectUpdateComponent id = {item.id}/>
            <Button type="primary" onClick = {(id)=>handleDeleteProject(item.id)}shape="circle" icon={<DeleteFilled />} danger style={{padding:20, margin:20}}/>
            </div>
            
            </Card>
        </List.Item>
        )}
    />
  </div>
}

export default ProjectListComponent