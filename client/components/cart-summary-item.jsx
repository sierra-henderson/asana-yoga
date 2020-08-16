import React from 'react';

export default class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem(productId) {
    for (let i = 0; i < this.props.product.cartItemIds.length; i++) {
      this.props.deleteFromCart(this.props.product.cartItemIds[i]);
    }
  }

  render() {
    return (
      <div className="card mt-4 cart-item row">
        <i className="delete fas fa-times" onClick={() => this.deleteItem(this.props.product.productId)}></i>
        <div className="sub-div d-flex flex-column flex-md-row align-items-center">
          <div className="col-12 col-md-5">
            <img className="col-12 mb-3 cart-image contain" src={this.props.product.image} alt="" />
          </div>
          <div className="col-12 col-md-7">
            <h3 className="card-title">{this.props.product.name}</h3>
            <h5 className="card-text text-muted">{`$${(this.props.product.price / 100).toFixed(2)}`}</h5>
            <p className="card-text">{this.props.product.shortDescription}</p>
            <div>Quantity:
              <button className="btn btn-light" onClick={() => this.props.deleteFromCart(this.props.product.cartItemIds[0])}>-</button>
              {this.props.product.count}
              <button className="btn btn-light" onClick={() => this.props.addToCart({ productId: this.props.product.productId })}>+</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
