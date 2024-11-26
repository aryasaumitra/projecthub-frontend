import React, { useState,useEffect } from 'react';
import { Button, Modal, Col, DatePicker, Form, Input, Row,} from 'antd';
import {EditFilled} from '@ant-design/icons';
import './projectUpdate.css'
import { getProjectsbyID,updateProject } from '../../services/api';
import dayjs from "dayjs"



const ProjectUpdateComponent = (props) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form,setForm] = useState({
        name:"",
        description:"",
        start_date:"",
        end_date:""
    })

    const projectID = props.id;

    useEffect(()=>{
        async function fetchProject() {
            const data = await getProjectsbyID(projectID);
            // console.log("Inside Project Update",data)
            setForm(data || []);
            // console.log(form)
        }
        fetchProject();
        },[]
    )

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

    const handleUpdateProject = async (values)=>{
        try{
                console.log("Updating a Project")
                console.log(values)
                values.end_date = convertToStringDate(values.end_date)
                values.start_date = convertToStringDate(values.start_date)
                console.log(values)
                const project = await updateProject(projectID,values)
                console.log(project)
                handleOk()

        }catch(error){
            alert("Error adding project: " + error.message);
        }

    }


  return (
    <>
    <Button type="primary" onClick={showModal} shape="circle" icon={<EditFilled />} style={{padding:20, margin:20}}/>
      <Modal
        title="Update Project"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form layout="vertical" onFinish={handleUpdateProject} hideRequiredMark>
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
                  initialValue={form.name}
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
                  getValueProps={(value) => ({ value: form.start_date ? dayjs(value) : "", })}
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
                  getValueProps={(value) => ({ value: form.end_date ? dayjs(value) : "", })}
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
                  initialValue={form.description}
                >
                  <Input.TextArea rows={4} placeholder="please enter url description"/>
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType='submit'>
                Submit
              </Button>
          </Form>
      </Modal>
    </>
  );
};
export default ProjectUpdateComponent;