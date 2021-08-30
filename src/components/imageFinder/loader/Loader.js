import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import LoaderWrapper from './LoaderStyled';

const Spinner = () => {
  return (
    <LoaderWrapper>
      <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
    </LoaderWrapper>
  );
};

export default Spinner;
