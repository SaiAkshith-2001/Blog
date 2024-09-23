import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Home = () => {
  const navigate = useNavigate();
  const redirectToRead = () => {
    navigate("/read");
  };
  const redirectToWrite = () => {
    navigate("/write");
  };
  return (
    <Container
      sx={{ py: 10, display: "flex", alignItems: "center", height: "100%" }}
    >
      <Box
        sx={{
          textAlign: { xs: "center", lg: "left" },
          width: { xs: "100%", lg: "50%" },
          mt: { lg: -8 },
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{ color: "text.primary", fontWeight: "bold" }}
        >
          Welcome to the Blog Application{" "}
          <span
            style={{
              fontWeight: "600",
              textDecoration: "underline",
              textDecorationColor: "primary.main",
            }}
          >
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
          </span>
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "left ",
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
      </Box>
      <Box sx={{ width: { xs: "100%", lg: "50%" }, mt: { xs: 4, lg: 0 } }}>
        <img
          src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg"
          alt="tailwind css components"
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "400px",
            margin: "0 auto",
            display: "block",
          }}
        />
      </Box>
    </Container>
  );
};

export default Home;
