import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      category: 0,
      allCategoriesHover: false,
      meditationHover: false,
      propsHover: false,
      matHover: false
    };
    this.getProducts = this.getProducts.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.toggleHoverAllCategories = this.toggleHoverAllCategories.bind(this);
    this.toggleHoverMat = this.toggleHoverMat.bind(this);
    this.toggleHoverMeditation = this.toggleHoverMeditation.bind(this);
    this.toggleHoverProps = this.toggleHoverProps.bind(this);
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

  changeCategory(id) {
    this.setState({
      category: id
    });
  }

  toggleHoverAllCategories() {
    this.setState(state => ({
      allCategoriesHover: !state.allCategoriesHover
    }));
  }

  toggleHoverMat() {
    this.setState(state => ({
      matHover: !state.matHover
    }));
  }

  toggleHoverMeditation() {
    this.setState(state => ({
      meditationHover: !state.meditationHover
    }));
  }

  toggleHoverProps() {
    this.setState(state => ({
      propsHover: !state.propsHover
    }));
  }

  render() {
    const startModal = !this.props.modal ? 'hidden' : '';
    const allCategoriesImage = !this.state.allCategoriesHover ? '/images/all-categories-icon.svg' : '/images/all-categories-icon-hover.svg';
    const matImage = !this.state.matHover ? '/images/mat-icon.svg' : '/images/mat-icon-hover.svg';
    const meditationImage = !this.state.meditationHover ? '/images/meditation-icon.svg' : '/images/meditation-icon-hover.svg';
    const propsImage = !this.state.propsHover ? '/images/props-icon.svg' : '/images/props-icon-hover.svg';
    return (
      <div>
        <div className="hero-image d-flex flex-column align-items-center justify-content-center">
          <div className="container">
            <h1 className="mb-4">Tune into savings</h1>
            <p>Our one stop shop for yoga products allows you spend less time shopping and more time relaxing</p>
          </div>
        </div>
        <div className="container">
          <div className="container">
            <div className="category-container row row-cols-2 row-cols-md-4 m-5">
              <div className="icon-container col-6 col-md-3 d-flex flex-column align-items-center" onClick={() => this.changeCategory(0)}>
                <figure onMouseEnter={this.toggleHoverAllCategories} onMouseLeave={this.toggleHoverAllCategories}>
                  <img src={allCategoriesImage} alt=""/>
                  <figcaption>All</figcaption>
                </figure>
              </div>
              <div className="icon-container col-6 col-md-3 d-flex flex-column align-items-center" onClick={() => this.changeCategory(1)}>
                <figure onMouseEnter={this.toggleHoverMat} onMouseLeave={this.toggleHoverMat}>
                  <img src={matImage} alt=""/>
                  <figcaption>Mat Supplies</figcaption>
                </figure>
              </div>
              <div className="icon-container col-6 col-md-3 d-flex flex-column align-items-center" onClick={() => this.changeCategory(2)}>
                <figure onMouseEnter={this.toggleHoverMeditation} onMouseLeave={this.toggleHoverMeditation}>
                  <img src={meditationImage} alt=""/>
                  <figcaption>Meditation</figcaption>
                </figure>
              </div>
              <div className="icon-container col-6 col-md-3 d-flex flex-column align-items-center" onClick={() => this.changeCategory(3)}>
                <figure onMouseEnter={this.toggleHoverProps} onMouseLeave={this.toggleHoverProps}>
                  <img src={propsImage} alt=""/>
                  <figcaption>Props</figcaption>
                </figure>
              </div>
            </div>
          </div>
          <div className="row row-cols-sm-2 row-cols-md-3 product-container ">
            {
              this.state.products.map(product => {
                if (this.state.category && this.state.category === product.categoryId) {
                  return <ProductListItem view={this.props.view} key={product.productId} product={product} />;
                } else if (this.state.category === 0) {
                  return <ProductListItem view={this.props.view} key={product.productId} product={product} />;
                }
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
