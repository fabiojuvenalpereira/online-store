import React from 'react';
import '../styles/home.css';

class Loading extends React.Component {
  render() {
    return (
      <div>
        <h1>Carregando Produto</h1>
        <img src="https://media.giphy.com/media/pf4xLNTrRFnYxJLYid/giphy.gif" alt="loading gif" />
      </div>
    );
  }
}

export default Loading;
