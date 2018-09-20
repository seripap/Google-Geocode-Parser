const { filterType, filterComponents } = require('./filters');
const { checkSuffix, checkPredirectional, checkPostdirectional, checkStreetName } = require('./routeParser');

module.exports = {
  checkSuffix,
  checkPredirectional,
  checkPostdirectional,
  checkStreetName,
  filterType,
  filterComponents,
};
