'use strict'

document.getElementById('DownloadMeme').addEventListener('click', (e)=>{
    let resultWindow = document.querySelector('.result');
    let imgs = [];
    let texts = [];

    document.querySelectorAll('.result textarea').forEach(textarea=>{
        let background = window.getComputedStyle(textarea).backgroundImage
        if (textarea.classList.contains('avatar')){
            let img = document.createElement('img');

            img.style.width = textarea.offsetWidth + 'px';
            img.style.height = textarea.offsetHeight + 'px';
            img.style.border = 'none';
            img.style.opacity = 0;
            img.style.position = 'absolute';
            img.style.top = 0;
            img.src = background.slice(4, -1).replace(/"/g, "")

            document.body.append(img)

            imgs.push({
                img: img,
                left: textarea.offsetLeft - resultWindow.offsetLeft,
                top: textarea.offsetTop - resultWindow.offsetTop,
                width: img.offsetWidth,
                height: img.offsetHeight
            });
        }
        if(textarea.classList.contains('text')){
            texts.push({
                text: textarea.value,
                left: textarea.offsetLeft - resultWindow.offsetLeft,
                top: textarea.offsetTop - resultWindow.offsetTop,
                width: textarea.offsetWidth,
                height: textarea.offsetHeight,
                font: window.getComputedStyle(textarea).fontSize,
                rgb: window.getComputedStyle(textarea).color
            });
        }
    })
    let canvas = document.createElement('canvas');
    canvas.width = resultWindow.offsetWidth;
    canvas.height = resultWindow.offsetHeight;
    const ctx = canvas.getContext('2d');

    let imgData = ctx.getImageData(0,0,canvas.width, canvas.height);
    let data = imgData.data;
    for(let i = 0; i < data.length ; i += 4){
        if(data[i+3]<255){
            data[i]=255;
            data[i+1]=255;
            data[i+2]=255;
            data[i+3]=255;
        }
    }

    ctx.putImageData(imgData,0,0);
    for (let img of imgs){
        ctx.drawImage(img.img, img.left, img.top, img.width, img.height);
    }
    for (let text of texts){
        let textRows = text.text.split('\n');
        let height = +text.font.slice(0, text.font.length-2);
        textRows.forEach(row=>{
            console.log(text.rgb);
            ctx.fillStyle = text.rgb;
            ctx.font = text.font + " Monospace";
            ctx.fillText(row, text.left, text.top + height);
            height -= -text.font.slice(0, text.font.length-2);
        })
    }

    const dataURL = canvas.toDataURL();

    let filename = prompt('Enter a file name', 'file');
    if(filename){
        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = dataURL;
        link.click();
    }

})