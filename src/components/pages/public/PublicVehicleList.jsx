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
import { useEffect, useState } from "react";
import VehiclesService from "../../../api/vehicle.service";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles({
  card: {
    maxWidth: 320,
    marginLeft: "auto",
    marginRight: "auto",
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
  container: {
    paddingTop: 80,
    paddingBottom: 80,
  },
  desc: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: "ellipsis"
  },
});

const PublicVehicleList = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [vehiclesList, setVehiclesList] = useState([]);

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
            component={"img"}
            className={classes.media}
            src={
              vehicle.image_url[0] || "https://source.unsplash.com/HjV_hEECgcM"
            }
            onLoad={() => URL.revokeObjectURL(vehicle.image_url[0])}
            title={vehicle.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {vehicle.name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.desc}
            >
              {vehicle.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={() => navigate(`./${vehicle._id}`)}>
            Detail
          </Button>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Card>
    );
  };

  return (
    <div className={classes.container}>
      <Grid container justifyContent="flex-start" spacing={3}>
        {vehiclesList.map((vehicle) => (
          <Grid key={vehicle._id} item xs={3}>
            {VehicleCard(vehicle)}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PublicVehicleList;
