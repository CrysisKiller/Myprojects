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
    console.log("aux first thie array:"+auxiliaryArray);
    console.log("original array:"+array);
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
    console.log("aux array:"+auxiliaryArray);
    console.log("main array :"+mainArray);
    while (i <= middleIdx && j <= endIdx) {

      animations.push([i, j]);

      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {

      animations.push([i, i]);
 
      animations.push([i, i]);
     
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
     
      animations.push([j, j]);

      animations.push([j, j]);
   
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  
}
