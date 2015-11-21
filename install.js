#!/usr/bin/env node

var exists = require('file-exists');
var inquirer = require('inquirer');
var config = require('./lib/config');
var tails = require('./lib/tails');
var _ = require('lodash');

var choices = [];
var installed = config.get('tails');

_.each(tails, function(type){

});

var questions = [
    {
        type: 'list',
        name: 'tail',
        message: 'Select Tail to Install',
        choices: tails
    },
    {
        type: 'input',
        name: 'file',
        message: function(answers){
            return 'Path to ' + answers.tail + '.log';
        },
        default: '/var/log/foo.log',
        validate: function(input){
            return exists(input) ? true : 'File does not exist';
        }
    }
];


inquirer.prompt(questions, function (answers) {

    console.log(answers);
    config.set('tails:' + answers.tail, {file: answers.file});
    config.save();
});


// config.set('tails:nginx.access', {file: './tests/logs/nginx.access.log'});
