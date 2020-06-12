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
        // console.log(data);
      });
  }

  render() {
    return this.state.product
      ? (
        <div className="container">
          <div className="card">
            <p className="text-muted" onClick={() => this.props.setView('catalog', {})}>&lt; Back to Catalog</p>
            <div className="row">
              <div className="col-5">
                <img className="col-12 mb-3" src={this.state.product.image} alt="" />
              </div>
              <div className="col-7">
                <h3 className="card-title">{this.state.product.name}</h3>
                <h5 className="card-text">{`$${(this.state.product.price / 100).toFixed(2)}`}</h5>
                <p className="card-text">{this.state.product.shortDescription}</p>
              </div>
            </div>
            <p className="card-text">{this.state.product.longDescription}</p>
          </div>
        </div>
      )
      : null;
  }
}
