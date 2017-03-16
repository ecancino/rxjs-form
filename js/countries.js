'use strict';

const countrySelect = documentSelector('#country');
const countriesURL = '/json/countries.json';
const countries$ = Observable.fromPromise(JSONfromURL(countriesURL));
const mapCountryToOption = opt => ({
  id: opt.alpha,
  name: opt.name
});
const mapCountriesToSelect = countries => countries.map(mapCountryToOption);
const countryById = compose(querySelector(countrySelect), dataValue('id'));
const countryName = fromNullable(compose(textContent, countryById));

countries$.subscribe(compose(
  updateSelect(countrySelect, ""),
  mapCountriesToSelect)
);
