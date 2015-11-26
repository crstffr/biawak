#!/usr/bin/env node

var _ = require('lodash');
var exists = require('file-exists');
var inquirer = require('inquirer');

var Writer = require('./lib/install/writer');
var files = require('./lib/install/files');
var config = new Writer(files.config);

askWhich(); // kick off the questions.

var options = {
    ask: askWhich,
    tail: installTail,
    fbsetup: firebaseSetup,
    quit: quit
};

function divider() {
    console.log('> ------------------------------------------------');
}

function message(text) {
    console.log('> ' + text);
}

function askWhich() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'which',
            message: 'What do you want to do?',
            choices: [
                {name: 'Firebase Setup', value: 'fbsetup'},
                {name: 'Install Tail', value: 'tail'},
                {name: 'Quit', value: 'quit'}
            ]
        }
    ], function (answer) {
        options[answer.which]();
    });
}

function firebaseSetup() {

    var Firebase = require('firebase');
    var appRef;

    inquirer.prompt([
        {
            name: 'url',
            type: 'input',
            message: 'Your Firebase Data URL',
            default: config.get('firebase:url') || 'yourapp.firebaseio.com',
            validate: function(input) {
                appRef = new Firebase('https://' + input);
                return Boolean(appRef);
            }
        },
        {
            type: 'input',
            name: 'secret',
            message: 'Your Firebase App Secret',
            default: config.get('firebase:secret') || '',
            validate: function (input) {
                var done = this.async();
                appRef.authWithCustomToken(input, function(error){
                    if (error) { done('Invalid secret token'); }
                    else { done(true); }
                });
            }
        }
    ], function (answers) {
        config.set('firebase', {url: answers.url, secret: answers.secret});
        config.save();
        divider();
        message('Firebase Configured Successfully');
        divider();
        askWhich();
    });

}

function installTail() {

    var fakeLogFile;

    inquirer.prompt([
        {
            type: 'list',
            name: 'tail',
            message: 'Select Tail to Install',
            choices: files.tails()
        },
        {
            type: 'input',
            name: 'file',
            message: function (answers) {
                fakeLogFile = answers.tail + '.log';
                return 'Path to ' + fakeLogFile;
            },
            default: function (answers) {
                var current = config.get('tails:' + answers.tail);
                return (current && current.file) ? current.file : '/var/log/' + fakeLogFile;
            },
            validate: function (input) {
                return exists(input) ? true : 'File does not exist';
            }
        }
    ], function (answers) {
        var data = {};
        data[answers.tail] = {file: answers.file};
        config.set('tails', data);
        config.save();
        divider();
        message('Tail installed successfully: ' + answers.tail);
        divider();
        askWhich();
    });

}

function quit() {
    process.exit();
}
