import React from 'react';

export default class Header extends React.Component {
  render() {
    const cartHeaderText = this.props.cartNumber !== 1 ? `${this.props.cartNumber} Items` : `${this.props.cartNumber} Item`;
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="container d-flex align-items-center">
          <a className="navbar-brand" href="#">
            <i className="fas fa-dollar-sign mr-1"></i>
              Wicked Sales
          </a>
          <div className="row text-white">
            {cartHeaderText}
            <i className="fas fa-shopping-cart fa-lg text-white ml-2" onClick={() => this.props.setView('cart', {})}></i>
          </div>
        </div>
      </nav>
    );
  }
}
