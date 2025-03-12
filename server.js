const express = require('express');
const app = express();
const exec = require("child_process").exec;

// Middleware para manejar cuerpos de solicitud JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola balatro!');
});

app.get("/run-script", (req, res) => {
    exec("touch test", (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).send('Error executing script');
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    res.send('Script executed');
    });
});

app.get("/run-command", (req, res) => {
    exec("touch test", (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).send('Error executing script');
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    res.send('Script executed');
    });
});

app.post("/recon", (req, res) => {
    const domain = req.body.domain || req.query.domain;
    const APIKEY = req.body.APIKEY || req.query.APIKEY;
    if (APIKEY !== 'hola') {
        return res.status(401).send('Unauthorized');
    }
    exec(`./recon.sh ${domain} > resultados.txt`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Error executing script');
        }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            res.send('Script executed');
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});