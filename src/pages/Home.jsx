import { Button, Typography, Box, Container } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
function Home() {
  const navigate = useNavigate();
  const redirectToRead = () => {
    navigate("/read");
  };
  const redirectToWrite = () => {
    navigate("/write");
  };
  return (
    <Container>
      <Box>
        <Typography
          variant="h3"
          sx={{
            marginTop: "8rem",
            textAlign: "center",
          }}
        >
          Hey, Welcome to the Blog Application{" "}
          <Typewriter
            words={[
              "Read.",
              "Write.",
              "Share.",
              "Content.",
              "Create.",
              "Browse.",
              "Explore.",
            ]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={100}
            deleteSpeed={100}
            delaySpeed={1000}
          />
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "8rem",
          gap: "1rem",
        }}
      >
        <Button
          variant="contained"
          size="large"
          color="success"
          onClick={redirectToRead}
        >
          Get Started <ArrowForwardIcon />
        </Button>
        <Button
          variant="outlined"
          size="large"
          color="inherit"
          onClick={redirectToWrite}
        >
          Write
        </Button>
      </Box>
    </Container>
  );
}
export default Home;
