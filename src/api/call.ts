import fetch from 'isomorphic-fetch';
import { BACKEND_ORIGIN } from 'app/constants/origins';
import * as R from 'ramda';
import { APIStatusCodeError } from './APIStatusCodeError';

type GetParamValue = string | string[];
type GetParams = {} | { [key: string]: GetParamValue };

type BuildQueryString = (params: GetParams) => string;
const buildQueryString: BuildQueryString = R.pipe(
  R.toPairs,
  R.map(([key, value]: R.KeyValuePair<string, GetParamValue>) =>
    Array.isArray(value)
      ? value
          .map(
            (valueItem: string) =>
              `${encodeURIComponent(key)}[]=${encodeURIComponent(valueItem)}`
          )
          .join('&')
      : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  ),
  R.join('&'),
  R.concat('?')
);

export const get = (path: string, data: object = {}) => {
  const endpoint = path.startsWith('http') ? path : BACKEND_ORIGIN + path;
  const queryString = R.isEmpty(data) ? '' : buildQueryString(data);
  return fetch(`${endpoint}${queryString}`, { mode: 'cors' }).then(response => {
    if (response.status >= 400) {
      throw new APIStatusCodeError(response);
    }
    return response.json();
  });
};

export const post = (path: string, data: {} | []) =>
  fetch(path.startsWith('http') ? path : BACKEND_ORIGIN + path, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    if (response.status === 204) {
      return true;
    }
    return response.json();
  });
