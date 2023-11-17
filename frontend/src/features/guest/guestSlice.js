import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import guestService from './guestService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  courses: [],
}

// Adding admin
export const sendAnswerToGPT = createAsyncThunk(
  '/chat',
  async ( x,thunkAPI) => {
    try {
      return await guestService.sendAnswerToGPT()
    } catch (error) {        
      const message =
        (error.response.data && error.response && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const guestSlice = createSlice({
  name: 'guest',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    //   state.courses = []
    },
    hardReset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendAnswerToGPT.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false

      })
      .addCase(sendAnswerToGPT.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.courses = action.payload
      })
      .addCase(sendAnswerToGPT.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset,hardReset } = guestSlice.actions
export default guestSlice.reducer