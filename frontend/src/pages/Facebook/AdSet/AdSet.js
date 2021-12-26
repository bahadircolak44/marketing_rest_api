import React, {useEffect, useState} from 'react';
import api from "../../../api/facebook";
import DataTable from "../../../components/DataTable";
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {ADSET_COLUMNS, BILLING_EVENT_ENUM, OPTIMIZATION_GOAL_ENUM} from "../tableUtils";
import {Alert} from "@mui/lab";

const initialFormState = {
    values: {
        name: '',
        campaign: '',
        daily_budget: '',
        bid: '',
        billing_event: 'IMPRESSIONS',
        optimization_goal: 'IMPRESSIONS'
    },
    touched: {},
    errors: {},
};

const AdSet = () => {

    const [formState, setFormState] = useState(initialFormState);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const [adSets, setAdSets] = useState([]);
    const [campaigns, setCampaign] = useState([]);

    useEffect(() => {
        api.getAdSets().then((response) => setAdSets(response));
        api.getCampaigns().then((response) => setCampaign(response));
    }, []);

    const handleClose = () => {
        setOpenDialog(false);
        setFormState(initialFormState)
    };

    const handleOpen = () => {
        setOpenDialog(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        api.addAdSets({...formState.values}).then(() => {
            handleClose()
            setLoading(false)
            window.location.reload();
        }).catch((error) => {
            console.log('ERROR: ', error)
            handleClose()
            setLoading(false)
        })
    };

    const handleChange = (event) => {
        event.persist();

        setFormState({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]: event.target.value,
            },
            touched: {
                ...formState.touched,
                [event.target.name]: true,
            },
        });
    };
    return (
        <div>

            <Alert style={{display: 'flex', justifyContent:'center', marginBottom: '50px'}} variant="outlined" severity="info"> ADSET PAGE </Alert>
            <DataTable rows={adSets} columns={ADSET_COLUMNS} onClickAdd={handleOpen} />
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="AdSet Name"
                            value={formState.values.name}
                            type="text"
                            variant="outlined"
                            style={{marginTop: '20px'}}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            select
                            id="campaign"
                            name="campaign"
                            label="Campaign"
                            value={formState.values.campaign}
                            variant="outlined"
                            style={{marginTop: '20px'}}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            SelectProps={{ native: true }}
                        >
                            {campaigns.map((item, id) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            fullWidth
                            id="daily_budget"
                            name="daily_budget"
                            label="Daily Budget"
                            value={formState.values.daily_budget}
                            type="text"
                            variant="outlined"
                            style={{marginTop: '20px'}}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            id="bid"
                            name="bid"
                            label="BID"
                            value={formState.values.bid}
                            type="text"
                            variant="outlined"
                            style={{marginTop: '20px'}}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            select
                            id="billing_event"
                            name="billing_event"
                            label="Billing Event"
                            value={formState.values.billing_event}
                            variant="outlined"
                            style={{marginTop: '20px'}}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            SelectProps={{ native: true }}
                        >
                            <option
                                value=""
                                style={{
                                    fontStyle: 'italic',
                                    color: '-internal-light-dark(graytext, rgb(170, 170, 170))',
                                }}>
                                Please select a Billing Event
                            </option>
                            {BILLING_EVENT_ENUM.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            fullWidth
                            select
                            id="optimization_goal"
                            name="optimization_goal"
                            label="Optimization Goal"
                            value={formState.values.optimization_goal}
                            variant="outlined"
                            style={{marginTop: '20px'}}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            SelectProps={{ native: true }}
                        >
                            <option
                                value=""
                                style={{
                                    fontStyle: 'italic',
                                    color: '-internal-light-dark(graytext, rgb(170, 170, 170))',
                                }}>
                                Please select a Optimization Goal
                            </option>
                            {OPTIMIZATION_GOAL_ENUM.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>

                    </form>
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        onClick={handleSubmit}
                        loading={loading}
                        variant="contained">
                        Create
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AdSet;