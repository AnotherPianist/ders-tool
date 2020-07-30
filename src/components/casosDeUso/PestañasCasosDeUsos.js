import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    borderTop: 100,
    width: "95%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const dataDefault = [
  { title: "caso de uso", id: 1 },
  { title: "Nueva Pestaña", id: "" },
];

export default function PestañasCasosDeUsos(props) {
  const classes = useStyles();
  const [pestanias, setPestanias] = React.useState(dataDefault);
  const [countPestanias, setCountPestanias] = React.useState(1);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    var copiaPestanias = [];
    if (newValue === pestanias.length - 1) {
      pestanias.map((valor, index) =>
        index === pestanias.length - 1
          ? copiaPestanias.push({
              title: "caso de uso",
              id: countPestanias + 1,
            })
          : copiaPestanias.push(valor)
      );
      copiaPestanias.push({ title: "Nueva Pestaña", id: "" });
      setPestanias(copiaPestanias);
      setCountPestanias(countPestanias + 1);
    }
    setValue(newValue);
  };

  const handleClose = (event, indiceTab) => {
    var copiaPestanias = [];
    pestanias.forEach((value, index) => {
      if (index === pestanias.length - 1) {
        copiaPestanias.push({ title: "Nueva Pestaña", id: "" });
      } else if (index !== indiceTab) {
        copiaPestanias.push(value);
      }
    });
    setPestanias(copiaPestanias);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          onDoubleClick={(e) => {
            handleClose(e, value);
          }}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {pestanias.map((pestania, index) => (
            <Tab
              key={pestania.id}
              label={pestania.title + " " + pestania.id}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </AppBar>
      {pestanias.map((pestania, index) => (
        <TabPanel key={pestania.id} value={value} index={index}>
          {pestania.title + " " + pestania.id}
        </TabPanel>
      ))}
    </div>
  );
}
