module.exports.updated = false;
module.exports.localStorageSupported = true;

module.exports.get = () => {
  let outfit;

  try {
    outfit = window.localStorage.outfit || [];
    if (typeof outfit === 'string' || outfit instanceof String) {
      // console.log('PRE PARSE', outfit);
      outfit = JSON.parse(outfit);
    }
  }
  catch (e) {
    console.log('Local storage is unavailable, outfit will be null');
    console.log(e);
    module.exports.localStorageSupported = false;
    outfit = [];
  }
  // console.log('---> GOT OUTFIT', outfit);
  return outfit;
}

module.exports.set = (outfit) => {
  if (!module.exports.localStorageSupported) { return null; }
  try {
    window.localStorage.outfit = JSON.stringify(outfit);
  }
  catch (err) {
    console.error('ERROR saving to localStorage');
    console.log(err);
  }
}

module.exports.includes = (productId) => {
  if (!module.exports.localStorageSupported) { return null; }
  const outfit = module.exports.get();

  for (let id of outfit) {
    if (id === productId) {
      return true;
    }
  }

  return false;
}

module.exports.add = (productId) => {
  if (!module.exports.localStorageSupported) { return null; }
  const outfit = module.exports.get();
  outfit.unshift(productId);
  module.exports.set(outfit);
  module.exports.updated = true;
  return outfit;
}

module.exports.remove = (productId) => {
  if (!module.exports.localStorageSupported) { return null; }
  const outfit = module.exports.get();
  const i = outfit.indexOf(productId);
  if (i !== -1) { return outfit; }
  const newOutfit = [...outfit];
  outfit.splice(i, 1);
  module.exports.updated = true;
  return newOutfit;
}

module.exports.resetUpdated = () => {
  module.exports.updated = false;
}
