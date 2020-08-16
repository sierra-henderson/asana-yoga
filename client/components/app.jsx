import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: [],
      modal: true
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.changeModal = this.changeModal.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
    this.getCartItems();
  }

  setView(name, params) {
    if (name === 'catalog') {
      this.setState({
        view: {
          name,
          params
        }
      }, this.changeModal);
    } else {
      this.setState({
        view: {
          name,
          params
        }
      });
    }
  }

  changeModal() {
    this.setState({
      modal: false
    });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => {
        this.setState({
          cart: data
        });
      });
  }

  addToCart(product) {
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(data => {
        if (this.state.cart.some(el => el.productId === product.productId)) {
          let index = null;
          for (let i = 0; i < this.state.cart.length; i++) {
            if (this.state.cart[i].productId === product.productId) {
              index = i;
              break;
            }
          }
          if (index > -1) {
            const cart = [...this.state.cart];
            const cartItem = { ...cart[index] };
            cartItem.count++;
            cartItem.cartItemIds.push(data.cartItemId);
            cart[index] = cartItem;
            this.setState({
              cart
            });
          }
        } else {
          data.count = 1;
          data.cartItemIds = [data.cartItemId];
          delete data.cartItemId;
          this.setState({
            cart: this.state.cart.concat([data])
          });
        }
      });
  }

  deleteFromCart(cartItemId) {
    const obj = {
      cartItemId
    };
    fetch('/api/cart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
      .then(response => response.json())
      .then(data => {
        let index = null;
        for (let i = 0; i < this.state.cart.length; i++) {
          if (this.state.cart[i].productId === data.productId) {
            index = i;
            break;
          }
        }
        if (this.state.cart[index].count > 1) {
          const cart = [...this.state.cart];
          const cartItem = { ...cart[index] };
          const cartItemIndex = cartItem.cartItemIds.indexOf(cartItemId);
          cartItem.cartItemIds.splice(cartItemIndex, 1);
          cartItem.count--;
          cart[index] = cartItem;
          this.setState({
            cart
          });
        } else {
          this.setState(state => ({
            cart: state.cart.filter(el => el.productId !== data.productId)
          }));
        }
      });
  }

  placeOrder(order) {
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          cart: []
        }, () => this.setView('catalog', {}));

      });
  }

  render() {
    const viewSwitch = this.state.view.name === 'catalog'
      ? <ProductList view={this.setView} modal={this.state.modal} changeModal={this.changeModal}/>
      : this.state.view.name === 'cart'
        ? <CartSummary products={this.state.cart} addToCart={this.addToCart} deleteFromCart={this.deleteFromCart} setView={this.setView}/>
        : this.state.view.name === 'checkout'
          ? <CheckoutForm products={this.state.cart} placeOrder={this.placeOrder} setView={this.setView}/>
          : <ProductDetails addToCart={this.addToCart} params={this.state.view.params} setView={this.setView}/>;
    return (
      <div>
        <Header cartNumber={this.state.cart.reduce((acc, cur) => acc + parseInt(cur.count), 0)} setView={this.setView}/>
        {viewSwitch}
      </div>
    );
  }
}
