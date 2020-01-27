import React, { Component } from 'react';

export default class Card extends Component {
  render() {
    return (
      <div className={'card'}>
        <img
          className={!this.props.show ? 'hide' : null}
          alt={this.props.alt}
          src={this.props.src}
        />
      </div>
    );
  }
}
