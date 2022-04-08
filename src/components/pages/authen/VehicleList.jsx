import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import VehiclesService from "../../../api/vehicle.service";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 180,
    objectFit: "cover",
    objectPosition: "center",
  },
});

const VehicleList = () => {
  const [vehiclesList, setVehiclesList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    void (async function getListVehicles() {
      const resp = await VehiclesService.getListVehicles();
      setVehiclesList(resp);
    })();
  }, []);

  const VehicleCard = (vehicle) => {
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={
              vehicle.image_url[0] ||
              "https://i.ytimg.com/vi/hxoM4GA-9UQ/maxresdefault.jpg"
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
    <Grid container justifyContent="center" spacing={3}>
      {vehiclesList.map((vehicle) => (
        <Grid key={vehicle._id} item xs={3}>
          {VehicleCard(vehicle)}
        </Grid>
      ))}
    </Grid>
  );
};

export default VehicleList;
