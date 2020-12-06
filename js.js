
const arr1 = [
  'http://swapi.dev/api/films/1/',
  'http://swapi.dev/api/films/2/'
]

const replace = 3

const regex = new RegExp(replace, "g")

console.log(regex);

const atLeastOneMatches = arr1.some(e => regex.test(e));

console.log(atLeastOneMatches)
