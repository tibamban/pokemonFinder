const {
  fetchPokemons,
  findAverageHeight,
  findAverageWeight

} = require("./index.js");

// test the findAverageWeight function
test('average weight for (69,130) to equal 99.5', () => {
  expect(findAverageWeight([
  {
    weight: 69
  },
  {
    weight: 130
  }
])).toEqual(99.5);
});

test('return half the weight if a value is missing ', () => {
  expect(findAverageWeight([
  {
    weight:''
  },
  {
    weight: 130
  }
])).toEqual(65);
});
test('return not a number weight if a value is a string ', () => {
  expect(findAverageWeight([
  {
    weight:'str'
  },
  {
    weight: 130
  }
])).toEqual(NaN);
});

// test the findAverageHeight function
test('average height for (43,130) to equal 86.5', () => {
  expect(findAverageHeight([
  {
    height: 43
  },
  {
    height: 130
  }
])).toEqual(86.5);
});

test('return half the height if a value is missing ', () => {
  expect(findAverageHeight([
  {
    height:''
  },
  {
    height: 130
  }
])).toEqual(65);
});
test('return not a number height if a value is a string ', () => {
  expect(findAverageWeight([
  {
    height:'str'
  },
  {
    height: 130
  }
])).toEqual(NaN);
});

// Test fetchPokemons function:
test('the data is parsed correctly', async () => {
  await expect(fetchPokemons('pikachu')).resolves.toEqual({
		"height":4,
		"name":"pikachu",
		"type(s)":["electric"],
		"weight":60
		});
});
