import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Snackbar,
  styled,
  TextField,
} from "@mui/material";

// const StyledReactQuill = styled(ReactQuill)(({ theme }) => ({
//   "& .ql-container": {
//     borderBottomLeftRadius: 4,
//     borderBottomRightRadius: 4,
//   },
//   "& .ql-toolbar": {
//     borderTopLeftRadius: 4,
//     borderTopRightRadius: 4,
//   },
// }));

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

const NoteEditor = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const handleChange = (value) => {
    setContent(value);
  };

  const handleSave = () => {
    // Save the content to local storage or send it to a server
    if (!title || !content) {
      setSnackbar({
        open: true,
        message: "Please fill all fields",
        severity: "error",
      });
      return;
    } else {
      setSnackbar({
        open: true,
        message: "Post created successfully",
        severity: "success",
      });
      localStorage.setItem("noteContent", content);
      // alert("Note saved!");
      setContent("");
      setTitle("");
    }
  };

  return (
    <>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 2, marginTop: "8rem" }}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
          />
          <ReactQuill
            value={content}
            onChange={handleChange}
            modules={modules}
            formats={formats}
            placeholder="Write your post content here..."
            sx={{ marginBottom: "2rem" }}
          />
        </Paper>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ marginTop: "2rem" }}
          >
            Save
          </Button>
        </Box>
      </Container>
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

export default NoteEditor;
