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

const tabBlocks = document.querySelectorAll('.tab_content_block')
const tabButtons = document.querySelectorAll('.tab_content_item')
const tabButtonsPerent = document.querySelector('.tab_content_items')


const hideBlocks = () => {
    tabBlocks.forEach(item => {
        item.style.display = 'none';
    })
    tabButtons.forEach(button => {
        button.classList.remove('tab_content_item_active');
    })
}

const showBlock = (index = 0) => {
    tabBlocks[index].style.display = 'block';
    tabButtons[index].classList.add('tab_content_item_active');
}

hideBlocks()
showBlock()

tabButtonsPerent.addEventListener('click', (event) => {
    if(event.target.tagName.toLowerCase() === 'button'){
        tabButtons.forEach((item, index) => {
            if(event.target == item) {
                hideBlocks()
                showBlock(index)
            }
        })
    }
    })


let slideIndex = 0;

const autoSlider = () => {
    setInterval(() => {
        slideIndex++;
        if (slideIndex > tabButtons.length - 1) {
            slideIndex = 0;
        }
        hideBlocks();
        showBlock(slideIndex);
    }, 3000);
};
autoSlider();





