const constants = require('./constants')

/** @param {Creep} creep **/
exports.run = (creep) => { 
  creep.say(creep.name)

  // If full go add energy to target
  if (creep.carry[RESOURCE_ENERGY] === creep.carryCapacity) {
    creep.memory.source = null
    return exports.transferToTarget(creep, Game.spawns.Spawn1)
  }

  if (!creep.memory.source) {
    exports.selectSource(creep)
  }

  exports.harvest(creep)
}

exports.transferToTarget = (creep, target) => {
  // TODO: Work with other resources as well
  if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) { 
    creep.moveTo(target)
  }
}

exports.harvest = (creep) => {
  const source = Game.getObjectById(creep.memory.source)

  if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source)  
  }
}

exports.selectSource = (creep) => {
  const sources = creep.room.find(FIND_SOURCES_ACTIVE)

  let source = null

  if (sources.length > 1) {
    // TODO: smart choose
    source = sources[0]
  }

  if (source) {
    creep.memory.source = source.id
  }

  return source
}

exports.selectTarget = (creep) => {
  return null
}

exports.create = (spawn, body) => {
  if (!body) {
    body = [MOVE, CARRY, WORK]
  }

  const canCreate = spawn.canCreateCreep(body)
  if (canCreate == OK) {
    console.log('Creating harvester')
    spawn.createCreep(body, undefined, {role: constants.ROLE_HARVESTER})
  } else {
    console.log(`Spawn=${spawn.name} cannot create harvester`)
  }
}