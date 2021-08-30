import React from 'react';
import ModalStyled from './ModalStyled';

const Modal = ({ imgURL, imgAlt, onHandleClickInModal }) => {
  return (
    <ModalStyled onClick={onHandleClickInModal}>
      <div className="Modal">
        <img src={imgURL} alt={imgAlt} />
      </div>
    </ModalStyled>
  );
};
export default Modal;


