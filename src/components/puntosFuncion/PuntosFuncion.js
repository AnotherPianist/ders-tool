import React from 'react';
import { Typography, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, TextField } from '@material-ui/core'

class PuntosFuncion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entradas: [0, 0, 0, 0, 0],
      salidas: [0, 0, 0, 0, 0],
      consultas: [0, 0, 0, 0, 0],
      ie: [0, 0, 0, 0, 0],
      ali: [0, 0, 0, 0, 0],
      total: 0
    };
  };

  updateEntradas = async (e) => {
    const valoresEntrada = this.state.entradas.slice();
    if (e.target.id === "e-S")
      valoresEntrada[1] = parseInt(e.target.value);
    else if (e.target.id === "e-M")
      valoresEntrada[2] = parseInt(e.target.value);
    else if (e.target.id === "e-Co")
      valoresEntrada[3] = parseInt(e.target.value);
    valoresEntrada[0] = valoresEntrada[1] + valoresEntrada[2] + valoresEntrada[3];
    valoresEntrada[4] = valoresEntrada[1] * 3 + valoresEntrada[2] * 7 + valoresEntrada[3] * 15;
    await this.setState({ entradas: valoresEntrada });
    this.updateTotal();
  }

  updateSalidas = async (e) => {
    const valoresSalida = this.state.salidas.slice();
    if (e.target.id === "s-S")
      valoresSalida[1] = parseInt(e.target.value);
    else if (e.target.id === "s-M")
      valoresSalida[2] = parseInt(e.target.value);
    else if (e.target.id === "s-Co")
      valoresSalida[3] = parseInt(e.target.value);
    valoresSalida[0] = valoresSalida[1] + valoresSalida[2] + valoresSalida[3];
    valoresSalida[4] = valoresSalida[1] * 3 + valoresSalida[2] * 7 + valoresSalida[3] * 15;
    await this.setState({ salidas: valoresSalida });
    this.updateTotal();
  }

  updateConsultas = async (e) => {
    const valoresConsulta = this.state.consultas.slice();
    if (e.target.id === "c-S")
      valoresConsulta[1] = parseInt(e.target.value);
    else if (e.target.id === "c-M")
      valoresConsulta[2] = parseInt(e.target.value);
    else if (e.target.id === "c-Co")
      valoresConsulta[3] = parseInt(e.target.value);
    valoresConsulta[0] = valoresConsulta[1] + valoresConsulta[2] + valoresConsulta[3];
    valoresConsulta[4] = valoresConsulta[1] * 3 + valoresConsulta[2] * 7 + valoresConsulta[3] * 15;
    await this.setState({ consultas: valoresConsulta });
    this.updateTotal();
  }
    
  updateIe = async (e) => {
    const valoresIe = this.state.ie.slice();
    if (e.target.id === "i-S")
      valoresIe[1] = parseInt(e.target.value);
    else if (e.target.id === "i-M")
      valoresIe[2] = parseInt(e.target.value);
    else if (e.target.id === "i-Co")
      valoresIe[3] = parseInt(e.target.value);
    valoresIe[0] = valoresIe[1] + valoresIe[2] + valoresIe[3];
    valoresIe[4] = valoresIe[1] * 3 + valoresIe[2] * 7 + valoresIe[3] * 15;
    await this.setState({ ie: valoresIe });
    this.updateTotal();
  }

  updateAli = async (e) => {
    const valoresAli = this.state.ali.slice();
    if (e.target.id === "a-S")
      valoresAli[1] = parseInt(e.target.value);
    else if (e.target.id === "a-M")
      valoresAli[2] = parseInt(e.target.value);
    else if (e.target.id === "a-Co")
      valoresAli[3] = parseInt(e.target.value);
    valoresAli[0] = valoresAli[1] + valoresAli[2] + valoresAli[3];
    valoresAli[4] = valoresAli[1] * 3 + valoresAli[2] * 7 + valoresAli[3] * 15;
    await this.setState({ ali: valoresAli });
    this.updateTotal();
  }

  updateTotal = async () => {
    await this.setState({total: this.state.entradas[4] + this.state.salidas[4] + this.state.consultas[4] + this.state.ie[4] + this.state.ali[4]});
    this.subirEstado();
  }

  subirEstado = () => {
    const estado = {
      entradas: [this.state.entradas[1], this.state.entradas[2], this.state.entradas[3]],
      salidas: [this.state.salidas[1], this.state.salidas[2], this.state.salidas[3]],
      consultas: [this.state.consultas[1], this.state.consultas[2], this.state.consultas[3]],
      ie: [this.state.ie[1], this.state.ie[2], this.state.ie[3]],
      ali: [this.state.ali[1], this.state.ali[2], this.state.ali[3]],
    };
    this.props.actualizar(estado);
  }

  componentDidMount() {
    let {entradas, salidas, consultas, ie, ali} = this.props.puntos;
    let enct = this.calcularTotalComplejidad(entradas);
    let sact = this.calcularTotalComplejidad(salidas);
    let coct = this.calcularTotalComplejidad(consultas);
    let iect = this.calcularTotalComplejidad(ie);
    let alct = this.calcularTotalComplejidad(ali);
    this.setState({
      entradas: [this.calcularCantidad(entradas), ...entradas, enct],
      salidas: [this.calcularCantidad(salidas), ...this.props.puntos.salidas, sact],
      consultas: [this.calcularCantidad(consultas),  ...this.props.puntos.consultas, coct],
      ie: [this.calcularCantidad(ie), ...this.props.puntos.ie, iect],
      ali: [this.calcularCantidad(ali), ...this.props.puntos.ali, alct],
      total: enct + sact + coct + iect + alct,
    });
    
  }

  calcularCantidad = lista => {
    let suma = 0;
    lista.forEach(i => suma += i);
    return suma;
  }

  calcularTotalComplejidad = lista => {
    return lista[0] * 3 + lista[1] * 7 + lista[2] * 15;
  }
    
  render() {
    return (
      <>
        <Typography variant="h2" style={{margin: "3rem"}}>Puntos de Función</Typography>
        <TableContainer component={Paper} style={{margin: "3rem"}}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Simple</TableCell>
                <TableCell align="right">Media</TableCell>
                <TableCell align="right">Compleja</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Entradas</TableCell>
                <TableCell align="right"><TextField id="e-Ca" type="number" inputProps={{ min: "0" }} value={this.state.entradas[0]}  /></TableCell>
                <TableCell align="right"><TextField id="e-S" type="number" inputProps={{ min: "0" }} onChange={this.updateEntradas} value={this.state.entradas[1]} /></TableCell>
                <TableCell align="right"><TextField id="e-M" type="number" inputProps={{ min: "0" }} onChange={this.updateEntradas} value={this.state.entradas[2]} /></TableCell>
                <TableCell align="right"><TextField id="e-Co" type="number" inputProps={{ min: "0" }} onChange={this.updateEntradas} value={this.state.entradas[3]} /></TableCell>
                <TableCell align="right"><TextField id="e-T" type="number" inputProps={{ min: "0" }}  value={this.state.entradas[4]} /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Salidas</TableCell>
                <TableCell align="right"><TextField id="s-Ca" type="number" inputProps={{ min: "0" }} value={this.state.salidas[0]} /></TableCell>
                <TableCell align="right"><TextField id="s-S" type="number" inputProps={{ min: "0" }} onChange={this.updateSalidas} value={this.state.salidas[1]} /></TableCell>
                <TableCell align="right"><TextField id="s-M" type="number" inputProps={{ min: "0" }} onChange={this.updateSalidas} value={this.state.salidas[2]} /></TableCell>
                <TableCell align="right"><TextField id="s-Co" type="number" inputProps={{ min: "0" }} onChange={this.updateSalidas} value={this.state.salidas[3]} /></TableCell>
                <TableCell align="right"><TextField id="s-T" type="number" inputProps={{ min: "0" }} value={this.state.salidas[4]} /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Consultas</TableCell>
                <TableCell align="right"><TextField id="c-Ca" type="number" inputProps={{ min: "0" }} value={this.state.consultas[0]} /></TableCell>
                <TableCell align="right"><TextField id="c-S" type="number" inputProps={{ min: "0" }} onChange={this.updateConsultas} value={this.state.consultas[1]} /></TableCell>
                <TableCell align="right"><TextField id="c-M" type="number" inputProps={{ min: "0" }} onChange={this.updateConsultas} value={this.state.consultas[2]} /></TableCell>
                <TableCell align="right"><TextField id="c-Co" type="number" inputProps={{ min: "0" }} onChange={this.updateConsultas} value={this.state.consultas[3]} /></TableCell>
                <TableCell align="right"><TextField id="c-T" type="number" inputProps={{ min: "0" }} value={this.state.consultas[4]} /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Interfaces Externas</TableCell>
                <TableCell align="right"><TextField id="i-Ca" type="number" inputProps={{ min: "0" }} value={this.state.ie[0]} /></TableCell>
                <TableCell align="right"><TextField id="i-S" type="number" inputProps={{ min: "0" }} onChange={this.updateIe} value={this.state.ie[1]} /></TableCell>
                <TableCell align="right"><TextField id="i-M" type="number" inputProps={{ min: "0" }} onChange={this.updateIe} value={this.state.ie[2]} /></TableCell>
                <TableCell align="right"><TextField id="i-Co" type="number" inputProps={{ min: "0" }} onChange={this.updateIe} value={this.state.ie[3]} /></TableCell>
                <TableCell align="right"><TextField id="i-T" type="number" inputProps={{ min: "0" }} value={this.state.ie[4]} /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Archivos Lógicos Internos</TableCell>
                <TableCell align="right"><TextField id="a-Ca" type="number" inputProps={{ min: "0" }} value={this.state.ali[0]} /></TableCell>
                <TableCell align="right"><TextField id="a-S" type="number" inputProps={{ min: "0" }} onChange={this.updateAli} value={this.state.ali[1]} /></TableCell>
                <TableCell align="right"><TextField id="a-M" type="number" inputProps={{ min: "0" }} onChange={this.updateAli} value={this.state.ali[2]} /></TableCell>
                <TableCell align="right"><TextField id="a-Co" type="number" inputProps={{ min: "0" }} onChange={this.updateAli} value={this.state.ali[3]} /></TableCell>
                <TableCell align="right"><TextField id="a-T" type="number" inputProps={{ min: "0" }} value={this.state.ali[4]} /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">Total:</TableCell>
                <TableCell align="right"><TextField value={this.state.total}/></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

export default PuntosFuncion;
