const test = require('tape');

// generate generic data
const listFactory = () => ([{
    city: "New York",
    growth_from_2000_to_2013: "4.8%",
    latitude: 40.7127837,
    longitude: -74.0059413,
    population: "8405837",
    rank: "1",
    state: "New York"
}, {
    city: "Chicago",
    growth_from_2000_to_2013: "-6.1%",
    latitude: 41.8781136,
    longitude: -87.6297982,
    population: "2718782",
    rank: "3",
    state: "Illinois",
}]);

// utility: given a list and a target string, return any city wher the string is found
// - ignores case 
const getMatchingCities = (arr, target) => {
    const exp = new RegExp(target, 'gi');
    return arr.filter( c => c.city.match(exp) || c.state.match(exp));
}

test('Case sensitive filtering', assert => {
    const list = listFactory();
    const target = 'New';
    
    const actual = getMatchingCities(list, target);

    assert.same(actual.length, 1, '...should return a single item');
    assert.same(actual[0].city, 'New York');
    assert.end();
});

test('Case insensitive filtering', assert => {
    const list = listFactory();
    const target = 'chi';
    
    const actual = getMatchingCities(list, target);
    
    assert.same(actual.length, 1, '...should return a single item');
    assert.same(actual[0].city, 'Chicago');
    assert.end();
});

// util: given a string and a part to highlight, returns html markup with a highlight class
// - case insensitive
const applyHighlight = (str, target) => {
    const exp = new RegExp(target, 'gi');
    return str.replace(exp, '<span class="hl">$&</span>');
}

test('Highlighting a word (same case)', assert => {
    const source = 'New York';
    const target = 'New';
    
    const actual = applyHighlight(source, target);
    assert.ok(actual.includes('New'), '... should contain unmodified target word');
    assert.ok(actual.includes('span'), '... should include span');
    assert.end();
});

test('Highlighting a word (diff case case)', assert => {
    const source = 'New York';
    const target = 'new';
    
    const actual = applyHighlight(source, target);
    console.log(actual);
    assert.ok(actual.includes('New'), '... should contain unmodified target word');
    assert.ok(actual.includes('span'), '... should include span');
    assert.end();
});
