import { Route, BrowserRouter, Routes } from "react-router-dom";

import { HomePage } from "./components/pages/HomePage";
import {
  SuperAdminLayout,
  SuperAdminLoginPage,
  SuperAdminRegister,
} from "./components/pages";

import "./App.css";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { closeMessage } from "./slices/messageSlice";

function App() {
  const { content, type, isOpen } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(closeMessage());
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="super-admin" element={<SuperAdminLayout />}>
          <Route path="login" element={<SuperAdminLoginPage />} />
          <Route path="register" element={<SuperAdminRegister />} />
        </Route>
      </Routes>
      <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {content}
        </Alert>
      </Snackbar>
    </BrowserRouter>
  );
}

export default App;
