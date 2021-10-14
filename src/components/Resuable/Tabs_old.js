import React, { Component } from "react";

class CustomTabs extends Component {
  state = {
    selected: this.props.selected || 2
  };

  handleChange(index) {
    this.setState({ selected: index });
  }

  render() {
    return (
      <>
        <ul className="nav nav-tabs nav-justified mb-3" role="tablist">
          {this.props.children.map((elem, index) => {
            let style = index === this.state.selected ? "selected nav-item" : " nav-item";
            return (
              <li
                key={index}
                className={style}
                onClick={() => this.handleChange(index)}
                role="presentation"
              >
                {elem.props.title}
              </li>
            );
          })}
        </ul>
        <div className="tab">{this.props.children[this.state.selected]}</div>
      </>
    );
  }
}

export default CustomTabs;