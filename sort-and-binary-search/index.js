// Example 1:
// Input: arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
// Output: [2,2,2,1,4,3,3,9,6,7,19]
// Constraints:
// arr1.length, arr2.length <= 1000
// 0 <= arr1[i], arr2[i] <= 1000
// Each arr2[i] is distinct.
// Each arr2[i] is in arr1.

function findFirstMatchElementIndex(
  searchedArray,
  startSearchPosition,
  endSearchPosition,
  targetElement,
  searchedArrayLength,
) {
  if (endSearchPosition >= startSearchPosition) {
    const middleIndexOfSearchedArray = Math.floor(
      (startSearchPosition + endSearchPosition) / 2,
    );
    if (isFound(middleIndexOfSearchedArray, targetElement, searchedArray)) {
      return middleIndexOfSearchedArray;
    }
    if (targetElement > searchedArray[middleIndexOfSearchedArray]) {
      return findFirstMatchElementIndex(
        searchedArray,
        middleIndexOfSearchedArray + 1,
        endSearchPosition,
        targetElement,
        searchedArrayLength,
      );
    }
    return findFirstMatchElementIndex(
      searchedArray,
      startSearchPosition,
      middleIndexOfSearchedArray - 1,
      targetElement,
      searchedArrayLength,
    );
  }

  function isFound(middleIndexOfSearchedArray, targetElement, searchedArray) {
    return (
      (middleIndexOfSearchedArray === 0
        || targetElement > searchedArray[middleIndexOfSearchedArray - 1])
      && searchedArray[middleIndexOfSearchedArray] === targetElement
    );
  }

  return -1;
}

// Sort arr1[0...m-1] according to the order
// defined by arr2[0...n-1]
function sortOneArrayAccordingToTheOtherArrayOrder(
  sortedArray,
  sortOrderArray,
  sortedArrayLength,
  sortOrderArrayLength,
) {
  // The temp array is used to store a copy of
  // arr1[] and visited[] is used mark the
  // visited elements in temp[].
  // O(m)
  const temp = [...sortedArray];
  const visited = Array(sortedArrayLength).fill(0);

  // Sort elements in temp
  // * O(mlogm)
  temp.sort((a, b) => a - b);

  // for index of output which is sorted arr1[]
  let ind = 0;

  // Consider all elements of arr2[], find
  // them in temp[] and copy to arr1[] in order.
  let i;
  // * O(nlogm * m)
  for (i = 0; i < sortOrderArrayLength; i += 1) {
    // Find index of the first occurence
    // of arr2[i] in temp
    // O(logm);
    const firstSortedArrayElementIndexInSortOrderArray = findFirstMatchElementIndex(
      temp,
      0,
      sortedArrayLength - 1,
      sortOrderArray[i],
      sortedArrayLength,
    );

    // If present, Copy all occurrences of arr2[i] to arr1[]
    if (firstSortedArrayElementIndexInSortOrderArray >= -1) {
      // O(m)
      let j = firstSortedArrayElementIndexInSortOrderArray;
      while (isMatched(j)) {
        // eslint-disable-next-line no-param-reassign
        sortedArray[ind] = temp[j];
        ind += 1;
        visited[j] = 1;
        j += 1;
      }
    }
  }

  // Now copy all items of temp[] which are
  // not present in arr2[]
  // O(m)
  insertElementsNotAppearInSortOrderArray();

  function insertElementsNotAppearInSortOrderArray() {
    for (i = 0; i < sortedArrayLength; i += 1) {
      if (visited[i] === 0) {
        // eslint-disable-next-line no-param-reassign
        sortedArray[ind] = temp[i];
        ind += 1;
      }
    }
  }

  function isMatched(j) {
    return j < sortedArrayLength && temp[j] === sortOrderArray[i];
  }
}

const arr1 = [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19];
const arr2 = [2, 1, 4, 3, 9, 6];

const m = arr1.length;
const n = arr2.length;
console.log('Sorted array is ');
sortOneArrayAccordingToTheOtherArrayOrder(arr1, arr2, m, n);
console.log(arr1);
