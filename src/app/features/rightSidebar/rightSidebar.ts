import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface typeRightSidebar {    
    value: string;   
}

const initialState: typeRightSidebar = {
    value: 'home'
};

export const reduxRightSidebarSlice = createSlice({
    name: 'RightSidebar',
    initialState,

    reducers: {        
        reduxSetRightSidebar: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    }
});

export const { reduxSetRightSidebar } = reduxRightSidebarSlice.actions;

export default reduxRightSidebarSlice.reducer;

