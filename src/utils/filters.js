function filterType(data, types) {
  for (let i = 0; i < types.length; i += 1) {
    if (data.types.find(propertyType => propertyType === types[i])) {
      return true;
    }
  }
  return false;
}

function filterComponents(components, key, useShort = false) {
  if (components.length === 0 || (Object.keys(components).length === 0 && components.constructor === Object)) {
    return null;
  }
  const component = components.find(component => component.types.find(type => type === key)) || null;

  if (component) {
    return getTextFromComponent(component, useShort);
  }

  return component;
}

function getTextFromComponent(component = null, short = false) {
  if (!component) {
    return null;
  }
  return short ? component.short_name : component.long_name;
} 


module.exports = {
  filterType,
  filterComponents
}
