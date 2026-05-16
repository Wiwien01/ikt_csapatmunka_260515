// DOM Elemek kiválasztása VIVI
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const type = document.getElementById('type');

// Állapot (State) betöltése LocalStorage-ből VIVI
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let trans

// 2. HTML elem létrehozása egy tranzakcióhoz VIVI
function addTransactionDOM(transaction) {
const li = document.createElement('li');

// Stílus hozzáadása a típus alapján VIVI
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

// 3. Egyenlegek kiszámítása (Array .reduce() és .filter() használata) BALAZS


// 4. Új tranzakció hozzáadása (Event Handling) BALAZS
function addTransaction(e) {
e.preventDefault(); // Ne töltsön újra az oldal

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

// Mezők alaphelyzetbe állítása BALAZS
text.value = '';
amount.value = '';

updateLocalStorage();
renderList();
}

// 5. Tranzakció törlése VIVI
function deleteTransaction(id) {
transactions = transactions.filter(transaction => transaction.id !== id);
updateLocalStorage();
renderList();
}

