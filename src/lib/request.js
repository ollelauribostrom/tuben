import axios from 'axios';

export function buildParam(key, value) {
  return `${key}=${value}`;
}

export function buildQueryString(parameters) {
  return Object.keys(parameters)
    .map(key => buildParam(key, parameters[key]))
    .join('&');
}
