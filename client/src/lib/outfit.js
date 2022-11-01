class Outfit {
  constructor() {
    this.updated = false;
    this.localStorageSupported = this.checkLocalStorage();
    this._outfit = null;

    this.initOutfit();
  }

  get() {
    if (!this.localStorageSupported) { return null; }

    return this._outfit;
  }

  initOutfit() {
    try {
      this._outfit = window.localStorage.outfit || [];
      if (typeof this._outfit === 'string' || this._outfit instanceof String) {
        this._outfit = JSON.parse(this._outfit);
      } else {
        this.sync();
      }
    }
    catch (e) {
      console.log('Local storage is unavailable, outfit will be null');
      console.log(e);
      this.localStorageSupported = false;
      this._outfit = [];
    }
  }

  sync() {
    if (!this.localStorageSupported) { return null; }

    try {
      window.localStorage.outfit = JSON.stringify(this._outfit);
    }
    catch (err) {
      console.error('ERROR saving to localStorage');
      console.log(err);
    }

    this.updated = true;
  }

  includes(productId) {
    if (!this.localStorageSupported) { return null; }

    for (let id of this._outfit) {
      if (id === productId) {
        return true;
      }
    }

    return false;
  }

  add(productId) {
    if (!this.localStorageSupported) { return null; }
    const index = this._outfit.indexOf(productId);
    if (index !== -1) {
      this._outfit.unshift(productId);
    } else {
      return this._outfit;
    }

    this.sync();
    return this._outfit;
  }

  remove(productId) {
    if (!this.localStorageSupported) { return null; }

    const i = this._outfit.indexOf(productId);
    if (i === -1) { return this._outfit; }

    this._outfit.splice(i, 1);
    this.sync();
    return this._outfit;
  }

  resetUpdated() {
    this.updated = false;
  }

  checkLocalStorage() {
    const test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}

export const outfit = new Outfit();