
class Cache {
  constructor(duration) {
    this.duration = duration;
    this._cache = {};
  }

  store(key, data) {
    this._cache[key] = {
      timestamp: Date.now(),
      data: data
    };
  }

  get(key) {
    const entry = this._cache[key];
    if (!entry || this.isStale(entry.timestamp)) {
      return null;
    }

    return entry.data;
  }

  isStale(timestamp) {
    return (Date.now() - timestamp) > this.duration;
  }
}

module.exports = Cache;