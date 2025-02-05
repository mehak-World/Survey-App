import React from "react";
import AppsIcon from "@mui/icons-material/Apps";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import formimage from "../assets/images/forms-icon.png";

const Header = () => {
  const handleInputChange = (value) => {
    console.log("Search input:", value);
  };

  const username = localStorage.getItem("username");
  console.log(username);

  return (
    <div className="header" style={styles.header}>
      {/* Header Info */}
      <div style={styles.headerInfo}>
        <img src="https://cdn-icons-png.flaticon.com/512/1484/1484799.png" alt="Forms Icon" style={styles.formImage} />
        <p style={styles.title}>Forms</p>
      </div>

      {/* Search Bar */}
      <div style={styles.headerSearch}>
        <SearchIcon style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => handleInputChange(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Right Section */}
      <div style={styles.headerRight}>
        {/* Apps Icon */}
        <IconButton style={styles.iconButton}>
          <AppsIcon style={styles.appsIcon} />
        </IconButton>

        {/* Profile Button */}
        <div style={styles.profileButton}>
          {/* Example: Using user initials */}
          <span style={styles.profileInitials}>{username[0].toUpperCase()}</span>
        </div>
      </div>
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
