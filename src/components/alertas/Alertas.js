import React from "react";

import { toast } from "react-toastify";

import "../alertas/ReactToastify.css";

const configAlert = {
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
};
/**
 * Despliega una alerta de tipo error
 * @param description texto que se mostrara dentro de la alerta
 */
export default function AlertaError(description) {
  toast.error(description, configAlert);
}
/**
 * Despliega una alerta de tipo sucess
 * @param description texto que se mostrara dentro de la alerta
 */
export function AlertaSucess(description) {
  toast.success(description, configAlert);
}
/**
 * Despliega una alerta de tipo informacion
 * @param description texto que se mostrara dentro de la alerta
 */
export function AlertaInfo(description) {
  toast.info(description, configAlert);
}
/**
 * Despliega una alerta de tipo advertencia
 * @param description texto que se mostrara dentro de la alerta
 */
export function AlertaWarning(description) {
  toast.warning(description, configAlert);
}
