import axios from 'axios';

export function buildParam(key, value) {
  return `${key}=${value}`;
}
