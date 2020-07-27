import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import PropTypes from "prop-types";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return (
    <MuiAlert
      style={{
        width: 150,
        justifyContent: "center",
      }}
      elevation={1}
      variant="filled"
      {...props}
    />
  );
}

const EditorConvertToJSON = (props) => {
  const { content, index, infoDers, setInfoDers } = props;
  const [contentState, setContentState] = useState(null);
  const [activarMensaje, setActivarMensaje] = useState(false);
  let copiaInfoDers = infoDers;

  const onContentStateChange = (content) => {
    setContentState(content);
  };

  useEffect(() => {
    setInterval(handleClose, 5000);
  }, []);

  const onBlur = async () => {
    copiaInfoDers[index].description = contentState; // guarda la nueva información

    // Guarda la información Actualizada en el estado InfoDers del componente Ders.
    await setInfoDers(copiaInfoDers);

    // Guarda la información Actualizada en la variable ders en el localStorage.
    localStorage.setItem("ders", JSON.stringify(copiaInfoDers));
    // activa el mensaje de guardado
    setActivarMensaje(true);
  };

  const handleClose = () => {
    setActivarMensaje(false);
  };

  return (
    <div>
      <Editor
        wrapperClassName="wrapper-class"
        editorClassName="editer-content"
        toolbarClassName="toolbar-class"
        initialContentState={content}
        onContentStateChange={onContentStateChange}
        onBlur={onBlur}
      />
      {activarMensaje ? (
        <div
          style={{
            width: 200,
            height: 10,
            marginLeft: "80%",
            display: "flex",
            alignSelf: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <Alert onClose={handleClose} severity="success">
            Guardado!!
          </Alert>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

EditorConvertToJSON.propTypes = {
  content: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  infoDers: PropTypes.array.isRequired,
  setInfoDers: PropTypes.func.isRequired,
};

export default EditorConvertToJSON;
