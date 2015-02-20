(function () {
  var _ = require('lodash-node');
  var fs = require('fs');
  var csv = require('fast-csv');

  var BREWERIES_TO_URLS = {
    'BrewHeister': 'http://brewheister.com/',
    'Speed Brewing': 'http://books.google.com/books/about/Speed_Brewing.html?id=_qDcoQEACAAJ',
    'Brewery Brett': 'https://www.facebook.com/BreweryBrett',
    'Crown Heights Brewing ': 'https://www.facebook.com/CrownHeightsBrewing',
    'Bitter & Esters': 'http://bitterandesters.com/',
    'Thirsty Quaker Brewing': 'http://thirstyquaker.com/',
    'Greenpoint Beer & Ale Co.': 'http://www.dirckthenorseman.com/',
    'Strong Rope Brewery': 'http://strongropebrewery.com/',
    'Billingsgate': 'http://billingsgatebrewing.com/'
  };

  var CLUBS_TO_URLS = {
    'NYC Homebrewers Guild': 'http://www.nychomebrew.com/',
    'Brooklyn Brewsers': 'http://www.brooklynbrewsers.com/',
    'Pour Standards': 'http://pourstandards.com/',
    'Brewdies': 'https://www.facebook.com/groups/306800816160096/',
    'Bitter & Esters S.W.A.P. Team': 'http://bitterandesters.com/',
    'Brewstoria': 'http://www.brewstoria.com/',
    'The Thirsty Quaker': 'http://thirstyquaker.com/',
    'Jersey City Brew Club': 'http://jerseycitybrewclub.com/',
    'Knights of Bruklyn': 'https://www.facebook.com/groups/kobhs/?ref=br_tf'
  };

  function linkTo(str, link) {
    if (_.isString(link)) {
      return '<a href="' + link + '" target="_blank">' + str + '</a>';
    }
    return str;
  }

  function rowToHopsSpices(row) {
    return row.hopsSpices ? '<p><b>Hops / Spices:</b> ' + row.hopsSpices + '</p>' : '';
  }

  function rowToFermentables(row) {
    if (row.fermentables) {
      return '<p><b>Fermentables:</b> ' + row.fermentables + '</p>';
    } else {
      return '';
    }
  }

  function rowToIbu(row) {
    return row.ibu ? '<p><b>IBU:</b> ' + row.ibu + '</p>' : '';
  }

  function rowToAbv(row) {
    return row.abv ? '<p><b>ABV:</b> ' + row.abv + '</p>' : '';
  }

  function rowToClub(row) {
    return row.homebrewClub ? '<p><b>Club:</b> ' + linkTo(row.homebrewClub, CLUBS_TO_URLS[row.homebrewClub]) + '</p>' : '';
  }

  function rowToBrewer(row) {
    return row.firstName && row.lastName ? '<p><b>Brewer:</b> ' + row.firstName + ' ' + row.lastName + '</p>' : '';
  }

  function rowToBrewery(row) {
    return row.breweryName ? '<p><b>Brewery:</b> ' + linkTo(row.breweryName, BREWERIES_TO_URLS[row.breweryName]) + '</p>' : '';
  }

  function beerStyleDescription(row) {
    return '<p><b>' + row.beerStyle + '</b>' + (row.description ? ', ' + row.description : '') + '</p>';
  }

  function rowToBeer(row) {
    return {
      name: row.beerName || row.beerStyle,
      brewery: row.breweryName || (row.firstName + ' ' + row.lastName),
      description: beerStyleDescription(row) + rowToBrewery(row) + rowToBrewer(row) + rowToClub(row) + rowToAbv(row) + rowToIbu(row) + rowToFermentables(row) + rowToHopsSpices(row),
      url: BREWERIES_TO_URLS[row.breweryName] || CLUBS_TO_URLS[row.homebrewClub] || ''
    };
  }

  var rows = [];

  csv.fromPath('./data/srcdata/brewnity_2015_b.csv',
    {
      headers: ['firstName', 'lastName', 'breweryName', 'homebrewClub',
        'beerName', 'beerStyle', 'description', 'abv',
        'ibu', 'fermentables', 'hopsSpices']
    }).on('data', function (data) {
      rows.push(rowToBeer(data));
    }).on('end', function () {
      var beers = {beers: rows};
      fs.writeFileSync('./data/srcdata/rows.json', JSON.stringify(beers));
    });
})();
