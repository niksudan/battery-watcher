const batteryLevel = require('battery-level');
const isCharging = require('is-charging');
const notifier = require('node-notifier');
const randomItem = require('random-item');

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

const thankYouTitles = [
  'Phew!',
  'Thanks!',
  'Hooray!',
  'Juice Time!',
  'Restored!',
  'You Did It!',
  'Nice One!',
  'Woah!',
];

const thankYouMessages = [
  'I thought I was a goner!',
  'THANK YOU SO MUCH!',
  "Please don't let me get that low again!",
  'Thank you, master!',
  "I knew you wouldn't let me die",
  'You saved my life!',
  "I don't know how to ever repay you",
  'I bet I could have survived for a few more minutes',
  "I'm fine. Yep. All better. A-OK.",
  "I'm cured!",
  'Wow, you actually listened to me?',
  'Yooo.. you actually did it?!',
  "I promise I won't ever react like that again",
  'I get to live another day!',
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

const happyIcons = [
  '../img/happy1.png',
  '../img/happy2.png',
  '../img/happy3.png',
  '../img/happy4.png',
];

let isGrateful = true;

interface BatteryOptions {
  threshold: number;
}

module.exports = async (options: BatteryOptions) => {
  const charging = await isCharging();
  if (charging) {
    if (!isGrateful) {
      isGrateful = true;
      notifier.notify({
        title: randomItem(thankYouTitles),
        message: randomItem(thankYouMessages),
        icon: path.join(__dirname, randomItem(happyIcons)),
      });
    }
    return;
  }

  const battery = await batteryLevel();
  if (battery > options.threshold) {
    return;
  }

  isGrateful = false;
  let warnings = standardWarnings;
  let icons = standardIcons;
  if (battery <= options.threshold / 2) {
    warnings = aggressiveWarnings;
    icons = aggressiveIcons;
  }

  notifier.notify({
    title: `${Math.floor(battery * 100)}% Battery Left!`,
    message: randomItem(warnings),
    icon: path.join(__dirname, randomItem(icons)),
  });
};
