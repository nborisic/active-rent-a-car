import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import animateScrollTo from 'animated-scroll-to';

export function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = 'åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaaeeeeiiiioooouuuunc------';

  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes
    .replace(/^-+/, '') // trim - from start of text
    .replace(/-+$/, ''); // trim - from end of text

  return str;
}

export function hasStringValue(value) {
  return Boolean(value) && !isEmpty(value.trim());
}

export function hasEmailValue(value) {
  return Boolean(value) && isEmail(value.trim());
}

export function getElementOffsetTop(el) {
  let top = 0;
  let element = el;

  do {
    top += element.offsetTop || 0;
    element = element.offsetParent;
  } while (element);

  return top;
}

export function scrollToElement(id) {
  const element = document.getElementById(id);
  const conversionOffset = getElementOffsetTop(element) - 120;

  animateScrollTo(conversionOffset);
}
