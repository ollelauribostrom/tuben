import axios from 'axios';

export function buildParam(key, value) {
  return `${key}=${value}`;
}

export function buildQueryString(parameters) {
  return Object.entries(parameters)
    .map(([key, value]) => buildParam(key, value))
    .join('&');
}

export function buildUrl() {

}

