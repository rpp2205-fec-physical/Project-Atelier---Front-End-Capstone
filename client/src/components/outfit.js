module.exports.updated = false;

module.exports.get = () => {
  let outfit;

  try {
    outfit = window.localStorage.outfit || [];
    outfit = JSON.parse(outfit);
  }
  catch (e) {
    console.log('Local storage is unavailable, outfit will be null');
    console.log(e);
    outfit = null;
  }
  console.log('---> GOT OUTFIT', outfit);
  return outfit;
}

module.exports.set = (outfit) => {
  try {
    window.localStorage.outfit = JSON.stringify(outfit);
  }
  catch (err) {
    console.error('ERROR saving to localStorage');
    console.log(err);
  }
}

module.exports.includes = (productId) => {
  const outfit = module.exports.get();

  for (let id of outfit) {
    if (id === productId) {
      return true;
    }
  }

  return false;
}

module.exports.add = (productId) => {
  const outfit = module.exports.get();
  outfit.unshift(productId);
  module.exports.set(outfit);
  module.exports.updated = true;
  return outfit;
}

module.exports.remove = (productId) => {
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
