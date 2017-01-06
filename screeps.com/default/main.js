const constants = require('./constants')
const helpers = require('./helpers')
const colony = require('./colony')
const structures = require('./structures')

const roleHarvester = require('./role.harvester')


module.exports.loop = () => {
  colony.manage()
  structures.manage()
  
  for (let creepName in Game.creeps) {
    const creep = Game.creeps[creepName]

    if (creep.memory.role === constants.ROLE_HARVESTER) {
      roleHarvester.run(creep)
    }
  }
}