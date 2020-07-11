import React from 'react';

export default class Header extends React.Component {
  render() {
    const cartHeaderText = this.props.cartNumber !== 1 ? `${this.props.cartNumber} Items` : `${this.props.cartNumber} Item`;
    return (
      <nav className="navbar navbar-dark nav-custom-color">
        <div className="container d-flex align-items-center">
          <a className="navbar-brand" href="#" onClick={() => this.props.setView('catalog', {})}>
            <img className="logo mr-2 mb-1" src="/images/asana-yoga.svg" alt=""/>
              Asana Yoga
          </a>
          <div className="cart-header row text-white d-flex align-items-center" onClick={() => this.props.setView('cart', {})}>
            {cartHeaderText}
            <i className="fas fa-shopping-cart fa-lg text-white ml-2"></i>
          </div>
        </div>
      </nav>
    );
  }
}
