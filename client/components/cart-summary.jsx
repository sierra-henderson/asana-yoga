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
        {
          this.props.products.map(product => {
            return <CartSummaryItem key={product.cartItemId} product={product}/>;
          })
        }
        <div className="d-flex justify-content-between">
          <h5 className="cart-total">{`Item Total $${totalPrice}`}</h5>
          <button className="btn btn-primary" onClick={this.props.setView('checkout', {})}>Checkout</button>
        </div>
      </div>
    );
  }
}
