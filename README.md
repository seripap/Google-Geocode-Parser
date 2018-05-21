# Google Geocode Parser
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fseripap%2FGoogle-Geocode-Parser.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fseripap%2FGoogle-Geocode-Parser?ref=badge_shield)


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

- `isCity()`
- `isAddress()`
- `isState()`
- `isCounty()`
- `isZip()` 
- `getCity()`
- `getState()`
- `getZip()`
- `getGeo()`


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fseripap%2FGoogle-Geocode-Parser.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fseripap%2FGoogle-Geocode-Parser?ref=badge_large)