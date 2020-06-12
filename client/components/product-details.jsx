import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch('/api/products/1')
      .then(response => response.json())
      .then(data => {
        this.setState({
          product: data
        });
        // console.log(data);
      });
  }

  render() {
    return this.state.product
      ? (
        <div className="card">
          <p className="text-muted">&lt; Back to Catalog</p>
          <div className="row">
            <div className="col-5">
              <img src="/images/ostrich-pillow.jpg" alt=""/>
            </div>
            <div className="col-7">
              <h3 className="card-title">Shake Weight</h3>
              <h5 className="card-text">$29.99</h5>
              <p className="card-text">Dynamic inertia technology ignites muscles in arms, shoulders, and chest.</p>
            </div>
          </div>
          <p className="card-text">Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90&apos;s. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.</p>
        </div>
      )
      : null;
  }
}
