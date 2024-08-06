// CurrencyConverter.jsx
import React from 'react';

const CurrencyConverter = (props) => {
  const {
    currencyOptions,
    selectedCurrency,
    onCurrencyChange,
    quantity,
    onQuantityChange,
  } = props;

  return ( <>
  <div className="Currencyapp">
    <div className='input-box convertinput'>
      <input
        type='number'
        value={quantity}
        onChange={onQuantityChange}
        placeholder='Enter amount'
      />
      <select className='input' value={selectedCurrency} onChange={onCurrencyChange}>
        {currencyOptions.map(currency => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div> 

    
  </div>
     
    

    </>

  );
};

export default CurrencyConverter;
