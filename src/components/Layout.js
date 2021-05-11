// Libraries
import React, {useContext} from "react";
import {Link, useHistory, useLocation} from "react-router-dom";

// App Context
import {AppContext} from "../contexts/AppContext";

// Footer
import Footer from "./Footer";

// Material UI Components
import {makeStyles} from "@material-ui/core/styles";
import {
  AppBar,
  Avatar,
  createMuiTheme,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Toolbar,
  Typography
} from "@material-ui/core";

// Material UI Icons
import {
  AccountCircleOutlined,
  AddBoxOutlined,
  AddCircleOutlineOutlined,
  AppsOutlined,
  Menu,
  SettingsOutlined,
  StarOutline,
  SubjectOutlined
} from "@material-ui/icons";

// Drawer (Sidebar) Width
const drawerWidth = 240;

// Component
const Layout = (props) => {
  // Get State
  const state = useContext(AppContext);

  // Links Hooks
  const history = useHistory();
  const location = useLocation();

  // Custom CSS Classes
  const useStyles = makeStyles((theme) => {
    return (
      {
        root: {
          display: "flex"
        },
        content: {
          backgroundColor: state.profile.theme === "light" ? "#f9f9f9" : "#333333",
          padding: 15,
          minHeight: "calc(100vh - 30px)",
          flexGrow: 1,
          position: "relative",
          "& > div:nth-of-type(2)": {
            paddingBottom: 60
          }
        },
        drawer: {
          [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
          }
        },
        drawerPaper: {
          width: drawerWidth,
          top: 65,
          zIndex: 999
        },
        active: {
          backgroundColor: state.profile.theme === "light" ? "#eaeaea" : "#545454"
        },
        menuButton: {
          marginRight: theme.spacing(2),
          [theme.breakpoints.up("sm")]: {
            display: "none"
          }
        },
        List: {
          paddingTop: 0
        },
        ListItemIcon: {
          minWidth: 40
        },
        AppBar: {
          height: 65,
          maxHeight: 65,
          zIndex: 1000,
          backgroundColor: state.profile.theme === "light" ? "#ffffff" : "#424242",
          color: state.profile.theme === "light" ? "#222222" : "#ffffff",
          borderBottom: state.profile.theme === "light" ? "1px solid rgba(0, 0, 0, 0.12)" : "1px solid rgba(255, 255, 255, 0.12)"
        },
        logoLink: {
          display: "flex",
          textDecoration: "none",
          color: state.profile.theme === "light" ? "#222222" : "#ffffff"
        },
        logo: {
          flexGrow: 1,
          display: "flex",
          alignItems: "center"
        },
        logoTitle: {
          marginLeft: 15
        },
        logoAvatar: {
          width: 30,
          height: 30,
          alignSelf: "flex-end"
        },
        toolBar: theme.mixins.toolbar,
        avatar: {
          marginLeft: theme.spacing(2)

        },
        appbarAvatar: {
          marginLeft: theme.spacing(2),
          [theme.breakpoints.down("xs")]: {
            display: "none"
          }
        },
        appbarUsername: {
          [theme.breakpoints.down("xs")]: {
            display: "none"
          }
        },
        divider: {
          margin: "8px auto"
        },
        drawerUser: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 30
        }
      }
    );
  });

  // Classes Constant
  const classes = useStyles();

  // Dark Theme Colors
  const theme = createMuiTheme({
    palette: {
      type: state.profile.theme,
      primary: {
        main: state.profile.theme === "light" ? "#3f51b5" : "#7f91ff"
      }
    }
  });

  // Responsive State
  const {window} = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Toggle Drawer In Responsive Method
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Check Container
  const container = window !== undefined ? () => window().document.body : undefined;

  // Drawer (Sidebar) Links
  const menuItems = [
    {
      text: "All Notes",
      icon: <SubjectOutlined color="primary" />,
      path: "/",
      divider: false
    },
    {
      text: "Favourite Notes",
      icon: <StarOutline color="primary" />,
      path: "/favourites",
      divider: false
    },
    {
      text: "Add Note",
      icon: <AddCircleOutlineOutlined color="primary" />,
      path: "/add-note",
      divider: true
    },
    {
      text: "Categories",
      icon: <AppsOutlined color="primary" />,
      path: "/categories",
      divider: false
    },
    {
      text: "Add Category",
      icon: <AddBoxOutlined color="primary" />,
      path: "/add-category",
      divider: true
    },
    {
      text: "Profile",
      icon: <AccountCircleOutlined color="primary" />,
      path: "/profile",
      divider: false
    },
    {
      text: "Admin",
      icon: <SettingsOutlined color="primary" />,
      path: "/admin",
      divider: false
    }
  ];

  // Layout View
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar className={classes.AppBar} elevation={0}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
            <div className={classes.logo}>
              <Link to="/" className={classes.logoLink}>
                <Avatar src={process.env.PUBLIC_URL + "/images/notes.png"} className={classes.logoAvatar} />
                <Typography variant="h5" component="span" className={classes.logoTitle}>
                  Smart Notes
                </Typography>
              </Link>
            </div>
            <Typography component="span" className={classes.appbarUsername}>{state.profile.username}</Typography>
            <Avatar src={state.profile.avatar} className={classes.appbarAvatar} />
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor="left"
              classes={{paper: classes.drawerPaper}}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true
              }}
            >
              <List className={classes.List}>
                {
                  menuItems.map((item, index) => {
                    return (
                      <div key={item.text}>
                        <ListItem
                          button
                          onClick={() => {
                            history.push(item.path);
                            handleDrawerToggle();
                          }}
                          className={location.pathname === item.path ? classes.active : null}
                        >
                          <ListItemIcon className={classes.ListItemIcon}>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.text} />
                        </ListItem>
                        {
                          item.divider === true ? (<Divider className={classes.divider} />) : null
                        }
                      </div>
                    );
                  })
                }
              </List>
              <Divider />
              <div className={classes.drawerUser}>
                <Typography component="span" color="textSecondary">{state.profile.username}</Typography>
                <Avatar src={state.profile.avatar} className={classes.avatar} />
              </div>
            </Drawer>
          </Hidden>

          <Hidden xsDown implementation="css">
            <Drawer
              classes={{paper: classes.drawerPaper}}
              variant="permanent"
              open
            >
              <List className={classes.List}>
                {
                  menuItems.map((item, index) => {
                    return (
                      <div key={item.text}>
                        <ListItem
                          button
                          onClick={() => history.push(item.path)}
                          className={location.pathname === item.path ? classes.active : null}
                        >
                          <ListItemIcon className={classes.ListItemIcon}>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.text} />
                        </ListItem>
                        {
                          item.divider === true ? (<Divider className={classes.divider} />) : null
                        }
                      </div>
                    );
                  })
                }
              </List>
            </Drawer>
          </Hidden>
        </nav>

        <div className={classes.content}>
          <div className={classes.toolBar} />
          {props.children}
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
};

// Export Component
export default Layout;
