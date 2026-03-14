import { useState } from "react"

function App(){
  const [transaction, setTransaction] = useState([
  {
    "id": "v1-a2b3c",
    "title": "Gaji Bulan Januari",
    "amount": 5000000,
    "type": "income",
    "category": "Work",
    "date": "2026-01-10"
  },
  {
    "id": "v1-a2b3d",
    "title": "Gaji Bulan Februari",
    "amount": 5000000,
    "type": "income",
    "category": "Work",
    "date": "2026-02-10"
  },
  {
    "id": "v1-d4e5f",
    "title": "Beli Kopi",
    "amount": 12000,
    "type": "expense",
    "category": "Food",
    "date": "2026-03-12"
  },
  {
    "id": "v1-d4e5g",
    "title": "Beli Sabun",
    "amount": 7000,
    "type": "expense",
    "category": "Food",
    "date": "2026-03-12"
  }
])

  const totals = transaction.reduce((acc, curr) => {
    if( curr.type === "income"){
      acc.income += curr.amount
    } else if( curr.type === "expense"){
      acc.expense += curr.amount
    }
    return acc
  }, {income: 0, expense: 0})

  const income = transaction.filter((t)=> t.type === "income")
  const expense = transaction.filter((t)=> t.type === "expense")
return(
    <div>
      <p>Pemasukan : {totals.income}</p>
      <p>Pengeluaran : {totals.expense}</p>
      <p>Saldo : {totals.income - totals.expense}</p>
      <h3 className="text-xl font-bold">Pemasukan</h3>
      <ul>
        {income.map((item)=> (
          <li>{item.title} : {item.amount}</li>
        ))}
      </ul>
        <h3 className="text-xl font-bold">Pengeluaran</h3>
      <ul>
        {expense.map((item)=> (
          <li>{item.title} : {item.amount}</li>
        ))}
      </ul>
      <form>
        <label for="title">Title : </label>
        <input id="title" type="text" className="border"></input>
        <label for="amount">Amount : </label>
        <input id="amount" type="text" className="border"></input>
        <label for="type">Type : </label>
        <select id="type">
          <option value="income">income</option>
          <option value="expense">expense</option>
        </select>
        <label for="category">Category : </label>
        <input id="category" type="text" className="border"></input>
        <button type="submit" className="border">Kirim</button>
      </form>
    </div>
  )
}
export default App