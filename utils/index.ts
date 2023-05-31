import { InfiniteData } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { ParsedUrlQuery } from 'querystring';
import type { Badge, ListResponse, Profile, Skill } from 'types';
import { theme } from '../tailwind.config';

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const getTruncatedAddress = (
  address: string | undefined | null,
  length: number = 4
): string => {
  if (!address) {
    return '';
  }

  return `${address.slice(0, length + 2)}...${address.slice(
    address.length - length
  )}`;
};

export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.substring(1);
}

export function toCapitalizedWord(word: string) {
  var words = word.match(/[A-Za-z][a-z]*/g) || [];
  return words.map(capitalize).join(' ');
}

export const colors = theme.extend.colors;

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

export const getTwitterConnectionPopupLink = (ethAddress: string) => {
  return `https://twitter.com/intent/tweet?text=I'm%20verifying%20myself%20for%20%40mazuryxyz%20%F0%9F%8C%8A%0a%0ahttps://mzry.me/${ethAddress}`;
};

const detectIfEthAddress = (str: string) => {
  return /^(0x)?[0-9a-f]{40}$/i.test(str);
};

export const returnTruncatedIfEthAddress = (str: string) => {
  if (detectIfEthAddress(str)) {
    return getTruncatedAddress(str);
  }
  return str;
};

export const commify = (value: number) => {
  let numberString: string | string[] = String(value);

  numberString = numberString.split('').reverse();

  numberString = numberString.reduce((prev, next, index) => {
    let shouldComma = (index + 1) % 3 === 0 && index + 1 < numberString.length;

    let updatedValue = `${prev}${next}`;

    if (shouldComma) {
      updatedValue = `${updatedValue},`;
    }

    return updatedValue;
  }, '');

  numberString = numberString.split('').reverse().join('');

  return numberString;
};

export const truncateString = (str: string, maxLength: number = 50) => {
  return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
};

export const trayAnimation = {
  initial: { y: '100%' },
  animate: {
    y: 0,
    transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
  },
  exit: {
    y: '100%',
    transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
  },
};

export const fadeAnimation = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const getRoles = (data: Profile, query: ParsedUrlQuery) => {
  let keys = Object.entries(data);

  let roles = keys.map(([key, value]) => {
    if (key.startsWith('role') && value) {
      let role = key.split('_')[1];

      return {
        title: role,
        hightlighted: (query?.role as string)?.includes(role),
      };
    }
  });

  const validRoles = roles.filter((role) => Boolean(role)).slice(0, 2);
  let remainder = validRoles.length - 2;

  return { roles: validRoles, remainder: remainder < 1 ? 0 : remainder };
};

export const getHighlightedBadges = (data: Badge[], query: ParsedUrlQuery) => {
  let badges = data.map((badge) => {
    const title = badge.badge_type.title;
    const image = badge.badge_type.image;

    return {
      title,
      image,
    };
  });

  const validBadges = badges.slice(0, 3);
  let remainder = validBadges.length - 2;

  return { badges: validBadges, remainder: remainder < 1 ? 0 : remainder };
};

const wagmiSetupKeys = [
  'wagmi.wallet',
  'walletconnect',
  '-walletlink:https://www.walletlink.org:session:id',
  '-walletlink:https://www.walletlink.org:session:secret',
  '-walletlink:https://www.walletlink.org:session:linked',
  '-walletlink:https://www.walletlink.org:IsStandaloneSigning',
];

export const clearWagmiStorage = () => {
  wagmiSetupKeys.forEach((key) => localStorage.removeItem(key));
};

export const formatNumber = (num: number) => {
  if (!num) return 0;

  if (Math.abs(num) < 1000) {
    return num;
  }

  let shortNumber;
  let exponent;
  let size;
  const sign = num < 0 ? '-' : '';
  const suffixes: Record<string, number> = {
    K: 6,
    M: 9,
    B: 12,
    T: 16,
  };

  num = Math.abs(num);
  size = Math.floor(num).toString().length;

  exponent = size % 3 === 0 ? size - 3 : size - (size % 3);
  shortNumber = `${Math.floor(10 * (num / Math.pow(10, exponent))) / 10}`;

  for (let suffix of Object.keys(suffixes)) {
    if (exponent < suffixes[suffix]) {
      shortNumber += suffix;
      break;
    }
  }

  return sign + shortNumber;
};

export const formatIpfsImage = (url: string) => {
  const prefix = 'https://lens.infura-ipfs.io/ipfs/';
  const urlArray = url.split('//');

  if (urlArray[0].includes('ipfs')) return prefix + url.split('//')[1];

  return url;
};

export const plurify = (count: number, text: string) => {
  if (count > 1) return text + 's';

  return text;
};

export const formatProfileRoute = (url: string, address: string) => {
  const ethAddress =
    ethers.utils.isAddress(address) || address.includes('.eth')
      ? address
      : address + '.eth';

  const urlArray = url.split('/');
  const slicedUrlArray = urlArray.slice(0, 2);
  const normalisedAddress = urlArray[2].includes('.eth')
    ? urlArray[2]
    : urlArray[2] + '.eth';

  const normalisedRoute = slicedUrlArray
    .concat(normalisedAddress, urlArray.slice(3))
    .join('/');

  return {
    normalisedRoute,
    ethAddress,
  };
};

export function convertUnicode(input: string) {
  return input.replace(/\\+u([0-9a-fA-F]{4})/g, (a, b) =>
    String.fromCharCode(parseInt(b, 16))
  );
}

export const matchCategorySlugToHumanName = (categorySlug: string) => {
  switch (categorySlug) {
    case 'frontend_engineer':
      return 'Frontend Engineer';
    case 'backend_engineer':
      return 'Backend Engineer';
    case 'full_stack_engineer':
      return 'Full-Stack Engineer';
    case 'android_engineer':
      return 'Android Engineer';
    case 'ios_engineer':
      return 'iOS Engineer';
    case 'product_designer':
      return 'Product Designer';
    case 'product_manager':
      return 'Product Manager';
    case 'finance':
      return 'Finance';
    case 'recruiter':
      return 'Recruiter';
    case 'business_development':
      return 'Business Development';
    case 'sales':
      return 'Sales';
    case 'marketing':
      return 'Marketing';
    case 'community':
      return 'Community';
    case 'other':
      return 'Other';
    default:
      return 'Other';
  }
};
