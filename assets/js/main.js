var search = instantsearch({
  appId: 'R5FNFOXMUS',
  apiKey: 'bb54ffbf3bb6805fc86ebed846cff7ca', // search only API key, no ADMIN key
  indexName: 'restaurants',
  urlSync: true
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-input',
    placeholder: 'Search for products'
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 10,
    templates: {
      item: getTemplate('hit'),
      empty: getTemplate('no-results')
    }
  })
);

search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats'
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination'
  })
);

search.addWidget(
  instantsearch.widgets.menu({
    container: '#food_type',
    attributeName: 'food_type',
    limit: 7,
    sortBy: ['isRefined', 'count:desc', 'name:asc'],
    templates: {
      header: '<h5>Food Type</h5>',
    }
  })
);

search.addWidget(
  instantsearch.widgets.starRating({
    container: '#rating',
    attributeName: 'stars_count',
    templates: {
      header: '<h5>Rating</h5>'
    }
  })
);

search.addWidget(
  instantsearch.widgets.menu({
    container: '#payment_options',
    attributeName: 'payment_options',
    limit: 4,
    sortBy: ['isRefined', 'count:desc', 'name:asc'],
    templates: {
      header: '<h5>Payment Options</h5>',
    }
  })
);

search.start();

function getTemplate(templateName) {
  return document.getElementById(templateName + '-template').innerHTML;
}