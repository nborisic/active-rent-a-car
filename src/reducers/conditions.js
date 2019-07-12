import { Reducer } from 'redux-spark';

export const getConditionsReducer = new Reducer('conditions', {
  data: {
    ['en-US']: {
      conditions: null
    },
    ['sr-Latn']: {
      conditions: null
    },
  }
});

const get = getConditionsReducer.addAction('saveConditionsData', (state, action) => {
  console.log(action.data);

    const data = {
      conditions: action.data[0].fields.terms,
    };

    const locale = action.locale ? action.locale : 'sr-Latn';

    return {
      data: {
        ...state.data,
        [locale]: data,
      }
    };
  });

export const getConditionsData = (data, locale) => get({ data, locale });
