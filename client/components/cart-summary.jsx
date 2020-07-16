import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  render() {
    const totalPrice = this.props.products.reduce((acc, cur) => acc + (cur.price / 100), 0).toFixed(2);
    if (this.props.products.length === 0) {
      return (
        <div className="container">
          <div className="back-to-shopping" onClick={() => this.props.setView('catalog', {})}>
            <i className="fas fa-angle-left mt-3 mr-2"></i>Back to Shopping
          </div>
          <h1 className="mb-4">My Cart</h1>
          <h3>There are no items in your cart.</h3>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="back-to-shopping" onClick={() => this.props.setView('catalog', {})}>
          <i className="fas fa-angle-left mt-3 mr-2"></i>Back to Shopping
        </div>
        <h1 className="font-weight-bold">My Cart</h1>
        <div className="row">
          <div className="col-12 col-lg-8">
            {
              this.props.products.map(product => {
                return <CartSummaryItem key={product.cartItemId} product={product} />;
              })
            }
          </div>
          <div className="col-12 col-lg-4 mb-3">
            <div className="card p-5 mt-4 text-center">
              <h3 className="font-weight-bold">Item Total</h3>
              <div className="divider mt-2 mb-3"></div>
              <h5 className="cart-total">{`$${totalPrice}`}</h5>
              <button className="btn asana-button mt-2" onClick={() => this.props.setView('checkout', {})}>Checkout</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
