import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = { items: [] } as any

export const fetchItems = createAsyncThunk('items/getItems', async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  return res.json();
});

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items.push(...action.payload)
    })
  }
})

export default itemSlice.reducer