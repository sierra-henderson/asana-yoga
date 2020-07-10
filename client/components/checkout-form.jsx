import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: '',
      creditCardValue: '',
      shippingAddressValue: '',
      agree: false,
      validated: {
        nameValue: null,
        creditCardValue: null,
        shippingAddressValue: null,
        agree: null
      }
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCreditCardChange = this.handleCreditCardChange.bind(this);
    this.handleShippingAddressChange = this.handleShippingAddressChange.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRequired = this.handleRequired.bind(this);
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
    } else {
      if (!this.state.agree) {
        this.handleRequired('agree');
      }
      if (!this.state.nameValue) {
        this.handleRequired('nameValue');
      }
      if (!this.state.creditCardValue) {
        this.handleRequired('creditCardValue');
      }
      if (!this.state.shippingAddressValue) {
        this.handleRequired('shippingAddressValue');
      }
    }
  }

  handleRequired(category) {
    this.setState(state => ({
      validated: {
        ...state.validated,
        [category]: false
      }
    }));
  }

  handleValidation(category) {
    this.setState(state => ({
      validated: {
        ...state.validated,
        [category]: true
      }
    }));
  }

  handleNameChange(event) {
    if (event.target.value !== '') {
      this.setState({
        nameValue: event.target.value
      }, () => this.handleValidation('nameValue'));
    } else {
      this.setState({
        nameValue: event.target.value
      });
    }
  }

  handleCreditCardChange(event) {
    if (event.target.value !== '') {
      this.setState({
        creditCardValue: event.target.value
      }, () => this.handleValidation('creditCardValue'));
    } else {
      this.setState({
        creditCardValue: event.target.value
      });
    }
  }

  handleShippingAddressChange(event) {
    if (event.target.value !== '') {
      this.setState({
        shippingAddressValue: event.target.value
      }, () => this.handleValidation('shippingAddressValue'));
    } else {
      this.setState({
        shippingAddressValue: event.target.value
      });
    }
  }

  handleCheckChange(event) {
    if (event.target.checked) {
      this.setState({
        agree: event.target.checked
      }, () => this.handleValidation('agree'));
    } else {
      this.setState({
        agree: event.target.checked
      });
    }
  }

  render() {
    const totalPrice = this.props.products.reduce((acc, cur) => acc + (cur.price / 100), 0).toFixed(2);
    const requiredWarningName = this.state.validated.nameValue === false
      ? <p className="required">Please submit your full name</p>
      : '';
    const requiredWarningAddress = this.state.validated.shippingAddressValue === false
      ? <p className="required">Please submit your full address</p>
      : '';
    const requiredWarningCreditCard = this.state.validated.creditCardValue === false
      ? <p className="required">Please submit a 16 digit credit card number</p>
      : '';
    const requiredWarningCheck = this.state.validated.agree === false
      ? <p className="required">Please acknowledge that you understand the terms</p>
      : '';
    return (
      <div className="container">
        <div onClick={() => this.props.setView('catalog', {})}>
          <i className="fas fa-angle-left mt-3 mr-2"></i>Back to Shopping
        </div>
        <h1>My Cart</h1>
        <h4 className="text-muted">{`Order Total: $${totalPrice}`}</h4>
        <form onSubmit={() => this.handleSubmit(this.props.placeOrder)}>
          <div className="form-group">
            <label htmlFor="name">Name<span className="required">*</span></label>
            <input type="text" className="form-control" name="name" id="name" value={this.state.nameValue} onChange={this.handleNameChange}/>
            {requiredWarningName}
          </div>
          <div className="form-group">
            <label htmlFor="creditCard">Credit Card<span className="required">*</span></label>
            <input type="text" className="form-control" name="creditCard" id="creditCard" value={this.state.creditCardValue} onChange={this.handleCreditCardChange}/>
            {requiredWarningCreditCard}
          </div>
          <div className="form-group">
            <label htmlFor="shippingAddress">Shipping Address<span className="required">*</span></label>
            <textarea className="form-control" id="shippingAddress" rows="3" value={this.state.shippingAddressValue} onChange={this.handleShippingAddressChange}></textarea>
            {requiredWarningAddress}
          </div>
          <div className="checkbox d-flex">
            <input type="checkbox" className="mt-1 mr-2" checked={this.state.agree} onChange={this.handleCheckChange}/>
            <p>I acknowledge that this is purely for demonstration purposes and no real names, addresses, or credit card information should be used for the purposes of this app</p>
          </div>
          {requiredWarningCheck}
          <button type="submit" className="btn btn-outline-primary ml-2">Place Order</button>
        </form>
      </div>
    );
  }
}
