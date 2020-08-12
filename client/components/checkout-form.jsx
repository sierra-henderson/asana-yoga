import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNameValue: '',
      lastNameValue: '',
      creditCardValue: '',
      expMonthValue: '',
      expYearValue: '',
      cvvValue: '',
      shippingAddressValue: '',
      cityValue: '',
      stateValue: '',
      zipCodeValue: '',
      agree: false,
      validated: {
        nameValue: null,
        creditCardValue: null,
        creditCardExpValue: null,
        shippingAddressValue: null,
        cityStateValue: null,
        agree: null
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
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

      if (!this.state.firstNameValue || !this.state.lastNameValue) {
        this.handleRequired('nameValue');
      }

      if (!this.state.creditCardValue) {
        this.handleRequired('creditCardValue');
      }

      if (!this.state.expMonthValue || !this.state.expYearValue || !this.state.cvvValue) {
        this.handleRequired('creditCardExpValue');
      }

      if (!this.state.shippingAddressValue) {
        this.handleRequired('shippingAddressValue');
      }

      if (!this.state.stateValue || !this.state.cityValue || !this.state.zipCodeValue) {
        this.handleRequired('cityStateValue');
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

  handleInputChange(category) {
    if (event.target.value !== '') {
      this.setState(state => ({
        ...state,
        [category]: event.target.value
      }), () => this.handleValidation(category));
    } else {
      this.setState(state => ({
        ...state,
        [category]: event.target.value
      }));
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
    const requiredWarningCityState = this.state.validated.cityStateValue === false
      ? <p className="required">Please submit your city, state, and zip code</p>
      : '';
    const requiredWarningCreditCard = this.state.validated.creditCardValue === false
      ? <p className="required">Please submit a 16 digit credit card number</p>
      : '';
    const requiredWarningCreditCardExpiration = this.state.validated.creditCardExpValue === false
      ? <p className="required">Please submit your credit card&apos;s expiration date and CVV</p>
      : '';
    const requiredWarningCheck = this.state.validated.agree === false
      ? <p className="required">Please acknowledge that you understand the terms</p>
      : '';
    return (
      <div className="container">
        <div className="back-to-shopping" onClick={() => this.props.setView('catalog', {})}>
          <i className="fas fa-angle-left mt-3 mr-2"></i>Back to Shopping
        </div>
        <h1 className="font-weight-bold">My Cart</h1>
        <h4 className="text-muted">{`Order Total: $${totalPrice}`}</h4>
        <form onSubmit={() => this.handleSubmit(this.props.placeOrder)}>
          <div className="form-group">
            <label htmlFor="first-name">First Name<span className="required">*</span></label>
            <input type="text" className="form-control" name="first-name" id="first-name" value={this.state.firstNameValue} onChange={() => this.handleInputChange('firstNameValue')} />
            <label htmlFor="last-name">Last Name<span className="required">*</span></label>
            <input type="text" className="form-control" name="last-name" id="last-name" value={this.state.lastNameValue} onChange={() => this.handleInputChange('lastNameValue')} />
            {requiredWarningName}
          </div>
          <div className="form-group">
            <label htmlFor="shippingAddress">Address 1<span className="required">*</span></label>
            <input className="form-control" name="shippingAddress" id="shippingAddress" value={this.state.shippingAddressValue} onChange={() => this.handleInputChange('shippingAddressValue')} />
            <label htmlFor="shippingAddress2">Address 2</label>
            <input className="form-control" name="shippingAddress2" id="shippingAddress2" value={this.state.shippingAddress2Value} onChange={() => this.handleInputChange('shippingAddress2Value')} />
            {requiredWarningAddress}
          </div>
          <div className="form-group">
            <label htmlFor="city">City<span className="required">*</span></label>
            <input type="text" className="form-control" name="city" id="city" value={this.state.cityValue} onChange={() => this.handleInputChange('cityValue')} />
            <label htmlFor="state">State<span className="required">*</span></label>
            <input type="text" className="form-control" name="state" id="state" value={this.state.stateValue} onChange={() => this.handleInputChange('stateValue')} />
            <label htmlFor="zipCode">Zip Code<span className="required">*</span></label>
            <input type="text" className="form-control" name="zipCode" id="zipCode" value={this.state.zipCodeValue} onChange={() => this.handleInputChange('zipCodeValue')} />
            {requiredWarningCityState}
          </div>
          <div className="form-group">
            <label htmlFor="creditCard">Credit Card<span className="required">*</span></label>
            <input type="text" className="form-control" name="creditCard" id="creditCard" value={this.state.creditCardValue} onChange={() => this.handleInputChange('creditCardValue')} />
            {requiredWarningCreditCard}
          </div>
          <div className="form-group">
            <label htmlFor="month">Month<span className="required">*</span></label>
            <input type="text" className="form-control" name="month" id="month" value={this.state.expMonthValue} onChange={() => this.handleInputChange('expMonthValue')} />
            <label htmlFor="year">Year<span className="required">*</span></label>
            <input type="text" className="form-control" name="year" id="year" value={this.state.expYearValue} onChange={() => this.handleInputChange('expYearValue')} />
            <label htmlFor="cvv">CVV<span className="required">*</span></label>
            <input type="text" className="form-control" name="cvv" id="cvv" value={this.state.cvvValue} onChange={() => this.handleInputChange('cvvValue')} />
            {requiredWarningCreditCardExpiration}
          </div>
          <div className="checkbox d-flex">
            <input type="checkbox" className="mt-1 mr-2" checked={this.state.agree} onChange={this.handleCheckChange}/>
            <p>I acknowledge that this is purely for demonstration purposes and no real names, addresses, or credit card information should be used for the purposes of this app</p>
          </div>
          {requiredWarningCheck}
          <button type="submit" className="btn asana-button mt-3 mb-4">Place Order</button>
        </form>
      </div>
    );
  }
}
