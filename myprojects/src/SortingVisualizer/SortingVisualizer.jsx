import React from 'react';
import Header1 from './Header1';
import './SortingVisualizer.css';
import {getMergeSortAnimations} from './SortingAlgorithms.js';


let ANIMATION_SPEED_MS = 0;


let ArraySize = 20;


const PRIMARY_COLOR = 'turquoise';


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
            array.push(randomIntFromInterval(5,1000));
        }
       this.setState({array});
       this.resetColor();
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

      mergeSort() {
        this.setSortState();
            if (!ANIMATION_SPEED_MS || isNaN(ANIMATION_SPEED_MS) || ANIMATION_SPEED_MS <= 0) {
          // Default animation speed if not provided or not valid
          ANIMATION_SPEED_MS = 100;
        }
        const animations = getMergeSortAnimations(this.state.array);
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
        const {array} = this.state;
        const padding_value = ArraySize<=40? 12:1;
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
                    <div className='array-bar' style={{ height: `${value / 4}px`, padding: `${padding_value}px` }}></div>
                    {ArraySize <= 40 && <div className='bar-value'>{value}</div>}
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