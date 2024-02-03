import React from 'react';
import Header1 from './Header1';
import './SortingVisualizer.css';
import {getMergeSortAnimations,bubbleSort,selectionSort} from './SortingAlgorithms.js';


let ANIMATION_SPEED_MS = 100;

let ArraySize = 20;

const PRIMARY_COLOR = 'orange';


const SECONDARY_COLOR = 'red';


export default class SortingVisualizer extends React.Component{     
    constructor(props){
         super(props);
         this.state ={
            array : [],
        };
    }

    componentDidMount(){
        this.resetArray();  
    }

     resetArray(){
        const array=[];
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i=0;i<ArraySize ;i++){
            array.push(randomIntFromInterval(90,1000));
            if(ArraySize<=40){ 
              if (arrayBars[i]) {
                    arrayBars[i].style.height = `${Math.floor(array[i] / 3)}px`;
                    arrayBars[i].innerText = array[i];
                  }     
            }
          }
       this.setState({array});
       this.resetColor();
    }
    
    resetColor() {
      const arrayBars = document.getElementsByClassName('array-bar');
      for (let i = 0; i < arrayBars.length; i++) {
        arrayBars[i].style.backgroundColor = 'aqua';
      }
    }
    onGenerateNewArray = () => {
      this.resetArray();
    };
  
    onMergeSort = (callback) => {
      this.animateMergeSort(callback);
    };
    
    onbubbleSort=(callback)=>{
       this.animateBubbleSort(callback);
    }

    oninsertionSort=(callback)=>{
        this.insertionSort(callback);
    }
    onselectionSort=(callback)=>{
      const arrayBars = document.getElementsByClassName('array-bar');
      let array = this.state.array.slice(); 
      selectionSort(callback,array,arrayBars,ANIMATION_SPEED_MS);
    }

    setAnimationSpeed=(newSpeed)=>{
      ANIMATION_SPEED_MS =parseInt(newSpeed,10);
    }

    setArraySize=(newSize)=>{
        ArraySize = parseInt(newSize, 10);
        this.resetArray();
    }

       animateMergeSort(callback) {    //original one working one 
        if (!ANIMATION_SPEED_MS || isNaN(ANIMATION_SPEED_MS) || ANIMATION_SPEED_MS <= 0) {
          ANIMATION_SPEED_MS = 100;
        }
      
        const animations = getMergeSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
      
        for (let i = 0; i < animations.length; i++) {
          const isColorChange = i % 3 !== 2;
      
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              if (arrayBars[barOneIdx]) arrayBars[barOneIdx].style.backgroundColor = color;
              if (arrayBars[barTwoIdx]) arrayBars[barTwoIdx].style.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight, barTwoIdx] = animations[i];
              if (arrayBars[barOneIdx]) arrayBars[barOneIdx].style.height = `${Math.floor(newHeight / 3)}px`;
              if (arrayBars[barTwoIdx]) arrayBars[barTwoIdx].style.height = `${Math.floor(newHeight / 3)}px`;
      
              if (ArraySize <= 40) {
                if (arrayBars[barOneIdx]) arrayBars[barOneIdx].innerText = newHeight;
                if (arrayBars[barTwoIdx]) arrayBars[barTwoIdx].innerText = newHeight;
              }
            }, i * ANIMATION_SPEED_MS);
          }
        }
        setTimeout(() => {
          callback();
        }, animations.length * ANIMATION_SPEED_MS);
      }
    
      
    
    animateBubbleSort = (callback) => {
      const array=this.state.array;
      const arrayBars = document.getElementsByClassName('array-bar'); 
      let animations=bubbleSort(array);
      animations.forEach((animation, index) => {
        const { type, indices } = animation;
        const [barOneIdx, barTwoIdx] = indices;
    
        setTimeout(() => {
          if (type === 'compare') {
            arrayBars[barOneIdx].style.backgroundColor = SECONDARY_COLOR;
            arrayBars[barTwoIdx].style.backgroundColor = SECONDARY_COLOR;
          } else if (type === 'swap') {
            const tempHeight = arrayBars[barOneIdx].style.height;
            arrayBars[barOneIdx].style.height = arrayBars[barTwoIdx].style.height;
            arrayBars[barTwoIdx].style.height = tempHeight;
    
            if (ArraySize <= 40) {
              const tempInnerText = arrayBars[barOneIdx].innerText;
              arrayBars[barOneIdx].innerText = arrayBars[barTwoIdx].innerText;
              arrayBars[barTwoIdx].innerText = tempInnerText;
            }
    
            arrayBars[barOneIdx].style.backgroundColor = 'aqua';
          }
          else if(type == 'swap01'){
            arrayBars[barOneIdx].style.backgroundColor = 'aqua';
          }
          else if (type == 'swap02') {
            arrayBars[barOneIdx].style.backgroundColor = PRIMARY_COLOR;
          }
          else if(type == "swap03"){
            arrayBars[barOneIdx].style.backgroundColor = PRIMARY_COLOR;
          }          
        }, index * ANIMATION_SPEED_MS);
      });
    
      setTimeout(() => {
        callback(); 
      }, animations.length * ANIMATION_SPEED_MS);
    };

    insertionSort = (callback) => {
      let array = this.state.array.slice(); // Create a copy of the array to avoid direct mutation
      const arrayBars = document.getElementsByClassName('array-bar');
      const animations = [];
    
      for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
    
        // Animation: set arrayBars[i] to red at the beginning of the outer loop
        //animations.push({ type: 'color', index: i, color: 'red' });
    
        while (j >= 0 && array[j] > key) {
          // Animation: set arrayBars[j] to red during comparison
          animations.push({ type: 'color', index: j, color: 'orange' });
          // Animation: reset colors to blue before comparison
          animations.push({ type: 'color', index: j + 1, color: 'red' });
          animations.push({ type: 'color', index: j + 1, color: 'orange' });

    
          // Swap values
          animations.push({ type: 'swap', indices: [j, j + 1] });
          array[j + 1] = array[j];
          j--;
    
          if (array[j]<key) {
            // Animation: set arrayBars[j] to blue after swapping
            animations.push({ type: 'color', index: j, color: 'orange' });
          }
        }
        animations.push({ type: 'color', index: i, color: 'orange' });
    
        array[j + 1] = key;
    
        // Animation: set arrayBars[i] to orange after sorting
        animations.push({ type: 'color', index: i, color: 'orange' });
      }
    
      this.animateInsertionSort(animations, callback);
    };
    
    animateInsertionSort = (animations, callback) => {
      const arrayBars = document.getElementsByClassName('array-bar');
      let timeout = 0;
    
      // Apply animations
      for (let i = 0; i < animations.length; i++) {
        const { type, index, color, indices } = animations[i];
    
        setTimeout(() => {
          if (type === 'color') {
            arrayBars[index].style.backgroundColor = color;
          } else if (type === 'swap') {
            // Swap heights
            const tempHeight = arrayBars[indices[0]].style.height;
            arrayBars[indices[0]].style.height = arrayBars[indices[1]].style.height;
            arrayBars[indices[1]].style.height = tempHeight;
    
            // Update innerText if ArraySize is less than or equal to 40
            if (ArraySize <= 40) {
              const tempInnerText = arrayBars[indices[0]].innerText;
              arrayBars[indices[0]].innerText = arrayBars[indices[1]].innerText;
              arrayBars[indices[1]].innerText = tempInnerText;
            }
          }
        }, timeout);
    
        timeout += ANIMATION_SPEED_MS;
      }
    
      // Update the state with the sorted array
      setTimeout(() => {
        callback(); // Callback to signal the end of sorting
      }, timeout);
    };
    
    

    render(){
        const {array} = this.state;
        const padding_value = ArraySize<=40? 5:2;
        const margin_value = ArraySize<=40? 5:4;
      
        return(
          
         <div className='array-container'>
          <Header1
            onGenerateNewArray={this.onGenerateNewArray}
            onsetSize={this.setArraySize}
            onsetSpeed={this.setAnimationSpeed}
            onMergeSort={this.onMergeSort}
            onbubbleSort={this.onbubbleSort}
             onselectionSort={this.onselectionSort}
            // onquickSort={this.onquickSort}
             oninsertionSort={this.oninsertionSort}

          />

          <div className='bar-container'>
          {
              array.map((value, idx) => (
              <div key={idx} className='array-bar-container' style={{marginRight : `${margin_value}px`}}>
                    <div className='array-bar' style={{ height: `${Math.floor(value / 3)}px`, padding: `${padding_value}px` }}>
                    {ArraySize <= 40 && <div className='bar-value'>{value}</div>}
                    </div>
                    
             </div>
         ))}
          </div>  
        </div>
        );
    }
    
}

function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }