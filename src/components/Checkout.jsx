import React from 'react';
import { Link } from 'react-router-dom';
import CheckForm from './CheckForm';
import homeIcon from '../images/home_icon.svg';
import backPrevious from '../images/back_previous.svg';

class Checkout extends React.Component {
  render() {
    let total = 0;
    const charLimit = 30;
    const parse = JSON.parse(localStorage.getItem('cart'));
    return (
      <div className="product-in-cart">
        <div className="product-header-cart">
          <Link to="/cart">
            <div className="back-button">
              <img className="back-previous-icon" src={ backPrevious } alt="back" />
            </div>
          </Link>
          <div className="section-header">
            <h1>Resumo dos produtos</h1>
          </div>

          <Link to="/">
            <div className="back-button">
              <img src={ homeIcon } alt="back" />
            </div>
          </Link>
        </div>
        <div data-testid="checkout-products">
          {parse.map((product) => {
            total += product.price * product.quantidade;
            return (
              <div className="item-cart-box" key={ product.id }>
                <div className="item-card-box-content">
                  <div>
                    <img
                      className="item-checkout-image"
                      src={ product.thumbnail }
                      alt={ `Imagem do ${product.title}` }
                    />
                  </div>
                  <div className="item-cart-content">
                    <h4>{ `${product.title.slice(0, charLimit)}...` }</h4>
                  </div>
                  <span className="item-cart-price">
                    { `$${product.price.toFixed(2)}` }
                  </span>
                  <span> x </span>
                  <span>{ product.quantidade }</span>
                  <span> = </span>
                  <h5>{ `$${(product.price * product.quantidade).toFixed(2)}` }</h5>
                </div>
              </div>
            );
          })}
        </div>
        <h2 className="checkout-value">{ `Total: R$${total.toFixed(2)}` }</h2>
        <CheckForm />
      </div>
    );
  }
}

export default Checkout;
