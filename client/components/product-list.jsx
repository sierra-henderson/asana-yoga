/* eslint-disable no-console, no-unused-vars */

import React from 'react';
import { response } from 'express';

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
        console.log(data);
      });
  }
}
