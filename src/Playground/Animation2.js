import React from "react";
import ReactDOM from "react-dom";
// import PropTypes from "prop-types";
import { Transition } from "react-sequencer";
// import styled from "styled-components";
import "./animation2.css";

const inSteps = [
  ["initial", 0],
  ["zoom-in-start", 400],
  ["zoom-in-active", 400],
  ["in", 400]
];

const outSteps = [
  ["zoom-out-start", 0],
  ["zoom-out-active", 400],
  ["collapse-active", 400],
  ["collapsed", 400],
  ["out", 400]
];

const Zoom = props => (
  <Transition inSteps={inSteps} outSteps={outSteps} in={props.in} unmountOnExit>
    {current => <div className={"zoom " + current}>{props.children}</div>}
  </Transition>
);

class Item extends React.Component {
  remove = () => {
    this.props.onRemove(this.props.item.key);
  };
  render() {
    return (
      <div className="tab" onClick={this.remove}>
        {this.props.item.key} Click to remove
      </div>
    );
  }
}

class ContentZoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{ key: 1 }, { key: 2 }, { key: 3 }]
    };
  }

  handleRemove = key => {
    const removed = this.state.items.find(item => item.key === key);
    if (removed) {
      removed.collapsed = true;
      this.setState({
        items: this.state.items
      });
    }
  };

  render() {
    const { items } = this.state;
    return (
      <div>
        <div className="wrapper">
          {items.map(item => (
            <Zoom key={item.key} in={!item.collapsed}>
              <Item item={item} onRemove={this.handleRemove} />
            </Zoom>
          ))}
        </div>
        Under content
      </div>
    );
  }
}

const Anim = props => <ContentZoom/>;

export default Anim;
