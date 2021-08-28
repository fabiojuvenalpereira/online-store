import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';
import PropTypes from 'prop-types';

import free from '../images/free.svg';

class ProductCard extends React.Component {
  onClick = () => {
    const { product, countProductsCart } = this.props;

    if (localStorage.getItem('cart')) {
      const parse = JSON.parse(localStorage.getItem('cart'));
      parse.push({ ...product, quantidade: 1 });
      localStorage.setItem('cart', JSON.stringify(parse));
    } else {
      localStorage.setItem('cart', JSON.stringify([{ ...product, quantidade: 1 }]));
    }
    countProductsCart();
  }

  render() {
    const { product } = this.props;
    const { title, price, thumbnail, id, shipping } = product;
    return (
      <div data-testid="product" className="main-card-product">
        <Link
          to={ {
            pathname: `/details/${id}`,
            state: product,
          } }
          data-testid="product-detail-link"
        >
          <div className="image-card">
            <img src={ thumbnail } alt={ `Capa do ${title}` } />
          </div>
          {shipping.free_shipping ? (
            <div data-testid="free-shipping" className="free-shipping">
              <img src={ free } alt="gratis" />
            </div>
          ) : (
            <div className="free-shipping hidden-class">
              <img src={ free } alt="gratis" />
            </div>)}

          <p className="product-price-card">{`R$ ${price}`}</p>
          <p className="product-name-card">{title}</p>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          className="button-add-to-cart"
          onClick={ this.onClick }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.string,
    thumbnail: PropTypes.string,
    id: PropTypes.string,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool.isRequired,
    }),
  }).isRequired,
  countProductsCart: PropTypes.func.isRequired,
};

export default ProductCard;
