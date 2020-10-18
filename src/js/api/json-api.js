export default class JsonApi {
  constructor(baseUrl, options = {}) {
    this._baseUrl = baseUrl;
    this._options = options;
  }

  async _fetchJson(path, method = 'GET', data = null) {
    const options = { ...this._options, method };
    if (data) {
      options.headers = options.headers || {};
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(data);
    }
    const response = await fetch(`${this._baseUrl}${path}`, options);
    let result;
    if (response.headers.get('Content-Type').includes('application/json')) {
      result = await response.json();
    } else {
      result = await response.text();
    }
    if (response.ok) {
      return result;
    }
    const error = new Error(result.message || result || `Server error ${response.status}`);
    error.code = response.status;
    throw error;
  }
}
