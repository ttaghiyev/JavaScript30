const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
  .then(res => res.json())
  .then(data => cities.push(...data));

const $form = document.querySelector('.search-form');
const $input = document.querySelector('.search');
const $list = document.querySelector('.suggestions');

// utility: given a list and a target string, return any city wher the string is found
// - ignores case
const getMatchingCities = (arr, target) => {
  const exp = new RegExp(target, 'gi');
  return arr.filter(c => c.city.match(exp) || c.state.match(exp));
};

// util: given a string and a part to highlight, returns html markup with a highlight class
// - case insensitive
const applyHighlight = (str, target) => {
  const exp = new RegExp(target, 'gi');
  return str.replace(exp, '<span class="hl">$&</span>');
};

// util: given an object, format the HTML for the output
const getResultMarkup = (obj, target) => {
  const hCity = applyHighlight(obj.city, target);
  const hState = applyHighlight(obj.state, target);
  // <span class="population">${numberWithCommas(place.population)}</span>
  return `
        <li>
            <span class="name">${hCity}, ${hState}</span>
        </li>
        `;
};

const renderResults = (list, target) =>
  getMatchingCities(list, target)
    .map(obj => getResultMarkup(obj, target))
    .join('');

$input.addEventListener(
  'keyup',
  e => ($list.innerHTML = renderResults(cities, e.target.value))
);
