import React from 'react';

class CacheUtil {

  static addToCache(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getFromCache(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static removeFromCache(key) {
    localStorage.removeItem(key);
  }
}

export default CacheUtil;
