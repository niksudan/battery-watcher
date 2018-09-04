const batteryLevel = require('battery-level');
const isCharging = require('is-charging');
const notifier = require('node-notifier');
const randomItem = require('random-item');
const path = require('path');

// Warning messages to choose from
const warnings = [
  'Hey now, battery is getting pretty low there...',
  'You have a charger nearby, right?',
  'Would be a shame if you lost all this unsaved work',
  'Quick! Plug your charger in!',
  "I'm too young to die!",
  'Find that charger, pronto!',
  "Looks like you're about to die! Would you like help with that?",
  "I'M HUNGRY, FEED ME THE POWER",
  'Is it already my bedtime?',
  "I don't feel so good Mr Stark...",
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
  notifier.notify({
    title: `Battery at ${battery * 100}%!`,
    message: randomItem(warnings),
    icon: path.join(__dirname, 'icon.png'),
  });
};
