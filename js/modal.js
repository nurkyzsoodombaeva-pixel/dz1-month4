const modal = document.querySelector('.modal')
const btnOpen = document.querySelector('#btn-get')
const btnClose = document.querySelector('.modal_close')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden';
}

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = '';
}

btnOpen.onclick = openModal
btnClose.onclick = closeModal

modal.onclick = (event) => {
    if(event.target == modal) {
        closeModal();
    }
}

let scrollOpen = false 
const scroll = ()=>{
    if(!scrollOpen && (window.innerHeight + window.scrollY) >= document.body.offsetHeight){
        openModal()
        window.removeEventListener('scroll', scroll)
        scrollOpen = true
    }
}
 
window.addEventListener('scroll', scroll)



setTimeout(()=>{
    openModal()
},10000)

