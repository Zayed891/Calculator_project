let buffer ='0';
let runningTotal = 0;
let previousOperator = null;
const screen = document.querySelector('.screen');


function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    }else {
        handleNum(value);
    }

    rerender();
}
function handleNum(num){
    if(buffer==='0'){
        buffer=num;
    }else {
        buffer +=num;
    }
}

function flushOperation(intBuffer){
    if(previousOperator==='+'){
        runningTotal += intBuffer;
    }else if(previousOperator==='-'){
        runningTotal -= intBuffer;
    }else if(previousOperator==='×'){
        runningTotal *= intBuffer;
    }else if(previousOperator==='÷'){
        runningTotal /= intBuffer;
    }
}

function handleMath(value){
    if(buffer==='0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if(runningTotal===0){
        runningTotal=intBuffer;
    } else {
        flushOperation(value);
    }

    previousOperator=value;
    buffer = "0";
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer= "0";
            runningTotal=0;
            break;
        case '=':
            if(previousOperator===null){
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator=null;
            buffer = "" + runningTotal;
            runningTotal=0;
            break;
        case '←':
            if(buffer.length===1){
                buffer =0;
            }else {
                buffer = buffer.substring(0,buffer.length-1);
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function init(){
    document.querySelector(".calc-buttons").addEventListener("click", function(event){
        buttonClick(event.target.innerText);
    })
}



function rerender(){
    screen.innerText = buffer;
}

init();