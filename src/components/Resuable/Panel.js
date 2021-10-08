import React from "react";

export default function CustomPanel(props) {
  return <div className="nav nav-tabs nav-justified mb-3">{props.children}</div>;
}