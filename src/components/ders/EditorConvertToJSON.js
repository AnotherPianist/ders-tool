import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import PropTypes from "prop-types";
import MuiAlert from "@material-ui/lab/Alert";
import "./editor.css";

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
    setInterval(handleClose, 10000);
  }, []);

  const onBlur = async () => {
    copiaInfoDers[index].description = contentState; // guarda la nueva información

    // Guarda la información Actualizada en el estado InfoDers del componente Ders.
    await setInfoDers(copiaInfoDers);

    // activa el mensaje de guardado
    setActivarMensaje(true);
  };

  const handleClose = () => {
    setActivarMensaje(false);
  };

  return (
    <div>
      <Editor
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        toolbarClassName="toolbar-class"
        initialContentState={content ? content : contentDefault}
        onContentStateChange={onContentStateChange}
        onBlur={onBlur}
      />
      {activarMensaje ? (
        <div>
          <Alert onClose={handleClose} severity="success">Guardado</Alert>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

EditorConvertToJSON.propTypes = {
  content: PropTypes.object,
  index: PropTypes.number.isRequired,
  infoDers: PropTypes.array.isRequired,
  setInfoDers: PropTypes.func.isRequired,
};

export default EditorConvertToJSON;

const contentDefault = {
  entityMap: {},
  blocks: [
    {
      key: "637gr",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};
