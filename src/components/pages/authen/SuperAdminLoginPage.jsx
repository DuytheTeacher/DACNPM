import { useFormik } from "formik";
import * as Yup from "yup";
import SuperAdminService from "../../../api/superAdmin.service";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { errorMessage, successMessage } from "../../../slices/messageSlice";
import { useEffect, useState } from "react";
import { setUser } from "../../../slices/userSlice";
import TokenService from "../../../api/local.service";

function SuperAdminLoginPage() {
  const useStyles = makeStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ACDDDE",
    },

    card: {
      minWidth: 275,
      maxWidth: 450,
    },

    headTitle: {
      padding: 40,
      color: "#FFF",
      fontSize: 27,
      textTransform: "uppercase",
      textAlign: "center",
      fontWeight: "bold",
    },

    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    loginButton: {
      marginTop: 10,
    },

    registerLink: {
      textDecoration: "none",
    },
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes = useStyles();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();
  const from = location.state ? location.state.from.pathname : "../dashboard";
  const user = TokenService.getUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate(from);
    }
  }, [from, navigate, user]);

  const signInSchema = Yup.object().shape({
    userName: Yup.string()
      .min(3, "Your username is too short (3-50 characters)")
      .max(50, "Your username is too long (3-50 characters)")
      .required("Username is required"),
    password: Yup.string()
      .min(2, "Your password is too short (at least 3 characters)")
      .required("Password is required"),
  });

  const loginForm = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const formik = useFormik({
      initialValues: {
        userName: "",
        password: "",
      },
      validationSchema: signInSchema,
      onSubmit: async (values) => {
        try {
          setLoading(true);
          const resp = await SuperAdminService.login(
            values.userName,
            values.password
          );
          dispatch(setUser({ user: resp }));
          dispatch(successMessage({ message: "Login successfully!" }));
          navigate(from, { replace: true });
        } catch (e) {
          dispatch(errorMessage({ message: e }));
        }
        setLoading(false);
      },
    });

    return (
      <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
        <TextField
          fullWidth
          id="userName"
          name="userName"
          label="Username"
          value={formik.values.userName}
          onChange={formik.handleChange}
          error={formik.touched.userName && Boolean(formik.errors.userName)}
          helperText={formik.touched.userName && formik.errors.userName}
          margin="normal"
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
        />

        <Box className={classes.buttonContainer}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            className={classes.loginButton}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </form>
    );
  };

  return (
    <Container maxWidth="xl" disableGutters>
      <Box height="100vh" maxWidth="100vw" className={classes.root}>
        <Card className={classes.card} variant="outlined">
          <CardContent>
            <Box bgcolor="primary.light" className={classes.headTitle}>
              SuperAdmin Login
            </Box>
            {loginForm()}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default SuperAdminLoginPage;
