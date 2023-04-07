const myArray = ['a', 'b', 'c'];
const myArrayNums = [1, 2, 3, 4, 5, 10];
const myObj = {
  0: 'a',
  1: 'b',
  2: 'c',
};

///////////////////////////////////////////////////////////////////////////////////////////////
// Objects & Array Functions
function checkInput(collection) {
  return Array.isArray(collection) ? collection : Object.values(collection);
}

function myEach(collection, callback) {
  const values = checkInput(collection);
  for (let i = 0; i < values.length; i++) {
    callback(values[i], i, collection);
  }
  return collection;
}

function myMap(collection, callback) {
  const values = checkInput(collection);
  const newArr = [];
  for (let i = 0; i < values.length; i++) {
    newArr.push(callback(values[i], i, values));
  }
  return newArr;
}

const doubledNums = myMap(myArrayNums, (num) => {
  return num * 2;
});
// console.log(doubledNums);

function myReduce(collection, callback, acc) {
  const values = checkInput(collection);
  let startIndex = acc !== undefined ? 0 : 1;
  let accumulator = acc !== undefined ? acc : values[0];
  for (let i = startIndex; i < values.length; i++) {
    accumulator = callback(accumulator, values[i], collection);
  }
  return accumulator;
}

let sum = myReduce(
  myArrayNums,
  (total, curr) => {
    return (total += curr);
  },
  0
);
// console.log(sum);

function myFind(collection, callback) {
  const values = checkInput(collection);
  for (let i = 0; i < values.length; i++) {
    if (callback(values[i], i, collection)) {
      return values[i];
    }
  }
  return undefined;
}

const findTest = myFind(myArrayNums, (value) => {
  return value > 2;
});
// console.log(findTest);

function myFilter(collection, callback) {
  const values = checkInput(collection);
  const filteredArr = [];
  for (let i = 0; i < values.length; i++) {
    if (callback(values[i], i, collection)) {
      filteredArr.push(values[i]);
    }
  }
  return filteredArr;
}

const filterTest = myFilter(myArrayNums, (value) => value % 2 === 0);
// console.log(filterTest);

function mySize(collection) {
  const values = checkInput(collection);
  return values.length;
}
// console.log(mySize({ one: 1, two: 2, three: 3 }));

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Array-only Functions
const arr = [1, 2, 3, 4, 5];

function myFirst(arr, n) {
  return n !== undefined ? arr.slice(0, n) : arr[0];
}
// myFirst(arr); // => 1
// myFirst([5, 4, 3, 2, 1], 3); // => [5, 4, 3]

function myLast(arr, n) {
  return n !== undefined ? arr.slice(-n) : arr[arr.length - 1];
}
// myLast([5, 4, 3, 2, 1]); // => 1
// myLast([5, 4, 3, 2, 1], 3); //=> [3, 2, 1]

function mySortBy(arr, callback) {
  const newArr = arr.slice();

  newArr.sort((a, b) => {
    const aTransformed = callback(a);
    const bTransformed = callback(b);
    if (aTransformed > bTransformed) {
      return 1;
    }
    if (aTransformed < bTransformed) {
      return -1;
    }

    return 0;
  });
  return newArr;
}

const words = ['pear', 'apple', 'orange', 'banana'];
// sorting ascending then reverse it to get descending order
const sortedWords = mySortBy(words, (word) => word.length).reverse();
// console.log(sortedWords);
const stooges = [
  { name: 'moe', age: 40 },
  { name: 'larry', age: 50 },
  { name: 'curly', age: 60 },
];
// adding negative -stooge.age to sort reveresly 
// console.log(
//   mySortBy(stooges, function (stooge) {
//     return -stooge.age;
//   })
// );

function myFlatten(arr, shallow = false, newArr = []) {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      if (shallow) {
        newArr.push(...arr[i]);
      } else {
        myFlatten(arr[i], false, newArr);
      }
    } else {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
myFlatten([1, [2], [3, [[4]]]]); //=> [1, 2, 3, 4];
myFlatten([1, [2], [3, [[4]]]], true); // => [ 1, 2, 3, [ [ 4 ] ] ]

myFlatten(
  [
    [1, [2, [3]]],
    [4, [5, [6]]],
  ],
  true
); // => [ 1, [ 2, [ 3 ] ], 4, [ 5, [ 6 ] ] ]

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Object-only Functions
function myKeys(obj) {
  return Object.keys(obj);
}
function myValues(obj) {
  return Object.values(obj);
}

myKeys({ one: 1, two: 2, three: 3 }); // => ["one", "two", "three"]
myValues({ one: 1, two: 2, three: 3 }); // => [1, 2, 3]
