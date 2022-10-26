class Outfit {
  constructor() {
    this.updated = false;
    this.localStorageSupported = true;
  }

  get() {
    let outfit;

    try {
      outfit = window.localStorage.outfit || [];
      if (typeof outfit === 'string' || outfit instanceof String) {
        outfit = JSON.parse(outfit);
      }
    }
    catch (e) {
      console.log('Local storage is unavailable, outfit will be null');
      console.log(e);
      this.localStorageSupported = false;
      outfit = [];
    }
    // console.log('---> GOT OUTFIT', outfit);
    return outfit;
  }

  set(outfit) {
    if (!this.localStorageSupported) { return null; }
    try {
      window.localStorage.outfit = JSON.stringify(outfit);
    }
    catch (err) {
      console.error('ERROR saving to localStorage');
      console.log(err);
    }
  }

  includes(productId) {
    if (!this.localStorageSupported) { return null; }
    const outfit = this.get();

    for (let id of outfit) {
      if (id === productId) {
        return true;
      }
    }

    return false;
  }

  add(productId) {
    if (!this.localStorageSupported) { return null; }
    const outfit = this.get();
    outfit.unshift(productId);
    this.set(outfit);
    this.updated = true;
    return outfit;
  }

  remove(productId) {
    if (!this.localStorageSupported) { return null; }
    const outfit = this.get();
    const i = outfit.indexOf(productId);
    if (i !== -1) { return outfit; }
    const newOutfit = [...outfit];
    outfit.splice(i, 1);
    this.updated = true;
    return newOutfit;
  }

  resetUpdated() {
    this.updated = false;
  }
}

export const outfit = new Outfit();