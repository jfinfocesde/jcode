import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// export interface typeProfile {   
//     avatar_url: string | null
//     full_name: string | null
//     group_id: number | null
//     id: string
//     lock: boolean | null
//     role: string | null
//     routes: string | null
//     updated_at: string | null
// }

interface typeProfile {
    value:string
}

const initialState: typeProfile  = {
    value: '{}'
};

export const reduxProfileSlice = createSlice({
    name: 'Profile',
    initialState,

    reducers: {
        reduxSetProfile: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    }
});

export const { reduxSetProfile } = reduxProfileSlice.actions;

export default reduxProfileSlice.reducer;

