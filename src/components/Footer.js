// Libraries
import React, {useContext} from "react";

// App Context
import {AppContext} from "../contexts/AppContext";

// Material UI Style
import {makeStyles} from "@material-ui/core/styles";

// Footer Component
const Footer = () => {
  // Get State
  const state = useContext(AppContext);

  // Custom CSS Classes Style
  const useStyles = makeStyles(theme => ({
      footer: {
        fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: state.profile.theme === "light" ? "#ffffff" : "#333333",
        width: "calc(100% - 30px)",
        padding: 15,
        borderTop: state.profile.theme === "light" ? "1px solid rgba(0, 0, 0, 0.12)" : "1px solid rgba(255, 255, 255, 0.12)",
        position: "absolute",
        bottom: 0,
        right: 0,
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          "& > div:first-of-type": {
            marginBottom: 15
          }
        }
      },
      copyright: {
        color: state.profile.theme === "light" ? "#222222" : "#ffffff",
        "& > a": {
          color: state.profile.theme === "light" ? "#3f51b5" : "#7f91ff",
          fontWeight: "bold",
          textDecoration: "none"
        }
      },
      link: {
        fontSize: 18,
        transition: "0.3s",
        color: state.profile.theme === "light" ? "#222222" : "#ffffff",
        "&:hover": {
          color: state.profile.theme === "light" ? "#3f51b5" : "#7f91ff",
        },
        "& i": {
          padding: "0 8px"
        }
      }
    })
  );

  // Classes Constant
  const classes = useStyles();

  // Component View
  return (
    <footer className={classes.footer}>
      <div className={classes.copyright}>
        © <span>{String(new Date().getFullYear())}</span> | <a href='https://linktree.salahineo.com' rel="noopener" target="_blank" className="author">Mohamed Salah</a>
      </div>
    </footer>
  );
};

// Export Footer
export default Footer;
