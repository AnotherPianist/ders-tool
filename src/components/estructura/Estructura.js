import React from "react";
import PropTypes from "prop-types";
import {
  Toolbar,
  AppBar,
  IconButton,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  TextField,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DescriptionIcon from "@material-ui/icons/Description";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import ViewListIcon from "@material-ui/icons/ViewList";
import TableChartIcon from "@material-ui/icons/TableChart";
import TimelineIcon from "@material-ui/icons/Timeline";
import AssessmentIcon from "@material-ui/icons/Assessment";
import TuneIcon from "@material-ui/icons/Tune";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  drawerPaper: {
    background: "linear-gradient(#4e73df 10%, #224abe)",
  },
  whiteIcons: {
    color: "white",
  },
});

class Estructura extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreProyecto: this.props.nombreProyecto,
      isDrawerOpen: false,
      anchorArchivo: null,
      anchorEditar: null,
    };
  }

  toggleDrawer = () => {
    this.setState((prevState) => ({ isDrawerOpen: !prevState.isDrawerOpen }));
  };

  editarNombre = (e) => {
    this.setState({nombreProyecto: e.target.value})
    this.props.actualizarNombreProyecto(e.target.value);
  };

  openArchivo = (e) => {
    this.setState({ anchorArchivo: e.currentTarget });
  };

  closeArchivo = () => {
    this.setState({ anchorArchivo: null });
  };

  openEditar = (e) => {
    this.setState({ anchorEditar: e.currentTarget });
  };

  closeEditar = () => {
    this.setState({ anchorEditar: null });
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <AppBar position="fixed" color="default">
          <Toolbar>
            <IconButton onClick={this.toggleDrawer} style={{ padding: "1rem" }}>
              <MenuIcon />
            </IconButton>
            <TextField
              id="nombreProyecto"
              placeholder="Nombre del proyecto"
              style={{ padding: "1rem" }}
              value={this.props.nombreProyecto}
              onChange={this.editarNombre}
              error={this.state.nombreProyecto === ""}
              helperText={this.state.nombreProyecto === "" ? "Nombre vacío" : ""}
            />
            <Button onClick={this.openArchivo} style={{ padding: "1rem" }}>
              Archivo
            </Button>
            <Menu
              open={Boolean(this.state.anchorArchivo)}
              onClose={this.closeArchivo}
              anchorEl={this.state.anchorArchivo}
            >
              <MenuItem onClick={this.closeArchivo}>Abrir</MenuItem>
              <MenuItem onClick={this.closeArchivo}>Guardar</MenuItem>
            </Menu>
            <Button onClick={this.openEditar} style={{ padding: "1rem" }}>
              Editar
            </Button>
            <Menu
              open={Boolean(this.state.anchorEditar)}
              onClose={this.closeEditar}
              anchorEl={this.state.anchorEditar}
            >
              <MenuItem
                onClick={this.closeEditar}
                component={Link}
                to="/ajustes"
              >
                Ajustes
              </MenuItem>
            </Menu>
            <Button style={{padding: "1rem"}} component={Link} to="/previsualizar">Previsualizar</Button>
          </Toolbar>
        </AppBar>
        <Drawer
          classes={{ paper: classes.drawerPaper }}
          anchor="left"
          open={this.state.isDrawerOpen}
          onClose={this.toggleDrawer}
        >
          <div
            style={{
              display: "flex",
              padding: "10px",
              justifyContent: "flex-end",
            }}
          >
            <IconButton onClick={this.toggleDrawer} style={{ color: "white" }}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Typography
            variant="h6"
            align="left"
            style={{ padding: "1rem", color: "white" }}
          >
            Documento
          </Typography>
          <List>
            <ListItem
              button
              className={classes.whiteIcons}
              component={Link}
              to="/ders"
              onClick={this.toggleDrawer}
            >
              <ListItemIcon className={classes.whiteIcons}>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="Campos de DERS" />
            </ListItem>
          </List>
          <Divider />
          <Typography
            variant="h6"
            align="left"
            style={{ padding: "1rem", color: "white" }}
          >
            Requisitos
          </Typography>
          <List>
            <ListItem
              button
              className={classes.whiteIcons}
              component={Link}
              to="/requisitos"
              onClick={this.toggleDrawer}
            >
              <ListItemIcon className={classes.whiteIcons}>
                <ViewListIcon />
              </ListItemIcon>
              <ListItemText primary="Lista de Requisitos" />
            </ListItem>
            <ListItem
              button
              className={classes.whiteIcons}
              onClick={this.toggleDrawer}
            >
              <ListItemIcon className={classes.whiteIcons}>
                <TableChartIcon />
              </ListItemIcon>
              <ListItemText primary="Tarjetas de Volere" />
            </ListItem>
            <ListItem
              button
              className={classes.whiteIcons}
              component={Link}
              to="/casos"
              onClick={this.toggleDrawer}
            >
              <ListItemIcon className={classes.whiteIcons}>
                <AccessibilityIcon />
              </ListItemIcon>
              <ListItemText primary="Casos de Uso" />
            </ListItem>
          </List>
          <Divider />
          <Typography
            variant="h6"
            align="left"
            style={{ padding: "1rem", color: "white" }}
          >
            Cálculos
          </Typography>
          <List>
            <ListItem
              button
              className={classes.whiteIcons}
              onClick={this.toggleDrawer}
            >
              <ListItemIcon className={classes.whiteIcons}>
                <TuneIcon />
              </ListItemIcon>
              <ListItemText primary="Ajuste Ambiental" />
            </ListItem>
            <ListItem
              button
              className={classes.whiteIcons}
              onClick={this.toggleDrawer}
              component={Link}
              to="/puntosFuncion"
            >
              <ListItemIcon className={classes.whiteIcons}>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="Puntos de Función" />
            </ListItem>
            <ListItem
              button
              className={classes.whiteIcons}
              component={Link}
              to="/analisisRepago"
              onClick={this.toggleDrawer}
            >
              <ListItemIcon className={classes.whiteIcons}>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText primary="Análisis de Repago" />
            </ListItem>
          </List>
        </Drawer>
      </>
    );
  }
}

Estructura.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Estructura);
