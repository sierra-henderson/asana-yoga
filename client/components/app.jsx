import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  setView(name, params) {
    this.setState({
      view: {
        name,
        params
      }
    });
  }

  render() {
    const listOrDetails = this.state.view.name === 'catalog' ? <ProductList view={this.setView} /> : <ProductDetails params={this.state.view.params} setView={this.setView}/>;
    return (
      <div>
        <Header />
        {listOrDetails}
      </div>
    );
  }
}
