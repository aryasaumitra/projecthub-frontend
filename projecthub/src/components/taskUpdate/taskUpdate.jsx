import React, { useState,useEffect } from 'react';
import {EditFilled} from '@ant-design/icons';
import { Button, Col, DatePicker, Modal, Form, Input, Row,InputNumber,Select } from 'antd';
import dayjs from "dayjs"
import { getTaskById,updateTask } from '../../services/api';
import './taskUpdate.css';


const TaskUpdateComponent = (props) =>{

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form,setForm] = useState({
        title:"",
        description:"",
        due_date:"",
        project:"",
        assigned_to:"",
        status:""
    })

    const taskID = props.id;

    useEffect(()=>{
        async function fetchTask() {
            const data = await getTaskById(taskID);
            console.log("Inside Project Update",data)
            setForm(data || []);
            // console.log(form)
        }
        fetchTask();
        },[]
    );

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        }, 1000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const convertToStringDate = (obj) => {
        if (obj.$d) {
        // Format to string date
        const date = new Date(obj.$d);
        return date.toISOString().split("T")[0]; // e.g., "2024-11-29"
        }
        return null; // Handle cases where $d is not present
    };

    const handleUpdateTask = async (values) => {
        try {
                console.log("Updating Task")
                console.log(values)
                values.due_date = convertToStringDate(values.due_date)
                console.log(values)
                const task = await updateTask(taskID,values)
                console.log(task)
                handleOk()
            } catch (error) {
            alert("Error adding task: " + error.message);
        }
    };


    return (
        <>
        <Button type="primary"shape="circle" onClick={showModal} icon={<EditFilled />} style={{padding:10, margin:10}}/>
        <Modal
        title="Update Task"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        >
            <Form layout="vertical" onFinish={handleUpdateTask}hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="title"
                  label="Task Name Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter Task name',
                    },
                  ]}
                  initialValue = {form.title}
                >
                  <Input placeholder="Please enter Task name"/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="due_date"
                  label="Due Date"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose the Due Date',
                    },
                  ]}
                  getValueProps={(value) => ({ value: form.due_date ? dayjs(value) : "", })}
                >
                  <DatePicker  needConfirm />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
            <Col span={12}>
                <Form.Item
                    label="Project Number"
                    name="project"
                    rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                    ]}
                    initialValue={form.project}
                    >
                        <InputNumber/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                    label="Assigned to"
                    name="assigned_to"
                    rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                    ]}
                    initialValue={form.assigned_to}
                    >
                        <InputNumber/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                    ]}
                    initialValue={form.status}
                >
                    <Select  options={[
                                    {
                                    value: 'Pending',
                                    label: 'Pending',
                                    },
                                    {
                                    value: 'In Progress',
                                    label: 'In Progress',
                                    },
                                    {
                                    value: 'Completed',
                                    label: 'Completed',
                                    }
                                ]}
                    
                    />
                </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: 'please enter description',
                    },
                  ]}
                  initialValue={form.description}
                >
                  <Input.TextArea rows={4} placeholder="please enter task description"/>
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType='submit'>
                Update
              </Button>
          </Form>

        </Modal>
        </>
    );
}

export default TaskUpdateComponent