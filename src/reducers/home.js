import { Reducer } from 'redux-spark';
import { takeEvery } from 'redux-saga/effects';
import isSnap from '../utils/is-snap';

export const NEWS_LIST_OFFSET = 20;

const sectionMap = {
    aboutUs: 'aboutUs',
    cars: 'cars',
    navBar: 'navBar',
    discount: 'discount',
    address: 'footer',
    carouselImages: 'carouselImages',
    logo: 'header'
}

export const getHomeDataReducer = new Reducer('newsList', {
  data: {
    ['en-US']: {
      aboutUs: null,
      footer: [],
      cars: [],
      navBar: [],
      discount: '',
      carouselImages: [],
      header: null,
    },
    ['sr-Latn']: {
      aboutUs: null,
      footer: [],
      cars: [],
      navBar: [],
      discount: '',
      carouselImages: [],
      header: null,
    },
  }
});

const get = getHomeDataReducer.addAction('saveData', (state, action) => {
    const data = {};

    const locale = action.locale ? action.locale : 'sr-Latn';

    action.data.forEach(item => {
        Object.keys(sectionMap).forEach(key => {
            if (item.fields[key]) {
                if (key === 'address' || key === 'logo') {
                    data[sectionMap[key]] = item.fields;
                } else {
                    data[sectionMap[key]] = item.fields[key];
                }
            };
        });
    });

    return {
      data: {
        ...state.data,
        [locale]: data,
      }
    };
  });

export const getData = (data, locale) => get({ data, locale });
