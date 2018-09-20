# Google Geocode Parser [![Build Status](https://travis-ci.org/seripap/Google-Geocode-Parser.svg?branch=master)](https://travis-ci.org/seripap/Google-Geocode-Parser)

This is a utility to help parse raw geocoded data returned from Google Geocode API services.

## Usage

```
$ npm install --save google-geocode-parser
```

```
const GeocodeParser = require('google-geocode-parser');
const request = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=247%20water%20street%20brooklyn');
const results = await request.json();
const parsed = new GeocodeParser(results);
```

## API

### getComponent(key, useShort)

Gets an adddress component by `key`. Returns string

#### Params

- `key`: String: Type value (any valid keys from address_components).
- `useShort`: Bool: Returns `short_name` value.

### isType([type])

Verifies if results is a certain type. Returns bool.

#### Params

- `type`: Array: Values to verify

### parse()

Returns a parsed output of the results.

#### Sample

```
{
    formatted,
    address,
    city,
    geometry,
    state,
    zip
}
```

## Helpers

These are simple built in functions designed to quickly parse results returned from the Google Geocode service.

- `.isValid` - Geocode status === OK
- `isNeighborhood()`
- `isAirport()`
- `isCity()`
- `isAddress()`
- `isState()`
- `isCounty()`
- `isZip()` 
- `getCity()`
- `getState()`
- `getNeighborhood()`
- `getZip()`
- `getGeo()`
- `getStreetNumber()`
- `getStreetAddress()`
- `getSuffix()`
- `getPredirectional()`
- `getPostdirectional()`
- `getStreetName()`
- `getLat()`
- `getLng()`
- `getLatLng()`
