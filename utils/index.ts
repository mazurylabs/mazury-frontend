import axios from 'axios';
import { Skill, ThemeColor } from 'types';
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

type MonthDigit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const getMonthName = (month: MonthDigit) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[month - 1];
};

export const getMonthAndYear = (date: Date) => {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${getMonthName(month as MonthDigit).slice(0, 3)} ${year}`;
};

export const skillsList: Skill[] = [
  'frontendDev',
  'backendDev',
  'smartContractDev',
  'protocolDev',
  'design',
  'growthMarketing',
  'writing',
  'productManagement',
  'projectManagement',
  'dataScience',
  'art',
  'defiDegen',
  'nftDegen',
  'teaching',
  'memes',
  'community',
];

export const toCamelCase = (text: string) => {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (leftTrim, index) =>
      index === 0 ? leftTrim.toLowerCase() : leftTrim.toUpperCase()
    )
    .replace(/\s+/g, '');
};
