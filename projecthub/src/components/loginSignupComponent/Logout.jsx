import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <Button color="danger" variant="solid" onClick={handleLogout}>
            Logout
    </Button>
  );
};

export default Logout;