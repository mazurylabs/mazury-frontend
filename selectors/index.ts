import { RootState } from '@/slices';

export const userSlice = (state: RootState) => state.user;
export const profileSuggestionsSlice = (state: RootState) => {
  return state.profileSuggestions;
};
