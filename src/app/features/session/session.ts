import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Session } from "@supabase/auth-helpers-nextjs";

export interface typeSession {    
    currentSession: Session | null;   
}

const initialState: typeSession = {
    currentSession: null
};

export const reduxSessionSlice = createSlice({
    name: 'session',
    initialState,

    reducers: {        
        reduxUpdateSession: (state, action: PayloadAction<Session |null>) => {
            state.currentSession = action.payload;
        }
    }
});

export const { reduxUpdateSession } = reduxSessionSlice.actions;

export default reduxSessionSlice.reducer;

