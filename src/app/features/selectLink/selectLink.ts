import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface typeSelectLink {    
    value: number;   
}

const initialState: typeSelectLink = {
    value: 1
};

export const reduxSelectLinkSlice = createSlice({
    name: 'SelectLink',
    initialState,

    reducers: {        
        reduxSetSelectLink: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        }
    }
});

export const { reduxSetSelectLink } = reduxSelectLinkSlice.actions;

export default reduxSelectLinkSlice.reducer;

