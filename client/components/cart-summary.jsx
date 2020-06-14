import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  render() {
    const totalPrice = this.props.products.reduce((acc, cur) => acc + (cur.price / 100));
    if (this.props.products.length === 0) {
      return (
        <div className="container">
          <p className="text-muted" onClick={() => this.props.setView('catalog', {})}>&lt; Back to Catalog</p>
          <h1>My Cart</h1>
          <h3>There are no items in your cart.</h3>
        </div>
      );
    }
    return (
      <div className="container">
        <p className="text-muted" onClick={() => this.props.setView('catalog', {})}>&lt; Back to Catalog</p>
        <h1>My Cart</h1>
        {
          this.props.products.map(product => {
            return <CartSummaryItem key={product.cartItemId} product={product}/>;
          })
        }
        <p>{`Item Total $${totalPrice}`}</p>
      </div>
    );
  }
}
