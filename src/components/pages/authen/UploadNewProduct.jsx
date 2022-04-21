import * as Yup from "yup";
import { useFormik } from "formik";
import { errorMessage, successMessage } from "../../../slices/messageSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import VehicleService from "../../../api/vehicle.service";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  ImageList,
  ImageListItem,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles({
  formControl: {},
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

  cardActions: {
    padding: 16,
  },

  list: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  imageList: {
    width: 500,
    height: 250,
  },
  imageItem: {
    width: "100%",
    objectFit: "cover",
    objectPosition: "center",
  },
});

const UploadNewProduct = () => {
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState('');
  const dispatch = useDispatch();

  const classes = useStyles();

  const newProductSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Product's name is too short (3-50 characters)")
      .max(50, "Product's name is too long (3-50 characters)")
      .required("Product's name is required"),
    status: Yup.string().required("Product's status is required"),
    purpose: Yup.string().required(""),
    description: Yup.string()
      .min(3, "Product's description is too short (more than 3 characters)")
      .required("Product's description is required"),
    type: Yup.string().required("Product's type is required"),
    price: Yup.number().positive("Invalid price").integer("Invalid price"),
    license_plates: Yup.string().matches("^[0-9]{2}-[A-Z][0-9][0-9]{4,5}$")
  });

  const uploadForm = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const formik = useFormik({
      initialValues: {
        name: "",
        status: "",
        purpose: "",
        description: "",
        type: "",
        price: 0,
        license_plates: ""
      },
      validationSchema: newProductSchema,
      onSubmit: async (values) => {
        try {
          setLoading(true);
          await VehicleService.uploadNewProduct({
            ...values,
            image_url: [imageData],
          });
          dispatch(
            successMessage({ message: "Create new Product successfully!" })
          );
        } catch (e) {
          dispatch(errorMessage({ message: e }));
        }
        setLoading(false);
      },
    });

    return (
      <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
        <div className={classes.list}>
          <ImageList rowHeight={200} className={classes.imageList} cols={3}>
            <ImageListItem key={imageData} cols={3} display={"flex"}>
              <img
                src={imageData}
                className={classes.imageItem}
               alt={'image'}/>
            </ImageListItem>
          </ImageList>
        </div>
        <TextField
          fullWidth
          id="image"
          name="image"
          label="Image"
          value={imageData}
          onChange={(event) => {
            setImageData(event.target.value);
          }}
          margin="normal"
        />

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

        {/* eslint-disable-next-line react/jsx-no-undef */}
        <FormControl
          className={classes.formControl}
          error={formik.touched.status && Boolean(formik.errors.status)}
          fullWidth
          margin="normal"
        >
          <InputLabel id="status-select-error-label">Status</InputLabel>
          <Select
            labelId="status-select-error-label"
            id="status"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"old"}>Old</MenuItem>
            <MenuItem value={"new"}>New</MenuItem>
          </Select>
        </FormControl>

        {/* eslint-disable-next-line react/jsx-no-undef */}
        <FormControl
          className={classes.formControl}
          error={formik.touched.purpose && Boolean(formik.errors.purpose)}
          fullWidth
          margin="normal"
        >
          <InputLabel id="purpose-select-error-label">Purpose</InputLabel>
          <Select
            labelId="purpose-select-error-label"
            id="purpose"
            name="purpose"
            value={formik.values.purpose}
            onChange={formik.handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={0}>Sale</MenuItem>
            <MenuItem value={1}>Rent</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          id="description"
          name="description"
          label="Description"
          multiline
          minRows={10}
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          margin="normal"
        />

        {/* eslint-disable-next-line react/jsx-no-undef */}
        <FormControl
          className={classes.formControl}
          error={formik.touched.type && Boolean(formik.errors.type)}
          fullWidth
          margin="normal"
        >
          <InputLabel id="type-select-error-label">Type</InputLabel>
          <Select
            labelId="type-select-error-label"
            id="type"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={0}>Motorbike</MenuItem>
            <MenuItem value={1}>Car</MenuItem>
            <MenuItem value={2}>Others</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          id="price"
          name="price"
          label="Price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
          margin="normal"
        />

        <TextField
          fullWidth
          id="license_plates"
          name="license_plates"
          label="License Plates"
          value={formik.values.license_plates}
          onChange={formik.handleChange}
          error={
            formik.touched.license_plates &&
            Boolean(formik.errors.license_plates)
          }
          helperText={
            formik.touched.license_plates && formik.errors.license_plates
          }
          margin="normal"
        />

        <Button variant="contained" color="primary" type="submit">
          {loading ? "Creating..." : "Create"}
        </Button>
      </form>
    );
  };

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <Box className={classes.headTitle}>Upload new Product</Box>
        {uploadForm()}
      </CardContent>
    </Card>
  );
};

export default UploadNewProduct;
