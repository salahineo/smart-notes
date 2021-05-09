// Libraries
import React, {useContext} from "react";
import {Link, useHistory, useLocation} from "react-router-dom";

// App Context
import {AppContext} from "../contexts/AppContext";

// Material UI Components
import {makeStyles} from "@material-ui/core/styles";
import {
  AppBar,
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from "@material-ui/core";

// Material UI Icons
import {
  AccountCircleOutlined,
  AddBoxOutlined,
  AddCircleOutlineOutlined,
  AppsOutlined,
  SettingsOutlined,
  StarOutline,
  SubjectOutlined
} from "@material-ui/icons";

// Drawer (Sidebar) Width
const drawerWidth = 240;

// Custom CSS Classes
const useStyles = makeStyles((theme) => {
  return (
    {
      root: {
        display: "flex"
      },
      content: {
        backgroundColor: "#f9f9f9",
        width: "100%",
        padding: 15,
        minHeight: "calc(100vh - 30px)"
      },
      drawer: {
        width: drawerWidth
      },
      drawerPaper: {
        width: drawerWidth,
        top: 65,
        zIndex: 999
      },
      active: {
        backgroundColor: "#eaeaea",
      },
      ListItemIcon: {
        minWidth: 40
      },
      AppBar: {
        height: 65,
        maxHeight: 65
      },
      logoLink: {
        display: "flex",
        textDecoration: "none",
        color: "#ffffff"
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
        height: 30
      },
      toolBar: theme.mixins.toolbar,
      avatar: {
        marginLeft: theme.spacing(2)
      },
      divider: {
        margin: "8px auto"
      }
    }
  );
});

// Component
const Layout = ({children}) => {
  // Get State
  const state = useContext(AppContext);

  // Links Hooks
  const history = useHistory();
  const location = useLocation();

  // Classes Constant
  const classes = useStyles();

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
    <div className={classes.root}>
      <AppBar className={classes.AppBar} elevation={0}>
        <Toolbar>
          <div className={classes.logo}>
            <Link to="/" className={classes.logoLink}>
              <Avatar src="/images/notes.png" className={classes.logoAvatar} />
              <Typography variant="h5" component="span" className={classes.logoTitle}>
                Smart Notes
              </Typography>
            </Link>
          </div>
          <Typography>
            {state.profile.username}
          </Typography>
          <Avatar src={state.profile.avatar} className={classes.avatar} />
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{paper: classes.drawerPaper}}
      >
        <List>
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

      <div className={classes.content}>
        <div className={classes.toolBar} />
        {children}
      </div>
    </div>
  );
};

// Export Component
export default Layout;
