import { useState } from "react"

function App(){
  const [transaction, setTransaction] = useState([
  {
    id: "v1-a2b3c",
    title: "Gaji Bulan Januari",
    amount: 5000000,
    type: "income",
    category: "Work",
    date: "2026-01-10"
  },
  {
    id: "v1-d4e5f",
    title: "Beli Kopi",
    amount: 12000,
    type: "expense",
    category: "Food",
    date: "2026-03-12"
  },
  {
    id: "v1-d4e5g",
    title: "Beli Sabun",
    amount: 7000,
    type: "expense",
    category: "Food",
    date: "2026-03-12"
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
  const [newTransaction, setNewTransaction] = useState({
      title: "",
      amount: null,
      type: "income",
      category: ""
  })
  const addTransaction = (e)=>{
    e.preventDefault()
    const data = {...newTransaction, id: crypto.randomUUID(), date: Date.now()}
    setTransaction([...transaction, data])
    setNewTransaction({
      title: "",
      amount: null,
      type: "income",
      category: ""
    })
  }
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
      <form onSubmit={addTransaction}>
        <label for="title">Title : </label>
        <input id="title" type="text" className="border"
        value={newTransaction.title}
        onChange={(e)=> setNewTransaction({...newTransaction, title: e.target.value})}
        ></input>
        <label for="amount">Amount : </label>
        <input id="amount" type="number" className="border"
        value={newTransaction.amount}
        onChange={(e)=> setNewTransaction({...newTransaction, amount: Number(e.target.value)})}
        ></input>
        <label for="type">Type : </label>
        <select id="type"
        value={newTransaction.type}
        onChange={(e)=> setNewTransaction({...newTransaction, type: e.target.value})}
        >
          <option value="income">income</option>
          <option value="expense">expense</option>
        </select>
        <label for="category">Category : </label>
        <input id="category" type="text" className="border"
        value={newTransaction.category}
        onChange={(e)=> setNewTransaction({...newTransaction, category: e.target.value})}
        ></input>
        <button type="submit" className="border">Kirim</button>
      </form>
    </div>
  )
}
export default App