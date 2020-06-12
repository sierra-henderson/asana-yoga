import React from 'react';

export default class ProductListItem extends React.Component {
  render() {
    return (
      <div className="col-4 mb-4">
        <div className="card h-100">
          <img src={this.props.product.image} className="card-img-top contain same-height" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{this.props.product.name}</h5>
            <p className="card-text text-muted">{`$${(this.props.product.price / 100).toFixed(2)}`}</p>
            <p className="card-text">{this.props.product.shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}
