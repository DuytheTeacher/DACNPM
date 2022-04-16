import {
  Route,
  BrowserRouter,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";

import { HomePage } from "./components/pages/HomePage";
import {
  SuperAdminLayout,
  SuperAdminLoginPage,
  Dashboard,
  RegisterAdmin,
  VehicleList,
  UploadNewProduct,
} from "./components/pages";

import "./App.css";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { closeMessage } from "./slices/messageSlice";
import TokenService from "./api/local.service";

function App() {
  const { content, type, isOpen } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeMessage());
  };

  const RequireAuth = ({ children }) => {
    const user = TokenService.getUser();
    const location = useLocation();
    if (!user) {
      return (
        <Navigate to="/super-admin/login" state={{ from: location }} replace />
      );
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="super-admin" element={<SuperAdminLayout />}>
          <Route path="login" element={<SuperAdminLoginPage />} />
          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          >
            <Route
              path="register-admin"
              element={
                <RequireAuth>
                  <RegisterAdmin />
                </RequireAuth>
              }
            />
            <Route
              path="vehicles-list"
              element={
                <RequireAuth>
                  <VehicleList />
                </RequireAuth>
              }
            />
            <Route
              path="upload-vehicle"
              element={
                <RequireAuth>
                  <UploadNewProduct />
                </RequireAuth>
              }
            />
          </Route>
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
