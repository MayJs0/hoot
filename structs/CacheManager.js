const { isEqual } = require('lodash');

class CacheManager {
  props = new Set();
  data = new Map();
  buffers = new Map();

  addProp(name) {
    this.props.add(name);
  }

  deleteProp(name) {
    this.props.delete(name);
  }

  setData(id, data, buffer) {
    if (!this.isValidData(data)) return false;
    
    this.data.set(id, data);
    this.buffers.set(id, buffer);

    return true;
  }

  updateData(id, data, buffer) {
    if (!this.data.has(id)) return false;

    const keys = Object.keys(data)
      .filter(key => this.props.has(key));

    const newData = keys.reduce((acc, curr) => ({
      ...acc,
      [curr]: data[curr]
    }), this.data.get(id));

    this.data.set(id, newData);
    this.buffers.set(id, buffer);

    return true;
  }

  isValidData(data) {
    const keys = Object.keys(this.props);
    return keys.every(key => Object.keys(data).includes(key));
  }

  isCached(id, data) {
    const cached = this.data.get(id);
    if(!cached || !this.buffers.has(id)) return false;
    
    const keys = Object.keys(data);

    return keys.every(key => isEqual(cached[key], data[key]))
  }
}

module.exports = CacheManager;