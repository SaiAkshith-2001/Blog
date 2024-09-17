import React from "react";
import { Container, Typography, Card, CardContent } from "@mui/material";
import { styled } from "@mui/system";

const AboutContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const AboutCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const About = () => {
  return (
    <AboutContainer maxWidth="md" sx={{ marginTop: "6rem" }}>
      <AboutCard>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            About Our Blog
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to our blog! We are passionate about sharing insightful
            articles, news, and stories on a variety of topics. Our mission is
            to provide valuable content that informs, entertains, and inspires
            our readers.
          </Typography>
          <Typography variant="body1" paragraph>
            Our team of dedicated writers and editors work tirelessly to bring
            you the latest trends, tips, and information. Whether you're looking
            for advice on personal development, technology updates, or lifestyle
            tips, we've got you covered.
          </Typography>
          <Typography variant="body1" paragraph>
            Thank you for visiting our blog. We hope you enjoy reading our posts
            as much as we enjoy creating them. If you have any questions or
            feedback, feel free to reach out to us. Happy reading!
          </Typography>
        </CardContent>
      </AboutCard>
    </AboutContainer>
  );
};

export default About;
