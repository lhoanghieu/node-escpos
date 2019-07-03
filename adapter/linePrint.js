'use strict';
const shelljs           = require('shelljs.exec');
const util          = require('util');
const EventEmitter  = require('events');

/**
 * [function USB]
 * @param  {[type]} vid [description]
 * @param  {[type]} pid [description]
 * @return {[type]}     [description]
 */
function LinePrint(path){
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
LinePrint.prototype.open = function (callback){
  callback && callback();
  return this;
};

/**
 * [function write]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
LinePrint.prototype.write = function(data, callback){
  this.emit('data', data);
  console.log('ble: ', data);
  shelljs.exec(String.raw`${data}`);
  return this;
};

LinePrint.prototype.close = function(callback){
  this.device = '';
  return this;
};

/**
 * [exports description]
 * @type {[type]}
 */
module.exports = LinePrint;
