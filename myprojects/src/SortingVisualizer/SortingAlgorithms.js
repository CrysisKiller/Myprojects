// export const mergesort=(array,animations=[])=>{
//     if(array.length==1)
//         return array;
//     const mid=Math.floor(array.length/2);
//     const firsthalf=mergesort(array.slice(0,mid));
//     const secondhalf=mergesort(array.slice(mid));
//     const sortedarray=[];
//     let i=0,j=mid;
//     while(i<firsthalf.length && j<secondhalf.length){
//         if(firsthalf[i]<firsthalf[j]){
//             sortedarray.push(firsthalf[i++]);
//          }
//         else{
//             sortedarray.push(secondhalf[j++]);    
//         }
//     }
//     while(i<firsthalf.length)sortedarray.push(firsthalf[i++]);
//     while(j<secondhalf.length)sortedarray.push(secondhalf[j++]);
//     return sortedarray;

// };



export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice(); //makes a copy of the original array
    mergeSort(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSort(mainArray,startIdx,endIdx,auxiliaryArray,animations,) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSort(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSort(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    Merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function Merge(mainArray,startIdx,middleIdx,endIdx,auxiliaryArray,animations,) {   
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  
