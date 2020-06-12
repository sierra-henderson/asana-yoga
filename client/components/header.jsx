import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            <i className="fas fa-dollar-sign mr-1"></i>
              Wicked Sales
          </a>
        </div>
      </nav>
    );
  }
}
