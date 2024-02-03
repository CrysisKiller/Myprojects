/**MergeSort */

export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(mainArray,startIdx,endIdx,auxiliaryArray,animations,) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray,startIdx,middleIdx,endIdx,auxiliaryArray,animations,) {
  let k = startIdx;      
  let i = startIdx;      
  let j = middleIdx + 1;
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
/*BubbleSort*/

export function bubbleSort  (array) {
  const n = array.length;

  const animations = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push({ type: 'compare', indices: [j, j + 1] });

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        animations.push({ type: 'swap', indices: [j, j + 1] });
      }
      if (array[j] <= array[j + 1]) {
        animations.push({ type: 'swap01', indices: [j, j + 1] });
      }
      if(j==n-i-2){
      animations.push({ type: 'swap02', indices: [j+1] });}
    }
    if(i==n-1) 
    animations.push({type:"swap03",indices:[0]});
  }
  return(animations);
};
 
/*Selection Sort*/

export function selectionSort (callback,array,arrayBars,ANIMATION_SPEED_MS) {
  let n = array.length;
  const animations = [];
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[minIndex]) {
        animations.push({ type: 'color', index: minIndex, color: 'aqua' });
        minIndex = j;
        animations.push({ type: 'color', index: minIndex, color: 'red' });
      }else{
        animations.push({ type: 'color', index: j, color: 'aqua' });
      }

    }
    let temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
    animations.push({ type: 'color', index: minIndex, color: 'aqua' });
    animations.push({ type: 'color', index: i, color: 'orange' });
  } animations.push({ type: 'color', index: n-1, color: 'orange' });
  for (let i = 0; i < animations.length; i++) {
    const { type, index, color, indices } = animations[i];

    setTimeout(() => {
      if (type === 'color') {
        arrayBars[index].style.backgroundColor = color;
      } else if (type === 'swap') {
        const tempHeight = arrayBars[indices[0]].style.height;
        arrayBars[indices[0]].style.height = arrayBars[indices[1]].style.height;
        arrayBars[indices[1]].style.height = tempHeight;

        
          const tempInnerText = arrayBars[indices[0]].innerText;
          arrayBars[indices[0]].innerText = arrayBars[indices[1]].innerText;
          arrayBars[indices[1]].innerText = tempInnerText;
        
      }
    }, i * ANIMATION_SPEED_MS);
  }

  setTimeout(() => {
    
    callback();
  }, animations.length * ANIMATION_SPEED_MS);
};

/*Insertion Sort*/

export function insertionSort (array) {
  const animations = [];

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      animations.push({ type: 'color', index: j, color: 'orange' });
      animations.push({ type: 'color', index: j + 1, color: 'red' });
      animations.push({ type: 'color', index: j + 1, color: 'orange' });
      animations.push({ type: 'swap', indices: [j, j + 1] });
      array[j + 1] = array[j];
      j--;

      if (array[j]<key) {
        animations.push({ type: 'color', index: j, color: 'orange' });
      }
    }
    animations.push({ type: 'color', index: i, color: 'orange' });

    array[j + 1] = key;

    // Animation: set arrayBars[i] to orange after sorting
    animations.push({ type: 'color', index: i, color: 'orange' });
  }
  return animations;
};



/** QuickSort*/


export function quickSort(array,callback){
  const animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
};

function quickSortHelper(array, low, high, animations){
  if (low < high) {
    const partitionIndex = partition(array, low, high, animations);
    quickSortHelper(array, low, partitionIndex - 1, animations);
    quickSortHelper(array, partitionIndex + 1, high, animations);
  }
};

function partition (array, low, high, animations) {
  const pivot = array[high];
  animations.push({ type: 'color', index: high, color: 'green' });

  let i = low - 1;

  for (let j = low; j < high; j++) {
    animations.push({ type: 'color', index: j, color: 'red' });
    //animations.push({ type: 'color', index: high, color: 'red' });
    animations.push({ type: 'color', index: j, color: 'orange' });

    if (array[j] <= pivot) {
      i++;
      animations.push({ type: 'swap', indices: [i, j] });
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      if (i !== j) {
        //animations.push({ type: 'color', index: i+1, color: 'orange' });
        animations.push({ type: 'color', index: i, color: 'orange' });
        animations.push({ type: 'color', index: j, color: 'orange' });
      }
    }
  }

  animations.push({ type: 'swap', indices: [i + 1, high] });
  const temp = array[i + 1];
  array[i + 1] = array[high];
  array[high] = temp;
  //animations.push({ type: 'color', index: i, color: 'orange' });

  animations.push({ type: 'color', index: i + 1, color: 'orange' });
  animations.push({ type: 'color', index: high, color: 'orange' });

  return i + 1;
};


