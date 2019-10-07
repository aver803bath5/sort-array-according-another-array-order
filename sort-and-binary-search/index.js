// Example 1:
// Input: arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
// Output: [2,2,2,1,4,3,3,9,6,7,19]
// Constraints:
// arr1.length, arr2.length <= 1000
// 0 <= arr1[i], arr2[i] <= 1000
// Each arr2[i] is distinct.
// Each arr2[i] is in arr1.

function first(arr, low, high, x, n) {
  if (high >= low) {
    const mid = Math.floor((low + high) / 2);
    if ((mid === 0 || x > arr[mid - 1]) && arr[mid] === x) {
      return mid;
    }
    if (x > arr[mid]) {
      return first(arr, mid + 1, high, x, n);
    }
    return first(arr, low, mid - 1, x, n);
  }

  return -1;
}

// Sort arr1[0...m-1] according to the order
// defined by arr2[0...n-1]
function sortAccording(arr1, arr2, m, n) {
  // The temp array is used to store a copy of
  // arr1[] and visited[] is used mark the
  // visited elements in temp[].
  // O(m)
  const temp = [...arr1];
  const visited = Array(m).fill(0);

  // Sort elements in temp
  // * O(mlogm)
  temp.sort((a, b) => a - b);

  // for index of output which is sorted arr1[]
  let ind = 0;

  // Consider all elements of arr2[], find
  // them in temp[] and copy to arr1[] in order.
  let i = 0;
  // * O(nlogm * m)
  for (i = 0; i < n; i += 1) {
    // Find index of the first occurence
    // of arr2[i] in temp
    // O(logm);
    const f = first(temp, 0, m - 1, arr2[i], m);

    // If present, Copy all occurrences of arr2[i] to arr1[]
    if (f >= -1) {
      // O(m)
      let j = f;
      while (j < m && temp[j] === arr2[i]) {
        // eslint-disable-next-line no-param-reassign
        arr1[ind] = temp[j];
        ind += 1;
        visited[j] = 1;
        j += 1;
      }
    }
  }

  // Now copy all items of temp[] which are
  // not present in arr2[]
  // O(m)
  for (i = 0; i < m; i += 1) {
    if (visited[i] === 0) {
      // eslint-disable-next-line no-param-reassign
      arr1[ind] = temp[i];
      ind += 1;
    }
  }
}

const arr1 = [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19];
const arr2 = [2, 1, 4, 3, 9, 6];

const m = arr1.length;
const n = arr2.length;
console.log('Sorted array is ');
sortAccording(arr1, arr2, m, n);
console.log(arr1);
