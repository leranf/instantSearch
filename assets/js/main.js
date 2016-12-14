var pageNumber = 0;
var search = instantsearch({
  appId: 'R5FNFOXMUS',
  apiKey: 'bb54ffbf3bb6805fc86ebed846cff7ca',
  indexName: 'restaurants',
  searchParameters: {
    aroundLatLngViaIP: true,
    page: pageNumber,
  },
  urlSync: true
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-input',
    placeholder: 'Search for Restaurants by Name, Cuisine, Location'
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 10,
    templates: {
      item: getTemplate('hit'),
      empty: getTemplate('no-results'),
    },
    transformData: function(hit) {
      hit.stars = [];
      for (var i = 1; i <= 5; ++i) {
        hit.stars.push(i <= hit.stars_count);
      }

      return hit;
    }
  })
);

// search.addWidget(
//   instantsearch.widgets.pagination({
//     container: '#pagination'
//   })
// );

search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats',
    templates: {
      body: function(data) {
        return '<div class="ais-stats--time"><div class="container">' + data.nbHits + ' results found <span>in ' + data.processingTimeMS / 1000 + ' seconds</span><div class="stats-border"></div></div></div>'
      }
    }
  })
);

search.addWidget(
  instantsearch.widgets.menu({
    container: '#food_type',
    attributeName: 'food_type',
    limit: 7,
    sortBy: ['isRefined', 'count:desc', 'name:asc'],
    templates: {
      header: '<h5 class="facet_type">Cuisine/Food Type</h5>',
    }
  })
);

search.addWidget(
  instantsearch.widgets.starRating({
    container: '#rating',
    attributeName: 'stars_count',
    labels: {
      andUp: ''
    },
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

search.addWidget(
  instantsearch.widgets.clearAll({
    container: '#clear-all',
    templates: {
      link: '<i class="fa fa-eraser"></i> CLEAR FILTERS'
    },
    cssClasses: {
      root: 'btn btn-block btn-default'
    },
    autoHideContainer: true
  })
);

search.start();

search.on('render', function() {
  pageNumber = 0;
  if (!$('#show-more')[0]) {
    var hits = $('.ais-hits');
    hits.append('<div id="show-more"><button id="show-more-button">Show More</button></div>');
  }

  $('#show-more-button').off('click').on('click', function() {
    // console.log(window.location.search.split(''));
    var search = window.location.search.split('');
    for (var i = 0; i < search.length; i++) {
      if (search[i] === '&' && search[i+1] === 'p' && search[i+2] === '=') {
        search[i+3] = ++pageNumber;
      }
    }
    console.log(pageNumber);
    window.location.search = search.join('');
  });
});

function getTemplate(templateName) {
  return document.getElementById(templateName + '-template').innerHTML;
}
