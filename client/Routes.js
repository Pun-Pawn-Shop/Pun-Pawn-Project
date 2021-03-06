import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './components/AuthForm';
import Signup from './components/Signup';
import Home from './components/Home';
import { me } from './store';
import AllPuns from './components/AllPuns';
import SinglePun from './components/SinglePun';
import Checkout from './components/Checkout';
import OrderHistory from './components/OrderHistory';
import CreatePun from './components/CreatePun';
import AllUsers from './components/AllUsers';
import AdminAllPuns from './components/AdminAllPuns';
import EditPun from './components/EditPun';
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    //have conditional here for displaying admin links
    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/puns" component={AllPuns} />
            <Route path="/puns/:id" component={SinglePun} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/users/order-history" component={OrderHistory} />
            <Route path="/admin/add-pun" component={CreatePun} />
            <Route path="/admin/user-list" component={AllUsers} />
            <Route path="/admin/edit-inventory" component={AdminAllPuns} />
            <Route path="/admin/puns/:id/edit" component={EditPun} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/puns" component={AllPuns} />
            <Route path="/puns/:id" component={SinglePun} />
            <Route path="/checkout" component={Checkout} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
