/* eslint-disable no-console, no-unused-vars */

import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        // eslint-disable-next-line no-console
        this.setState({
          products: data
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row row-cols-sm-2 row-cols-md-3 product-container ">
          {
            this.state.products.map(product => {
              return <ProductListItem view={this.props.view} key={product.productId} product={product}/>;
            })
          }
        </div>
      </div>
    );
  }
}
