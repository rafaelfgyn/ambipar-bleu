const regex = require("../regex")

const extractNumberFromString = (string, regex) => {
  const match = string.match(regex);
  if (match) {
    const points = parseInt(match[1]);
    return points;
  } else {
    return null;
  }
}

const returnArrayFromText = (text) => {
  return text.split("\n").map(line => line.substring(6))
}

const getsBlackNightLife = (array) => {

  const damageOnBlackKnight = []

  for (const string of array) {
    if (string.includes("Loot of a Black Knight")) {
      break
    }

    if (regex.regex4.test(string)) {
      damageOnBlackKnight.push(string)
    }
  }

  return damageOnBlackKnight.map(el => extractNumberFromString(el, regex.regex4))
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)

  // for (const string of array.includes("Black Knight")) {

  //   if (string === "Loot of a Black Knight: nothing") {
  //     return
  //   }

  //   const match = string.match(regex7);

  //   if (match) {
  //     const points = parseInt(match[1]);
  //     HP += points;
  //   } else {
  //     return null;
  //   }
  // }
}

const getLoot = (array) => {

  const regex1 = /^\d/
  const regex2 = /^(\d+)\s(.+)/;
  const regex3 = /^Loot of/;
  const payload = []

  const content = array
    .filter(item => regex3.test(item))
    .filter(item => !item.includes("nothing"))
    .map(el => el.split(":")[1].split(",").map(el => el.substring(1).replaceAll("a ", "").replaceAll(".", "")))

  content.forEach(el => el.forEach(el => payload.push(el)))

  const result = payload.map(el => !regex1.test(el) ? `1 ${el}` : el)
    .map(el => {
      const matches = el.match(regex2);

      if (matches) {
        const number = matches[1];
        const name = matches[2];

        return ({
          count: Number(number),
          item: name === "gold coins" ? "gold coin" : name
        })
      }
    })

  const loot = {}

  result.forEach(el => {
    const compoundKeyName = el.item.trim()
    if (!loot[compoundKeyName]) {
      loot[compoundKeyName] = el.count
    } else {
      loot[compoundKeyName] += el.count
    }
  })

  return JSON.parse(JSON.stringify(loot))
}

const returnDamage = (array) => {

  const damage = {
    total: returnSumByRegex(array, regex.regex5),
    byCreatureKind: {
    }
  }

  array.filter(item => regex.regex3.test(item))
    .map(el => ({
      damage: parseInt(regex.regex3.exec(el)[1]),
      monster: regex.regex3.exec(el)[2]
    }))
    .forEach(el => {
      const monster = el.monster.trim()
      if (!damage.byCreatureKind[monster]) {
        damage.byCreatureKind[monster] = el.damage
        damage.total += el.damage
      } else {
        damage.byCreatureKind[monster] += el.damage
        damage.total += el.damage
      }
    })

  return damage
}

const returnSumByRegex = (array, regex) => {

  return array
    .filter(item => regex.test(item))
    .map(el => extractNumberFromString(el, regex))
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
}

module.exports = {
  extractNumberFromString,
  returnArrayFromText,
  getsBlackNightLife,
  getLoot,
  returnDamage,
  returnSumByRegex
}