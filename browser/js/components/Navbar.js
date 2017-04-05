import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { logoutUser } from '../redux/login';


/* -----------------    COMPONENT     ------------------ */

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.renderLoginSignup = this.renderLoginSignup.bind(this);
    this.renderLogout = this.renderLogout.bind(this);
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target=".navbar-collapse">
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link className="navbar-brand" to="/"><img src="/images/logo.png" /></Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/users" activeClassName="active">users</Link>
              </li>
              <li>
                <Link to="/stories" activeClassName="active">stories</Link>
              </li>
            </ul>
            {Object.keys(this.props.currentUser).length ? this.renderLogout() : this.renderLoginSignup() }
            {console.log("THIS PROPS CURRUSER", this.props.currentUser, "USERS", this.props.users)}
        
          </div>
        </div>
      </nav>
    );
  }

  renderLoginSignup() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
         <Link to="/signup" activeClassName="active">signup</Link>
        </li>
        <li>
          <Link to="/login" activeClassName="active">login</Link>
        </li>
      </ul>
    );
  }

  renderLogout() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
        <button
          className="navbar-btn btn btn-default"
          onClick={this.props.logout}>
          logout
        </button>
        </li>
      </ul>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

//const mapProps = null;
// const mapProps = () => (
//   { message: 'Log Out' }
//   );

const mapState = ({ users, currentUser }) => ({ users, currentUser });



const mapDispatch = dispatch => ({
  logout: () => {
    console.log('You signed out. Sorta.');
    //console.log("LOGOUT", this.props.currentUser)
    browserHistory.push('/login');
    dispatch(logoutUser())
  }
});

export default connect(mapState, mapDispatch)(Navbar);
