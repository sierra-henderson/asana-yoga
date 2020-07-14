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
        this.setState({
          products: data
        });
      });
  }

  render() {
    const startModal = !this.props.modal ? 'hidden' : '';
    return (
      <div>
        <div className="hero-image d-flex flex-column align-items-center justify-content-center">
          <div className="container">
            <h1 className="mb-4">Tune into savings</h1>
            <p>Our one stop shop for yoga products allows you spend less time shopping and more time relaxing</p>
          </div>
        </div>
        <div className="container">
          <div className="row row-cols-sm-2 row-cols-md-3 product-container ">
            {
              this.state.products.map(product => {
                return <ProductListItem view={this.props.view} key={product.productId} product={product} />;
              })
            }
          </div>
        </div>
        <div className={`modal-overlay ${startModal}`}>
          <div className="card modal-content text-center">
            <h5 className="font-weight-bold">Welcome to Asana Yoga</h5>
            <p>Asana Yoga is a full-stack content managemnet app created for demonstration purposes. By clicking the button below, you are acknowledging that the merchandise displayed is not available for purchase and therefore no real contact or credit card information should be used in this app.</p>
            <button className="btn asana-button" onClick={this.props.changeModal}>Accept</button>
          </div>
        </div>
      </div>

    );
  }
}
