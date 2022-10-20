import { Profile } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  suggestions: Profile[];
}

export const initialState: UserState = {
  suggestions: [],
};

const profileSuggestionsSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    setSuggestions: (state, { payload }: PayloadAction<Profile[]>) => {
      state.suggestions = payload;
    },
  },
});

export const { setSuggestions } = profileSuggestionsSlice.actions;

export default profileSuggestionsSlice.reducer;
