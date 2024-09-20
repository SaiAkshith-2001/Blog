import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import PersonIcon from "@mui/icons-material/Person";
// import BlogWrite from "./pages/BlogWrite";
// import BlogRead from "./pages/BlogRead";
// import BlogPost from "./pages/BlogPost";
// import Home from "./pages/Home";
// import PostComment from "./pages/PostComment";
// import About from "./pages/About";
// import Login from "./pages/Login";
// import RegistrationForm from "./pages/RegistrationForm";
// import NoteEditor from "./pages/Editor";
// import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";

const PostComment = lazy(() => import("./pages/PostComment"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const RegistrationForm = lazy(() => import("./pages/RegistrationForm"));
const NoteEditor = lazy(() => import("./pages/Editor"));
const BlogRead = lazy(() => import("./pages/BlogRead"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BlogWrite = lazy(() => import("./pages/BlogWrite"));
const ThemeToggleButton = lazy(() => import("./Component/ToggleButton"));
const MarkdownEditor = lazy(() => import("./Component/MarkdownEditor"));
const MenuIcon = lazy(() => import("@mui/icons-material/Menu"));
const PersonIcon = lazy(() => import("@mui/icons-material/Person"));
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
            keepMounted: true, // enabled on smaller devices i.e., mobile.
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
        <Suspense
          fallback={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <CircularProgress />
            </Box>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/write" element={<BlogWrite />} />
            <Route path="/read" element={<BlogRead />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/editor" element={<MarkdownEditor />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/posts/:id/" element={<BlogPost />} />
            <Route path="/posts/:id/comments" element={<PostComment />} />
            <Route path="/quilleditor" element={<NoteEditor />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
