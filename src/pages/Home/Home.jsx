import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
const contentful = require('contentful');
import get from 'lodash/get';
import { spaceId, accessToken, locales } from '../../constants/contentful';
import PageContainer from '../../components/Global/PageContainer/PageContainer';
import { getData } from '../../reducers/home'

class Home extends Component {
  constructor(props) {
    super(props);

    if(!props.homeData.aboutUs) {
      const entriesToGet = ['aboutUs', 'carousel', 'discountActions', 'carsInStoc', 'footer', 'navBar'].join(',', ',');

      const client = contentful.createClient({
        space: spaceId,
        accessToken: accessToken,
      })
  
      client.getEntries({
        // content_type: 'allClasses',
        include: 10,
        'sys.contentType.sys.id[in]': entriesToGet,
        // locale: locales[locale],
      })
      .then((response) => {
        console.log(response);
        props.dispatch(getData(response.items))
      })
      .catch(console.error)
    }
  }


//   componentDidMount() {
    

//     client.getEntries({
//       // locale: locales[locale],
//     })
//     .then((response) => console.log(response.items))
//     .catch(console.error)

//     client.getEntries({
//       // content_type: 'allClasses',
//       include: 10,
//       'sys.contentType.sys.id[in]': entriesToGet,
//       // locale: locales[locale],
//     })
//     .then((response) => console.log('with query',response.items))
//     .catch(console.error)


//     client.getContentType('aClassCars')
// .then((contentType) => console.log('content type',contentType))
// .catch(console.error)

//     client.getEntry('2nM0oDpSFI5fNk0tbVoM0X')
//     .then((entry) => console.log('samo jedan',entry))
//     .catch(console.error)
//   }

  render() {
    console.log(this.state);
    
        return (
            <PageContainer>
            <h1>home</h1>
            </PageContainer>
    );
  }
}


export default connect((state) => ({
  homeData: get(state, 'home.data', []),
}))(Home);

