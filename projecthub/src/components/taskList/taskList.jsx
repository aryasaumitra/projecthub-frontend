import React, { useEffect, useState } from "react";
import { Table, Tag } from 'antd';
import { getTasks,updateTaskStatus,deleteTask } from "../../services/api";
import {Button} from "antd";
import { DeleteFilled,CheckCircleFilled,EditFilled} from '@ant-design/icons';
import TaskAddComponent from "../taskAdd/taskAdd";
import './taskList.css'
import TaskUpdateComponent from "../taskUpdate/taskUpdate";

const handleStatusUpdate = async (record,newStatus) => {
    try{
        console.log("Updating Task to Completed")
        const updatedTask = await updateTaskStatus(record.id, newStatus);
        console.log(updatedTask)
    }catch (error){
        alert("Error updating project: " + error.message);
    }
    
  }

const handleDeleteEvent = async (id) =>{
    try{
        console.log("Deleting a Task")
        await deleteTask(id);
        // console.log(deletedTask)
    }catch (error){
        alert("Error deleting project: " + error.message);
    }
}


const adminColumns = [
        {
            title: 'Task ID',
            dataIndex: 'id',
            key:'id'
        },
        {
            title: 'Task Name',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Due Date',
            dataIndex: 'due_date',
            key: 'due_date',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (_,record)=>(
                <>{
                    <Tag >
                    {record.status}
                </Tag>
            
                }
                </>
            )

        },
        {
            title: 'Project ID',
            dataIndex: 'project',
            key: 'project',
        },
        {
            title: 'Assigned To',
            dataIndex: 'assigned_to',
            key: 'assigned_to',
        },
        {
            title: 'Delete',
            key: 'action',
            render: (_, record) => (
                <Button type="primary"shape="circle" onClick={()=>handleDeleteEvent(record.id)} icon={<DeleteFilled />} danger style={{padding:10, margin:10}}/>
            ),
        },
        {
            title: 'Mark Complete',
            key: 'action',
            render: (_, record) => (
                <>
                {
                    (record.status !== "Completed")?
                    <Button type="primary"shape="circle" onClick={()=>handleStatusUpdate(record,"Completed")}icon={<CheckCircleFilled />} color = 'green'style={{padding:10, margin:10}}/>
                    :<div></div>
                }
                </>
            ),
        },
        {
            title: 'Edit',
            key: 'action',
            render: (_, record) => (
                <TaskUpdateComponent id = {record.id}/>
            ),
        },
        

];


const userColumns = [
    {
        title: 'Task ID',
        dataIndex: 'id',
        key:'id'
    },
    {
        title: 'Task Name',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Due Date',
        dataIndex: 'due_date',
        key: 'due_date',
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (_,record)=>(
            <>{
                <Tag >
                {record.status}
            </Tag>
        
            }
            </>
        )

    },
    {
        title: 'Project ID',
        dataIndex: 'project',
        key: 'project',
    },
    {
        title: 'Assigned To',
        dataIndex: 'assigned_to',
        key: 'assigned_to',
    },
    {
        title: 'Mark Complete',
        key: 'action',
        render: (_, record) => (
            <>
            {
                (record.status !== "Completed")?
                <Button type="primary"shape="circle" onClick={()=>handleStatusUpdate(record,"Completed")}icon={<CheckCircleFilled />} color = 'green'style={{padding:10, margin:10}}/>
                :<div></div>
            }
            </>
        ),
    },

];

const filterTasksByUserId = (tasksArray, userId) => {
    return tasksArray.filter((task) => task.assigned_to === userId);
}
const TaskListComponent= () =>{

    const [tasks,setTasks] = useState([]);

    const userName = localStorage.getItem("userName")
    const userID = localStorage.getItem("userID")
    const is_staff = localStorage.getItem("isStaff")

    // {(is_staff === "true")?console.log("Logged as Admin"):console.log("Logged as user")}
    // {console.log(typeof userID)}

    useEffect(()=>{
        async function fetchTasks(){
            const data = await getTasks();
            if(is_staff === "true"){
                setTasks(data || [])
            }else{
                setTasks(filterTasksByUserId(data,Number(userID)) || [])
            }
            
        }
        fetchTasks()
    })

    return <>
        {
            (is_staff === "true")?<div className="task-page">
            <TaskAddComponent/>
            <Table columns={adminColumns} dataSource={tasks} />
            
        </div>:<Table columns={userColumns} dataSource={tasks} />
        }
    </>
}

export default TaskListComponent;