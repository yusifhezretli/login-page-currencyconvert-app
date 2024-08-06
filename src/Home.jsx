import React, { useEffect, useState } from 'react';
import CurrencyConverter from './CurrencyConverter';

const API_URL = 'https://v6.exchangerate-api.com/v6/59a9aea14797daa6305067e4/latest';

const Home = () => {
  // valyutaları içeren dizi
  const [currencyOptions, setCurrencyOptions] = useState([]);
  // Başlangıç valyuta başlangıçda "USD" olarak qyededilmiş
  const [baseCurrency, setBaseCurrency] = useState('USD');
  // Hedef valyuta başlangıçta "EUR" olarak qeyd edilmiş
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  // cevrliecek miqdar temsil eder ve başlangıçta 1 olarak qeyd edilmiş
  const [quantity, setQuantity] = useState(1);
  //Təməl valyutaya qarşı hədəf valyuta için değişim oranını tutar. Başlangıçta 1 olarak ayarlanır ve API'den alınan verilerle güncellenir.
  const [exchangeRate, setExchangeRate] = useState(1);
  //Dönüşüm istiqamətini təyin edən yeni başlanğıcda truemi yoxsa falsemi kod başlanğıcda true olaraq təyin edilir (baseden targete)
  const [isBaseToTarget, setIsBaseToTarget] = useState(true);

  useEffect(() => {
    // valyutaları almak ve değisdirmey api isdek gonderir
    const url = isBaseToTarget
      ? `${API_URL}/${baseCurrency}`
      : `${API_URL}/${targetCurrency}?to=${baseCurrency}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
      // nəticə uğurlu ise
        if (data.result === 'success') {
          // valyutaları dropdovn state'e ekleyerek güncelle
          setCurrencyOptions([...Object.keys(data.conversion_rates)]);

          // Hedef valyutaya karşılık gelen valyutanı değerini state'e elevae ederek güncelle
          setExchangeRate(data.conversion_rates[targetCurrency]);
        } else {
          console.error('API yanıtında beklenen veri bulunamadı.', data.error);
        }
      })
      .catch(error => {
        console.error('API yanıtında beklenen veri bulunamadı.', error);
      });
  }, [baseCurrency, targetCurrency, isBaseToTarget]);


  //  temel ve hedef valyutaları seçimie bağlı olarak güncellemek

  // Bu funksiya istifadəçi başlanğıc valyutanı dəyişdikdə işə salınır.
  const handleBaseCurrencyChange = e => {
    setBaseCurrency(e.target.value);
  };

  // Bu funksiya istifadəçi hədəf valyutanı dəyişdikdə işə salınır.
  const handleTargetCurrencyChange = e => {
    setTargetCurrency(e.target.value);
  };

  // İstifadəçi dəyəri dəyişdikdə işə salınır.
  const handleQuantityChange = e => {
    const value = e.target.value.trim(); // Boşlukları temizle
  
    if (value === '') {
      setQuantity(0);
      setIsBaseToTarget(true);
    } else {
      // İstifadəçinin daxil etdiyi dəyəri onluq ədədə çevirir. Yəni istifadəçi tərəfindən daxil edilmiş sayı miqdar kimi təyin olunur.
      const parsedValue = parseFloat(value);
  
      // Dönüştürülmüş dəyərin sonlu ədəd olub olmadığnı və ədəd olub olmadığını yoxlayır.
      if (!isNaN(parsedValue) && isFinite(parsedValue)) {
        // miqdarı çevrilmiş dəyərə ayarlar.
        setQuantity(parsedValue); 
        setIsBaseToTarget(true);
      } else {
        console.error('uyğunsuz miktar!');
      }
    }
  };
  


  const convertedAmount = isBaseToTarget
    ? quantity * exchangeRate
    : quantity / exchangeRate;

  return (<>
 <div className="Convertapp">
  
    <div className='login'>
      <h1 className='convertname'>Convert</h1>
      <CurrencyConverter

      // Mövcud valyuta seçimlərinin siyahısı.
        currencyOptions={currencyOptions} 
        //  İstifadəçi seçtiği başlangıç valyuta.
        selectedCurrency={baseCurrency}
        // İstifadəçi başlanğıc valyutasını dəyişdikdə işə salınacaq funksiya.
        onCurrencyChange={handleBaseCurrencyChange}
        // Dönüştürülecek miktar.
        quantity={quantity}
        // İstifadəçi məbləği dəyişdikdə işə salınacaq funksiya.
        onQuantityChange={handleQuantityChange}
      />
       <div className='convert-true'>=</div>
      <CurrencyConverter
        currencyOptions={currencyOptions}
        // //  İstifadəçi seçtiği hedef valyuta.
        selectedCurrency={targetCurrency}
         // İstifadəçi hedef valyutasını dəyişdikdə işə salınacaq funksiya.
        onCurrencyChange={handleTargetCurrencyChange}
        // Dönüştürülmüş miktar
        quantity={convertedAmount}
        // Bu bileşende miktar değişimine izin verilmez
        onQuantityChange={() => {}}
      />
    </div> 

   
 </div>
  
    </>
  );
};

export default Home;
