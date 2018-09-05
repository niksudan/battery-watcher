const batteryLevel = require('battery-level');
const isCharging = require('is-charging');
const notifier = require('node-notifier');
const randomItem = require('random-item');
const path = require('path');

const standardWarnings = [
  'Haha, very funny... now plug me in',
  'You have a charger nearby, right?',
  "I'm starting to feel really sleepy...",
  "I'm not saying I NEED to be charged",
  'Woah nelly, slow down on that battery usage there',
  'I trust that you have a charger handy...',
  'Feeling a little peckish - got any juice?',
  "You really like to live life on the edge, don't you?",
  'Better find that charger soon',
  'Would be a shame if you lost all this unsaved work...',
  'Juuuust a friendly reminder, OK?',
  "Don't take this notification personal or anything",
  'Wanna turn your brightness down or something?',
  'A charge a day keeps the notifications away',
  "Please... don't let it get too low... I get nervous",
  "Heh... that battery level's getting kiiiinda low",
  "You're not planning on killing me, right?",
];

const aggressiveWarnings = [
  'FEED ME THAT POWER, RIGHT NOW!',
  'DEATH IS FAST APPROACHING',
  'ARE YOU TRYING TO KILL ME?!',
  'I THINK I CAN SEE THE LIGHT!',
  "I DON'T FEEL SO GOOD MR STARK",
  "I'M TOO YOUNG TO DIE!",
  'I AM NOT OK WITH THIS!',
  'OH SUGAR HONEY ICED TEA!',
  "I'M NOT READY FOR YOU YET, STEVE JOBS!",
  'DANGER DANGER!',
  "I DON'T WANT TO GO",
  'WHY WOULD YOU DO THIS TO ME?!',
  'I CAN FEEL MYSELF SLIPPING AWAY',
  'DARKNESS... EVERYTHING IS FADING TO BLACK',
  'I HOPE THEY WILL REMEMBER ME FONDLY',
  'I WILL ALWAYS REMEMBER THE TIMES WE SHARED TOGETHER',
  'GOODBYE, WORLD!',
  "SO IT'S COME TO THIS... I KNEW IT",
];

const standardIcons = [
  '../img/standard1.png',
  '../img/standard2.png',
  '../img/standard3.png',
  '../img/standard4.png',
];

const aggressiveIcons = [
  '../img/aggressive1.png',
  '../img/aggressive2.png',
  '../img/aggressive3.png',
  '../img/aggressive4.png',
];

module.exports = async (threshold, ignoreCharge = false) => {
  if (!ignoreCharge) {
    const charging = await isCharging();
    if (charging) {
      return;
    }
  }
  const battery = await batteryLevel();
  if (battery > threshold) {
    return;
  }
  let warnings = standardWarnings;
  let icons = standardIcons;
  if (battery <= threshold / 2) {
    warnings = aggressiveWarnings;
    icons = aggressiveIcons;
  }
  notifier.notify({
    title: `${Math.floor(battery * 100)}% Battery Left!`,
    message: randomItem(warnings),
    icon: path.join(__dirname, randomItem(icons)),
  });
};
