import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

/**
 * Context for the search view
 */

export interface SearchStateType {
  // the query entered by the user
  searchQuery: string;

  // Here 'touched` means that the user has interacted with the input and that we should be showing results/suggestions
  touched: boolean;

  // To track whether the user has pressed enter and 'searched' or not
  hasSearched: boolean;

  // whether the contactable toggle is toggled
  isContactableToggled: boolean;

  selectedBadgeSlugs: string[];
}

interface SearchContextType {
  searchState: SearchStateType;
  setSearchState: Dispatch<SetStateAction<SearchStateType>>;
}

export const SearchContext = createContext<SearchContextType>({
  searchState: {
    searchQuery: '',
    touched: false,
    hasSearched: false,
    isContactableToggled: false,
    selectedBadgeSlugs: [],
  },
  setSearchState: () => {},
});
