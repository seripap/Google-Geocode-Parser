const suffixes = require('./suffixes');
const directionals = require('./directionals');

function findType(name, i, suffixIdentified = false) {
  if (directionals.includes(name)) {
    if (i === 0) {
      return 'postdirectional';
    } else {
      return 'predirectional';
    }
  }

  if (suffixes.includes(name) && !suffixIdentified) {
    return 'suffix';
  }

  return 'streetName';
}

function identify (routes, type) {
  if (!routes) {
    return null;
  }

  const splitRoute = routes.split(' ');
  let suffixIdentified = false;

  const parsedRoute = splitRoute.reverse().map((name, i) => {
    const type = findType(name.toUpperCase(), i, suffixIdentified);
    if (type === 'suffix') {
      suffixIdentified = true;
    }

    return {
      type,
      name
    };
  });

  const identifiedData = parsedRoute.find(route => route.type === type);

  return identifiedData || null;
}

function checkSuffix (routes) {
  return identify(routes, 'suffix');
}

function checkPredirectional (routes) {
  return identify(routes, 'predirectional');
}

function checkPostdirectional (routes) {
  return identify(routes, 'postdirectional');
}

function checkStreetName (routes) {
  return identify(routes, 'streetName');
}


function parseRoute(route) {
  if (route) {
    return {
      predirectional: checkPredirectional(route),
      postdirectional: checkPostdirectional(route),
      suffix: checkSuffix(route),
      streetName: checkStreetName(route),
    }
  }

  return null;
}

module.exports = {
  parseRoute
}
