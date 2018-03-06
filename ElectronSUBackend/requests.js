/**
 * Created by s.nolanr on 7/21/2017.
 */

/**
 * Module dependencies
 */
const sql = require('mssql');
var express = require('express');
const http = require('http');
const ActiveDirectory = require('activedirectory');
const port = '5200';
var app = express();
var router = app.Router;
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');


app.use(bodyParser.json());
app.set('port', port);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept,Authorization");
    next();
})

const server = http.createServer(app);
server.listen(port, () => console.log('Api running on localhost:5200'))

var adGroup = "CampusTech";

var privateKey = '37LvDSm4XvjYOh9Y';

const sqlConfig = {
    user: '...',
    password: '...',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'CRP_Inventory',
}



    app.post('/auth/login', (req, res) => {
    console.log(req.body.username + " " + req.body.password);
    //get username and password from request

    const adConfig = {
        url: 'ldap://seattleu.edu',
        baseDN: 'dc=seattleu,dc=edu',
        username: req.body.username,
        password: req.body.password
    }

    var ad = new ActiveDirectory(adConfig);
    //use username and password vars as input for the auth of user
    ad.authenticate(req.body.username, req.body.password, function (authErr, auth) {
        //if authentication is successful
        if(authErr){
            console.log('Authentication failed!');
            sendAuthError(res)
        }
        if (auth) {
            console.log('Authenticated!');
            //verify that user is part of the group that we went to be able to access
            //may replace with an array of the different groups
            ad.isUserMemberOf(req.body.username, adGroup, function (err,isMember) {
                //if no error then the user is able to access
                if(err){
                    console.log('user is not a member of this group')
                }
                if (isMember) {
                    sendToken(req.body.username, res);
                    console.log('Token sent successfully');
                    return;
                }
                else{
                        sendAuthError(res);
                        console.log('User is not a member of this group!');
                }
            });
        }
    });
});

app.post('/lock/search', (req, res) => {
    console.log('service trying to search');
    console.log(req.body);
    var assetNumber = req.body.computerName;
    //perform search queries here
    async () => {
        try {
            const pool = await sql.connect(sqlConfig)
            const result = await sql.query`select * from mytable where id = ${assetNumber}`
            console.dir(result)
        } catch (err) {
            // ... error checks
        }
    }
    res.status(200).send({success: true, message: (req.body)});

})
app.post('/lock/add', (req, res) => {
    //perform add queries here
    console.log('service trying to add');
    console.log(req.body);

    var assetNumber = req.body.tagNumber;
    var assetSerial = req.body.serial;
    var assetManufacturer = req.body.manufacturer;
    var assetType = req.body.type;
    var assetLocation = req.body.location;


    //other asset variables could go here
    //may make asset object so that i can do batch adding of assets
    res.status(200).send({success: true, message: (req.body)});

});

app.post('/lock/delete', (req, res) => {
    /*    reuse queries from search call to find the machine
        confirm deletion of machine from db
        perform delete query on good confirmation*/
    console.log('service trying to delete');
    console.log(req.body);
    var assetNumber = req.body.computerName;

    //perform search queries here
    /*    async () => {
            try{
                const pool = await sql.connect(sqlConfig);
                const result = await sql.query()

            }
        }*/
    res.status(200).send({success: true, message: (req.body)});

});
app.put('/lock/update', (req, res) => {
    /*   reuse queries from search call to find the machine
     confirm deletion of machine from db
     perform delete query on good confirmation*/
    console.log('service trying to update asset');
    console.log('service trying to search');
    console.log(req.body);
    var assetNumber = req.body.computerName;
    //perform search queries here
    /*    async () => {
            try{
                const pool = await sql.connect(sqlConfig);
                const result = await sql.query()

            }
        }*/
    res.status(200).send({success: true,message:res.body });
});

function checkAuthenticated(req, res, next) {
    if (!req.header('authorization'))
        return res.status(401).send({message: 'Unauthorized request. Missing authentication'});
    var token = req.header('authorization').split(' ')[1];

    var payload = jwt.decode(token, privateKey);

    if (!payload)
        return res.status(401).send({message: 'Unauthorized request. Authentication header invalid'})

    req.body.user = payload;

    next();
}

function checkAsset(asset) {
    var assetToCheck = asset;

    if (assetToCheck.number != "" && assetToCheck.number.length == 5 && assetToCheck.serial != "" && assetToCheck.serial.length == 6) {
        return true;
    }
    return false;
}

function sendToken(username, res) {
    var token = jwt.sign(username, privateKey);
    res.json({name: username, token});
}

function sendAuthError(res) {
    return res.status(401).send({message: 'Invalid username and password'});
}

