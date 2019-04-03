const GeocodeUtils = require('../src/index.js');

const mockCityData = require('../__mocks__/sample-city.json');
const mockPropertyData = require('../__mocks__/sample-property.json');
const mockPredirectionalData = require('../__mocks__/sample-predirectional.json');
const mockPostdirectionalData = require('../__mocks__/sample-postdirectional.json');
const mockBadData = require('../__mocks__/sample-bad.json');
const mockNeighbor = require('../__mocks__/sample-neighborhood.json');
const mockNoSuffix = require('../__mocks__/sample-property-noSuffix.json');
const mockSuffixInStreetName = require('../__mocks__/sample-property-suffixInStreetName.json');

describe('GeocodeUtils', () => {
  it('Should return an instance of itself', () => {
    expect (new GeocodeUtils).toBeInstanceOf(GeocodeUtils);
  });

  it('_pluck should pull from results', () => {
    const utils = new GeocodeUtils();
    const utilsWithData = new GeocodeUtils(mockCityData);
    expect(utils.data).toBe(null);
    expect(utilsWithData.data).toBeDefined();
    expect(utilsWithData.isValid).toBe(true);
  });

  it('Should not init with status !== OK', () => {
    const utilsWithBadData = new GeocodeUtils(mockBadData);
    expect(utilsWithBadData.data).toBe(null);
    expect(utilsWithBadData.isValid).toBe(false);
  });
});

describe('GeocodeUtils for a city', () => {
  let city = null;

  beforeEach(() => city = new GeocodeUtils(mockCityData) );

  it('Should parse city data correctly', () => {
    expect(city.isCity()).toBe(true);
    expect(city.isNeighborhood()).toBe(false);
    expect(city.isAddress()).toBe(false);
    expect(city.isState()).toBe(false);
    expect(city.isCounty()).toBe(false);
  });

  it('Should just parse', () => {
    expect(city.parse()).toMatchSnapshot();
  });

  it('Should get parsable data from helpers', () => {
    expect(city.getCity()).toBe('Miami');
    expect(city.getCountry()).toBe('United States');
    expect(city.getNeighborhood()).toBe(null);
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
    expect(property.isNeighborhood()).toBe(false);
    expect(property.isAddress()).toBe(true);
    expect(property.isState()).toBe(false);
    expect(property.isCounty()).toBe(false);
  });

  it('Should just parse', () => {
    expect(property.parse()).toMatchSnapshot();
  });

  it('Should get parsable data from helpers', () => {
    expect(property.getCity()).toBe('Brooklyn');
    expect(property.getCountry()).toBe('United States');    
    expect(property.getNeighborhood()).toBe('Vinegar Hill');
    expect(property.getState()).toBe('New York');
    expect(property.getZip()).toBe('11201');
    expect(property.getGeo()).toBeDefined();
    expect(property.getStreetNumber()).toBe('247');
    expect(property.getStreetAddress()).toBe('Water Street');
    expect(property.getSuffix()).toBe('Street');
    expect(property.getPredirectional()).toBe(null);
    expect(property.getPostdirectional()).toBe(null);
    expect(property.getStreetName()).toBe('Water');
    expect(property.getLat()).toBe(40.7031);
    expect(property.getLng()).toBe(-73.984034);
    expect(property.getLatLng()).toBe('40.7031,-73.984034');
  });

  it('Should test custom normalization helpers', () => {
    const predirectional = new GeocodeUtils(mockPredirectionalData);
    const postdirectional = new GeocodeUtils(mockPostdirectionalData);
    const noSuffix = new GeocodeUtils(mockNoSuffix);
    const suffixInStreetName = new GeocodeUtils(mockSuffixInStreetName);

    // predirectional
    expect(predirectional.getSuffix()).toBe('Place');
    expect(predirectional.getSuffix(true)).toBe('Pl');
    expect(predirectional.getPredirectional()).toBe('North');
    expect(predirectional.getPredirectional(true)).toBe('N');
    expect(predirectional.getPostdirectional()).toBe(null);
    expect(predirectional.getStreetName()).toBe('Ridge');

    // postdirectional
    expect(postdirectional.getSuffix()).toBe('Drive');
    expect(postdirectional.getSuffix(true)).toBe('Dr');
    expect(postdirectional.getPredirectional()).toBe(null);
    expect(postdirectional.getPostdirectional()).toBe('West');
    expect(postdirectional.getPostdirectional(true)).toBe('W');
    expect(postdirectional.getStreetName()).toBe('Walsh');

    // no suffix
    expect(noSuffix.getStreetAddress()).toBe('Durham East');
    expect(noSuffix.getStreetName()).toBe('Durham');
    expect(noSuffix.getPredirectional()).toBe(null);
    expect(noSuffix.getPredirectional(true)).toBe(null);
    expect(noSuffix.getPostdirectional()).toBe('East');
    expect(noSuffix.getPostdirectional(true)).toBe('E');
    expect(noSuffix.getSuffix()).toBe(null);
    expect(noSuffix.getSuffix(true)).toBe(null);

    // suffix in steet name
    expect(suffixInStreetName.parse().formatted).toBe('4539 86th Street Ct W, Bradenton, FL 34210, USA');
    expect(suffixInStreetName.getStreetAddress()).toBe('86th Street Court West');
    expect(suffixInStreetName.getStreetAddress(true)).toBe('86th Street Ct W');
    expect(suffixInStreetName.getStreetName()).toBe('Street');
    expect(suffixInStreetName.getSuffix()).toBe('Court');
    expect(suffixInStreetName.getSuffix(true)).toBe('Ct');
  });
});

describe('GeocodeUtils for neighborhood', () => {
  let hood = null;

  beforeEach(() => hood = new GeocodeUtils(mockNeighbor) );

  it('Should parse neighborhood data correctly', () => {
    expect(hood.isCity()).toBe(true);
    expect(hood.isNeighborhood()).toBe(true);
    expect(hood.getNeighborhood()).toBe('North Beach Haven');
  });

});
