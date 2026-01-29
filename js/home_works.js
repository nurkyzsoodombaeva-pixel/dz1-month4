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

const parent_block = document.querySelector('#parent_block');
const child_block = document.querySelector('#child_block');

console.log(parent_block);
console.log(child_block);

let position = 0;

const moveBlock = () => {
    if (position < parent_block - child_block) {
        position++;
        child_block.style.left = `${position}px`;
        requestAnimationFrame(moveBlock);
    }
}

moveBlock();