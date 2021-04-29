import React from 'react';

const LoadingCard = ({ count }) => {
  const cards = () => {
    let totalCards = [];

    for (let i = 0; i < count; i++) {
      totalCards.push(<h5 key={i}>Загрузка товаров</h5>);
    }

    return totalCards;
  };

  return <div className="row">{cards()}</div>;
};

export default LoadingCard;
