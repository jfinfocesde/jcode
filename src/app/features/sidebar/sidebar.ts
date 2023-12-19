import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface typeSidebar {    
    status: string;   
}

const initialState: typeSidebar = {
    status: 'home'
};

export const reduxSidebarSlice = createSlice({
    name: 'sidebar',
    initialState,

    reducers: {        
        reduxChangeSidebar: (state, action: PayloadAction<string>) => {
            state.status = action.payload;
        }
    }
});

export const { reduxChangeSidebar } = reduxSidebarSlice.actions;

export default reduxSidebarSlice.reducer;

