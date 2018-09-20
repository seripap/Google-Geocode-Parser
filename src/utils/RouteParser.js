const suffixes = require('./suffixes');
const directionals = require('./directionals');

class RouteParser {
  constructor(routes) {
    this.routes = routes;
    this.parsedRouteComponents = this.checkRouteComponents();
  }

  findType(route, i, suffixIdentified = false) {
    if (directionals.includes(route)) {
      if (i === 0) {
        return 'postdirectional';
      } else {
        return 'predirectional';
      }
    }

    if (suffixes.includes(route) && !suffixIdentified) {
      return 'suffix';
    }

    return 'parsedRoute';
  }

  checkRouteComponents () {
    if (!this.routes) {
      return null;
    }

    const splitRoute = this.routes.trim().split(' ');
    let suffixIdentified = false;

    const parsedRoute = splitRoute.reverse().map((route, i) => {
      let digestedRoute = route;
      const type = this.findType(route.toUpperCase(), i, suffixIdentified);

      if (type === 'suffix') {
        suffixIdentified = true;
      }

      if (type === 'parsedRoute') {
        digestedRoute = `${route} ${splitRoute[i - 1]}`
      }

      return {
        type,
        route: digestedRoute
      };
    });

    return parsedRoute;
  }

  checkSuffix () {
    if (!this.parsedRouteComponents) {
      return null;
    }

    const data = this.parsedRouteComponents.filter(route => route.type === 'suffix');

    return data.length > 0 ? data[0].route : null;
  }

  checkPredirectional () {
    if (!this.parsedRouteComponents) {
      return null;
    }

    const data = this.parsedRouteComponents.filter(route => route.type === 'predirectional');

    return data.length > 0 ? data[0].route : null;
  }

  checkPostdirectional () {
    if (!this.parsedRouteComponents) {
      return null;
    }

    const data = this.parsedRouteComponents.filter(route => route.type === 'postdirectional');

    return data.length > 0 ? data[0].route : null;
  }

  checkParsedRoute () {
    if (!this.parsedRouteComponents) {
      return null;
    }

    const data = this.parsedRouteComponents.filter(route => route.type === 'parsedRoute');

    return data.length > 0 ? data[0].route : null;
  }
}

module.exports = RouteParser;
