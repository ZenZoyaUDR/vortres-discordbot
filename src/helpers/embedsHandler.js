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