import React from 'react';
import Header1 from './Header1';
import './SortingVisualizer.css';
import {getMergeSortAnimations} from './SortingAlgorithms.js';


let ANIMATION_SPEED_MS = 0;


let ArraySize = 20;


const PRIMARY_COLOR = 'orange';


const SECONDARY_COLOR = 'red';


export default class SortingVisualizer extends React.Component{     
    constructor(props){
         super(props);
         this.state ={
            array : [],
            sortingInProgress: false,
        };
    }

    componentDidMount(){
        this.resetArray();  
    }

     resetArray(){
        const array=[];
        
        for(let i=0;i<ArraySize ;i++){
            array.push(randomIntFromInterval(90,1000));
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
  
    onMergeSort = () => {
      this.mergeSort();
    };
  
    onSubmit = () => {
      this.setArrayValue();
    };

    setAnimationSpeed=(newSpeed)=>{
      ANIMATION_SPEED_MS =parseInt(newSpeed,10);
    }

    setArraySize=(newSize)=>{
      ArraySize = parseInt(newSize, 10);
      this.resetArray();
    }

       mergeSort() {    //original one working one 
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
              // Check if arrayBars[barOneIdx] and arrayBars[barTwoIdx] are defined before accessing style
              if (arrayBars[barOneIdx]) arrayBars[barOneIdx].style.backgroundColor = color;
              if (arrayBars[barTwoIdx]) arrayBars[barTwoIdx].style.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight, barTwoIdx] = animations[i];
              // Check if arrayBars[barOneIdx] and arrayBars[barTwoIdx] are defined before accessing style
              if (arrayBars[barOneIdx]) arrayBars[barOneIdx].style.height = `${newHeight / 3}px`;
              if (arrayBars[barTwoIdx]) arrayBars[barTwoIdx].style.height = `${newHeight / 3}px`;
      
              // Update value (only if ArraySize is less than or equal to 40)
              if (ArraySize <= 40) {
                if (arrayBars[barOneIdx]) arrayBars[barOneIdx].innerText = newHeight;
                if (arrayBars[barTwoIdx]) arrayBars[barTwoIdx].innerText = newHeight;
              }
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }


      // mergeSort() {
      //   if (!ANIMATION_SPEED_MS || isNaN(ANIMATION_SPEED_MS) || ANIMATION_SPEED_MS <= 0) {
      //     ANIMATION_SPEED_MS = 100;
      //   }
      
      //   const animations = getMergeSortAnimations(this.state.array);
      //   const arrayBars = document.getElementsByClassName('array-bar');
      
      //   for (let i = 0; i < animations.length; i++) {
      //     const isColorChange = i % 3 !== 2;
      
      //     if (isColorChange) {
      //       const [barOneIdx, barTwoIdx] = animations[i];
      //       const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      //       setTimeout(() => {
      //         // Check if arrayBars[barOneIdx] and arrayBars[barTwoIdx] are defined before accessing style
      //         if (arrayBars[barOneIdx]) arrayBars[barOneIdx].style.backgroundColor = color;
      //         if (arrayBars[barTwoIdx]) arrayBars[barTwoIdx].style.backgroundColor = color;
      //       }, i * ANIMATION_SPEED_MS);
      //     } else {
      //       setTimeout(() => {
      //         const [barOneIdx, newHeight, barTwoIdx] = animations[i];
      //         // Check if arrayBars[barOneIdx] and arrayBars[barTwoIdx] are defined before accessing style
      //         if (arrayBars[barOneIdx]) arrayBars[barOneIdx].style.height = `${newHeight / 3}px`;
      //         if (arrayBars[barTwoIdx]) arrayBars[barTwoIdx].style.height = `${newHeight / 3}px`;
      
      //         // Update value (only if ArraySize is less than or equal to 40)
      //         if (ArraySize <= 40) {
      //           if (arrayBars[barOneIdx]) arrayBars[barOneIdx].innerText = newHeight;
      //           if (arrayBars[barTwoIdx]) arrayBars[barTwoIdx].innerText = newHeight;
      //         }
      //       }, i * ANIMATION_SPEED_MS);
      //     }
      //   }
      // }
    // bubblesort = (a)=> {
    //     const n=a.length;
    //     for(let i=0;i<n-1;i++){
    //         for(let j=0;j<n-1-i;j++){
    //             if(a[j]>a[j+1])
    //             [a[j],a[j+1]]=[a[j+1],a[j]];
    //         }
    //     }
    //     this.setState({a});
    // }

    // display=(a)=>{
    //     this.setState({ array: a, display_array: true }); 
    //     console.log(this.display_array)    
    // }


    render(){
        const {array} = this.state;
        const padding_value = ArraySize<=40? 5:2;
        const margin_value = ArraySize<=40? 5:1;
      
        return(
          
         <div className='array-container'>
          <Header1
            onGenerateNewArray={this.onGenerateNewArray}
            onMergeSort={this.onMergeSort}
            onSubmit={this.onSubmit}
            onsetSize={this.setArraySize}
            onsetSpeed={this.setAnimationSpeed}
          />

          <div className='bar-container'>
          {
              array.map((value, idx) => (
              <div key={idx} className='array-bar-container' style={{marginRight : `${margin_value}px`}}>
                    <div className='array-bar' style={{ height: `${value / 3}px`, padding: `${padding_value}px` }}>
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