const regex1 = /You gained (\d+) experience points\./;
const regex2 = /You healed yourself for (\d+) hitpoints/;
const regex3 = /You lose (\d+) hitpoints due to an attack by a (\w+(?: \w+)*)\./
const regex4 = /A Black Knight loses (\d+) hitpoints due to your attack./
const regex5 = /You lose (\d+) hitpoint(s)?\./

module.exports = {
  regex1,
  regex2,
  regex3,
  regex4,
  regex5
}