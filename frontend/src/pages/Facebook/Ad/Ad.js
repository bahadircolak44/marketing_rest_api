import React, {useEffect, useState} from 'react';
import api from "../../../api/facebook";
import DataTable from "../../../components/DataTable";
import {AD_COLUMNS} from "../tableUtils";
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {Alert} from "@mui/lab";

const initialFormState = {
    values: {
        name: '',
        ad_set: '',
        creative_name: '',
        creative_message: '',
        creative_link: ''
    },
    touched: {},
    errors: {},
};

const Ad = () => {

    const [formState, setFormState] = useState(initialFormState);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const [ads, setAds] = useState([]);
    const [adSets, setAdSets] = useState([]);

    useEffect(() => {
        api.getAds().then((response) =>setAds(response));
        api.getAdSets().then((response) => setAdSets(response));
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
        api.addAd({...formState.values}).then(() => {
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

            <Alert style={{display: 'flex', justifyContent:'center', marginBottom: '50px'}} variant="outlined" severity="info"> AD PAGE </Alert>
            <DataTable rows={ads} columns={AD_COLUMNS} onClickAdd={handleOpen}/>
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Ad Name"
                            value={formState.values.name}
                            type="text"
                            variant="outlined"
                            style={{marginTop: '20px'}}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            select
                            id="ad_set"
                            name="ad_set"
                            label="Ad Set"
                            value={formState.values.ad_set}
                            type="text"
                            variant="outlined"
                            style={{marginTop: '20px'}}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            SelectProps={{ native: true }}
                        >
                            {adSets.map((item, id) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            fullWidth
                            id="creative_name"
                            name="creative_name"
                            label="Creative Name"
                            value={formState.values.creative_name}
                            type="text"
                            variant="outlined"
                            style={{marginTop: '20px'}}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            id="creative_message"
                            name="creative_message"
                            label="Creative Message"
                            value={formState.values.creative_message}
                            type="text"
                            variant="outlined"
                            style={{marginTop: '20px'}}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            id="creative_link"
                            name="creative_link"
                            label="Creative Link"
                            value={formState.values.creative_link}
                            type="text"
                            variant="outlined"
                            style={{marginTop: '20px'}}
                            onChange={handleChange}
                        />
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

export default Ad;