const btnMenu = document.querySelector('.main-nav__toggle');
const menu = document.querySelector('.main-nav__list');
const header = document.querySelector(".main-nav");

// Menu Animation
btnMenu.addEventListener('click', ()=>{
    btnMenu.classList.toggle('ativar')
    menu.classList.toggle('show-menu')
    header.classList.toggle('fusco')
})

//Overlay

const ProjectCar1 = document.getElementById('card-1')
const ProjectCar3 = document.getElementById('card-3')

const overlay3 = document.querySelector('#overlay3')
const overlay = document.querySelector('.overlay')

const x1 = document.getElementById('x1')
const x3 = document.getElementById('x3')

ProjectCar1.addEventListener('click', () => {
    overlay.classList.add('mostrarOverlay1')
    document.body.classList.add("no-scroll");
})
x1.addEventListener('click', ()=>{
    overlay.classList.remove('mostrarOverlay1')
    document.body.classList.remove("no-scroll");
})

ProjectCar3.addEventListener('click', () => {
    overlay3.classList.add('mostrarOverlay1')
    document.body.classList.add("no-scroll");
})
x3.addEventListener('click', ()=>{
    overlay3.classList.remove('mostrarOverlay1')
    document.body.classList.remove("no-scroll");
})

// Scroll Animation
window.addEventListener('scroll', ()=>{
    header.classList.toggle('rolagem', window.scrollY > 0)
})

//Hero Animation
window.onload = ()=>{
    document.body.classList.add('loaded')
}


//Skills Animation
const bars = document.querySelectorAll('.skill-item__progress')

const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
    const el = entry.target
    const value = el.dataset.value

    el.style.width = value + '%'

    observer.unobserve(el) // anima só uma vez
    }
})
}, {
threshold: 0.5
})

bars.forEach(bar => observer.observe(bar))


//Animação de Entrada
const element = document.querySelector('.about-section__bio');
const card_desc = document.querySelector('.about-section__stats--animated');
const sobre = document.getElementById('sobre')
const skill = document.getElementById('skill')

const observer2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer2.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

if (element) observer2.observe(element);
if (card_desc) observer2.observe(card_desc);
if(sobre) observer2.observe(sobre)
if(skill) observer2.observe(skill)

    //Validação do formulário de mensagem

const form = document.querySelector('.contact-form');
const btn = document.querySelector('.contact-form__submit');

const nameInput = form.querySelector('#contact-name');
const emailInput = form.querySelector('#contact-email');
const messageInput = form.querySelector('#contact-message');

const errors = form.querySelectorAll('.form-field__error');

// desativa botão no início
btn.disabled = true;

// -------- VALIDADORES --------
function validarNome() {
    return nameInput.value.trim().length >= 2;
}

function validarEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailInput.value.trim());
}

function validarMensagem() {
    return messageInput.value.trim().length >= 10;
}

// -------- MOSTRAR ERROS --------
function mostrarErro(input, index, condicao) {
    if (!condicao) {
        errors[index].style.opacity = '1';
        input.style.borderColor = 'red';
    } else {
        errors[index].style.opacity = '0';
        input.style.borderColor = '';
    }
}

// -------- VALIDAÇÃO GLOBAL --------
function validarForm() {
    const nomeOk = validarNome();
    const emailOk = validarEmail();
    const msgOk = validarMensagem();

    btn.disabled = !(nomeOk && emailOk && msgOk);
}

// -------- EVENTOS EM TEMPO REAL --------
[nameInput, emailInput, messageInput].forEach((input, index) => {
    input.addEventListener('input', () => {
        validarForm();

        // só mostra erro se o user já começou a digitar
        if (input.value.length > 0) {
            if (index === 0) mostrarErro(input, index, validarNome());
            if (index === 1) mostrarErro(input, index, validarEmail());
            if (index === 2) mostrarErro(input, index, validarMensagem());
        }
    });
});

// -------- SUBMIT --------
form.addEventListener('submit', (e) => {
    const nomeOk = validarNome();
    const emailOk = validarEmail();
    const msgOk = validarMensagem();

    mostrarErro(nameInput, 0, nomeOk);
    mostrarErro(emailInput, 1, emailOk);
    mostrarErro(messageInput, 2, msgOk);

    if (!(nomeOk && emailOk && msgOk)) {
        e.preventDefault();
        return;
    }

    setTimeout(() => { 
        form.reset(); 
        btn.disabled = true; 
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }, 100);
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    await fetch(form.action, {
        method: 'POST',
        body: data
    });

    form.reset();
    btn.disabled = true;

    window.location.href = "#HOME";
});
