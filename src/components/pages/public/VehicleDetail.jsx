import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VehicleService from "../../../api/vehicle.service";
import { useDispatch } from "react-redux";
import { errorMessage, successMessage } from "../../../slices/messageSlice";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  makeStyles,
  Modal,
  Paper,
  TextField,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import PaymentService from "../../../api/payment.service";

const useStyles = makeStyles({
  container: {
    maxWidth: 1080,
    margin: "auto",
    paddingTop: 80,
  },
  image: {
    width: "100%",
    objectFit: "cover",
    objectPosition: "center",
  },
  paper: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  bold: {
    fontWeight: "700",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperModal: {
    border: "2px solid #000",
    background: "#fff",
    padding: 20,
  },
});

const purposeMapping = (purpose) => {
  const map = [
    {
      purpose: 0,
      text: "For Sale",
    },
    {
      purpose: 1,
      text: "For Rent",
    },
  ];

  return map.find((item) => item.purpose === purpose).text;
};

const typeMapping = (type) => {
  const map = [
    {
      type: 0,
      text: "Motorbike",
    },
    {
      type: 1,
      text: "Car",
    },
    {
      type: 2,
      text: "Others",
    },
  ];

  return map.find((item) => item.type === type).text;
};

const VehicleDetail = (props) => {
  const params = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [vehicle, setVehicle] = useState(null);
  const [open, setOpen] = useState(false);
  const [stepOneLoading, setStepOneLoading] = useState(false);
  const [stepTwoLoading, setStepTwoLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    void (async function getVehicleDetail() {
      try {
        const resp = await VehicleService.getDetail(params.vehicleId);
        setVehicle(resp);
      } catch (e) {
        dispatch(errorMessage({ message: e }));
      }
    })();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleVerifyOtp = async () => {
    try {
      setStepTwoLoading(true);
      const resp = await PaymentService.verifyOTP(otp, formik.values.email);
      if (resp.status) {
        window.location.replace(resp.data.paymentUrl);
      } else {
        setStep(1);
        dispatch(errorMessage({ message: resp.message }));
      }
      setStepTwoLoading(false);
    } catch (e) {
      dispatch(errorMessage({ message: e }));
    }
  };

  const stepOneSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name is too short (3-50 characters)")
      .max(50, "Name is too long (3-50 characters)")
      .required("Name is required"),
    citizen_identification: Yup.string().required(
      "Citizen Identification is required"
    ),
    address: Yup.string()
      .min(3, "Address is too short (3-50 characters)")
      .max(50, "Address is too long (3-50 characters)")
      .required("Address is required"),
    email: Yup.string().email().required("Email is required"),
    phone: Yup.number("Phone must be number").required(
      "Phone number is required"
    ),
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formik = useFormik({
    initialValues: {
      name: "",
      citizen_identification: "",
      address: "",
      email: "",
      phone: "",
    },
    validationSchema: stepOneSchema,
    onSubmit: async (values) => {
      try {
        setStepOneLoading(true);
        const resp = await PaymentService.getOTP({
          ...formik.values,
          vehicleId: params.vehicleId,
          birthday: "1649841554",
        });
        if (resp) {
          setStep(2);
        } else {
          dispatch(errorMessage({ message: "Invalid payment information" }));
        }
        setStepOneLoading(false);
      } catch (e) {
        dispatch(errorMessage({ message: e }));
      }
    },
  });

  return (
    vehicle && (
      <Box className={classes.container}>
        <Grid container justifyContent="flex-start" spacing={3}>
          <Grid key={"Image"} item xs={6}>
            <img
              src={vehicle.image_url[0]}
              alt={"image-product"}
              className={classes.image}
            />
          </Grid>
          <Grid key={"Info"} item xs={6}>
            <Paper className={classes.paper}>
              <h1>{vehicle.name}</h1>
              <p>{vehicle.description}</p>
              <Box mb={1}>
                <span>Price: </span>
                <span className={classes.bold}>{vehicle.price} VND</span>
              </Box>
              <Box mb={1}>
                <span>License plates: </span>
                <span className={classes.bold}>{vehicle.license_plates}</span>
              </Box>
              <Box mb={1}>
                <span>Status: </span>
                <span className={classes.bold}>{vehicle.status}</span>
              </Box>
              <Box mb={1}>
                <span>Purpose: </span>
                <span className={classes.bold}>
                  {purposeMapping(vehicle.purpose)}
                </span>
              </Box>
              <Box mb={1}>
                <span>Type: </span>
                <span className={classes.bold}>
                  {typeMapping(vehicle.type)}
                </span>
              </Box>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpen}
                >
                  Pay
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paperModal}>
              {step === 1 && (
                <>
                  <h3>Billing Information</h3>
                  <form
                    onSubmit={formik.handleSubmit}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      margin="normal"
                    />

                    <TextField
                      fullWidth
                      id="citizen_identification"
                      name="citizen_identification"
                      label="Citizen Identification"
                      value={formik.values.citizen_identification}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.citizen_identification &&
                        Boolean(formik.errors.citizen_identification)
                      }
                      helperText={
                        formik.touched.citizen_identification &&
                        formik.errors.citizen_identification
                      }
                      margin="normal"
                    />

                    <TextField
                      fullWidth
                      id="address"
                      name="address"
                      label="Address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.address && Boolean(formik.errors.address)
                      }
                      helperText={
                        formik.touched.address && formik.errors.address
                      }
                      margin="normal"
                    />

                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                      margin="normal"
                    />

                    <TextField
                      fullWidth
                      id="phone"
                      name="phone"
                      label="Phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.phone && Boolean(formik.errors.phone)
                      }
                      helperText={formik.touched.phone && formik.errors.phone}
                      margin="normal"
                    />

                    <Button variant="contained" color="primary" type="submit">
                      {stepOneLoading ? "Validating..." : "Validate"}
                    </Button>
                  </form>
                </>
              )}
              {step === 2 && (
                <>
                  <h3>OTP Verification</h3>
                  <TextField
                    fullWidth
                    id="otp"
                    name="otp"
                    label="OTP"
                    value={otp}
                    onChange={handleOtpChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    margin="normal"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={handleVerifyOtp}
                  >
                    {stepTwoLoading ? "Verifying..." : "Verify"}
                  </Button>
                </>
              )}
            </div>
          </Fade>
        </Modal>
      </Box>
    )
  );
};

export default VehicleDetail;
