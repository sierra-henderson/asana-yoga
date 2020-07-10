import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  render() {
    const totalPrice = this.props.products.reduce((acc, cur) => acc + (cur.price / 100), 0);
    if (this.props.products.length === 0) {
      return (
        <div className="container">
          <p className="text-muted mt-4" onClick={() => this.props.setView('catalog', {})}>&lt; Back to Catalog</p>
          <h1 className="mb-4">My Cart</h1>
          <h3>There are no items in your cart.</h3>
        </div>
      );
    }
    return (
      <div className="container">
        <p className="text-muted mt-4" onClick={() => this.props.setView('catalog', {})}>&lt; Back to Catalog</p>
        <h1>My Cart</h1>
        <div className="row">
          <div className="col-8">
            {
              this.props.products.map(product => {
                return <CartSummaryItem key={product.cartItemId} product={product} />;
              })
            }
          </div>
          <div className="col-4">
            <div className="card p-5 mt-4 text-center">
              <h3>Item Total</h3>
              <div className="divider mt-2 mb-3"></div>
              <h5 className="cart-total">{`$${totalPrice}`}</h5>
              <button className="btn asana-button text-white mt-2" onClick={() => this.props.setView('checkout', {})}>Checkout</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
