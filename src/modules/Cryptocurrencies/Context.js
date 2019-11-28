import { createContext } from 'react';

export default createContext({
  sortByPrice: null,
  setSortByPrice: null,
  showCryptoType: null,
  setshowCryptoType: null,
  showFavouritesOnly: null,
  setshowFavouritesOnly: null,
  data: null,
  _addToFavourites: null,
  _removeFromFavourites: null,
  _favourites: null,
});
