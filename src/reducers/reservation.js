import { Reducer } from 'redux-spark';

export const getReservedClassReducer = new Reducer('reservedClass', {
  data: {
    ['en-US']: {
      reservedClass: null
    },
    ['sr-Latn']: {
      reservedClass: null
    },
  }
});

const get = getReservedClassReducer.addAction('reserveCar', (state, action) => {
    const data = {
      reservedClass: action.data,
    };

    const locale = action.locale ? action.locale : 'sr-Latn';

    return {
      data: {
        ...state.data,
        [locale]: data,
      }
    };
  });

export const getReservedClassData = (data, locale) => get({ data, locale });
