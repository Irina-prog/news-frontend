export default class JsonApi {
  constructor(baseUrl, options = {}) {
    this._baseUrl = baseUrl;
    this._options = options;
  }

  async _fetchJson(path, method = 'GET', data = null) {
    const options = { ...this._options, method };
    if (data) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(data);
    }
    const response = fetch(`${this._baseUrl}${path}`, options);
    if (response.ok) {
      if (response.headers.get('Content-Type').includes('application/json')) {
        const json = await response.json();
        return json;
      }
      const text = await response.text();
      return text;
    }
    throw new Error(`Server error ${response.status}`);
  }
}
