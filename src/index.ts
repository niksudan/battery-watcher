const menubar = require('menubar');
const electron = require('electron');
const path = require('path');
const checkBattery = require('./battery');

const options = {
  threshold: 0.2,
};

const delay = 1000 * 60 * 5;

var mb = menubar({
  width: 150,
  height: 100,
});

mb.on('after-create-window', async () => {
  mb.window.webContents.on('new-window', (e, url) => {
    e.preventDefault();
    electron.shell.openExternal(url);
  });
});

mb.on('ready', function ready() {
  console.log('Battery Watcher loaded');
  mb.tray.setImage(path.join(__dirname, '../img/icon.png'));
  checkBattery(options);
  setInterval(() => {
    checkBattery(options);
  }, delay);
});
