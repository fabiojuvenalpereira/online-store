import React from 'react';

class CheckForm extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form className="checkout-form">
        <h3 className="checkout-form-title">
          Dados pessoais e Pagamento
        </h3>
        <input
          className="checkout-form-input"
          type="text"
          id="NomeCompleto"
          placeholder="Nome Completo"
          data-testid="checkout-fullname"
        />
        <input
          className="checkout-form-input"
          type="email"
          id="Email"
          placeholder="Email"
          data-testid="checkout-email"
        />
        <div className="cpf-telefone">
          <input
            className="checkout-form-input cpf"
            type="text"
            id="cpf"
            placeholder="CPF"
            data-testid="checkout-cpf"
          />
          <input
            className="checkout-form-input"
            type="text"
            id="Telefone"
            placeholder="Telefone"
            data-testid="checkout-phone"
          />
        </div>
        <input
          className="checkout-form-input"
          type="text"
          id="CEP"
          placeholder="CEP"
          data-testid="checkout-cep"
        />
        <input
          className="checkout-form-input"
          type="text"
          id="Endereço"
          placeholder="Endereço"
          data-testid="checkout-address"
        />
        <label htmlFor="payment">
          <select
            className="checkout-form-input-select"
            type="select"
            id="payment"
          >
            <option value="" disabled selected>Forma de pagamento:</option>
            <option value="pix">Pix</option>
            <option value="cash">Boleto</option>
            <option value="debit">Débito</option>
            <option value="credit">Crédito</option>
          </select>
        </label>
        <button
          type="submit"
          className="checkout-form-submit-btn"
          onClick={ this.handleSubmit }
        >
          Finalizar compra
        </button>
      </form>
    );
  }
}

export default CheckForm;
