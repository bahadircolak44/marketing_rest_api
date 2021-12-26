import React, {useEffect, useState} from 'react';
import api from "../../../api/facebook";
import Parser from 'html-react-parser';
import {Alert} from "@mui/lab";
import {Buffer} from 'buffer';

const Preview = () => {
    const [preview, setPreview] = useState([]);
    useEffect(() => {
        api.getPreview().then((response) => setPreview(response));
    }, []);

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>

            <Alert style={{display: 'flex', justifyContent:'center', marginBottom: '50px'}} variant="outlined" severity="info"> PREVIEW PAGE </Alert>
            {preview.map((item, index)=> (
               <div style={{marginTop: "50px"}}>
                   <Alert icon={false} style={{'display': 'flex',marginBottom: '20px'}} gutterBottom>{item.name}</Alert>
                    <div>{Parser(Buffer.from(item.body, 'base64').toString())}</div>
               </div>
            ))}
        </div>
    )
}

export default Preview;