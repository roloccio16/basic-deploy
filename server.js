const dotenv = require("dotenv").config();
const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const session = require("express-session");
const express = require('express');
const app = express();
const exec = require("child_process").exec;
app.use(express.static("public"));

// Configuración de passport
const CLIENT_ID_GITHUB = process.env.CLIENT_ID_GITHUB;
const CLIENT_SECRET_GITHUB = process.env.CLIENT_SECRET_GITHUB;
const APIKEY = process.env.APIKEY;

console.log(`CLIENT_ID_GITHUB: ${CLIENT_ID_GITHUB}`);
console.log(`CLIENT_SECRET_GITHUB: ${CLIENT_SECRET_GITHUB}`);

passport.use(new GithubStrategy({
    clientID: CLIENT_ID_GITHUB,
    clientSecret: CLIENT_SECRET_GITHUB,
    callbackURL: "http://localhost:3000/auth/github/callback",
}, function(accessToken, refreshToken, profile, done) {
    if (profile.username === 'roloccio16') {
        return done(null, profile);  //  Acceso permitido
      } else {
        return done(null, false);    //  Denegado
      }
}));

passport.deserializeUser((user,done) => {
    console.log("Deserializing user: ", user);
    done(null, user);
});

passport.serializeUser((user,done) => {
    console.log("Serializing user: ", user);
    done(null, user);
});

app.use(session({
    secret: "supersecreto",
    resave: false,
    saveUninitialized: true,
    coockie: {secure: false} //Cambia a true si usa https

}));
app.use(passport.initialize());
app.use(passport.session());

// Middleware para manejar cuerpos de solicitud JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const middlewareAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        console.log("User authenticated");
        return next();
    } else {
        console.log("User not authenticated");
        return res.redirect("/");
    }   
};
//app.use(middlewareAuth);

app.get('/', (req, res) => {
    const html = `
    <a href="/auth/github">Login with Github</a>`
    res.send(html);
});

app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
 (req, res) => {
    console.log("User authenticated succesfully");
    res.redirect("/recon");
});

app.get('/profile', middlewareAuth, (req, res) => {

    const html = `Hola ${req.user.username || req.user.displayName}`
    res.send(html);
});

app.get('/recon', middlewareAuth, (req, res) => {
    const html = `Hola aqui ira mi recon`
    res.sendFile(__dirname + "/public/recon.html");
});


app.get("/run-script", middlewareAuth, (req, res) => {
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

app.get("/run-command", middlewareAuth, (req, res) => {
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
    const apikey = req.body.apikey || req.query.apikey;
    console.log(domain);
    console.log(apikey);
    if (apikey !== APIKEY) {
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