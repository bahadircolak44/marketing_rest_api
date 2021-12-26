import React, {useState} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {Button, Dialog, DialogTitle, List, ListItem, ListItemText, TextField} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 100,
        height: 380,
        width: '100%',
    },
    button: {
        display: 'flex !important',
        marginBottom: '15px !important',
    },
    list: {marginBottom: '20px'},
    textField: {margin: '10px'}
}));
const DataTable = ({columns, rows, onClickAdd, read_only}) => {


    const [openRow, setOpenRow] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const classes = useStyles();
    const handleClick = (params) => {
        const showItem = columns.map((item) => {
            return {
                ...item,
                value: params.row[item.field]
            }
        })
        setOpenRow(true)
        setSelectedRows(showItem)
    }

    const handleClose = () => {
        setOpenRow(false);
        setSelectedRows([])
    };

    return (
        <div className={classes.root}>
            {!read_only ? (<Button
                variant="contained"
                style={{display: 'flex', marginBottom: '15px'}}
                onClick={onClickAdd}
                size='large'
                outlinedSizeLarge
            >
                Create
            </Button>) : null}
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                // checkboxSelection
                onCellClick={handleClick}
            />
            <Dialog fullWidth onClose={handleClose} open={openRow}>
                <DialogTitle>Detail</DialogTitle>
                <List className={classes.list}>
                    {selectedRows.map((item) => (
                        <ListItem button key={item.field}>
                            <TextField
                                fullWidth
                                id={item.field}
                                name={item.field}
                                label={item.headerName}
                                value={item.value}
                                variant="outlined"
                                className={classes.textField}
                                disabled
                            />
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        </div>
    )
}

export default DataTable;