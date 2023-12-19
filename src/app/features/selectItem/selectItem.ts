import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface typeSelectItem {    
    status: number;   
}

const initialState: typeSelectItem = {
    status: 1
};

export const reduxSelectItemSlice = createSlice({
    name: 'selectItem',
    initialState,

    reducers: {        
        reduxUpdateSelectItem: (state, action: PayloadAction<number>) => {
            state.status = action.payload;
        }
    }
});

export const { reduxUpdateSelectItem } = reduxSelectItemSlice.actions;

export default reduxSelectItemSlice.reducer;

