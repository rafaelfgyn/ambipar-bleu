const utils = require("../../utils")
const regex = require("../../regex")

const service = (array) => {

  const experienceGained = utils.returnSumByRegex(array, regex.regex1)
  const hitPointsHealed = utils.returnSumByRegex(array, regex.regex2)
  const blackKnightHP = utils.getsBlackNightLife(array)
  const loot = utils.getLoot(array)
  const damageTaken = utils.returnDamage(array)

  return {
    hitPointsHealed,
    damageTaken,
    experienceGained,
    loot,
    blackKnightHP,
    "damage taken by unknown origins": utils.returnSumByRegex(array, regex.regex5),
  }
}

module.exports = service