import Axios from 'axios';
import { cmc_api_key } from '../../config';

const client = Axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-CMC_PRO_API_KEY': cmc_api_key,
  },
  baseURL: 'https://pro-api.coinmarketcap.com/v1',
});

export default class Api {
  static cryptoMap() {
    return client
      .get('/cryptocurrency/map', {
        params: {
          sort: 'cmc_rank',
          limit: 50,
        },
      })
      .then(response => {
        return response.data.data.map(d => {
          const { id, name, symbol, slug, is_active, rank } = d;
          return {
            id,
            name,
            symbol,
            slug,
            is_active,
            rank,
          };
        });
      })
      .catch(err => {
        console.log(err, 'map');
      });
  }

  static cryptoMetadata(ids) {
    return client
      .get('/cryptocurrency/info', {
        params: {
          id: ids,
        },
      })
      .then(response => {
        return response.data.data;
      })
      .catch(err => {
        console.log(err, 'info');
      });
  }

  static cryptoQuoteLatest(ids) {
    return client
      .get('/cryptocurrency/quotes/latest', {
        params: {
          id: ids,
        },
      })
      .then(response => {
        return response.data.data;
      })
      .catch(err => {
        console.log(err, 'quote');
      });
  }
}
