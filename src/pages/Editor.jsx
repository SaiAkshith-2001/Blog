import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { Box, Button, Container, Paper, Typography } from "@mui/material";

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

  const handleChange = (value) => {
    setContent(value);
  };

  const handleSave = () => {
    // Save the content to local storage or send it to a server
    localStorage.setItem("noteContent", content);
    alert("Note saved!");
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 2, marginTop: "8rem" }}>
        <Typography variant="h4" gutterBottom>
          Note
        </Typography>
        <ReactQuill
          value={content}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          style={{ height: "300px", marginBottom: "20px" }}
        />
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ marginTop: "2rem" }}
          >
            Save Note
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NoteEditor;
