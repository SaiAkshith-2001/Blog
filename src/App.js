import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import BlogWrite from "./pages/BlogWrite";
import BlogRead from "./pages/BlogRead";
import BlogPost from "./pages/BlogPost";
import PostComment from "./pages/PostComment";
import About from "./pages/About";
import Login from "./pages/Login";
import ThemeToggleButton from "./Component/ToggleButton";
import { AuthProvider } from "./context/AuthContext";
import MarkdownEditor from "./Component/MarkdownEditor";
import RegistrationForm from "./pages/RegistrationForm";
import PersonIcon from "@mui/icons-material/Person";
function App(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Blog
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }} component={Link} to="/">
            <ListItemText>Home</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            component={Link}
            to="/read"
          >
            <ListItemText>Read Blogs</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            component={Link}
            to="/write"
          >
            <ListItemText>Write</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            component={Link}
            to="/editor"
          >
            <ListItemText>Editor</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            component={Link}
            to="/about"
          >
            <ListItemText>About</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <BrowserRouter>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav" position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="div" sx={{ flexGrow: 1 }}>
              <Button disableRipple color="inherit" component={Link} to="/">
                Blog
              </Button>
            </Typography>
            <Box
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/write">
                Write
              </Button>
              <Button color="inherit" component={Link} to="/read">
                Read
              </Button>
              <Button color="inherit" component={Link} to="/editor">
                Editor
              </Button>
              <Button color="inherit" component={Link} to="/about">
                About
              </Button>
            </Box>
            <IconButton color="inherit" component={Link} to="/login">
              <PersonIcon />
            </IconButton>
            <ThemeToggleButton />
          </Toolbar>
        </AppBar>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/write"
            element={
              // <ProtectedRoute>
              <BlogWrite />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/read"
            element={
              // <ProtectedRoute>
              <BlogRead />
              // </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/editor" element={<MarkdownEditor />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/posts/:id/" element={<BlogPost />} />
          <Route path="/posts/:id/comments" element={<PostComment />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
