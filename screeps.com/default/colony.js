const constants = require('./constants')
const helpers = require('./helpers')
const roleHarvester = require('./role.harvester')

exports.manage = () => {
  const harvesters = helpers.filterCreeps(constants.ROLE_HARVESTER)
  const createHarvesters = constants.HARVESTERS_LIMIT - harvesters.length
  console.log(`harvesters=${harvesters.length} createHarvesters=${createHarvesters}`)

  for (let i = 0; i < createHarvesters; i++) {
    roleHarvester.create(Game.spawns.Spawn1)
  }
}
