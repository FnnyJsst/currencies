import axios from 'axios';

// Utiliser la clé API depuis le fichier .env
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = 'https://api.currencyfreaks.com/v2.0';

const fetchCurrencyRates = async () => {
  try {
    if (!API_KEY) {
      throw new Error('API Key non définie');
    }
    const response = await axios.get(`${API_URL}/rates/latest?apikey=${API_KEY}`);
    if (!response.data) {
      throw new Error('Pas de données reçues de l\'API');
    }
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des taux:', error);
    throw new Error('Impossible de récupérer les taux de change');
  }
}

export { fetchCurrencyRates };