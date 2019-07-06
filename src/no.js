const contentful = require('contentful')
import { spaceId, accessToken, locales } from './contants';
import { flagButtons } from './flagButtons';

let locale;

window.onload = () => {
  flagButtons();
  locale = window.location.pathname;
}

const client = contentful.createClient({
  space: spaceId,
  accessToken: accessToken,
})

client.getContentTypes()
.then((response) => console.log('content types',response.items))
.catch(console.error)

client.getSpace()
.then((space) => console.log('space',space))
.catch(console.error)

client.getEntries({
  locale: locales[locale],
})
.then((response) => console.log(response.items))
.catch(console.error)

client.getLocales()
.then((response) => console.log('locales',response.items))
.catch(console.error)
