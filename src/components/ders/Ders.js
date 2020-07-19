import React from "react";
import PropTypes from "prop-types";
import EditorConvertToJSON from "./EditorConvertToJSON.js";
import { Grid, Container, Typography } from "@material-ui/core";

const Ders = (props) => {
  return (
    <Container>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="center"
      >
        <Container>
          <Typography component="div" style={{ backgroundColor: "#ffffff" }}>
            <EditorConvertToJSON />
          </Typography>
        </Container>
      </Grid>
    </Container>
  );
};

Ders.propTypes = {};

export default Ders;
