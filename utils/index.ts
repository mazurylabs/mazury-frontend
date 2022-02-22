import axios from 'axios';
import { ThemeColor } from 'types';
import { theme } from '../tailwind.config';

export const getTruncatedAddress = (
  address: string,
  length: number = 10
): string => {
  return `${address.slice(0, length)}...${address.slice(
    address.length - length
  )}`;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const goToLink = (link: string) => {
  window.open(link, '_blank');
};

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.substring(1);
}

export function toCapitalizedWord(word: string) {
  var words = word.match(/[A-Za-z][a-z]*/g) || [];
  return words.map(capitalize).join(' ');
}

export const colors = theme.extend.colors;
