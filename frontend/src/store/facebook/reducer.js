import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    loading: false,
    campaigns: [],
    adSets: [],
    ads: []
};
const name = 'facebook'

const facebookReducer = createSlice(
    {
        name,
        initialState,
        reducers: {
            addCampaign(state, action) {
                state.campaigns.push(action.payload)
            },
            addAdSet(state, action) {
                state.adSets.push(action.payload)
            },
            addAd(state, action) {
                state.ads.push(action.payload)
            }
        }
    })

export const actions = facebookReducer.actions;

export default facebookReducer.reducer;