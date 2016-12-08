// node script used to merge the data sets

var restaurants_info = require('./restaurants_info.json');
var restaurants_list = require('./restaurants_list.json');

restaurants_info.forEach(function(record) {
  var match = restaurants_list.find(function(rest) {
    return rest.objectID === record.objectID;
  });
  
  record = Object.assign(record, match);
});

restaurants_info = JSON.stringify(restaurants_info);
console.log(restaurants_info); // results were copied into restaurants_list_full.json and then uploaded via the dashboard