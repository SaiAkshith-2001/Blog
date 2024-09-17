import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  IconButton,
  Alert,
} from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const registrationValidationSchema = Yup.object({
  username: Yup.string()
    .min(4, "Username should be of minimum 4 characters length")
    .required("Username is required"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password mut match")
    .required("Confirm password is required"),
});

const RegistrationForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const redirectToLogin = () => {
    navigate("/login");
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3500/register", {
        username,
        password,
      });
      // login(response.data.token);
      setSnackbar({
        open: true,
        message: "User registered Successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Login failed", error);
      setSnackbar({
        open: true,
        message: "Invalid user, Please verify your credentials!",
        severity: "error",
      });
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: "4rem",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            label="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleShowPassword}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="text"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ textTransform: "none", my: 2 }}
          >
            Register
          </Button>
          <Typography sx={{ alignItems: "center" }}>
            Already have an account?{" "}
            <Button
              variant="text"
              onClick={redirectToLogin}
              sx={{ textTransform: "none" }}
            >
              Sign In
            </Button>
          </Typography>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          >
            <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Container>
  );
};

export default RegistrationForm;
