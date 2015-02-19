(function () {
  var _ = require('lodash-node');
  var fs = require('fs');
  var csv = require('fast-csv');

  function rowToHopsSpices(row) {
    return row.hopsSpices ? '<p><b>Hops / Spices:</b>' + row.hopsSpices + '</p>' : '';
  }

  function rowToFermentables(row) {
    if (row.fermentables) {
      return '<p><b>Fermentables:</b>' + row.fermentables + '</p>';
    } else {
      return '';
    }
  }

  function beerStyleDescription(row) {
    return '<p><b>' + row.beerStyle + '</b>' + (row.description ? ', ' + row.description : '') + '</p>';
  }

  function rowToBeer(row) {
    return {
      name: row.beerName || row.beerStyle,
      brewery: row.breweryName || (row.firstName + ' ' + row.lastName),
      description: beerStyleDescription(row) + rowToFermentables(row) + rowToHopsSpices(row),
      url: ''
    };
  }

  var rows = [];

  csv.fromPath('./data/srcdata/brewnity_2015.csv',
    {
      headers: ['firstName', 'lastName', 'breweryName',
        'beerName', 'beerStyle', 'description', 'abv',
        'ibu', 'fermentables', 'hopsSpices']
    }).on('data', function (data) {
      rows.push(rowToBeer(data));
    }).on('end', function () {
      var beers = {beers: rows};
      fs.writeFileSync('./data/srcdata/rows.json', JSON.stringify(beers));
    });
})();
