function searchArr2(arr2, key) {
  return arr2.indexOf(key);
}

function sortA1ByA2(arr1, arr2) {
  const searchArr2BindWithArr2 = searchArr2.bind(null, arr2);

  function comparer(a, b) {
    const idx1 = searchArr2BindWithArr2(a);
    const idx2 = searchArr2BindWithArr2(b);

    if (idx1 > -1 && idx2 > -1) {
      return idx1 - idx2;
    }
    if (idx1 > -1) {
      return -1;
    }
    if (idx2 > -1) {
      return 1;
    }

    return a - b;
  }

  arr1.sort(comparer);
}

const arr1 = [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19];
const arr2 = [2, 1, 4, 3, 9, 6];

sortA1ByA2(arr1, arr2);
console.log(arr1);
