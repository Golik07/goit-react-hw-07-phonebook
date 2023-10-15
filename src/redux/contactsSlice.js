import { createSlice } from '@reduxjs/toolkit';
import { deleteContacts, getContacts, setContacts } from 'service/api';
import { handlePending, handleRejected } from './helpers';

const contactsSlice = createSlice({
  name: 'myConctacts',
  initialState: { contacts: [], isLoading: false, error: '' },
  extraReducers: builder => {
    builder
      .addCase(getContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(setContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.contacts.unshift(payload);
      })
      .addCase(deleteContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          contact => contact.id !== payload.id
        );
      })
      .addMatcher(action => action.type.endsWith('/pending'), handlePending)
      .addMatcher(action => action.type.endsWith('/rejected'), handleRejected);
  },
});

export const myContactsReducer = contactsSlice.reducer;
