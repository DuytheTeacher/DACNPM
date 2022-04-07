import {
  Box,
  Button,
  Card,
  CardContent,
  makeStyles,
  TextField,
} from "@material-ui/core";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import SuperAdminService from "../../../api/superAdmin.service";
import { setUser } from "../../../slices/userSlice";
import { errorMessage, successMessage } from "../../../slices/messageSlice";
import { useState } from "react";

const RegisterAdmin = () => {
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
      margin: "0 auto",
    },

    headTitle: {
      padding: "20 0",
      fontSize: 27,
      textTransform: "uppercase",
      fontWeight: "bold",
      textAlign: "center",
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
  const [loading, setLoading] = useState(false);
  const registerSchema = Yup.object().shape({
    userName: Yup.string()
      .min(3, "Your username is too short (3-50 characters)")
      .max(50, "Your username is too long (3-50 characters)")
      .required("Username is required"),
    password: Yup.string()
      .min(2, "Your password is too short (at least 3 characters)")
      .required("Password is required"),
  });

  const registerForm = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const formik = useFormik({
      initialValues: {
        userName: "",
        password: "",
      },
      validationSchema: registerSchema,
      onSubmit: async (values) => {
        try {
          setLoading(true);
          const resp = await SuperAdminService.registerAdmin(
            values.userName,
            values.password
          );
          dispatch(setUser({ user: resp }));
          dispatch(successMessage({ message: "Create Admin account successfully!" }));
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
            {loading ? "Registering..." : "Register"}
          </Button>
        </Box>
      </form>
    );
  };

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <Box className={classes.headTitle}>Create new Admin account</Box>
        {registerForm()}
      </CardContent>
    </Card>
  );
};

export default RegisterAdmin;
