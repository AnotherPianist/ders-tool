import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './requisitos.css';

export default function crearRequisito() 
{
  return (
    <React.Fragment>
        <Grid component="label" container alignItems="center" spacing = {2}>
            <Grid item>
                <IconButton aria-label="add" className = "margin">
                    <AddCircleOutlineIcon />
                </IconButton>
            </Grid>
            <Grid item xs>
                <TextField fullWidth required label="Nuevo requisito de usuario" />
            </Grid>
                <Grid item> 
                { 
                    <div className = "margin"> 
                        Funcional <Switch size="small"/>
                    </div>
                }
            </Grid>                
        </Grid>
    </React.Fragment>
  );
}