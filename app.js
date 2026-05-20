// DOM Elemek kiválasztása --- VIVI
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const type = document.getElementById('type');

/
// 1. Tranzakciók megjelenítése a DOM-ban  --- BALAZS 
function renderList() {
list.innerHTML = '';
transactions.forEach(addTransactionDOM);
updateValues();
}

// 2. HTML elem létrehozása egy tranzakcióhoz --- VIVI
function addTransactionDOM(transaction) {
const li = document.createElement('li');

// Stílus hozzáadása a típus alapján --- VIVI
li.classList.add(transaction.type);

// Előjel beállítása VIVI
const sign = transaction.type === 'income' ? '+' : '-';

li.innerHTML = `
${transaction.text}
<span>${sign}${Math.abs(transaction.amount)} Ft</span>
<button class="delete-btn" onclick="deleteTransaction(${transaction.id})">X</button>
`;
list.appendChild(li);
}

// 3. Egyenlegek kiszámítása (Array .reduce() és .filter() használata) --- BALAZS
function updateValues() {
const incomeTotal = transactions
.filter(item => item.type === 'income')
.reduce((acc, item) => (acc += item.amount), 0);

const expenseTotal = transactions
.filter(item => item.type === 'expense')
.reduce((acc, item) => (acc += item.amount), 0);

const total = incomeTotal - expenseTotal;

// DOM frissítése VIVI
balance.innerText = `${total} Ft`;
money_plus.innerText = `+${incomeTotal} Ft`;
money_minus.innerText = `-${expenseTotal} Ft`;
}

// 4. Új tranzakció hozzáadása (Event Handling) --- BALAZS
function addTransaction(e) {
e.preventDefault(); // Ne töltsön újra az oldal ---  VIVI

const textValue = text.value.trim();
const amountValue = Number(amount.value);
const typeValue = type.value;

if (textValue === '' || amountValue <= 0) {
alert('Kérlek adj meg egy érvényes nevet és pozitív összeget!');
return;
}

const transaction = {
id: Date.now(), // Egyedi azonosító 
text: textValue,
amount: amountValue,
type: typeValue
};

transactions.push(transaction);

// Mezők alaphelyzetbe állítása --- BALAZS
text.value = '';
amount.value = '';

updateLocalStorage();
renderList();
}

// 5. Tranzakció törlése  --- VIVI
function deleteTransaction(id) {
transactions = transactions.filter(transaction => transaction.id !== id);
updateLocalStorage();
renderList();
}

// 6. Állapotmegőrzés --- VIVI
function updateLocalStorage() {
localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Eseményfigyelő az űrlaphoz --- VIVI
form.addEventListener('submit', addTransaction);

// Alkalmazás indítása VIVI
renderList();
