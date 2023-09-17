'use strict'
import './download.js'
import './textSettings.js'
import {makeElementMove} from "../makeElementMove.js";
import {showTextSettings, hideTextSettings} from "./textSettings.js";

let reader = new FileReader();

document.getElementById('uploadAvatar').addEventListener('change', (e) => {
    let file = e.target.files[0]
    reader.readAsDataURL(file);

    reader.onload = function () {
        let paste = addElement('image');
        paste(reader.result);
    };

    reader.onerror = function () {
        console.log(reader.error);
    };
})


document.getElementById('addText').addEventListener('click', (e) => {
    e.stopPropagation();
    let paste = addElement('text');
    paste();
})


function addElement(string) {
    let border = 'none';
    let readonly = false;
    let classlist = '';
    let placeholder = '';

    if (string === 'image') {
        border = '1px solid black'
        readonly = true;
        classlist = 'avatar';
    }
    if (string === 'text') {
        border = '1px dashed black'
        readonly = false;
        classlist = 'text';
        placeholder = 'text';
    }

    return function paste(background = '') {
        let textarea = document.createElement('textarea');
        if (background) {
            textarea.style.backgroundImage = `url("${background}")`;
        }

        textarea.classList.add(classlist);
        document.querySelector('.result').append(textarea);

        textarea.addEventListener('mousedown', makeElementMove(textarea));
        textarea.readOnly = readonly;
        textarea.placeholder = placeholder;

        textarea.focus();
        focusin();

        document.querySelector('.textSettings').addEventListener('mouseover', (e)=>{
            textarea.removeEventListener('focusout', focusout);
        });
        document.querySelector('.textSettings').addEventListener('mouseout', (e)=>{
            textarea.addEventListener('focusout', focusout);
        });
        document.body.addEventListener('click', (e)=>{
            focusout();
        });
        document.querySelector('.textSettings').addEventListener('click', (e)=>{
            e.stopPropagation();
        })


        textarea.addEventListener('focusout', focusout);
        textarea.addEventListener('focusin', focusin);
        textarea.addEventListener('click',e => e.stopPropagation());

        function focusin(){
            textarea.style.border = border;
            textarea.style.resize = 'both';

            setTimeout(() => {
                textarea.id = 'selected';
                document.getElementById('remove').style.display = 'block';
                string === 'text' ? showTextSettings(textarea) : hideTextSettings();
            }, 0)
        }

        function focusout(){
            textarea.style.border = 'none';
            textarea.style.resize = 'none';

            setTimeout(() => {
                document.getElementById('remove').style.display = 'none';
                hideTextSettings();
                textarea.id = '';
            }, 0)
        }
    }
}


document.getElementById('remove').addEventListener('focusin', (e) => {
    document.getElementById('selected').remove();
})

