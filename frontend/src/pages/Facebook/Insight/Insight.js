import React, {useEffect, useState} from 'react';
import api from "../../../api/facebook";
import DataTable from "../../../components/DataTable";
import { INSIGHT_COLUMNS} from "../tableUtils";
import {Alert} from "@mui/lab";

const Insight = () => {

    const [insight, setInsight] = useState([]);
    useEffect(() => {
        api.getInsights().then((response) =>setInsight(response));
    }, []);


    return (
        <div>
            <Alert style={{display: 'flex', justifyContent:'center', marginBottom: '50px'}} variant="outlined" severity="info"> INSIGHT PAGE </Alert>
            <DataTable rows={insight} columns={INSIGHT_COLUMNS} read_only={true}/>
        </div>
    )
}

export default Insight;