/* eslint-disable no-unused-vars */
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_WEATHER_BASE_URL,
});
/**
 * ApiClient
 */
class ApiClient {
  /**
   * ApiClient GET request helper
   * @param {*} path Server API endpoint
   * @param {*} params Server request params
   * @return {*} promise
   */
  get(path, params = {}) {
    return instance.get(path, {
      params,
    });
  }

  /**
   * ApiClient POST request helper
   * @param {*} path Server API endpoint
   * @param {*} payload Request payload sent to server
   * @return {*} promise
   */
  post(path, payload) {
    return instance.post(path, payload);
  }
}

export const ApiRequestClient = new ApiClient();
