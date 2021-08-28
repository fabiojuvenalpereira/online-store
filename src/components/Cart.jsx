import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CartItem from './CartItem';
import homeIcon from '../images/home_icon.svg';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
    };
    this.clearCart = this.clearCart.bind(this);
    this.getProductFromStorage = this.getProductFromStorage.bind(this);
    this.backToHome = this.backToHome.bind(this);
  }

  getProductFromStorage() {
    const parse = JSON.parse(localStorage.getItem('cart'));
    return (
      <div className="product-cart">

        <div className="product-header-cart">
          <Link to="/">
            <div className="back-button">
              <img src={ homeIcon } alt="back" />
            </div>
          </Link>
          <div className="section-header">
            <h1>Carrinho de compras</h1>
          </div>
          <div className="to-hide">
            <h1>Carrinho de compras</h1>
          </div>
        </div>
        <div className="product-content-cart">
          <div className="class-content-items">
            {parse.map((product) => <CartItem key={ product.id } product={ product } />)}
          </div>

          <div className="buttons-cart">
            <button
              type="button"
              className="clear-cart-items"
              onClick={ this.clearCart }
            >
              Limpar Carrinho
            </button>
            <Link
              to="/checkout"
              data-testid="checkout-products"
            >
              <button type="button" className="end-buy">
                Finalizar compra
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  backToHome() {
    return (
      <div>
        <div className="product-header-cart">
          <Link to="/">
            <div className="back-button">
              <img src={ homeIcon } alt="back" />
            </div>
          </Link>
        </div>
        <div className="empty-cart-div">
          <h2
            data-testid="shopping-cart-empty-message"
            className="empty-cart"
          >
            Seu carrinho está vazio
          </h2>
        </div>
      </div>
    );
  }

  clearCart() {
    const { update } = this.state;
    localStorage.clear();
    this.setState({
      update: !update,
    });
  }

  render() {
    if (localStorage.getItem('cart')) {
      return this.getProductFromStorage();
    }
    return (this.backToHome());
  }
}

Cart.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.oneOfType(PropTypes.object, PropTypes.string),
  }).isRequired,
};

export default Cart;
