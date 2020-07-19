import React, { useState } from "react";
import { convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import PropTypes from "prop-types";

const EditorConvertToJSON = (props) => {
  const { content } = props;
  const [contentState, setContentState] = useState(convertFromRaw(content));

  const onContentStateChange = (content) => {
    setContentState(content);
  };

  return (
    <div>
      <Editor
        wrapperClassName="wrapper-class"
        editorClassName="editer-content"
        toolbarClassName="toolbar-class"
        initialContentState={content}
        onContentStateChange={onContentStateChange}
      />
      {/*<textarea disabled value={JSON.stringify(contentState, null, 4)} />*/}
    </div>
  );
};

EditorConvertToJSON.propTypes = {};

export default EditorConvertToJSON;

const contentDefault = {
  entityMap: {},
  blocks: [
    {
      key: "637gr",
      text: "Initialized from content state.",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};
