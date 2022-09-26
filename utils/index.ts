import { API_URL } from '@/config';
// import { axios } from '@/lib/axios';
import axios from 'axios';
import { ParsedUrlQuery } from 'querystring';
import type {
  Badge,
  ColorName,
  Profile,
  ProfileSection,
  Referral,
  Skill,
} from 'types';
import { theme } from '../tailwind.config';

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

// Scans an array of referrals and finds out if the user has already referred someone
export const hasAlreadyReferredReceiver = (
  referrals: Referral[],
  receiver: string,
  author: string
) => {
  return referrals.find((referral) => {
    return (
      referral.receiver.eth_address === receiver &&
      referral.author.eth_address === author
    );
  });
};

export const getTwitterConnectionPopupLink = (ethAddress: string) => {
  return `https://twitter.com/intent/tweet?text=I'm%20verifying%20myself%20for%20%40mazuryxyz%20%F0%9F%8C%8A%0a%0ahttps://mzry.me/${ethAddress}`;
};

/**
 * Returns '-' if the value is null or undefined, otherwise returns the value. Useful because 0 || '-' returns '-'
 */
export const getMetricDisplayValue = (
  value: number | null | undefined,
  placeholder: string = '-'
) => {
  return value === null || value === undefined ? placeholder : value;
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

export const getSkillSlugsFromReferral = (referral: Referral) => {
  const { skills } = referral;
  return skills?.map((skill) => skill.slug);
};

const getOffset = (page: number) => {
  return (page - 1) * 20;
};

export const getOffsetArray = (page: number) => {
  const offsets = [];
  for (let i = 1; i <= page; i++) {
    offsets.push(getOffset(i));
  }
  return offsets;
};

export const getSkillsFromProfile = (profile: Partial<Profile>) => {
  const skills = [];
  for (let skill of skillsList) {
    if (profile[skill]) {
      skills.push(skill);
    }
  }
  return skills;
};

export const sectionToColor: { [key in ProfileSection]: ColorName } = {
  Activity: 'indigo',
  Credentials: 'fuchsia',
  Referrals: 'emerald',
  Writing: 'amber',
  DAOs: 'purple',
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
    const hightlighted =
      (query?.badges as string)?.slice(1)?.split('_')?.join(' ') ===
      title.toLowerCase();

    return {
      title,
      hightlighted,
    };
  });

  const validBadges = badges.slice(0, 2);
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
