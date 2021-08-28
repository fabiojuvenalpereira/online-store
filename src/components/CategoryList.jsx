import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import '../styles/home.css';

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = (
      { categories: [] }
    );
    this.getCategoriesApi = this.getCategoriesApi.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.getCategoriesApi();
  }

  onClick(event) {
    const { categorieSelected } = this.props;
    categorieSelected(event.target.id);

    const itemList = document.querySelector('.checked');
    if (itemList) {
      itemList.classList.remove('checked');
    }
    const added = event.target.parentElement;
    const checked = added.parentElement;
    checked.classList.add('checked');
  }

  async getCategoriesApi() {
    const list = await api.getCategories();
    this.setState({
      categories: list,
    });
  }

  render() {
    const { categories } = this.state;

    return (
      <div className="list-content">

        {categories.map((category) => (
          <div key={ category.id } className="category-item">
            <label data-testid="category" htmlFor={ category.id } className="side-button">
              <input
                type="button"
                name="category"
                id={ category.id }
                onClick={ this.onClick }
              />
              { category.name }
            </label>
          </div>))}

      </div>
    );
  }
}

CategoryList.propTypes = {
  categorieSelected: PropTypes.func.isRequired,
};

export default CategoryList;
