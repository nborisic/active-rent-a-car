import React from 'react';

import './Spinner.scss';

const Spinner = () => {
  return (
    <div className='Spinner-container'>
      <svg viewBox='0 0 30 30' width='30' height='30'>
        <circle id='spinner' cx='15' cy='15' r='13' fill='none'></circle>
      </svg>
    </div>
  );
};

export default Spinner;


