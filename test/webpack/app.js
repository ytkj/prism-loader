// with bootstrap
var template01 = require('html-loader!../../index?fontSize=14!./template.html');

// w/o bootstrap
var template02 = require('html-loader!../../index!./template.html');

var element01 = document.getElementById('root-01');
var element02 = document.getElementById('root-02');
if (element01) {
    element01.innerHTML = template01;
} else if (element02) {
    element02.innerHTML = template02;
}
