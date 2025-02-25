import React from "react";
import { IconButton, Button } from "@mui/material";
import { useUser } from "../utils/UserContext";
import { getAuthToken, serverUrl, setAuthHeader } from "../utils/BackendUtils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { username, setUserName } = useUser();
  const navigate = useNavigate();
  
  const handleClick = async () => {
    
    await axios.get(serverUrl + "userlogout", {
      'headers': {
        'Authorization': getAuthToken()
      }
    }
    ).then((response) => {
      if (response.status == 200) {
        console.log("Logout successfull");
      } else if (response.status == 403) {
        console.log("Unauthenticated");
      } else {
        console.log("Error occured with logging out")
      }
    }).catch((error) => {
      if (error.response) {
        console.log("Error occured with logging out")
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });

    setUserName(null);
    setAuthHeader(null);
    navigate("/login");
    
  }

  return (
    <div className="header" style={styles.header}>
      {/* Header Info */}
      <div style={styles.headerInfo}>
        <img src="https://cdn-icons-png.flaticon.com/512/1484/1484799.png" alt="Forms Icon" style={styles.formImage} />
        <p style={styles.title}>Forms</p>
      </div>

      

      {/* Right Section */}
      {username &&  <div style={styles.headerRight}>
     <Button variant="text" onClick = {handleClick}>
              Logout
      </Button>

        {/* Profile Button */}
        <div style={styles.profileButton}>
        
          {/* Example: Using user initials */}
           <span style={styles.profileInitials}>{username && username.charAt(0).toUpperCase() /* username[0].toUpperCase() */}</span>
        </div>
      </div>}
    </div>
  );
};

// Styles
const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#f5f5f5",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },
  headerInfo: {
    display: "flex",
    alignItems: "center",
  },
  formImage: {
    width: "30px",
    height: "30px",
    marginRight: "10px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: 0,
  },
  headerSearch: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "20px",
    padding: "5px 10px",
    backgroundColor: "#fff",
  },
  searchIcon: {
    color: "#888",
    marginRight: "5px",
  },
  searchInput: {
    border: "none",
    outline: "none",
    fontSize: "14px",
    width: "200px",
    color: "#333",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  iconButton: {
    padding: "8px",
  },
  appsIcon: {
    fontSize: "22px",
    color: "#555",
  },
  profileButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#007BFF",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  profileInitials: {
    userSelect: "none",
  },
};

export default Header;
