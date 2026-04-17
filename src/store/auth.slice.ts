import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  id: string | null;
  name: string | null;
  email: string | null;
}

const initialState: AuthState = {
  id: null,
  name: null,
  email: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ id: string; name: string; email: string }>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearUser(state) {
      state.id = null;
      state.name = null;
      state.email = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectUserId = (state: { auth: AuthState }): string | null => state.auth.id;
export const selectUser = (state: { auth: AuthState }): AuthState => state.auth;
