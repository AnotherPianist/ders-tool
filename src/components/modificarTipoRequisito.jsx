import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import './tipoRequisitos.css';

const requisitos = [
    {
        value: '1',
        label: 'Funcional',
    },
    {
        value: '2',
        label: 'No Funcional',
    },
];

export default function ModificarTipoReq() {
    const [requisito, setRequisitos] = React.useState('1');

    const handleChange = (event) => {
        setRequisitos(event.target.value);
    };

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
                            Modificar Tipo de Requisito
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth required className='textInput' id="standard-basic" label="Standard" />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField id="select-requisitos" select label="Seleccionar" value={requisito} onChange={handleChange}>
                            {requisitos.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">Modificar</Button>
                </CardActions>
            </Card>
        </React.Fragment>
    );
}