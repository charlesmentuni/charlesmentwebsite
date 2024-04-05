import { useEffect } from "react";

import { useState } from "react";

import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { MenuItem, Toolbar } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import classes from './Navbar.module.css';
import {Link} from 'react-router-dom';

export function Navbar(){
    return (
    //     <div className={classes.navbar1}>
    //    <li className={classes.navbar}>
    //         <ul>
    //             <Link to="/"> Home </Link> 
    //         </ul>
    //         <ul>
    //             <Link to="/about">About</Link>
    //         </ul>
    //    </li>
    //    </div>
    <AppBar position="static">
        <Toolbar>
            
        </Toolbar>
    </AppBar>
    );
}