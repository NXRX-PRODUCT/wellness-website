// Load saved data on page load
document.addEventListener('DOMContentLoaded', function() {
    renderChecklist();
    loadJournalEntries();
    loadMotivationalMessage();
});


// Custom checklist functionality
function renderChecklist() {
    function renderChecklist() {
        console.log("Saved items:", localStorage.getItem('userChecklist')); // Debug line
        const list = document.getElementById('checklist-list');
        // ... rest of the code
    }    
    const list = document.getElementById('checklist-list');
    list.innerHTML = '';
    const items = JSON.parse(localStorage.getItem('userChecklist')) || [];
    items.forEach((item, idx) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.done;
        checkbox.addEventListener('change', function() {
            items[idx].done = checkbox.checked;
            localStorage.setItem('userChecklist', JSON.stringify(items));
        });
        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(" " + item.text));
        list.appendChild(li);
    });
}

document.getElementById('add-item-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('new-item-text');
    const text = input.value.trim();
    if (text) {
        const items = JSON.parse(localStorage.getItem('userChecklist')) || [];
        items.push({text: text, done: false});
        localStorage.setItem('userChecklist', JSON.stringify(items));
        input.value = '';
        renderChecklist();
    }
});


// Mood journal functionality
function loadJournalEntries() {
    const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    const container = document.getElementById('journal-entries');
    container.innerHTML = '';
    entries.forEach(entry => {
        const p = document.createElement('p');
        p.textContent = `${entry.date}: ${entry.text}`;
        container.appendChild(p);
    });
}

document.getElementById('save-journal').addEventListener('click', function() {
    const entryText = document.getElementById('journal-entry').value.trim();
    if (entryText) {
        const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        const newEntry = {
            date: new Date().toLocaleDateString(),
            text: entryText
        };
        entries.push(newEntry);
        localStorage.setItem('journalEntries', JSON.stringify(entries));
        document.getElementById('journal-entry').value = '';
        loadJournalEntries();
    }
});

// Motivational message functionality
const messages = [
    "You are capable of amazing things. Keep going!",
    "Take a deep breath and remember: progress, not perfection.",
    "Your well-being matters. Prioritize yourself today.",
    "Small steps lead to big changes. You've got this!",
    "Be kind to yourself; you're doing your best.",
    "Rest is productive. Recharge and come back stronger.",
    "Every day is a new opportunity to thrive.",
    "You're stronger than you think. Believe in yourself."
];

function loadMotivationalMessage() {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('motivationDate');
    const savedMessage = localStorage.getItem('motivationMessage');
    
    if (savedDate === today && savedMessage) {
        document.getElementById('motivational-message').textContent = savedMessage;
    } else {
        generateNewMessage();
    }
}

function generateNewMessage() {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const today = new Date().toDateString();
    localStorage.setItem('motivationDate', today);
    localStorage.setItem('motivationMessage', randomMessage);
    document.getElementById('motivational-message').textContent = randomMessage;
}

document.getElementById('new-message').addEventListener('click', generateNewMessage);
