import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

export default function VistaRequisitos(props) {
  var { requisitos } = props;
  var { requisitosSeleccionados } = props;
  const [visible, setVisible] = useState(false);

  /**
   * Verifica si el requisito se encuentra en la lista de requisitos seleccionados.
   * Usado para varias saber si checker el checkbox o determinar si se tiene que añadir o quitar un requisito
   * @param {Requisito} requisitoUsuario
   */
  const verificar = (requisitoUsuario) => {
    if (requisitosSeleccionados.includes(requisitoUsuario)) {
      return true;
    } else {
      return false;
    }
  };
  /**
   * Añade un requisito de usuario a la lista de requisitos seleccionados,
   * junto a los requisitos de sistema asociados
   * @param {Requisito} ru
   */
  const añadir = (ru) => {
    let aux = [...requisitosSeleccionados, ru];

    for (const rs of requisitos)
      if (!rs.isRU && rs.refRU === ru.id)
        aux.push(rs);

    props.setRequisitos(aux);
  };
  /**
   * Quita el requisito de usuario y tambien sus requisitos de sistema asociados de las lista de
   * requisitos seleccionados
   * @param {Requisito} ru
   */
  const quitar = (ru) => {
    let aux = [...requisitosSeleccionados];
    var totalRS = 1;
    const pos = requisitosSeleccionados.indexOf(ru);

    for (const rs of aux)
      if (!rs.isRU && rs.refRU === ru.id)
          totalRS++;

    aux.splice(pos, totalRS);
    props.setRequisitos(aux);
  };

  const lista = requisitos.map((requisito, index) => {
    if (requisito.isRU) {
      return (
        <React.Fragment key={index}>
          <ListItem key={index} button>
            <Checkbox
              inputProps={{ "aria-label": "primary checkb ox" }}
              checked={verificar(requisito)}
              onClick={() => {
                if (verificar(requisito)) {
                  quitar(requisito);
                } else {
                  añadir(requisito);
                }
              }}
            />
            <ListItemText
              primary={
                requisito.isRU && `RU${requisito.id}: ${requisito.nombre}`
              }
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      );
    } else
      return null;
  });

  return (
    <div>
      <React.Fragment>
        <Button onClick={() => setVisible(true)}>Añadir</Button>
        <Drawer
          anchor={"right"}
          open={visible}
          onClose={() => setVisible(false)}
          key={5}
        >
          <List> {lista}</List>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
