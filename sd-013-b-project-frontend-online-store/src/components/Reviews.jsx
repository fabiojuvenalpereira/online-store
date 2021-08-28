import React from 'react';
import PropTypes from 'prop-types';

class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: null,
    };
  }

  componentDidMount() {
    this.requestLocalStorage();
  }

  requestLocalStorage() {
    const { productId } = this.props;
    if (localStorage.getItem('submited-review')) {
      const reviews = JSON.parse(localStorage.getItem('submited-review'));
      const productIdReviews = reviews.filter((review) => review.productId === productId);
      this.setState({
        reviews: productIdReviews,
      });
    }
  }

  renderReviews() {
    const { reviews } = this.state;

    return reviews.map((review) => (
      <section key={ review.email } className="section-review">
        <p className="title-review">
          E-mail:
          <span className="normal-span">{ review.email }</span>
        </p>
        <p className="title-review">
          Estrela(s):
          <span className="normal-span">{review.star}</span>
        </p>
        <p className="title-review">
          Comentário:
          <span className="normal-span">{review.comment}</span>
        </p>
      </section>
    ));
  }

  render() {
    const { reviews } = this.state;

    return (
      <section className="review-box">
        <h3>Avaliações</h3>
        <div className="reviews">
          { reviews ? this.renderReviews() : <p>Sem avaliações</p> }
        </div>
      </section>
    );
  }
}

Reviews.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default Reviews;
