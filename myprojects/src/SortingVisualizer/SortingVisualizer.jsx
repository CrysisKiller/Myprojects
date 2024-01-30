import React from 'react';
import './SortingVisualizer.css'
import {getMergeSortAnimations} from './SortingAlgorithms.js';



let ANIMATION_SPEED_MS = 0;

// Change this value for the number of bars (value) in the array.
let NUMBER_OF_ARRAY_BARS = 20;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
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
        
        for(let i=0;i<NUMBER_OF_ARRAY_BARS ;i++){
            array.push(randomIntFromInterval(5,1000));
        }
       this.setState({array});
       this.resetColor();

    }
    setArrayValue(){
      const newSize = document.getElementById('arraysize').value;
      const newSpeed=document.getElementById('animationSpeed').value;
      NUMBER_OF_ARRAY_BARS = parseInt(newSize, 10);
      ANIMATION_SPEED_MS =parseInt(newSpeed,10);
      this.resetArray();
  
    }

    setSortState(){ 
      if(!this.state.sortingInProgress){
        this.setState({sortingInProgress:true});
      }
      else{
        this.setState({sortingInProgress:false});
      }
    }

    resetColor() {
      const arrayBars = document.getElementsByClassName('array-bar');
      for (let i = 0; i < arrayBars.length; i++) {
        arrayBars[i].style.backgroundColor = 'aqua';
      }
    }

    mergeSort() {

        this.setSortState();
      
        const animations = getMergeSortAnimations(this.state.array);

        if (!ANIMATION_SPEED_MS || isNaN(ANIMATION_SPEED_MS) || ANIMATION_SPEED_MS <= 0) {
          // Default animation speed if not provided or not valid
          ANIMATION_SPEED_MS = 100;
        }

        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight/4}px`;
              if (i === animations.length - 1) {
                setTimeout(() => {
                  this.setSortState();
                }, ANIMATION_SPEED_MS);
              }
            }, i * ANIMATION_SPEED_MS);
          }  
        }
        this.setSortState();
      }


   




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
        const {array,display_array} = this.state;
        const padding_value = NUMBER_OF_ARRAY_BARS<60? 12:1;

        return(
         <div className='array-container'>
          
          <div className='buttons'>

            <button onClick={()=>this.resetArray()} className='buttons' disabled={this.state.sortingInProgress}>Generate New Array</button>

            {/* <button onClick={()=>this.bubblesort(array)}className='buttons'>Bubble Sort</button> */}
            <button onClick={()=>this.mergeSort(array)} className='buttons' disabled={this.state.sortingInProgress}>Merge Sort</button>
            <input type='number' id='arraysize' placeholder='number of elements' required></input>
            <input type='number' id='animationSpeed' placeholder='Speed of animation' ></input>
            <input type='submit' value='submit' onClick={()=>{this.setArrayValue()} } disabled={this.state.sortingInProgress}></input>


          </div>      


          <div className='bar-container'>
          {
              array.map((value, idx) => (
              <div key={idx} className='array-bar-container'>
                    <div className='array-bar' style={{ height: `${value / 4}px`, padding: `${padding_value}px` }}></div>
              <div className='bar-value'>{value}</div>
             </div>
         ))}
          </div>
          


       
         
        </div>
        );
    }
    
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }