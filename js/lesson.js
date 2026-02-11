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


const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

const converter = (element, otherElement, otherElement2) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open('GET', '../data/converter.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();
        request.onload = () => {
            const response = JSON.parse(request.response);
            if (element.value === '') {
                otherElement.value = '';
                otherElement2.value = '';
                return;
            }
            if(element.id === 'som') {
                otherElement.value = (element.value / response.usd).toFixed(2);
                otherElement2.value = (element.value / response['eur-som']).toFixed(2);
            } else if(element.id === 'usd') {
                otherElement.value = (element.value * response.usd).toFixed(2);
                otherElement2.value = (element.value / response['eur-usd']).toFixed(2);
            } else if(element.id === 'eur') {
                otherElement.value = (element.value * response['eur-som']).toFixed(2);
                otherElement2.value = (element.value * response['eur-usd']).toFixed(2);
            }
        };
    };
};

converter(somInput, usdInput, eurInput);
converter(usdInput, somInput, eurInput);
converter(eurInput, somInput, usdInput);




// somInput.oninput = () => {
//     const reuest = new XMLHttpRequest();
//     reuest.open('GET', '../data.con');
//     reuest.setRequestHeader('Content-type', 'application/json');
//     reuest.send();
//     reuest.onload = () => {
//         const data = JSON.parse(reuest.response);
//         usdInput.value = (somInput.value / data.usd).toFixed(2);
//     };
// }

// usdInput.oninput = () => {
//     const reuest = new XMLHttpRequest();
//     reuest.open('GET', '../data.con');
//     reuest.setRequestHeader('Content-type', 'application/json');
//     reuest.send();
//     reuest.onload = () => {
//         const data = JSON.parse(reuest.response);
//         somInput.value = (usdInput.value * data.usd).toFixed(2);
//     };
// }