const constants = require('./constants')


exports.spawnsCount = () => Object.keys(Game.spawns).length

exports.creepsCount = (filter) => {
  exports.filterScreeps(filter).length
}

exports.filterCreeps = (filter) => {
  let predicate = null

  if (_.isFunction(filter) || _.isObject(filter)) {
    predicate = filter
  }
  else if (_.isString(filter)) {
    predicate = {memory: {role: filter}}
  }

  return _.filter(Game.creeps, predicate)
}
