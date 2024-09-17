import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
  Box,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const login = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3500/login", {
        username,
        password,
      });
      login(response.data.token);
      setSnackbarOpen(true);
      setSnackbarMessage("Login Successful!");
      navigate("/read");
    } catch (error) {
      console.error("Login failed", error);
      setSnackbarOpen(true);
      setSnackbarMessage("Login failed, Please verify your credentials!");
    }
  };
  const redirectToRegister = () => {
    navigate("/register");
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: "8rem",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleShowPassword}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            gutterBottom
            sx={{ textTransform: "none", my: "2rem" }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ textTransform: "none" }}
            onClick={redirectToRegister}
          >
            Create an account/Sign up
          </Button>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            message={snackbarMessage}
          />
        </form>
      </Box>
    </Container>
  );
};

export default Login;
