import { useState, useEffect, useMemo } from 'react';
import * as currencyService from '../services/currencyService';

function CurrencyConverter() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [amount, setAmount] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let isMounted = true; 

    const fetchRates = async () => {
      try {
        const data = await currencyService.fetchCurrencyRates();
        
        if (isMounted) {
          setRates(Object.entries(data.rates));
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Erreur lors du chargement:', err);
          setError(err.message);
          setLoading(false);
        }
      }
    };
    fetchRates();
    // Nettoyage lors du démontage du composant
    return () => {
      isMounted = false;
    };
  }, []); 




  const convertCurrency = () => {
    const parsedAmount = parseFloat(amount);
    
    if (!selectedFrom || !selectedTo || !parsedAmount) {
      console.error("Veuillez sélectionner les devises et entrer un montant valide.");
      return;
    }

    const rateFrom = rates.find(([currency]) => currency === selectedFrom)[1];
    const rateTo = rates.find(([currency]) => currency === selectedTo)[1];

    if (!rateFrom || !rateTo) {
      console.error("Taux de change non trouvé pour les devises sélectionnées.");
      return;
    }

    const result = amount * (rateFrom / rateTo);
    const optimizedResult = result.toFixed(2);
    setResult(optimizedResult);
  };

  // const currencies = useMemo(() => {
  //   con
  // })



  return (
    <div>
      <h1>Currency Converter</h1>
      <input type="text" placeholder="tapez votre valeur ici" value={amount} onChange={(e) => setAmount(e.target.value)}/>
      <select onChange={(e) => setSelectedFrom(e.target.value)} defaultValue="default">
      <option disabled value="default">Sélectionnez une valeur</option>
        {rates && rates.map(([currency]) => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>
      <select onChange={(e) => setSelectedTo(e.target.value)} defaultValue="default">
          <option disabled value="default">Sélectionnez une valeur</option>
        {rates && rates.map(([currency]) => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>
      <button onClick={convertCurrency}>Convertir</button>
      {result && <p>{amount} {selectedFrom} = {result} {selectedTo}</p>}
      <input type="text" value="search"/>
    </div>
  );
}

export default CurrencyConverter;