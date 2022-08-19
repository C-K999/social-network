const usernames = [
  "@elonmusk",
  "@realDonaldTrump",
  "@realJamesWoods",
  "@netflix",
  "@LariveCl61",
  "@jaden",
];

const email = [
  "press@tesla.com",
  "president@whitehouse.gov",
  "jameswoods@g.harvard.edu",
  "info@account.netflix.com",
  "chancellor@ucsc.edu",
  "jadensmith@comcast.com",
];

const thoughts = [
  "Sorry for what? Our daddy taught us not to be ashamed.",
  "How can mirrors be real if our eyes aren't real",
  "What if we spelled 'people' like this: peepole that would be funny i think",
  "I specifically ordered persian rugs with cherub imagery!!! What do I have to do to get a simple persian rug with cherub imagery uuuuugh.",
  "I just used a Sharpie as eye liner in the airplane bathroom",
  "Why is that people always try to understand estimate my intelligents?! They should never do that",
];

const getUserName = (index) => {
  return usernames[index];
};

const getEmail = (index) => {
  return email[index];
};

const getRandomThoughts = () => {
  return getRandomItem(thoughts);
};

module.exports = { getUserName, getEmail, getRandomThoughts };
