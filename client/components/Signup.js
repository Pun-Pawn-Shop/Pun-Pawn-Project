import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';

/**
 * COMPONENT
 */
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      shippingName: '',
      shippingStreet: '',
      shippingCity: '',
      shippingState: '',
      shippingZip: '',
      billingName: '',
      billingStreet: '',
      billingCity: '',
      billingState: '',
      billingZip: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { handleSubmit, error } = this.props;
    const { handleChange } = this;
    const {
      firstName,
      lastName,
      email,
      password,
      shippingName,
      shippingStreet,
      shippingCity,
      shippingState,
      shippingZip,
      billingName,
      billingStreet,
      billingCity,
      billingState,
      billingZip,
    } = this.state;

    return (
      <div>
        <form onSubmit={handleSubmit} id="signup-form">
          <h1>Sign Up</h1>
          <div>
            <div id="required-signup-info">
              <div>
                <label htmlFor="firstName">
                  <small>First Name</small>
                </label>
                <input
                  name="firstName"
                  type="text"
                  onChange={handleChange}
                  value={firstName}
                />
              </div>
              <div>
                <label htmlFor="lastName">
                  <small>Last Name</small>
                </label>
                <input
                  name="lastName"
                  type="text"
                  onChange={handleChange}
                  value={lastName}
                />
              </div>
              <div>
                <label htmlFor="email">
                  <small>Email</small>
                </label>
                <input
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={email}
                />
              </div>
              <div>
                <label htmlFor="password">
                  <small>Password</small>
                </label>
                <input
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={password}
                />
              </div>
            </div>

            <h5>Shipping Info</h5>
            <div className="signup-address-info">
              <div>
                <div>
                  <label htmlFor="shippingName">
                    <small>Name</small>
                  </label>
                  <input
                    name="shippingName"
                    type="text"
                    onChange={handleChange}
                    value={shippingName}
                  />
                </div>
                <label htmlFor="shippingStreet">
                  <small>Street</small>
                </label>
                <input
                  name="shippingStreet"
                  type="text"
                  onChange={handleChange}
                  value={shippingStreet}
                />
              </div>
              <div>
                <label htmlFor="shippingCity">
                  <small>City</small>
                </label>
                <input
                  name="shippingCity"
                  type="text"
                  onChange={handleChange}
                  value={shippingCity}
                />
              </div>
              <div id="shippingDropdown">
                <label htmlFor="shippingState">
                  <small>State:</small>
                </label>
                <select name="shippingState" onChange={this.handleChange}>
                  <option value="none" selected disabled hidden>
                    Select State
                  </option>
                  {this.props.states.map((state, idx) => {
                    return (
                      <option key={idx} value={state}>
                        {state}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label htmlFor="shippingZip">
                  <small>Zip Code</small>
                </label>
                <input
                  name="shippingZip"
                  type="text"
                  onChange={handleChange}
                  value={shippingZip}
                />
              </div>
            </div>

            <h5>Billing Info</h5>
            <div className="signup-address-info">
              <div>
                <div>
                  <label htmlFor="billingName">
                    <small>Name</small>
                  </label>
                  <input
                    name="billingName"
                    type="text"
                    onChange={handleChange}
                    value={billingName}
                  />
                </div>
                <label htmlFor="billingStreet">
                  <small>Street</small>
                </label>
                <input
                  name="billingStreet"
                  type="text"
                  onChange={handleChange}
                  value={billingStreet}
                />
              </div>
              <div>
                <label htmlFor="billingCity">
                  <small>City</small>
                </label>
                <input
                  name="billingCity"
                  type="text"
                  onChange={handleChange}
                  value={billingCity}
                />
              </div>
              <div id="billingDropdown">
                <label htmlFor="billingState">
                  <small>State:</small>
                </label>
                <select name="billingState" onChange={handleChange}>
                  <option value="none" selected disabled hidden>
                    Select State
                  </option>
                  {this.props.states.map((state, idx) => {
                    return (
                      <option key={idx} value={state}>
                        {state}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label htmlFor="billingZip">
                  <small>Zip Code</small>
                </label>
                <input
                  name="billingZip"
                  type="text"
                  onChange={handleChange}
                  value={billingZip}
                />
              </div>
            </div>
            <div>
              <button id="signup-button" type="submit">
                Sign Up
              </button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </div>
        </form>
      </div>
    );
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapSignup = (state) => {
  return {
    error: state.auth.error,
    states: [
      'AL',
      'AK',
      'AS',
      'AZ',
      'AR',
      'CA',
      'CO',
      'CT',
      'DE',
      'DC',
      'FM',
      'FL',
      'GA',
      'GU',
      'HI',
      'ID',
      'IL',
      'IN',
      'IA',
      'KS',
      'KY',
      'LA',
      'ME',
      'MH',
      'MD',
      'MA',
      'MI',
      'MN',
      'MS',
      'MO',
      'MT',
      'NE',
      'NV',
      'NH',
      'NJ',
      'NM',
      'NY',
      'NC',
      'ND',
      'MP',
      'OH',
      'OK',
      'OR',
      'PW',
      'PA',
      'PR',
      'RI',
      'SC',
      'SD',
      'TN',
      'TX',
      'UT',
      'VT',
      'VI',
      'VA',
      'WA',
      'WV',
      'WI',
      'WY',
    ],
  };
};

//add function to check if there is a guest cart in local storage and if so, set newly created user to have the cart

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = 'signup';
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(authenticate(firstName, lastName, email, password, formName));
    },
  };
};

export default connect(mapSignup, mapDispatch)(Signup);
