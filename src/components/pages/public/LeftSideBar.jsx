import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { forwardRef, useImperativeHandle, useState } from "react";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    color: "rgba(0, 0, 0, 0.54)",
  },
});

const LeftSideBar = forwardRef((props, ref) => {
  const classes = useStyles();
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  useImperativeHandle(ref, () => ({
    toggle(open) {
      setState(open);
    },
  }));

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button key={"Create Admin Account"}>
          <NavLink
            className={classes.navLink}
            style={(navData) => {
              return {
                color: navData.isActive ? "red" : "",
              };
            }}
            to="register-admin"
            key="register-admin"
          >
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText primary={"Create Admin Account"} />
          </NavLink>
        </ListItem>
        <ListItem button key="Vehicles list">
          <NavLink
            className={classes.navLink}
            style={(navData) => {
              return {
                color: navData.isActive ? "red" : "",
              };
            }}
            to="vehicles-list"
            key="vehicles-list"
          >
            <ListItemIcon>
              <DriveEtaIcon />
            </ListItemIcon>
            <ListItemText primary={"Vehicles list"} />
          </NavLink>
        </ListItem>
        <ListItem button key="Upload new Vehicle">
          <NavLink
            className={classes.navLink}
            style={(navData) => {
              return {
                color: navData.isActive ? "red" : "",
              };
            }}
            to="upload-vehicle"
            key="upload-vehicle"
          >
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary={"Upload new Vehicle"} />
          </NavLink>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
});

export default LeftSideBar;
