import React from 'react';
import './SortingVisualizer.css'

export default class SortingVisualizer extends React.Component{
    constructor(props){
         super(props);
        // this.name=props.name;
        this.state ={
            array : [],
            display_array:false,
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array=[];
        for(let i=0;i<230;i++){
            array.push(randomIntFromInterval(5,1000));
        }
       this.setState({array});

    }

    bubblesort = (a)=> {
        const n=a.length;
        for(let i=0;i<n-1;i++){
            for(let j=0;j<n-1-i;j++){
                if(a[j]>a[j+1])
                [a[j],a[j+1]]=[a[j+1],a[j]];
            }
        }
        this.setState({a});
    }

    // display=(a)=>{
    //     this.setState({ array: a, display_array: true }); 
    //     console.log(this.display_array)    
    // }


    render(){
        const {array,display_array} = this.state;

        return(
         <div className='array-container'>
          
            {
                array.map((value,idx)=>(
                    <div className='array-bar' key={idx} style={{height:`${value}px`,padding:`1px`}}>
                    </div>
                ))
                
            }
            <button onClick={()=>this.resetArray()}>Generate New Array</button>
            <button onClick={()=>this.bubblesort(array)}>Bubble Sort</button>

            {/* <button onClick={()=> this.display(array)}>show array</button>
            {display_array && (
              <div>
             {
                array.map((value, idx) => (
                <div  key={idx}>
                    {value}
                </div>
            ))}
        </div>
      )} */}
       
         
          </div>
        );
    }
    
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }