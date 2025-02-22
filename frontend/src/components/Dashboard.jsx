import React, { useEffect, useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert"; 
import createImg from "../assets/images/forms-blank-googlecolors.png";
import surveyImg from "../assets/images/t-shirt.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthToken, serverUrl } from "../utils/BackendUtils";
import { useUser } from "../utils/UserContext";

const Dashboard = () => {
  const [forms, setForms] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const navigate = useNavigate();
  const {username} = useUser();

  useEffect(() => {
    if(!username){
      navigate("/login");
    }
    const getForms = async () => {
      const response = await axios.get(serverUrl + "getuserforms", {
        'headers': {
          'Authorization': getAuthToken()
        }
      });
      
      if (response) {
        setForms(response.data);
      }
    };
    getForms();
  }, []);

  const handleMenuClick = (event, surveyId) => {
    setAnchorEl(event.currentTarget);
    setSelectedSurvey(surveyId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSurvey(null);
  };

  const handleEdit = async () => {
    console.log(`Edit survey with ID: ${selectedSurvey}`);
    const id = selectedSurvey;
    navigate( `/edit/${id}`)
    handleMenuClose();
  };

  const handleDelete = async () => {
    console.log(`Delete survey with ID: ${selectedSurvey}`);
    const response = await axios.delete(serverUrl + "deleteform/" + selectedSurvey, {
      'headers': {
        'Authorization': getAuthToken()
      }
    });
    if(response){
      setForms(forms.filter((survey) => survey._id !== selectedSurvey));
    }
   
    handleMenuClose();
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Create Form Section */}
      <div style={{ margin: "5%" }}>
        <h2 style={{ fontWeight: "600", fontSize: "24px" }}>Create a New Form</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px dashed #ccc",
            borderRadius: "12px",
            padding: "20px",
            maxWidth: "250px",
            margin: "20px auto",
            cursor: "pointer",
            transition: "transform 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          <a href="/#/create">
            <img
              src={createImg}
              alt="Create form"
              style={{
                width: "200px",
                height: "150px",
                objectFit: "contain",
              }}
            />
          </a>
        </div>
      </div>

      {/* Recent Forms Section */}
      <div style={{ margin: "5%" }}>
        <h2 style={{ fontWeight: "600", fontSize: "24px" }}>Recent Forms</h2>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {/* Render Recent Forms */}
          {forms.map((survey) => (
            <div
              key={survey._id}
              style={{
                width: "200px",
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                textAlign: "center",
                position: "relative",
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src={surveyImg}
                alt={survey.title}
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "10px", position: "relative" }}>
                <h5
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    margin: "10px 0 5px",
                  }}
                >
                  {survey.title}
                </h5>
                <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                  <IconButton
                    size="small"
                    onClick={(event) => handleMenuClick(event, survey._id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </div>

                {/* Dropdown Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedSurvey === survey._id}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={handleEdit}>Edit</MenuItem>
                  <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Menu>

                <p
                  style={{
                    fontSize: "14px",
                    color: "#6c757d",
                    margin: "0",
                  }}
                >
                  Created on: {survey.createdAt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
