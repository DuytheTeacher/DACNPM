import {
  AppBar,
  Button,
  Container,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { LeftSideBar } from "../index";
import { useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import TokenService from "../../../api/local.service";

const Dashboard = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    container: {
      paddingTop: 80,
      paddingBottom: 80,
    },
  }));

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes = useStyles();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const leftSideBarRef = useRef(null);

  const onLeftSideBarToggle = () => {
    leftSideBarRef.current.toggle(true);
  };

  const logout = () => {
    TokenService.removeUser();
    navigate("../login");
  };

  const appBar = () => {
    return (
      <>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={onLeftSideBarToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              THIEN VY ADMIN
            </Typography>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <LeftSideBar ref={leftSideBarRef} />
        <Container className={classes.container}>
          <Outlet />
        </Container>
      </>
    );
  };

  return <>{appBar()}</>;
};

export default Dashboard;
