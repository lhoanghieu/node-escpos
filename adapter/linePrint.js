'use strict';
const util = require('util');
const EventEmitter = require('events');

const writeFile = require('write-file-queue')({
    retries: 1 /* number of write attempts before failing */
    , waitTime: 1 /* number of milliseconds to wait between write attempts*/
    , debug: console.error /* optionally pass a function to do dump debug information to */
});

/**
 * [function USB]
 * @param  {[type]} vid [description]
 * @param  {[type]} pid [description]
 * @return {[type]}     [description]
 */
function LinePrint(path) {
    EventEmitter.call(this);
    this.device = path;
    if (!this.device)
        throw new Error('Can not find printer');
    return this;
};

/**
 * make LinePrint extends EventEmitter
 */
util.inherits(LinePrint, EventEmitter);

/**
 * [open usb device]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
LinePrint.prototype.open = function (callback) {
    callback && callback();
    return this;
};

/**
 * [function write]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
LinePrint.prototype.write = function (data, callback) {
    this.emit('data', data);
    writeFile(this.device, data, (err) => {
        if (err) {
            console.log(err);
        }
    });
    return this;
};

LinePrint.prototype.close = function (callback) {
    this.device = '';
    return this;
};

/**
 * [exports description]
 * @type {[type]}
 */
module.exports = LinePrint;
