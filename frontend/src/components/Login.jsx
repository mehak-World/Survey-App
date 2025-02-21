import React, { useState } from "react";
import axios from "axios";
import { setAuthHeader } from "../utils/BackendUtils";
import { serverUrl } from "../utils/BackendUtils";
import { Button, TextField, CircularProgress } from "@mui/material";
import {useNavigate} from "react-router-dom";
import { useUser } from "../utils/UserContext";

const Login = () => {
  const [isSignUpForm, setIsSignUpForm] = useState(false);
  const navigate = useNavigate();
  const { setUserName } = useUser();

  const handleSwitch = () => {
    setIsSignUpForm(!isSignUpForm);
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let response;
      if (isSignUpForm) {
        
        response = await  axios
        .post(serverUrl + "signup", {
              login: username,
              email: email,
              password: password,
        })

      console.log(response);
      if (response.status == 200) {
        setAuthHeader(response.data.token);
        window.localStorage.setItem("username", username);
        setUserName(username);
        navigate("/");
      }

    
      } 

      else{
        response = await  axios
        .post(serverUrl + "login", {
              login: username,
              password: password,
        })

      console.log(response);
      if (response.status == 200) {
        setAuthHeader(response.data.token);
        window.localStorage.setItem("username", username);
        setUserName(username);
        navigate("/");
      }
     
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.response ? error.response.data.message : "An error occurred");
    }
  };



  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>{!isSignUpForm ? "Login" : "Signup"}</h2>
        <form onSubmit={handleSubmit}>
        {isSignUpForm && <div style={styles.inputGroup}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update local username state
              fullWidth
              required
            />
          </div>}
          <div style={styles.inputGroup}>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update local username state
              fullWidth
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update local password state
              fullWidth
              required
            />
          </div>
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : !isSignUpForm ? "Login" : "Sign Up"}
          </Button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.toggleLink}>
          <Button onClick= {handleSwitch}>
            {!isSignUpForm ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Styles for the Login component
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "400px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "600",
  },
  inputGroup: {
    marginBottom: "16px",
  },
  submitButton: {
    marginTop: "16px",
    padding: "12px",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: "12px",
  },
  toggleLink: {
    textAlign: "center",
    marginTop: "12px",
  },
};

export default Login;
