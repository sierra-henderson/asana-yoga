import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: '',
      creditCardValue: '',
      shippingAddressValue: '',
      agree: false
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCreditCardChange = this.handleCreditCardChange.bind(this);
    this.handleShippingAddressChange = this.handleShippingAddressChange.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(callback) {
    event.preventDefault();
    if (this.state.agree && this.state.nameValue && this.state.creditCardValue && this.state.shippingAddressValue) {
      const obj = {
        name: this.state.nameValue,
        creditCard: this.state.creditCardValue,
        shippingAddress: this.state.shippingAddressValue
      };
      callback(obj);
    }
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

  handleCheckChange(event) {
    this.setState({
      agree: event.target.checked
    });
  }

  render() {
    const totalPrice = this.props.products.reduce((acc, cur) => acc + (cur.price / 100), 0).toFixed(2);
    return (
      <div className="container">
        <i className="fas fa-angle-left mt-3 mr-2"></i>Back to Shopping
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
          <div className="checkbox d-flex">
            <input type="checkbox" className="mt-1 mr-2" checked={this.state.agree} onChange={this.handleCheckChange}/>
            <p>I acknowledge that this is purely for demonstration purposes and no real names, addresses, or credit card information should be used for the purposes of this app</p>
          </div>
          <button type="submit" className="btn btn-outline-primary ml-2">Place Order</button>
        </form>
      </div>
    );
  }
}
