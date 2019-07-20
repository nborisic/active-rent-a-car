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
    sliderImages: 'sliderImages',
    logo: 'header',
    additions: 'form',
}

export const getHomeDataReducer = new Reducer('newsList', {
  data: {
    ['en-US']: {
      aboutUs: null,
      footer: [],
      cars: [],
      navBar: [],
      discount: '',
      sliderImages: [],
      header: null,
      form: null,
    },
    ['sr-Latn']: {
      aboutUs: null,
      footer: [],
      cars: [],
      navBar: [],
      discount: '',
      sliderImages: [],
      header: null,
      form: null,
    },
  }
});

const get = getHomeDataReducer.addAction('saveData', (state, action) => {
    const data = {};
    console.log('actko  data',action.data);


    const locale = action.locale ? action.locale : 'sr-Latn';

    action.data.forEach(item => {
        Object.keys(sectionMap).forEach(key => {
            if (item.fields[key]) {
                if (key === 'address' || key === 'logo' || key === 'additions' || key==='form' || key==='aboutUs' || key==='cars') {
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
