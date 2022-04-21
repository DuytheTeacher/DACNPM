import {Outlet, useNavigate} from 'react-router-dom';
import {AppBar, Button, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

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
  homepage: {
    cursor: 'pointer'
  }
}));

const PublicLayout = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  
  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} >
              <span className={classes.homepage} onClick={() => navigate('/public/vehicles')}>THIEN VY</span>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Outlet />
    </>
  );
}

export default PublicLayout;