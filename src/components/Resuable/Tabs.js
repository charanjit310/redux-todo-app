import React, { useState } from "react";

function CustomTabs(props) {
  const [selected, setSelected] = useState(props.selected || 0)
  const handleChange = (index) => {
    setSelected(index);
  }

  return (
    <>
      <ul className="nav nav-tabs nav-justified mb-3" role="tablist">
        {props.children.map((elem, index) => {
          let style = index === selected ? "selected nav-item" : " nav-item";
          return (
            <li
              key={index}
              className={style}
              onClick={() => handleChange(index)}
              role="presentation"
            >
              {elem.props.title}
            </li>
          );
        })}
      </ul>
      <div className="tab">{props.children[selected]}</div>
    </>
  )
}

export default CustomTabs;