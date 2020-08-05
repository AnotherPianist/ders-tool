import React, { Fragment } from "react";

import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
} from "@material-ui/core";

class ListaRequisitos extends React.Component {
  render() {
    const requisitos = this.props.requisitos.map((req) => {
      return (
        <Fragment key={req}>
          <ListItem onClick={() => this.props.onClickRequisito({ req })} button>
            <ListItemText
              primary={req.isRU ? `RU${req.id} ${req.nombre}` : ""}
              secondary={req.isRU ? "" : `RS${req.id} ${req.nombre}`}
            />
          </ListItem>
          <Divider />
        </Fragment>
      );
    });

    return (
      <Paper
        style={{
          maxHeight: 155,
          minHeight: 155,
          minWidth: 235,
          maxWidth: 235,
          overflow: "auto",
        }}
      >
        <List>{requisitos}</List>
      </Paper>
    );
  }
}

export default ListaRequisitos;
