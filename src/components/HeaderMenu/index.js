import React from 'react';

import CategoryList from '../Category/CategoryList';

import './style.scss';

const HeaderMenu = () => {
  return (
    <div className="header-menu">
      <ul className="header-menu__ul">
        <div className="header-menu__categories">
          <CategoryList />
        </div>
      </ul>
    </div>
  );
};

export default HeaderMenu;
