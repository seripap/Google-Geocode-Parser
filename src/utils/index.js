const { filterType, filterComponents } = require('./filters');
const suffixes = require('./suffixes');
const directionals = require('./directionals');

function checkRoutes (routes, validation, directional = false) {
  if (!routes) {
    return null;
  }

  const splitRoute = routes.split(' ');

  for (let i = 0; i < splitRoute.length; i++) {
    for (let j = 0; j < validation.length; j++) {
      if (validation[j].toLowerCase() === splitRoute[i].toLowerCase()) {
        if (!directional) {
          return splitRoute[i];
        }
        if (directional === 'pre' && i === 0) {
          return splitRoute[i];
        }
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
  return checkRoutes(routes, directionals, 'pre');
};

function checkPostdirectional (routes) {
  return checkRoutes(routes, directionals, 'post');
};

module.exports = {
  checkSuffix,
  checkPredirectional,
  checkPostdirectional,
  filterType,
  filterComponents,
};
