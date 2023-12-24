import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface typeLink {    
    name:string;
    links: string[];  
}

const temp: typeLink = {   
    name: "home",
    links: ["/home"]
}

interface LinkState {
    linkList: typeLink;
}

const initialState: LinkState = {
    linkList: temp
};

export const reduxLinkSlice = createSlice({
    name: 'links',
    initialState,

    reducers: {       
        reduxUpdateLinkList: (state, action: PayloadAction<typeLink>) => {
            state.linkList = action.payload;
        }
    }
});

export const { reduxUpdateLinkList } = reduxLinkSlice.actions;

export default reduxLinkSlice.reducer;

