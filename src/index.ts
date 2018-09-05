const menubar = require('menubar');
const electron = require('electron');
const checkBattery = require('./battery');

const threshold = 0.2;
const delay = 1000 * 60 * 5;
const ignoreCharge = false;

var mb = menubar({
  width: 150,
  height: 75,
});

mb.on('after-create-window', async () => {
  mb.window.webContents.on('new-window', (e, url) => {
    e.preventDefault();
    electron.shell.openExternal(url);
  });
});

mb.on('ready', function ready() {
  console.log('Battery Watcher loaded');
  checkBattery(threshold, ignoreCharge);
  setInterval(() => {
    checkBattery(threshold, ignoreCharge);
  }, delay);
});
