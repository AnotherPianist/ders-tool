import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import './tipoRequisitos.css';

export default function CrearTipoReq() {
  return (
    <React.Fragment>
        <Card className='space' variant="outlined">
            <CardContent>
                <Grid container justify='flex-start'>
                    <Grid item xs={12}>
                        <Typography className='heading' color="textSecondary" gutterBottom>
                        Tipos de Requisitos
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className='title' variant="h5" component="h2">
                        Nuevo Tipo de Requisito
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth required className='textInput' id="standard-basic" label="Standard" />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">Crear</Button>
            </CardActions>
        </Card>
    </React.Fragment>
  );
}