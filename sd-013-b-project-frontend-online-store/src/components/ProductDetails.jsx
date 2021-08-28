import React from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/home.css';
import * as api from '../services/api';

import shoppingCart from '../images/shopping-cart-svgrepo-com.svg';
import homeIcon from '../images/home_icon.svg';
import FormsDetails from './FormsDetails';
import Reviews from './Reviews';
import Carrousel from './Carrousel';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: null,
    };
    this.countProductsCart = this.countProductsCart.bind(this);
    this.randomImage = this.randomImage.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.countProductsCart();
    this.randomImage();
  }

  onClick() {
    const { location } = this.props;
    const { state: product } = location;

    if (localStorage.getItem('cart')) {
      const parse = JSON.parse(localStorage.getItem('cart'));
      parse.push({ ...product, quantidade: 1 });
      localStorage.setItem('cart', JSON.stringify(parse));
    } else {
      localStorage.setItem('cart', JSON.stringify([{ ...product, quantidade: 1 }]));
    }
    this.countProductsCart();
  }

  countProductsCart() {
    const storage = JSON.parse(localStorage.getItem('cart'));
    if (storage) {
      this.setState({
        count: (storage.length),
      });
    }
  }

  async randomImage() {
    const { location: { state: productDetail } } = this.props;
    const product = await api.getProductsFromCategoryAndQuery(productDetail);
    return product.pictures;
  }

  render() {
    const { location } = this.props;
    const { state: productDetail } = location;
    const { count } = this.state;

    return (
      <div className="product-details">

        <div className="product-header">
          <Link to="/">
            <div className="back-button">
              <img src={ homeIcon } alt="back" />
            </div>
          </Link>
          <div className="section-header">
            <h1>Detalhe do produto</h1>
          </div>
          <Link
            className="shopping-cart-button"
            to={ {
              pathname: '/cart',
              state: location.state,
            } }
            data-testid="shopping-cart-button"
          >
            <div data-testid="shopping-cart-size" className="number-cart">{count}</div>
            <img className="cart-icon" src={ shoppingCart } alt="cart icon" />
          </Link>
        </div>

        <div className="product-details-box">

          <div className="image-product-detais">
            <Carrousel images={ this.randomImage() } />
          </div>

          <div className="espec-product-box">
            <div className="product-name">
              <h3 data-testid="product-detail-name">{productDetail.title}</h3>
              <hr />
            </div>
            <div className="product-datail-specs">
              <h3 className="title-specs">Especificações Técnicas</h3>
              <hr className="linha" />
              <div className="every-spec">
                {productDetail
                  .attributes
                  .map((spec) => (
                    <div key={ spec.id } className="product-specs-name">
                      <h5>{ `${spec.name}:` }</h5>
                      <h5>{ spec.value_name }</h5>
                    </div>
                  ))}
              </div>
            </div>
            <div className="forms-detail">
              <FormsDetails productId={ productDetail.id } />
              <Reviews productId={ productDetail.id } />
            </div>
          </div>

          <div className="buy-area-box">
            <div className="product-price-detail">
              <h3>Preço</h3>
              <hr />
              <p>{`R$ ${productDetail.price}`}</p>
            </div>

            <div className="buttons-product-details">
              <button
                type="button"
                data-testid="product-detail-add-to-cart"
                className="add-to-cart"
                onClick={ this.onClick }
              >
                Adicionar ao carrinho
              </button>
              <Link to="/cart" className="buy" onClick={ this.onClick }>
                comprar
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,

  location: PropTypes.shape({
    state: PropTypes.shape({
      category_id: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
  product: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.string,
    thumbnail: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

export default ProductDetails;
