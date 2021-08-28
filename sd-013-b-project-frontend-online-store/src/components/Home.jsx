import React from 'react';
import { Link } from 'react-router-dom';

import Search from './Search';
import ProductCard from './ProductCard';
import * as api from '../services/api';
import NotFound from './NotFound';
import CategoryList from './CategoryList';

import shoppingCart from '../images/shopping-cart-svgrepo-com.svg';
import logo4em1 from '../images/4em1.svg';

import '../styles/home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      inputText: '',
      productsList: [],
      haveProduct: false,
      count: null,
    };
    this.searchText = this.searchText.bind(this);
    this.categorieSelected = this.categorieSelected.bind(this);
    this.onClick = this.onClick.bind(this);
    this.countProductsCart = this.countProductsCart.bind(this);
  }

  componentDidMount() {
    this.countProductsCart();
  }

  async onClick() {
    const { inputText, category } = this.state;
    const getListodProducts = await api
      .getProductsFromCategoryAndQuery(category, inputText);
    if (getListodProducts.results !== null) {
      this.setState({
        productsList: getListodProducts.results,
        haveProduct: true,
      });
    } else {
      return <NotFound />;
    }
  }

  searchText(event) {
    const { target } = event;
    this.setState({
      inputText: target.value,
    });
  }

  async categorieSelected(category) {
    const getproducts = await api.getProductsFromCategoryAndQuery(category);
    this.setState({
      category,
      productsList: getproducts.results,
      haveProduct: true,
    });
  }

  countProductsCart() {
    const storage = JSON.parse(localStorage.getItem('cart'));
    if (storage) {
      this.setState({
        count: (storage.length),
      });
    }
  }

  render() {
    const { productsList, haveProduct, count } = this.state;

    return (
      <div className="main-div">
        <div className="top-section">
          <img className="logo-4em1" src={ logo4em1 } alt="4 em 1 logo" />
          <Search
            clasName="search-bar"
            searchText={ this.searchText }
            onClick={ this.onClick }
          />
          <div>
            <Link
              className="shopping-cart-button"
              to="/cart"
              data-testid="shopping-cart-button"
            >
              <div data-testid="shopping-cart-size" className="number-cart">{count}</div>
              <img className="cart-icon" src={ shoppingCart } alt="cart icon" />
            </Link>
          </div>
        </div>

        <div className="main-content-list-cards">
          <div className="category-list">
            <CategoryList categorieSelected={ this.categorieSelected } />
          </div>
          {haveProduct ? (
            <div className="product-card">
              {productsList.map((product) => (
                <ProductCard
                  className="card"
                  key={ product.id }
                  product={ product }
                  countProductsCart={ this.countProductsCart }
                  data-testid="product-detail-link"
                />
              ))}
            </div>
          ) : (
            <div className="text-main-page" data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
