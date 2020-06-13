import React from 'react';

export default class CartSummaryItem extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="container">
          <div className="row">
            <div className="col-5">
              <img className="col-12 mb-3" src={this.props.product.image} alt="" />
            </div>
            <div className="col-7">
              <h3 className="card-title">{this.props.product.name}</h3>
              <h5 className="card-text">{`$${(this.props.product.price / 100).toFixed(2)}`}</h5>
              <p className="card-text">{this.props.product.shortDescription}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
