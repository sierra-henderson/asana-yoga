import React from 'react';

export default class ProductListItem extends React.Component {
  render() {
    return (
      <div className="card" style="width: 18rem;">
        <img src="../../server/public/images/snuggie.jpg" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Snuggie</h5>
          <p className="card-text text-muted">$29.00</p>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card content.</p>
        </div>
      </div>
    );
  }
}
