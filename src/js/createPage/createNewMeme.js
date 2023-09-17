'use strict'
import Meme from "../meme/meme.js";


document.getElementById('createNew').addEventListener('click', (e) => {
    createNewMeme();
    showCreator();
})


function createNewMeme() {
    let newMeme = Object.assign({}, Meme);
    sessionStorage.setItem('tempMeme', JSON.stringify(newMeme))
    document.querySelector('.result').innerHTML = '';
}

function showCreator() {
    document.querySelector('.createNew').style.display = 'none';
    document.querySelector('.creator').style.display = 'flex';
}