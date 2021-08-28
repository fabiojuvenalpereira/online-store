import React from 'react';
import PropTypes from 'prop-types';

class CartItem extends React.Component {
  constructor(props) {
    super(props);

    const { product: { price, quantidade, available_quantity: available } } = this.props;
    this.state = {
      totalPrice: price,
      quantidade,
      available,
    };
    this.handleQuant = this.handleQuant.bind(this);
    this.menos = this.menos.bind(this);
    this.mais = this.mais.bind(this);
    this.clearCart = this.clearCart.bind(this);
  }

  handleQuant(newValue) {
    const { product: { price, id } } = this.props;

    this.setState(({ quantidade }) => ({
      totalPrice: price * (quantidade),
    }));
    const itensCart = JSON.parse(localStorage.getItem('cart'));
    const item = itensCart.find((produto) => (produto.id === id));
    const arrayWithoutItem = itensCart.filter((produto) => (produto.id !== id));

    item.quantidade = newValue;
    arrayWithoutItem.push(item);

    localStorage.setItem('cart', JSON.stringify(arrayWithoutItem));
  }

  menos() {
    const { quantidade: quant } = this.state;

    if (quant > 1) {
      this.setState(({ quantidade }) => ({
        quantidade: quantidade - 1,
      }));
      this.handleQuant(quant - 1);
    }
  }

  mais() {
    const { available, quantidade: quant } = this.state;

    if (quant < available) {
      this.setState(({ quantidade }) => ({
        quantidade: quantidade + 1,
      }));

      this.handleQuant(quant + 1);
    }
  }

  clearCart() {
    localStorage.clear();
  }

  render() {
    const { product } = this.props;
    const { totalPrice, quantidade, available } = this.state;

    return (
      <div className="cart-item">

        <div className="item-cart-box">

          <div className="item-card-box-content">

            <div className="item-cart-image">
              <img src={ product.thumbnail } alt={ `Imagem do ${product.title}` } />
            </div>

            <div className="item-cart-content">
              <h3 data-testid="shopping-cart-product-name">{product.title}</h3>
              <p className="quantity-total">
                {`Quantidade em estoque: ${available}`}
              </p>
              <p data-testid="shopping-cart-product-quantity">
                {`${quantidade}`}
              </p>
              <button
                className="one-more-cart"
                type="button"
                onClick={ this.mais }
                data-testid="product-increase-quantity"
              >
                +
              </button>
              <button
                className="one-less-cart"
                type="button"
                onClick={ this.menos }
                data-testid="product-decrease-quantity"
              >
                -
              </button>
            </div>

            <div className="item-cart-price">
              <p>{`Preço: R$ ${product.price}`}</p>
            </div>
          </div>

          <div className="item-total-price">
            <h5>{`Total: R$ ${totalPrice}`}</h5>
          </div>

        </div>

      </div>
    );
  }
}

CartItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.string,
    quantidade: PropTypes.string,
    available_quantity: PropTypes.string,
    thumbnail: PropTypes.string,
  }).isRequired,
};

export default CartItem;
