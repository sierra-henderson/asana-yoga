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
      shippingAddress2Value: '',
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
    this.getCategoryErrorClass = this.getCategoryErrorClass.bind(this);
  }

  handleSubmit(callback) {
    event.preventDefault();
    if (
      this.state.agree &&
      this.state.firstNameValue &&
      this.state.lastNameValue &&
      this.state.creditCardValue &&
      this.state.expMonthValue &&
      this.state.expYearValue &&
      this.state.expMonthValue &&
      this.state.cvvValue &&
      this.state.shippingAddressValue &&
      this.state.cityValue &&
      this.state.stateValue &&
      this.state.zipCodeValue
    ) {
      const obj = {
        firstName: this.state.firstNameValue,
        lastName: this.state.lastNameValue,
        creditCard: this.state.creditCardValue,
        expMonth: this.state.expMonthValue,
        expYear: this.state.expYearValue,
        cvv: this.state.cvvValue,
        shippingAddress: this.state.shippingAddressValue,
        shippingAddress2: this.state.shippingAddress2Value,
        city: this.state.cityValue,
        state: this.state.stateValue,
        zipCode: this.state.zipCodeValue
      };
      callback(obj);
    } else {
      if (!this.state.agree) {
        this.handleRequired('agree');
      }

      if (!this.state.firstNameValue) {
        this.handleRequired('firstNameValue');
      }

      if (!this.state.lastNameValue) {
        this.handleRequired('lastNameValue');
      }

      if (!this.state.creditCardValue) {
        this.handleRequired('creditCardValue');
      }

      if (!this.state.expMonthValue) {
        this.handleRequired('expMonthValue');
      }

      if (!this.state.expYearValue) {
        this.handleRequired('expYearValue');
      }

      if (!this.state.cvvValue) {
        this.handleRequired('cvvValue');
      }

      if (!this.state.shippingAddressValue) {
        this.handleRequired('shippingAddressValue');
      }

      if (!this.state.cityValue) {
        this.handleRequired('cityValue');
      }

      if (!this.state.stateValue) {
        this.handleRequired('stateValue');
      }

      if (!this.state.zipCodeValue) {
        this.handleRequired('zipCodeValue');
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

  getCategoryErrorClass(category) {
    if (this.state.validated[category] === false) {
      return 'required';
    } else {
      return 'hidden';
    }
  }

  render() {
    const totalPrice = this.props.products.reduce((acc, cur) => acc + (cur.price / 100), 0).toFixed(2);
    const requiredFirstNameCheck = this.getCategoryErrorClass('firstNameValue');
    const requiredLastNameCheck = this.getCategoryErrorClass('lastNameValue');
    const requiredShippingAddressCheck = this.getCategoryErrorClass('shippingAddressValue');
    const requiredCityCheck = this.getCategoryErrorClass('cityValue');
    const requiredStateCheck = this.getCategoryErrorClass('stateValue');
    const requiredZipCodeCheck = this.getCategoryErrorClass('zipCodeValue');
    const requiredCreditCardCheck = this.getCategoryErrorClass('creditCardValue');
    const requiredExpMonthCheck = this.getCategoryErrorClass('expMonthValue');
    const requiredExpYearCheck = this.getCategoryErrorClass('expYearValue');
    const requiredCvvCheck = this.getCategoryErrorClass('cvvValue');
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
          <h5 className="mt-4">Shipping Information</h5>
          <div className="form-group form-row">
            <div className="col-md">
              <label htmlFor="first-name">First Name<span className="required">*</span></label>
              <input type="text" className="form-control" name="first-name" id="first-name" value={this.state.firstNameValue} onChange={() => this.handleInputChange('firstNameValue')} />
              <p className={requiredFirstNameCheck}>Please submit your first name</p>
            </div>
            <div className="col-md">
              <label htmlFor="last-name">Last Name<span className="required">*</span></label>
              <input type="text" className="form-control" name="last-name" id="last-name" value={this.state.lastNameValue} onChange={() => this.handleInputChange('lastNameValue')} />
              <p className={requiredLastNameCheck}>Please submit your last name</p>
            </div>
          </div>
          <div className="form-group form-row">
            <div className="col-md">
              <label htmlFor="shippingAddress">Address 1<span className="required">*</span></label>
              <input className="form-control" name="shippingAddress" id="shippingAddress" value={this.state.shippingAddressValue} onChange={() => this.handleInputChange('shippingAddressValue')} />
              <p className={requiredShippingAddressCheck}>Please submit your street address</p>
            </div>
            <div className="col-md">
              <label htmlFor="shippingAddress2">Address 2</label>
              <input className="form-control" name="shippingAddress2" id="shippingAddress2" value={this.state.shippingAddress2Value} onChange={() => this.handleInputChange('shippingAddress2Value')} />
            </div>
          </div>
          <div className="form-group form-row">
            <div className="col-md">
              <label htmlFor="city">City<span className="required">*</span></label>
              <input type="text" className="form-control" name="city" id="city" value={this.state.cityValue} onChange={() => this.handleInputChange('cityValue')} />
              <p className={requiredCityCheck}>Please submit your city</p>
            </div>
            <div className="col-md">
              <label htmlFor="state">State<span className="required">*</span></label>
              <input type="text" className="form-control" name="state" id="state" value={this.state.stateValue} onChange={() => this.handleInputChange('stateValue')} />
              <p className={requiredStateCheck}>Please submit your state</p>
            </div>
            <div className="col-md">
              <label htmlFor="zipCode">Zip Code<span className="required">*</span></label>
              <input type="text" className="form-control" name="zipCode" id="zipCode" value={this.state.zipCodeValue} onChange={() => this.handleInputChange('zipCodeValue')} />
              <p className={requiredZipCodeCheck}>Please submit your zip code</p>
            </div>
          </div>
          <hr />
          <h5>Payment Information</h5>
          <div className="form-group form-row">
            <label htmlFor="creditCard">Credit Card<span className="required">*</span></label>
            <input type="text" className="form-control" name="creditCard" id="creditCard" value={this.state.creditCardValue} onChange={() => this.handleInputChange('creditCardValue')} />
            <p className={requiredCreditCardCheck}>Please submit your 16 digit credit card number</p>
          </div>
          <div className="form-group form-row">
            <div className="col-md">
              <label htmlFor="month">Month<span className="required">*</span></label>
              <input type="text" className="form-control" name="month" id="month" value={this.state.expMonthValue} onChange={() => this.handleInputChange('expMonthValue')} />
              <p className={requiredExpMonthCheck}>Please select a month</p>
            </div>
            <div className="col-md">
              <label htmlFor="year">Year<span className="required">*</span></label>
              <input type="text" className="form-control" name="year" id="year" value={this.state.expYearValue} onChange={() => this.handleInputChange('expYearValue')} />
              <p className={requiredExpYearCheck}>Please select a year</p>
            </div>
            <div className="col-md">
              <label htmlFor="cvv">CVV<span className="required">*</span></label>
              <input type="text" className="form-control" name="cvv" id="cvv" value={this.state.cvvValue} onChange={() => this.handleInputChange('cvvValue')} />
              <p className={requiredCvvCheck}>Please submit your CVV</p>
            </div>
          </div>
          <div className="checkbox d-flex form-check">
            <input type="checkbox" className="form-check-input" id="checkbox" checked={this.state.agree} onChange={this.handleCheckChange}/>
            <label className="form-check-label" htmlFor="checkbox">I acknowledge that this is purely for demonstration purposes and no real names, addresses, or credit card information should be used for the purposes of this app</label>
          </div>
          {requiredWarningCheck}
          <button type="submit" className="btn asana-button mt-3 mb-4">Place Order</button>
        </form>
      </div>
    );
  }
}
