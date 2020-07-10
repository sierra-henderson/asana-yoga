import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: '',
      creditCardValue: '',
      shippingAddressValue: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCreditCardChange = this.handleCreditCardChange.bind(this);
    this.handleShippingAddressChange = this.handleShippingAddressChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(callback) {
    event.preventDefault();
    const obj = {
      name: this.state.nameValue,
      creditCard: this.state.creditCardValue,
      shippingAddress: this.state.shippingAddressValue
    };
    callback(obj);
  }

  handleNameChange(event) {
    this.setState({
      nameValue: event.target.value
    });
  }

  handleCreditCardChange(event) {
    this.setState({
      creditCardValue: event.target.value
    });
  }

  handleShippingAddressChange(event) {
    this.setState({
      shippingAddressValue: event.target.value
    });
  }

  render() {
    const totalPrice = this.props.products.reduce((acc, cur) => acc + (cur.price / 100), 0).toFixed(2);
    return (
      <div className="container">
        <h1>My Cart</h1>
        <h4 className="text-muted">{`Order Total: $${totalPrice}`}</h4>
        <form onSubmit={() => this.handleSubmit(this.props.placeOrder)}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" name="name" id="name" value={this.state.nameValue} onChange={this.handleNameChange} />
          </div>
          <div className="form-group">
            <label htmlFor="creditCard">Credit Card</label>
            <input type="text" className="form-control" name="creditCard" id="creditCard" value={this.state.creditCardValue} onChange={this.handleCreditCardChange} />
          </div>
          <div className="form-group">
            <label htmlFor="shippingAddress">Shipping Address</label>
            <textarea className="form-control" id="shippingAddress" rows="3" value={this.state.shippingAddressValue} onChange={this.handleShippingAddressChange}></textarea>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0" onClick={() => this.props.setView('catalog', {})}>&lt; Continue Shopping</p>
            <button type="submit" className="btn btn-outline-primary ml-2">Place Order</button>
          </div>
        </form>
      </div>
    );
  }
}
