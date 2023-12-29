import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginApi } from '../../../api';
import { setLocalItems } from '../../hooks';
import { initialState } from './state';

export const loginUserAction = createAsyncThunk(
  'user/login',
  async (
    userData: { username: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await LoginApi.FetchUserLogin(
        userData.username,
        userData.password,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const userSlice = createSlice({
  initialState: initialState,
  name: 'User/slice',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      setLocalItems(
        'user',
        JSON.stringify(action.payload, (key, value) => {
          return value;
        }),
      );
      state.value = action.payload;
    });
  },
});

export const UserReducer = userSlice.reducer;
