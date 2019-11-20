import React, { useEffect, useState } from 'react';
import RootNavigations from '../../navigators/RootNavigations';
import { connect } from 'react-redux';
import Api from '../../util/Api';

const Root = ({ cryptocurrencies, _getInitialData }) => {
  useEffect(() => {
    if (!cryptocurrencies.fetched) {
      _getInitialData();
    } else {
      setLoading(false);
    }
  }, [cryptocurrencies, _getInitialData]);

  const [loading, setLoading] = useState(true);

  if (loading) {
    return null;
  }

  return <RootNavigations />;
};

const mapStateToProps = ({ cryptocurrencies }) => ({ cryptocurrencies });
const mapDispatchToProps = dispatch => ({
  _getInitialData: async () => {
    const cryptoMap = await Api.cryptoMap();
    const ids = [];
    cryptoMap.forEach(v => ids.push(v.id));

    const cryptoMetadata = await Api.cryptoMetadata(ids.toString());
    const cryptoQuote = await Api.cryptoQuoteLatest(ids.toString());

    const cryptocurrencies = cryptoMap.map(c => {
      const obj = Object.assign({}, c);
      obj.metadata = { ...cryptoMetadata[c.id] };
      obj.market = { ...cryptoQuote[c.id] };
      return {
        ...obj,
      };
    });

    dispatch({
      type: 'cryptocurrencies/get_initial_data',
      payload: {
        fetched: true,
        data: cryptocurrencies,
      },
    });
  },
});

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(Root);
