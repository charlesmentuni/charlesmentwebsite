import React, { useState, useEffect } from 'react';
import './newTerminalWindow.css';

export function NewTerminalWindow() {
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState([]);

  // Treat the current directory like a stack to allow for easy navigation
  const [currentDirectory, setCurrentDirectory] = useState([]);

  const directories = {'main' : 
                        [{'projects' : 
                            ['project1', 
                            'project2', 
                            'project3']}, 
                        {'links': 
                            ['github.txt', 
                            'linkedin.txt', 
                            'resume.txt']},
                        "about.txt"]};
    // get height of terminal window
    //const terminalWindow = document.querySelector('.terminal-window');
    //const maxLength = terminalWindow.clientWidth 


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const runCommand = (command) => {
        // parse the command
    // This should get all the files and folders in the current directory
    
    let allFiles = directories.main;
    currentDirectory.forEach((key) =>
    {
        console.log("KEY", key);
        allFiles.forEach((key1) =>
        {
            if (typeof key1 === 'object' && key === Object.keys(key1)[0]){
                allFiles = key1[key];                
            }
        })
    });

    let [comm, loc] = command.split(" ");
    if (comm === "ls"){
        if (loc === undefined){

            let keys = [];
            allFiles.forEach((key) =>{
                if (typeof key === 'string'){
                    keys.push({type: 'output', text: key});
                }
                else if (typeof key == 'object'){
                    keys.push({type:'output', text: Object.keys(key)[0]});
                }
            }
            );
           setOutput(output.concat(keys));

        }
    }
    else if (comm === "cd"){
        // if loc in not undefined
        if (loc !== undefined){
            loc.split("/");
        }
    }
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      // Process input (you can implement your logic here)
      const newOutput = [...output, { type: 'input', text: inputValue }];
      if (inputValue.length)
      setOutput(newOutput);
      runCommand(inputValue);
      setInputValue('');
      
    }
  };

  return (
    <div className="terminal-window">
      <div className="terminal-output">
        {output.map((item, index) => (
          <div key={index} className={item.type}>
            {item.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="terminal-input">
        <span>$</span>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          autoFocus
        />
      </form>
    </div>
  );
};


