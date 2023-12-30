import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface typeLeftSidebarLink {    
    name:string;
    links: string[];  
}

const temp: typeLeftSidebarLink = {   
    name: "Inicio",
    links: []
}

interface LinkState {
    links: typeLeftSidebarLink;
}

const initialState: LinkState = {
    links: temp
};

export const reduxLeftSidebarLinkSlice = createSlice({
    name: 'LeftSidebarLink',
    initialState,

    reducers: {       
        reduxSetLeftSidebarLink: (state, action: PayloadAction<typeLeftSidebarLink>) => {
            state.links = action.payload;
        }
    }
});

export const { reduxSetLeftSidebarLink } = reduxLeftSidebarLinkSlice.actions;

export default reduxLeftSidebarLinkSlice.reducer;

