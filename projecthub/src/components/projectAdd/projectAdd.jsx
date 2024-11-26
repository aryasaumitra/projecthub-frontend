import './projectAdd.css'
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Space } from 'antd';
import { createProject } from '../../services/api';
import { useNavigate } from "react-router-dom";



const ProjectAddComponent = (props) => {
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

    const handleAddProject = async (values) => {
        try {
                console.log("Adding new Project")
                console.log(values)
                values.end_date = convertToStringDate(values.end_date)
                values.start_date = convertToStringDate(values.start_date)
                console.log(values)
                const project = await createProject(values);

                console.log(project)
                onClose();
            } catch (error) {
            alert("Error adding project: " + error.message);
        }
    };

    return (
      <>
        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
          New Project
        </Button>
        <Drawer
          title="Create a new Project"
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
          <Form layout="vertical" onFinish={handleAddProject}hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Project Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter Project name',
                    },
                  ]}
                >
                  <Input placeholder="Please enter project name"/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
            <Col span={12}>
                <Form.Item
                  name="start_date"
                  label="Start Date"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose the Start Date',
                    },
                  ]}
                >
                  <DatePicker  needConfirm />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="end_date"
                  label="End Date"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose the End Date',
                    },
                  ]}
                >
                  <DatePicker needConfirm />
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
                  <Input.TextArea rows={4} placeholder="please enter url description"/>
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
export default ProjectAddComponent;