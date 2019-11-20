const INITIAL_STATE = {
  fetched: false,
  data: [],
  favourites: [],
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case 'cryptocurrencies/get_initial_data':
      return {
        ...state,
        ...payload,
      };

    case 'cryptocurrencies/favourite':
      return {
        ...state,
        favourites: [...new Set(state.favourites.concat(payload))],
      };

    case 'cryptocurrencies/removeFavourite':
      return {
        ...state,
        favourites: state.favourites.filter(v => v !== payload),
      };

    case 'cryptocurrencies/clear':
      return { fetched: false, data: [], favourites: [] };

    case 'cryptocurrencies/clearFav':
      return { ...state, favourites: [] };

    default:
      return state;
  }
};
