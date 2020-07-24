import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DescriptionIcon from '@material-ui/icons/Description';
import PersonIcon from '@material-ui/icons/Person';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { Link, withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        marginTop: '3rem',
        color: 'white'
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    white:{
        color: 'white'
    }
}));

export default withRouter(props => {
    const classes = useStyles();
    const [openMenu1, setOpenMenu1] = React.useState(true);
    const [openMenu2, setOpenMenu2] = React.useState(true);
    const [openMenu3, setOpenMenu3] = React.useState(true);

    const handleClickMenu1 = () => {
        setOpenMenu1(!openMenu1);
    };

    const handleClickMenu2 = () => {
        setOpenMenu2(!openMenu2);
    };

    const handleClickMenu3 = () => {
        setOpenMenu3(!openMenu3);
    };

    return (
        <List
            component="nav"
            className={classes.root}>
            {/* Elemento de lista principal */}
            <ListItem button onClick={handleClickMenu1}>
                <ListItemIcon className={classes.white}>
                    <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="DERS" />
                {openMenu1 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            {/*Lista secundaria perteneciente a listItem anterior*/}
            <Collapse in={openMenu1} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {/* Ojo: la función onClick siguiente indica como debe hacerse el routing. El string debe ser igual que la de route en app.js*/}
                    <ListItem button className={classes.nested} onClick={() => { props.history.push("/ders") }}>
                        <ListItemIcon className={classes.white}>
                            {/* Icono */}
                        </ListItemIcon>
                        <ListItemText primary="Placeholder" />
                    </ListItem>
                    {/* Más ListItems */}
                </List>
            </Collapse>
            {/* Elemento de lista principal */}
            <ListItem button onClick={handleClickMenu2}>
                <ListItemIcon className={classes.white}>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Requisitos" />
                {openMenu2 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            {/*Lista secundaria perteneciente a listItem anterior*/}
            <Collapse in={openMenu2} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {/* Ojo: la función onClick siguiente indica como debe hacerse el routing. El string debe ser igual que la de route en app.js*/}
                    <ListItem button className={classes.nested} onClick={() => { props.history.push("/requisitos") }}>
                        <ListItemIcon className={classes.white}>
                            {/* Icono */}
                        </ListItemIcon>
                        <ListItemText primary="Placeholder" />
                    </ListItem>
                    {/* Más ListItems */}
                </List>
            </Collapse>
            {/* Elemento de lista principal */}
            <ListItem button onClick={handleClickMenu3} >
                <ListItemIcon className={classes.white}>
                    <AssessmentIcon />
                </ListItemIcon>
                <ListItemText primary="Tablas y cálculos" />
                {openMenu3 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openMenu3} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {/* Ojo: la función onClick siguiente indica como debe hacerse el routing. El string debe ser igual que la de route en app.js*/}
                    <ListItem button className={classes.nested} onClick={() => { props.history.push("/tablas") }}>
                        <ListItemIcon className={classes.white}>
                            {/* Icono */}
                        </ListItemIcon>
                        <ListItemText primary="Casos de Uso" />
                    </ListItem>
                    {/* Más ListItems */}
                </List>
            </Collapse>
            {/*Lista secundaria perteneciente a listItem anterior*/}
        </List>);
});
