const express = require("express");
const fs = require('fs');
const path = require('path');

const app = express();

app.get("/file", (req, res) => {
    let filesname = "";
    const arr = fs.readdirSync(__dirname);
    
    // for (let i = 0; i < arr.length; i++) {
    //     filesname += `${arr[i]}\n`;  
    // }
    res.json(arr);
    

    res.send(filesname).statusCode(200);  
});

app.get("/file/:filename", (req, res) => {
    const filename = req.params.filename;
    const fpath = path.join(__dirname, filename);
    if (fs.existsSync(fpath)) {
        const data = fs.readFileSync(fpath, 'utf8');  // Read the file content
        console.log(data);  // Optionally log the content
        res.send(data);     // Send the content of the file back to the client
    } else {
        res.status(404).send("File not found");  // If the file doesn't exist, send a 404 response
    }
});

app.listen(5000, () => {
    console.log('app is running');
});
