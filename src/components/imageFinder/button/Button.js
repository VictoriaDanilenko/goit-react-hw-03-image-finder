import React from 'react';
import ButtonWrapper from './ButtonStyled';

const Button = ({ onFetchImages }) => {
  return (
    <ButtonWrapper>
      <button className="Button" type="button" onClick={onFetchImages}>
        Load more
      </button>
    </ButtonWrapper>
  );
};

export default Button;

