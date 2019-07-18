import { Reducer } from 'redux-spark';

export const getPriceReducer = new Reducer('price', {
  data: {
    ['en-US']: {
      price: null
    },
    ['sr-Latn']: {
      price: null
    },
  }
});

const get = getPriceReducer.addAction('savePriceData', (state, action) => {
    const data = {
      price: action.data[0].fields,
    };

    const locale = action.locale ? action.locale : 'sr-Latn';

    return {
      data: {
        ...state.data,
        [locale]: data,
      }
    };
  });

export const getPriceData = (data, locale) => get({ data, locale });
