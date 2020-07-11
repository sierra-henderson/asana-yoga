import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.params.productId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          product: data
        });
      });
  }

  render() {
    return this.state.product
      ? (
        <div className="container">
          <div className="card product-detail-card">
            <p className="text-muted mb-4" onClick={() => this.props.setView('catalog', {})}>&lt; Back to Catalog</p>
            <div className="row">
              <div className="col-12 col-md-5">
                <img className="col-12 mb-3" src={this.state.product.image} alt="" />
              </div>
              <div className="col-12 col-md-7">
                <h3 className="card-title">{this.state.product.name}</h3>
                <h5 className="card-text">{`$${(this.state.product.price / 100).toFixed(2)}`}</h5>
                <p className="card-text">{this.state.product.longDescription}</p>
                <button className="btn asana-button" onClick={() => this.props.addToCart(this.state.product)}>Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      )
      : null;
  }
}
