import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";

const TabPanel = (props) => {
  const { children, value, index, length, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          {index !== length ? children : <div>Agrega Nuevas Pestañas...</div>}
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
