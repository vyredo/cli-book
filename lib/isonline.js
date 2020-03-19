"use strict";

const request = require("request");
const lounger = require("./lounger.js");

function isOnline(url){
    return new Promise((resolve, reject) => {
        request({
            uri: url, 
            json: true
        }, (err, res, body) => {
            console.log(err);
            if(err && (err.code === "ECONNREFUSED" || err.code === "ENOTFOUND")){
                return resolve({[url] : false });
            }
            if(err) return reject(err);
            // maybe we got a welcome from CouchDB / PouchDB
            const isDatabase = (body.couchdb === "Welcome" || body["express-pouchdb"] === "Welcome!");

            return resolve ({[url]: isDatabase});
        })
    })
}

function cli(url){
    return new Promise((resolve, reject) => {
        if(!url){
            const err = new Error("Usage: lounger isonline <url>");
            err.type = "EUSAGE";
            return reject(err);
        }

        if(!/^(http:|https:)/.test(url)) {  
            const err = new Error(["invalid protocol, must be https or http","Usage: lounger isonline <url>" ]
                            .join("\n"));  
            err.type = "EUSAGE";  
            return reject(err);
        }
        isOnline(url).then((results) => {
            if (lounger.config.get("json")) {    
                console.log(results);    
                resolve(results);    
                return;  
            }
            
            Object.keys(results).forEach((entry) => {
                let msg = "seems to be offline";
                if(results[entry]){
                    msg = "seems to be online";
                }

                // print on stdout for terminal users
                console.log(entry, msg);
                resolve(results);
            })
        }).catch(reject)
    })
}
exports.api = isOnline;
exports.cli = cli;