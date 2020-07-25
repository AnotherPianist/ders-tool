import React from "react";
import { FixedSizeList } from "react-window";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

/* Este componente tiene la lista de requisitos que se pueden agregar al canvas 
para ser representados como casos de uso*/

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    maxWidth: 235,
    backgroundColor: theme.palette.background.paper,
  },
}));

function renderRow(props) {
  const { index, style } = props;
  let { text } = props;
  text = "Requisito de sistema funcional para ser agregado en el canvas";
  return (
    <ListItem button style={style} key={index}>
      <ListItemText primary={`RS ${index + 1}: ${text}`} />
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

export default function ListaRequisitos(prop) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FixedSizeList height={300} width={235} itemSize={100} itemCount={20}>
        {renderRow}
      </FixedSizeList>
    </div>
  );
}
