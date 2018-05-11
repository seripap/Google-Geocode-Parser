const GeocodeUtils = require('../src/index.js');

const mockCityData = require('../__mocks__/sample-city.json');
const mockPropertyData = require('../__mocks__/sample-property.json');

describe('GeocodeUtils', () => {
  it('Should return an instance of itself', () => {
    expect (new GeocodeUtils).toBeInstanceOf(GeocodeUtils);
  });

  it('_pluck should pull from results', () => {
    const utils = new GeocodeUtils();
    const utilsWithData = new GeocodeUtils(mockCityData);
    const utilsWithBadData = new GeocodeUtils({ bad: true });
    expect(utils.data).toBe(null);
    expect(utilsWithData.data).toBeDefined();
    expect(utilsWithBadData.data).toBe(null);
  });
});

describe('GeocodeUtils for a city', () => {
  let city = null;
  
  beforeEach(() => city = new GeocodeUtils(mockCityData) );

  it('Should parse city data correctly', () => {
    expect(city.isCity()).toBe(true);
    expect(city.isAddress()).toBe(false);
    expect(city.isState()).toBe(false);
    expect(city.isCounty()).toBe(false);
  });

  it('Should just parse', () => {
    expect(city.parse()).toMatchSnapshot();
  });

  it('Should get parsable data from helpers', () => {
    expect(city.getCity()).toBe('Miami');
    expect(city.getState()).toBe('Florida');
    expect(city.getZip()).toBe(null);
    expect(city.getGeo()).toBeDefined();
  });

});

describe('GeocodeUtils for a property', () => {
  let property = null;
  
  beforeEach(() => property = new GeocodeUtils(mockPropertyData) );

  it('Should parse property data correctly', () => {
    expect(property.isCity()).toBe(false);
    expect(property.isAddress()).toBe(true);
    expect(property.isState()).toBe(false);
    expect(property.isCounty()).toBe(false);
  });
  
  it('Should just parse', () => {
    expect(property.parse()).toMatchSnapshot();
  });

  it('Should get parsable data from helpers', () => {
    expect(property.getCity()).toBe('Brooklyn');
    expect(property.getState()).toBe('New York');
    expect(property.getZip()).toBe('11201');
    expect(property.getGeo()).toBeDefined();
  });
});
