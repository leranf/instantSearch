// node script used to merge the data sets

var restaurants_info = require('./restaurants_info.json');
var restaurants_list = require('./restaurants_list.json');

restaurants_info.forEach(function(record) {
  var match = restaurants_list.find(function(rest) {
    return rest.objectID === record.objectID;
  });

  var onlyCertainCards = [];
  match.payment_options.forEach(function(option) {
    if (option === 'AMEX' || option === 'Visa' || option === 'MasterCard' || option === 'Discover') {
      onlyCertainCards.push(option);
    } else {
      if (option === 'Diners Club' || option === 'Carte Blanche') {
        if (match.payment_options.indexOf('Discover') === -1) {
          onlyCertainCards.push('Discover');
        }
      }
    }
  });

  match.payment_options = onlyCertainCards;
  record = Object.assign(record, match);
});

// send data to algolia
// var algoliasearch = require('algoliasearch');
// var client = algoliasearch("R5FNFOXMUS", "bb54ffbf3bb6805fc86ebed846cff7ca");
// var index = client.initIndex('new_index');
// index.addObjects(restaurants_info, function(err, content) {
//   console.log(content);
// });

// create json file to uplaod
// var fs = require('fs');
// restaurants_info = JSON.stringify(restaurants_info);
// fs.writeFile('formattedData.json', restaurants_info);
