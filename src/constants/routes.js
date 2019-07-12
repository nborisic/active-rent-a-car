export const routeCodes = {
  HOME: '/:language?/:page?',
  conditions: '/:language/:conditions?',
  price: '/:language/:price?',
};

export function getRoute(route, params) {
  let routeWithParams = route;

  Object.keys(params).forEach((key) => {
    // Optional param
    routeWithParams = routeWithParams.replace(`:${ key }?`, params[key]);
    // Mandatory param
    routeWithParams = routeWithParams.replace(`:${ key }`, params[key]);
  });

  // Remove optional params (if any are left)
  routeWithParams = routeWithParams.replace(/\/:(.+)\?/g, '');

  // Show a warning if any of mandatory params is not replaced
  if (routeWithParams.search(/\/:(.+)/) !== -1) {
    console.warn(`All mandatory route params should be present: ${ routeWithParams }`);
  }

  return routeWithParams;
}
