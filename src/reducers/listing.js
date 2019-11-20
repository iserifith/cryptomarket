const INITIAL_STATE = {};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case 'listing/get_initial_data':
      return {
        ...state,
        ...payload,
      };

    case 'listing/clear':
      return {};

    default:
      return state;
  }
};
