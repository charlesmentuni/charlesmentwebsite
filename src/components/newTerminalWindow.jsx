import React, { useState, useEffect } from 'react';
import './newTerminalWindow.css';

export function NewTerminalWindow() {
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState([]);
  const [commandRunning, setCommandRunning] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);
  const [fileContent, setFileContent] = useState("");
  // Treat the current directory like a stack to allow for easy navigation
  const [currentDirectory, setCurrentDirectory] = useState([]);

  const directories = {'main' : 
                        [{'projects' : 
                            ['project1.txt', 
                            'project2.txt', 
                            'project3.txt']}, 
                        {'links': 
                            ['github.txt', 
                            'linkedin.txt', 
                            'resume.txt']},
                        "about.txt"]};
    
// read text files
   async function fetchFile(fileName) {
       const response = await fetch("../text_files/"+fileName);
       const text = await response.text();
       setFileContent(text);
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const runCommand = (command) => {

    // This should get all the files and folders in the current directory
    let allFiles = directories.main;
    currentDirectory.forEach((key) =>
    {
        allFiles.forEach((key1) =>
        {
            // Objects denote folders so this checks if the key is the same folder as the current directory
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
            let locDirectories = loc.split("/");
            console.log(locDirectories);
            let tempDirectory = currentDirectory;
            locDirectories.forEach((key) => {
                if (key === '..'){
                    tempDirectory.pop();
                }
                else{
                    tempDirectory.push(key);
                }
            });
            setCurrentDirectory(tempDirectory);

        }
        
    } else if (comm === "cat"){
        fetchFile(loc);
        setOutput(output.concat({type: 'output', text: fileContent}));
        //setOutput(output.concat({type: 'output', text: data}));
        
    }
    else {
        console.log("cd : missing operand");
        setOutput(output.concat({type: 'output', text: `${comm} : unknown command`}));
    }
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      // Process input (you can implement your logic here)
      const newOutput = [...output, { type: 'input', text: inputValue }];
      if (inputValue.length)
      setOutput(newOutput);
      setCommandRunning(true);
      
    }
  };
  useEffect(() => {
    if (commandRunning){
        console.log(inputValue);
        runCommand(inputValue);
        setCommandRunning(false);
        setInputValue('');
    }
  }, [output, commandRunning]);

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


