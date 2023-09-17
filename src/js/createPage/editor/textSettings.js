'use strict'

document.getElementById('fontSize').addEventListener('input', (e)=>{
    e.target.value = e.target.value.replace(/^0+/, '');
    let setAppropriateValue = inputValueHandler(100);
    setAppropriateValue(e.target);
    document.getElementById('selected').style.fontSize = e.target.value + 'px';
})

document.querySelectorAll('.color').forEach(color=>{
    let colors;
    color.addEventListener('input', (e)=>{
        e.target.value = e.target.value.replace(/^0+/, '');
        let setAppropriateValue = inputValueHandler(255);
        setAppropriateValue(e.target);

        colors = getColors();
        document.getElementById('selected').style.color = `rgb(${colors.red},${colors.green},${colors.blue})`;
    })
})


function inputValueHandler(maxValue){
    return function (target){
        target.value = target.value.replaceAll(' ', '');
        if(isNaN(target.value)) {
            target.value = target.value.replace(/\D/g, '');
            return;
        }
        if(+target.value > maxValue)  target.value = maxValue;
        if(target.value === '')  target.value = '0';

        target.style.width = ((target.value.length) * 9) + 'px';
    }
}

function getColors(){
    return {
        red: document.getElementById('red').value,
        green: document.getElementById('green').value,
        blue: document.getElementById('blue').value
    }
}



export function showTextSettings(elem){
    let textSettings = document.querySelector('.textSettings');
    let styles = window.getComputedStyle(elem)
    let colors = styles.color;
    let fontSize = styles.fontSize;
    fontSize = fontSize.slice(0, fontSize.length-2);

    let [red, green, blue] = colors.slice(4, colors.length-1).split(', ')


    document.getElementById('red').value = red;
    document.getElementById('red').style.width = red.length*9 + 'px';
    document.getElementById('green').value = green;
    document.getElementById('green').style.width = green.length*9 + 'px';
    document.getElementById('blue').value = blue;
    document.getElementById('blue').style.width = blue.length*9 + 'px';
    document.getElementById('fontSize').value = fontSize;
    document.getElementById('fontSize').style.width = fontSize.length*9 + 'px';


    textSettings.style.display = 'flex';
}

export function hideTextSettings(){
    document.querySelector('.textSettings').style.display = 'none';
}