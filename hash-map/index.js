// Generate a hash map which structure is (key: arr1's element, value: occurence of the key number)
// O(n + m)
function genHashMap(arr1, arr2) {
  const hashMap = new Map(arr2.map((element) => [element, 0]));

  arr1.forEach((element) => {
    if (hashMap.get(element) !== undefined) {
      hashMap.set(element, hashMap.get(element) + 1);
    } else {
      hashMap.set(element, 0);
    }
  });

  return hashMap;
}

// O(n)
function sortArray(arr1, arr2) {
  let result = [];
  const hashMap = genHashMap(arr1, arr2);
  arr2.forEach((element) => {
    if (hashMap.get(element)) {
      // Get occurence of the matched element from hash map and assign to count
      // then push the element into result[] `count` times
      let count = hashMap.get(element);
      while (count !== 0) {
        result.push(element);
        count -= 1;
      }
      // Remove the element which has been pushed into result[] from the hash map
      hashMap.delete(element);
    }
  });

  const unmathedElements = Array.from(hashMap.keys()).sort((a, b) => a - b);
  result = result.concat(unmathedElements);

  return result;
}

const arr1 = [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19];
const arr2 = [2, 1, 4, 3, 9, 6];

console.log(sortArray(arr1, arr2));
