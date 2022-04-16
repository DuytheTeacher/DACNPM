import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  NativeSelect,
  Typography,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import VehiclesService from "../../../api/vehicle.service";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { errorMessage } from "../../../slices/messageSlice";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 180,
    objectFit: "cover",
    objectPosition: "center",
  },
  formControl: {
    marginTop: 16,
    marginBottom: 8,
    marginLeft: 8,
    minWidth: 120,
  },
});

const VehicleList = () => {
  const [vehiclesList, setVehiclesList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [carType, setCarType] = useState(0);

  const classes = useStyles();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();

  useEffect(() => {
    void (async function getListVehicles() {
      const resp = await VehiclesService.getListVehicles();
      setVehiclesList(resp);
    })();
  }, []);

  const handleDateChange = async (date) => {
    try {
      setSelectedDate(date);
      const resp = await VehiclesService.getVehiclesByDate(
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      );
      setVehiclesList(resp);
    } catch (e) {
      dispatch(errorMessage({ message: e }));
    }
  };

  const handleTypeChange = async (event) => {
    const type = event.target.value;
    setCarType(type);
    try {
      if (type === "") {
        const resp = await VehiclesService.getListVehicles();
        setVehiclesList(resp);
      } else {
        const resp = await VehiclesService.getVehiclesByType(type);
        setVehiclesList(resp);
      }
    } catch (e) {
      dispatch(errorMessage({ message: e }));
    }
  };

  const VehicleCard = (vehicle) => {
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={
              vehicle.image_url[0] || "https://source.unsplash.com/HjV_hEECgcM"
            }
            title={vehicle.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {vehicle.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {vehicle.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  };

  return (
    <>
      <Box width={1} display="flex" justifyContent="flex-end" pb={2}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MMM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Filter by date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        <FormControl className={classes.formControl}>
          <InputLabel shrink htmlFor="type-native-label-placeholder">
            Filter by type
          </InputLabel>
          <NativeSelect
            value={carType}
            onChange={handleTypeChange}
            inputProps={{
              name: "type",
              id: "type-native-label-placeholder",
            }}
          >
            <option value="">All</option>
            <option value={0}>Motorbike</option>
            <option value={1}>Car</option>
            <option value={2}>Others</option>
          </NativeSelect>
        </FormControl>
      </Box>
      <Grid container justifyContent="flex-start" spacing={3}>
        {vehiclesList.map((vehicle) => (
          <Grid key={vehicle._id} item xs={3}>
            {VehicleCard(vehicle)}
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default VehicleList;
