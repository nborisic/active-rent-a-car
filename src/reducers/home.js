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
      aboutUs: null,
      footer: [],
      cars: [],
      navBar: [],
      discount: '',
      carouselImages: [],
      header: null,
    },
});

const get = getHomeDataReducer.addAction('saveData', (state, action) => {
    const data = {};

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

    console.log('data', data);


    return {
      data,
    };
  });

  export const getData = (data) => get({ data });

// const get = newsListReducer.addAsyncAction('getNewsList', api.getPage, {
//   start: (state, action) => {
//     // Removing error, if any
//     delete state.error;

//     return {
//       ...state,
//       loading: true,
//     };
//   },
//   error: (state, action) => {
//     return {
//       ...state,
//       loading: false,
//       error: action.error,
//     };
//   },
//   success: (state, action) => {
//     let data = [
//       ...state.data,
//     ];
//     if (!isSnap || (isSnap && state.data.length === 0)) {
//       data = data.concat(action.data.news);
//     }
//     return {
//       ...state,
//       data,
//       loading: false,
//       total: action.data.total,
//     };
//   },
// }, { effect: takeEvery });

// const getEntire = newsListReducer.addAsyncAction('getEntireNewsList', api.getPage, {
//   start: (state, action) => {
//     // Removing error, if any
//     delete state.error;

//     return {
//       ...state,
//       loading: true,
//     };
//   },
//   error: (state, action) => {
//     return {
//       ...state,
//       loading: false,
//       error: action.error,
//     };
//   },
//   success: (state, action) => {
//     return {
//       ...state,
//       loading: false,
//       total: action.data.total,
//       entireNewsList: [
//         ...state.entireNewsList,
//         ...action.data.news,
//       ],
//     };
//   },
// }, { effect: takeEvery });

// export const getNewsList = (pageNumber) => get({
//   page: `/!/Api/pages/news/?offset=${ NEWS_LIST_OFFSET }&page=${ pageNumber }`,
// });

// export const getEntireNewsList = () => getEntire({
//   page: '/!/Api/pages/news/?offset=1000000&page=1',
// });
