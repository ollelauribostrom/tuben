import axios from 'axios';

export function buildParam(key, value) {
  return `${key}=${value}`;
}

export function buildQueryString(parameters) {
  return Object.entries(parameters)
    .map(([key, value]) => buildParam(key, value))
    .join('&');
}

export function buildUrl(url, parameters) {
  if (!parameters) {
    return url;
  }

  return `${url}?${buildQueryString(parameters)}`;
}

export async function get(url, parameters) {
  const { data } = axios.get(buildUrl(url, parameters));
  return data;
}
