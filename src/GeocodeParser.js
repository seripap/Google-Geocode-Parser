const { parseRoute, filterType, filterComponents } = require('./utils/index')

/**
 * We are parsing raw data from the google geocode API
 * These data objects must mimic what is provided as a
 * response from Google APIs (see __mocks__)
 */
function __internals_get_results(data = {}) {
  const { results = null, status = null } = data || {};

  if (status !== 'OK') {
    return null;
  }

  return results ? results[0] : null;
}


class GeocodeParser {
  constructor(data = {}) {
    this.data = __internals_get_results(data);
    this.parsedRoute = parseRoute(this.getStreetAddress(true));
  }

  get isValid() {
    return this.data ? true : false;
  }

  sanitizeStreetName(str) {
    if (!this.parsedRoute.streetName && !this.parsedRoute.streetName.replacedName) {
      return str;
    }

    const { replacedName, name } = this.parsedRoute.streetName;

    return str.replace(replacedName, name);
  }

  getComponent(key, useShort = false) {
    if (!this.data) {
      return null;
    }
    return filterComponents(this.data.address_components, key, useShort);
  }

  isType(type = []) {
    if (!this.data) {
      return false;
    }

    return filterType(this.data, type);
  }

  isCity() {
    return this.isType(['locality', 'sublocality', 'political', 'sublocality_level_1', 'sublocality_level_2', 'sublocality_level_3', 'sublocality_level_4', 'sublocality_level_5']);
  }

  isNeighborhood() {
    return this.isType(['neighborhood']);
  }

  isAddress() {
    return this.isType(['street_address', 'street_number', 'route', 'premise', 'subpremise', 'point_of_interest', 'park', 'airport']);
  }

  isAirport() {
    return this.isType(['airport']);
  }

  isState() {
    return this.isType(['administrative_area_level_1']);
  }

  isCounty() {
    return this.isType(['administrative_area_level_2']);
  }

  isZip() {
    return this.isType(['postal_code']);
  }

  getStreetNumber(useShort) {
    if (!this.isAddress()) {
      return null;
    }
    return this.getComponent('street_number', useShort);
  }

  getStreetAddress(useShort) {
    if (!this.isAddress()) {
      return null;
    }

    if (useShort && this.parsedRoute && this.parsedRoute.streetName && this.parsedRoute.streetName.replacedName) {
      return this.sanitizeStreetName(this.getComponent('route', useShort));
    }

    return this.getComponent('route', useShort);
  }

  getCity(useShort = false) {
    return this.getComponent('locality', useShort) || this.getComponent('sublocality', useShort);
  }

  getCountry(useShort = false) {
    return this.getComponent('country', useShort);
  }

  getState(useShort = false) {
    return this.getComponent('administrative_area_level_1', useShort);
  }

  getZip(useShort = false) {
    return this.getComponent('postal_code', useShort);
  }

  getNeighborhood(useShort = false) {
    return this.getComponent('neighborhood', useShort);
  }

  getGeo() {
    return this.data.geometry;
  }

  getSuffix(useShort = false) {
    if (!this.isAddress() || !this.parsedRoute || !this.parsedRoute.suffix) {
      return null;
    }

    if (useShort) {
      return this.parsedRoute.suffix.shortName;
    }

    return this.parsedRoute.suffix.longName;
  }

  getPredirectional(useShort = false) {
    if (!this.isAddress() || !this.parsedRoute || !this.parsedRoute.predirectional) {
      return null;
    }
    if (useShort) {
      return this.parsedRoute.predirectional.shortName;
    }

    return this.parsedRoute.predirectional.longName;
  }

  getPostdirectional(useShort = false) {
    if (!this.isAddress() || !this.parsedRoute || !this.parsedRoute.postdirectional) {
      return null;
    }

    if (useShort) {
      return this.parsedRoute.postdirectional.shortName;
    }

    return this.parsedRoute.postdirectional.longName;
  }

  getStreetName() {
    if (!this.isAddress() || !this.parsedRoute || !this.parsedRoute.streetName) {
      return null;
    }

    return this.parsedRoute.streetName.name;
  }

  getLat() {
    const geo = this.getGeo();

    if (geo && geo.location) {
      if (typeof geo.location.lat === 'function') {
        return geo.location.lat();
      }
      return geo.location.lat;
    }

    return null;
  }

  getLng() {
    const geo = this.getGeo();

    if (geo && geo.location) {
      if (typeof geo.location.lng === 'function') {
        return geo.location.lng();
      }
      return geo.location.lng;
    }

    return null;
  }

  getLatLng() {
    const lat = this.getLat();
    const lng = this.getLng();

    if (lat && lng) {
      return `${lat},${lng}`;
    }

    return null;
  }

  parse() {
    return {
      formatted: this.parsedRoute && this.parsedRoute.streetName && this.parsedRoute.streetName.replacedName ? this.sanitizeStreetName(this.data.formatted_address) : this.data.formatted_address,
      address: this.getComponent('street_address'),
      city: this.getComponent('locality') || this.getComponent('sublocality'),
      geometry: this.data.geometry,
      state: this.getComponent('administrative_area_level_1'),
      zip: this.getComponent('postal_code'),
    }
  }
}


module.exports = GeocodeParser;
