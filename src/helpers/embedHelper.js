// NOTE: This file is still in progress, aka not used yet

const { color } = require('./colorHelper');

module.exports.fail = (desc) => {
     return {
          embeds: [
               {
                    description: desc,
                    color: color.fail
               }
          ]
     }
}
