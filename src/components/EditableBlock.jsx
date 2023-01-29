import React, { useRef } from "react";
import ContentEditable from "react-contenteditable";

const EditableBlock = (props) => {
  const text = useRef("");

  const handleChange = (evt) => {
    text.current = evt.target.value;
  };

  const handleBlur = () => {
    console.log(text.current);
  };
  return (
    <ContentEditable
      className="bg-gray-100 outline-none p-3"
      // html={text.current}
      onBlur={handleBlur}
      onChange={handleChange}
      // innerRef={text}
      html={props.html}
      tagName={props.tag}
    />
  );
};

export default EditableBlock;
