const cards = document.querySelectorAll('.card');
const columns = document.querySelectorAll('.column');
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close');
const saveButton = document.getElementById('save');
const searchInput = document.getElementById('search');
const companySelector = document.getElementById('company');
let currentCard = null;
let originalColumn = null;

cards.forEach(card => {
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);
});

columns.forEach(column => {
    column.addEventListener('dragover', dragOver);
    column.addEventListener('drop', drop);
});

function dragStart(e) {
    currentCard = e.target;
    originalColumn = currentCard.parentElement;
    setTimeout(() => {
        e.target.style.display = 'none';
    }, 0);
}

function dragEnd(e) {
    e.target.style.display = 'block';
    currentCard = null;
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    if (e.target.classList.contains('column')) {
        const fromColumn = originalColumn.id;
        const toColumn = e.target.id || e.target.parentElement.id;

        if ((fromColumn === 'evaluados' || fromColumn === 'en-intervencion') && toColumn === 'intervenidos') {
            openModal();
        }

        e.target.appendChild(currentCard);
        currentCard.style.display = 'block';
    } else {
        originalColumn.appendChild(currentCard);
        currentCard.style.display = 'block';
    }
}

function openModal() {
    modal.style.display = 'flex';
}

closeModal.onclick = function () {
    modal.style.display = 'none';
    if (currentCard && originalColumn) {
        originalColumn.appendChild(currentCard);
        currentCard.style.display = 'block';
    }
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
    } else {
        originalColumn.appendChild(currentCard);
        currentCard.style.display = 'block';
    }
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        if (currentCard && originalColumn) {
            originalColumn.appendChild(currentCard);
            currentCard.style.display = 'block';
        }
    }
}

searchInput.addEventListener('input', function () {
    const filter = searchInput.value.toLowerCase();
    cards.forEach(card => {
        const name = card.querySelector('strong').textContent.toLowerCase();
        if (name.includes(filter)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
});

companySelector.addEventListener('change', function () {
    const selectedCompany = companySelector.value;
    cards.forEach(card => {
        if (selectedCompany === 'todas') {
            card.style.display = '';
        } else if (card.classList.contains(selectedCompany)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
});

// Mostrar todas las tarjetas por defecto
document.addEventListener('DOMContentLoaded', function () {
    companySelector.value = 'todas';
    companySelector.dispatchEvent(new Event('change'));
});
