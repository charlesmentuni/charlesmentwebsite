import React from "react";
import { NewTerminalWindow } from "../components/newTerminalWindow.jsx";
import classes from './home.module.css';

export function Home(){
    return (
        <div className={classes.main}>
            <NewTerminalWindow />
        </div>
    );
}