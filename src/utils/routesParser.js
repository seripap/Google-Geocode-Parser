const { suffixList, suffixes, directionals, directionalList } = require('./lib/');

function normalize(name, list) {
  return list.find(item => item.options.includes(name));
}

function findType(name, i, suffixIdentified = false) {
  if (directionalList.includes(name)) {
    const normalizedDirectional = normalize(name, directionals);
    if (i === 0) {
      return {
        type: 'postdirectional',
        longName: normalizedDirectional.name,
        shortName: normalizedDirectional.output,
      };
    } else {
      return {
        type: 'predirectional',
        longName: normalizedDirectional.name,
        shortName: normalizedDirectional.output,
      };
    }
  }

  if (suffixList.includes(name)) {
    const normalizedSuffix = normalize(name, suffixes);
    if (!suffixIdentified) {
      return {
        type: 'suffix',
        longName: normalizedSuffix.name,
        shortName: normalizedSuffix.output,
      };
    }
    if (suffixIdentified && normalizedSuffix.name !== name) {
      return {
        type: 'streetName',
        name: normalizedSuffix.name,
        replacedName: name,
      };
    }
  }

  return {
    type: 'streetName',
    name
  };
}

function identify (routes, type) {
  if (!routes) {
    return null;
  }

  const splitRoute = routes.split(' ');
  let suffixIdentified = false;

  const parsedRoute = splitRoute.reverse().map((name, i) => {
    const data = findType(name, i, suffixIdentified);
    if (data.type === 'suffix') {
      suffixIdentified = true;
    }

    return data;
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
