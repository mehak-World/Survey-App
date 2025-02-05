import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  Link,
} from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [username, setUsername] = useState(""); // For login and signup
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // For signup
  const [error, setError] = useState(""); // For error handling
  const [isLoading, setIsLoading] = useState(false); // To show loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Reset any previous errors

    try {
      let response;
      if (isLogin) {
        // Send POST request for login
        response = await axios.post("http://localhost:3000/users/login", {
          username,
          password,
        });
      } else {
        // Send POST request for signup
        if (password !== confirmPassword) {
          setError("Passwords do not match!");
          setIsLoading(false);
          return;
        }
        response = await axios.post("http://localhost:3000/users/signup", {
          username,
          password,
        });
      }

      // Handle successful response (e.g., storing JWT token)
      console.log(response.data); // Your backend should send a JWT token
      localStorage.setItem("token", response.data.token); // Save JWT token in localStorage
        localStorage.setItem("username", username);
      // You can also redirect using `useNavigate` or similar logic
      navigate("/");

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.response ? error.response.data.message : "An error occurred");
    }
  };

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setUsername(""); // Reset username on form toggle
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        style={{
          maxWidth: "400px",
          margin: "10% auto",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          {isLogin ? "Login" : "Sign Up"}
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Username field for both login and signup */}
          <Box mb={2}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box mb={2}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {!isLogin && (
            <Box mb={2}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          )}

          {error && (
            <Box mb={2}>
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            </Box>
          )}

          <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
            {isLoading ? "Submitting..." : isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>

        <Box mt={2}>
          <Typography variant="body2">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              href="#"
              underline="hover"
              onClick={(e) => {
                e.preventDefault();
                toggleForm();
              }}
            >
              {isLogin ? "Sign Up" : "Login"}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
