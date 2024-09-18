import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Snackbar,
  CircularProgress,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.15s ease-in-out",
  "&:hover": {
    transform: "scale(1.03)",
  },
}));

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
});
const BlogPost = ({ post, onEdit, onDelete }) => (
  <StyledCard>
    <StyledCardContent>
      <Typography gutterBottom variant="h5" component="div">
        {post.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {post.body}
      </Typography>
    </StyledCardContent>
    <CardActions>
      <IconButton aria-label="edit" onClick={() => onEdit()}>
        <EditIcon />
      </IconButton>
      <IconButton aria-label="delete" onClick={() => onDelete(post.id)}>
        <DeleteIcon />
      </IconButton>
    </CardActions>
  </StyledCard>
);

const BlogWrite = () => {
  const [id, setId] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState({
    id: "",
    title: "",
    body: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const getNews = async () => {
    // Simulating API call to fetch posts
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );
      const data = await response.json();
      //console.log(data);
      if (!response.ok) {
        throw new Error("please try again!");
      } else {
        setIsLoading(false);
        setPage((prevPage) => prevPage + 1);
        setNewsData((prevData) => [...prevData, ...data]);
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Error in fetching data, Please try again later!", err);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setCurrentPost({ id: "", title: "", body: "" });
  };

  const handlePostSave = () => {
    if (!currentPost.title || !currentPost.body) {
      setSnackbar({
        open: true,
        message: "Please fill all fields",
        severity: "error",
      });
      return;
    } else if (currentPost.id) {
      setPosts(
        posts.map((post) => (post.id === currentPost.id ? currentPost : post))
      );
      setSnackbar({
        open: true,
        message: "Post updated successfully",
        severity: "success",
      });
    } else {
      setPosts([...posts, { ...currentPost, id: Date.now().toString() }]);
      setSnackbar({
        open: true,
        message: "Post created successfully",
        severity: "success",
      });
    }
    handleDialogClose();
  };

  const handlePostDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((post) => post.id !== id));
      setSnackbar({
        open: true,
        message: "Post deleted successfully",
        severity: "success",
      });
    }
  };

  const handlePostEdit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application /json",
          },
          body: JSON.stringify({
            id,
            title,
            body,
          }),
        }
      );
      const data = await response.json();
      // console.log(data);
      if (!response.ok) {
        throw new Error("please try again!");
      } else {
        setIsLoading(false);
        setCurrentPost({ id: data.id, title: data.title, body: data.body });
        setDialogOpen(true);
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Error in fetching data, Please try again later!", err);
    }
  };
  useEffect(() => {
    handlePostEdit();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost({ ...currentPost, [name]: value });
  };

  return (
    <>
      <Container sx={{ py: 8, my: 4 }} maxWidth="md">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setDialogOpen(true)}
          sx={{ mb: 4, textTransform: "none" }}
        >
          Create New Post
        </Button>
        {isLoading ? (
          <CircularProgress sx={{ top: 50, left: 50, posititon: "relative" }} />
        ) : (
          <Grid container spacing={4}>
            {newsData &&
              newsData.map((post) => (
                <Grid item key={post._id} xs={12} sm={6} md={4}>
                  <BlogPost
                    post={post}
                    onEdit={handlePostEdit}
                    onDelete={handlePostDelete}
                  />
                </Grid>
              ))}
          </Grid>
        )}
      </Container>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {currentPost.id ? "Edit Post" : "Create New Post"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={currentPost.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="body"
            label="Content"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={4}
            value={currentPost.body}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handlePostSave}>Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default BlogWrite;
