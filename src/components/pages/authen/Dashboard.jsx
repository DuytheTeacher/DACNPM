import {
  AppBar,
  Button, Container,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { LeftSideBar } from "../index";
import {useRef} from "react";
import { Outlet } from 'react-router-dom';

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
  }));

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes = useStyles();

  const leftSideBarRef = useRef(null);
  
  const onLeftSideBarToggle = () => {
    leftSideBarRef.current.toggle(true);
  }

  const appBar = () => {
    return (
      <>
        <AppBar position="static">
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
            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
        <LeftSideBar ref={leftSideBarRef}/>
        <Container className="py-3 bg-danger">
          <Outlet />
        </Container>
      </>
    );
  };

  return <>{appBar()}</>;
};

export default Dashboard;
