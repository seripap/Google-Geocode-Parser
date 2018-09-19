const { filterType, filterComponents } = require('./filters');
const suffixes = require('./suffixes');
const directionals = require('./directionals');

function checkRoutes (routes, validation, options = {}) {
  if (!routes) {
    return null;
  }

  const { directional, parseRoute } = options;
  const splitRoute = routes.trim().split(' ');

  /*
    Reasoning behind iterating from end to beginning:
    Some address names share the same title as suffixes;
    E.g. N Ridge Pl => 'Ridge' is a type of suffix
   */
  for (let i = splitRoute.length - 1; i >= 0; i--) {
    for (let j = 0; j < validation.length; j++) {
      if (validation[j].toLowerCase() === splitRoute[i].toLowerCase()) {
        // For parsed route
        if (!directional && parseRoute && (i === splitRoute.length - 1 || i === splitRoute.length - 2)) {
          return `${splitRoute[i - 1]} ${splitRoute[i]}`;
        }
        // For suffixes
        if (!directional && !parseRoute && (i === splitRoute.length - 1 || i === splitRoute.length - 2)) {
          return splitRoute[i];
        }
        // For predirectionals
        if (directional === 'pre' && i === 0) {
          return splitRoute[i];
        }
        // For postdirectionals
        if (directional === 'post' && i === splitRoute.length - 1) {
          return splitRoute[i];
        }
      }
    }
  }

  return null;
};

function checkSuffix (routes) {
  return checkRoutes(routes, suffixes);
};

function checkPredirectional (routes) {
  return checkRoutes(routes, directionals, { directional: 'pre' });
};

function checkPostdirectional (routes) {
  return checkRoutes(routes, directionals, { directional: 'post'});
};

function checkRouteAddress (routes) {
  return checkRoutes(routes, suffixes, { parseRoute: true });
};

module.exports = {
  checkSuffix,
  checkPredirectional,
  checkPostdirectional,
  checkRouteAddress,
  filterType,
  filterComponents,
};
