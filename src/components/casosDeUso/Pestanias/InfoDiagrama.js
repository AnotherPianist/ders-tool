import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 55,
  },
});

export default function InfoDiagrama(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea
        disabled={props.diagrama.activo ? true : false}
        onClick={(e) => props.cargarDiagrama(props.diagrama, props.index)}
      >
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title={props.diagrama.nombre}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.diagrama.nombre}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          disabled={true} //props.diagrama.activo ? true : false}
          size="small"
          color="primary"
        >
          Cambiar nombre
        </Button>
        <Button
          disabled={props.diagrama.activo ? true : false}
          onClick={(e) => props.eliminar(props.index)}
          size="small"
          color="primary"
        >
          Eliminar
        </Button>
      </CardActions>
    </Card>
  );
}
