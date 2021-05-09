// Material UI Style
import {makeStyles} from "@material-ui/core/styles";

// Custom CSS Classes Style
const useStyles = makeStyles(theme => ({
    footer: {
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#ffffff",
      width: "calc(100% - 30px)",
      padding: 15,
      borderTop: "1px solid rgba(0, 0, 0, 0.12)",
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
      color: "#222222",
      "& > span:last-of-type": {
        color: "#3f51b5",
        fontWeight: "bold"
      }
    },
    link: {
      fontSize: 18,
      transition: "0.3s",
      color: "#222222",
      "&:hover": {
        color: "#3f51b5"
      },
      "& i": {
        padding: "0 8px"
      }
    }
  })
);

// Footer Component
const Footer = () => {
  // Classes Constant
  const classes = useStyles();

  // Component View
  return (
    <footer className={classes.footer}>
      <div className={classes.copyright}>
        © <span>{String(new Date().getFullYear())}</span> | <span className="author">Mohamed Salah</span>
      </div>
      <div className="links">
        <a className={classes.link} href="https://github.com/salahineo" target="_blank" rel="noreferrer">
          <i className="fab fa-github" />
        </a>
        <a className={classes.link} href="https://www.linkedin.com/in/salahineo/" target="_blank" rel="noreferrer">
          <i className="fab fa-linkedin-in" />
        </a>
        <a className={classes.link} href="https://twitter.com/salahineo" target="_blank" rel="noreferrer">
          <i className="fab fa-twitter" />
        </a>
        <a className={classes.link} href="https://www.facebook.com/salahineo/" target="_blank" rel="noreferrer">
          <i className="fab fa-facebook-f" />
        </a>
        <a className={classes.link} href="https://salahineo.github.io/salahineo/" target="_blank" rel="noreferrer">
          <i className="fas fa-globe-africa" />
        </a>
        <a className={classes.link} href="mailto:salahineo.work@gmail.com" target="_blank" rel="noreferrer">
          <i className="fas fa-envelope" />
        </a>
      </div>
    </footer>
  );
};

// Export Footer
export default Footer;
