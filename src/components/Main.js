import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import {donate} from './utils/web3utils.js';
import './App.css';

function Main (props) {
    const [trees, setTrees] = useState(0);
    const [footprint, setFootprint] = useState(0);

    const handleChange = (event) => {
        const fprint = event.target.value;
        setFootprint(fprint);
        const ntrees = Math.round(fprint/0.07);
        setTrees(ntrees);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await donate(trees, trees/2500);
    };

    return(
        <React.Fragment>
            <center>
            <br/><br/>
            <h5 className="rew2">Welcome { props.account.substring(0, 15) }{ props.account.length >= 10 && `.....` }</h5>
            <h5 className="rew3">You have contributed {props.myScore} Trees</h5>
            <br/><br/>
            <Box
                component="form"
                sx={{
                    width: 600,
                    height: 700,
                    backgroundColor: "white"
                }}
            >
                <form onSubmit={handleSubmit} >
                <FormControl  variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
                <Input
                    id="footprint"
                    value= {footprint}
                    onChange={handleChange}
                    endAdornment={<InputAdornment position="end">TONS CO2</InputAdornment>}
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{
                    'aria-label': 'weight',
                    }}
                />
                <FormHelperText id="standard-weight-helper-text">Enter Carbon Footprint</FormHelperText>
                <br/><br/><br/>
                <h2 className="rew">It takes {trees} trees to offset your footprint</h2>
                <br/>
                <h2 className="rew1">This amounts to ${trees}</h2>
                <br/><br/>
                <button  
                    className="BackupButton"           
                    style={{
                        margin: "20px",
                        backgroundColor: "tomato",
                    }}   
                    onClick={handleSubmit}         
                >
                    Donate
                </button>
                </FormControl>
                </form>
            </Box>
            <br/><br/><br/><br/>
            </center>
        </React.Fragment>
    );
}

export default Main;