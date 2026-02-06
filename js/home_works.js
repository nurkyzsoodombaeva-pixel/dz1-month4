const gmail_input = document.querySelector('#gmail_input');
const gmail_button = document.querySelector('#gmail_button');
const gmail_result = document.querySelector('#gmail_result');

const gmail_regex = /^\w+@\w+\.\w+$/;

gmail_button.addEventListener('click', () => {
    if(gmail_regex.test(gmail_input.value)) {
        gmail_result.style.color = 'green';
        gmail_result.innerHTML = 'Gmail is valid';
    } else if (gmail_input.value === '') {
        gmail_result.style.color = 'red';
        gmail_result.innerHTML = 'Gmail is invalid';
    }
})

const parent_block = document.querySelector('.parent_block');
const child_block = document.querySelector('.child_block');

let positionX = 0;
let positionY = 0;
let directionX = 0;
let directionY = 0;

const moveBlock = () => {
    if (positionX < parent_block.clientWidth - child_block.offsetWidth) {
        positionX++;
        child_block.style.left = `${positionX}px`;
        requestAnimationFrame(moveBlock);
    } else if (positionY < parent_block.clientHeight - child_block.offsetHeight) {
        positionY++;
        child_block.style.top = `${positionY}px`;
        requestAnimationFrame(moveBlock);
    } else if (directionX < parent_block.clientWidth - child_block.offsetWidth) {
        directionX++
        child_block.style.left = `${positionX - directionX}px`;
        requestAnimationFrame(moveBlock);
    } else if (directionY < parent_block.clientHeight - child_block.offsetHeight) {
        directionY++
        child_block.style.top = `${positionY - directionY}px`;
        requestAnimationFrame(moveBlock);
    } else {
        positionX = 0;
        positionY = 0;
        directionX = 0;
        directionY = 0;
        requestAnimationFrame(moveBlock);
    }
}

moveBlock();


let second = 0;
let interval = null;


const seconds = document.querySelector('#seconds');
const startBtn = document.querySelector('#start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.querySelector('#reset');


startBtn.addEventListener('click', () => {
    if (interval !== null) return;
    interval = setInterval(() => {
        second++;
        seconds.innerHTML = second;
    }, 1000)
}) 

stopBtn.addEventListener('click', () => {
    clearInterval(interval);
    interval = null;
})

resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    interval = null;
    second = 0;
    seconds.innerHTML = second;
})
const charactersContainer = document.querySelector('.characters-list')

const requester = new XMLHttpRequest()
requester.open('GET', '../data/characters.json')
requester.setRequestHeader('Content-type', 'application/json')
requester.send()
requester.onload = () => {
    const data = JSON.parse(requester.response)
    data.map((character)=> {
        const card = document.createElement('div')
        card.classList.add('character-card')
        card.innerHTML = `
             <h2>${character.name}</h2>
    <div class="character-photo"><img src="${character.photo}" alt="${character.name}"></div>
   
    <p style="color:white">${character.age}</p>
        `
    charactersContainer.appendChild(card)
    })
}


const qwerty = new XMLHttpRequest()
qwerty.open('GET', '../data/bio.json')
qwerty.setRequestHeader('Content-type', 'application/json')
qwerty.send()
qwerty.onload = () => {
    const data = JSON.parse(qwerty.response)
    console.log(data);
}