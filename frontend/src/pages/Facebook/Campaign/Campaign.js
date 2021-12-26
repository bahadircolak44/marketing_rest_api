import React, {useEffect, useState} from 'react';
import api from "../../../api/facebook";
import DataTable from "../../../components/DataTable";
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import {CAMPAIGN_COLUMNS, OBJECTIVE_ENUM} from "../tableUtils";
import {Alert} from "@mui/lab";

const initialFormState = {
    values: {
        name: '',
        objective: 'REACH'
    },
    touched: {},
    errors: {},
};

const Campaign = () => {


    const [formState, setFormState] = useState(initialFormState);
    const [campaigns, setCampaign] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
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
        api.addCampaign({...formState.values}).then(() => {
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
            <Alert style={{display: 'flex', justifyContent:'center', marginBottom: '50px'}} variant="outlined" severity="info">CAMPAIGN PAGE</Alert>
            <DataTable rows={campaigns} columns={CAMPAIGN_COLUMNS} onClickAdd={handleOpen}/>
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Campaign Name"
                            value={formState.values.name}
                            type="text"
                            variant="outlined"
                            style={{marginTop: '20px'}}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            select
                            id="objective"
                            name="objective"
                            label="Objective"
                            value={formState.values.objective}
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
                                Please select a Objective
                            </option>
                            {OBJECTIVE_ENUM.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                    </form>
                </DialogContent>
                <DialogActions>
                    {/*<Button onClick={handleClose}>Close</Button>*/}
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

export default Campaign;