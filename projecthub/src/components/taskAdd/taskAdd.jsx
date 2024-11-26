import './taskAdd.css'
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Space,InputNumber,Select } from 'antd';
import { createTask } from '../../services/api';
import { useNavigate } from "react-router-dom";



const TaskAddComponent = (props) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
      navigate('/homepage')
    };

    // Convert the object to a string date
    const convertToStringDate = (obj) => {
        if (obj.$d) {
        // Format to string date
        const date = new Date(obj.$d);
        return date.toISOString().split("T")[0]; // e.g., "2024-11-29"
        }
        return null; // Handle cases where $d is not present
    };

    const handleAddTask = async (values) => {
        try {
                console.log("Adding Task")
                console.log(values)
                values.due_date = convertToStringDate(values.due_date)
                console.log(values)
                const task = await createTask(values);
                console.log(task)
                onClose();
            } catch (error) {
            alert("Error adding project: " + error.message);
        }
    };

    return (
      <>
        <Button type="primary" className='new-task' onClick={showDrawer} icon={<PlusOutlined />}>
          New Task
        </Button>
        <Drawer
          title="Create a new Task"
          width={720}
          onClose={onClose}
          open={open}
          styles={{
            body: {
              paddingBottom: 80,
            },
          }}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
            </Space>
          }
        >
          <Form layout="vertical" onFinish={handleAddTask}hideRequiredMark>
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
                >
                  <Input.TextArea rows={4} placeholder="please enter task description"/>
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType='submit'>
                Submit
              </Button>
          </Form>
        </Drawer>
      </>
    );
  };
export default TaskAddComponent;