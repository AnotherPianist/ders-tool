import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Select from '@material-ui/core/Select';
import './requisitos.css';

class verRequisito extends React.Component 
{
    render()
    {
        console.log(this.props.id);
        return (
        <React.Fragment>
            <Grid component="label" container alignItems="center" spacing = {2}>
                <Grid item xs={1}>
                    <TextField fullWidth label="id" value={this.props.requisito.id} disabled = "disabled"/>
                </Grid>
                <Grid item xs>
                    <TextField fullWidth  label="Requisito de usuario" value={this.props.requisito.requisitoNombre} disabled = "disabled" />
                </Grid>
                <Grid item> 
                    <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={this.props.requisito.tipo}
                        disabled = "disabled"
                        >
                        <MenuItem value="None"><em>None</em></MenuItem>
                        <MenuItem value={"Funcional"}>Funcional</MenuItem>
                        <MenuItem value={"No Funcional"}>No Funcional</MenuItem>
                    </Select>
                </Grid>                
            </Grid>
        </React.Fragment>
        );
    }
} export default verRequisito