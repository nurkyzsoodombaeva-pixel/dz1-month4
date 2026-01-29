const phonInput = document.querySelector('#phone_input');
const btn = document.querySelector('#phone_button');
const result = document.querySelector('#phone_result');

const regex = /^\+996 \d{3} \d{2}-\d{2}-\d{2}$/g;

btn.addEventListener('click', () => {
    if(regex.test(phonInput.value)) {
        result.style.color = 'green';
        result.innerHTML = 'Phone is valid';
    } else {
        result.style.color = 'red';
        resultinnerHTML = 'Phon is invalid';
    }
})

