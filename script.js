const cards = document.querySelectorAll('.card');
const columns = document.querySelectorAll('.column');
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close');
const saveButton = document.getElementById('save');
let currentCard = null;

cards.forEach(card => {
    card.addEventListener('dragstart', dragStart);
});

columns.forEach(column => {
    column.addEventListener('dragover', dragOver);
    column.addEventListener('drop', drop);
});

function dragStart(e) {
    currentCard = e.target;
    setTimeout(() => {
        e.target.style.display = 'none';
    }, 0);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    if (e.target.classList.contains('column')) {
        const fromColumn = currentCard.parentElement.id;
        const toColumn = e.target.id || e.target.parentElement.id;

        if (fromColumn === 'en-intervencion' && toColumn === 'intervenidos') {
            openModal();
        }

        e.target.appendChild(currentCard);
        currentCard.style.display = 'block';
    }
}

function openModal() {
    modal.style.display = 'flex';
}

closeModal.onclick = function () {
    modal.style.display = 'none';
}

saveButton.onclick = function () {
    const interventionType = Array.from(document.getElementById('intervention-type').selectedOptions).map(option => option.value).join(', ');
    const details = document.getElementById('details').value;
    const date = document.getElementById('date').value;
    const competencias = Array.from(document.getElementById('competencias').selectedOptions).map(option => option.value).join(', ');

    if (interventionType && details.trim() !== '' && date && competencias) {
        currentCard.setAttribute('data-intervention-type', interventionType);
        currentCard.setAttribute('data-details', details);
        currentCard.setAttribute('data-date', date);
        currentCard.setAttribute('data-competencias', competencias);
        modal.style.display = 'none';
    }
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
