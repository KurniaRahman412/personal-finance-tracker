import { useEffect, useState } from "react"

function App(){
  const [transaction, setTransaction] = useState(()=>{
    const saveTransaction = localStorage.getItem("data-transaction")
    if (saveTransaction){
      return JSON.parse(saveTransaction)
    }
    return[]
  })
  console.log(transaction)
useEffect(()=>{
  localStorage.setItem("data-transaction", JSON.stringify(transaction))
}, [transaction])

  const totals = (transaction).reduce((acc, curr) => {
    if( curr.type === "income"){
      acc.income += curr.amount
    } else if( curr.type === "expense"){
      acc.expense += curr.amount
    }
    return acc
  }, {income: 0, expense: 0})

  const income = transaction.filter((t)=> t.type === "income")
  const expense = transaction.filter((t)=> t.type === "expense")
  const [newTransaction, setNewTransaction] = useState({ title: "", amount: 0, type: "income", category: "" })
  const addTransaction = (e)=>{
    e.preventDefault()
    const data = {...newTransaction, id: crypto.randomUUID(), date: Date.now()}
    setTransaction([...transaction, data])
    setNewTransaction({
      title: "",
      amount: 0,
      type: "income",
      category: ""
    })
  }
return(
    <div className="min-h-screen bg-gray-300 py-10 shadow-xl">
      <div className="max-w-2xl mx-auto">
        <section className="grid grid-cols-3 text-center bg-white p-6 rounded-xl">
          <div className="text-blue-500">
            <h2 className="text-md font-bold">Saldo</h2>
            <p className="text-2xl font-bold">Rp. {(totals.income - totals.expense).toLocaleString('id-ID')}</p>
          </div>
          <div className="text-green-600">
            <h2 className="text-md font-bold">Pemasukan</h2>
            <p className="text-2xl font-bold">Rp. {totals.income.toLocaleString('id-ID')}</p>
          </div>
          <div className="text-red-600">
            <h2 className="text-md font-bold">Pengeluaran</h2>
            <p className="text-2xl font-bold">Rp. {totals.expense.toLocaleString('id-ID')}</p>
          </div>
        </section>

        <section className="bg-white rounded-lg py-2 px-6 my-4 shadow-xl">
          <form onSubmit={addTransaction} className="my-5">
            <h3 className="text-xl font-bold text-center">Transaksi Baru</h3>
            <div className="flex flex-col max-w-md mx-auto gap-2">
              <label for="title">Judul : </label>
              <input id="title" type="text" className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={newTransaction.title}
              onChange={(e)=> setNewTransaction({...newTransaction, title: e.target.value})}
              ></input>
              <label for="amount">Nominal : </label>
              <input id="amount" type="number" className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={newTransaction.amount}
              onChange={(e)=> setNewTransaction({...newTransaction, amount: Number(e.target.value)})}
              ></input>
              <label for="type">Tipe : </label>
              <select id="type"
              value={newTransaction.type}
              onChange={(e)=> setNewTransaction({...newTransaction, type: e.target.value})}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="income">Pemasukan</option>
                <option value="expense">Pengeluaran</option>
              </select>
              <label for="category">Kategori : </label>
              <input id="category" type="text" className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={newTransaction.category}
              onChange={(e)=> setNewTransaction({...newTransaction, category: e.target.value})}
              ></input>
              <button type="submit" className="border bg-blue-600 rounded-lg py-2 mt-4 w-full text-white hover:bg-blue-700 transition-all cursor-pointer"
              >Kirim</button>
            </div>
          </form>
        </section>

        <section className="bg-white rounded-lg max-w-2xl mx-auto p-8 shadow-xl">
          <h2 className="text-xl text-center font-bold">Riwayat Transaksi</h2>
          <div>
            <h3 className="text-xl font-bold">Pemasukan</h3>
            <ul className=" mx-8">
              {income.map((item)=> (
                <li key={item.id} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm mb-2 border-l-4 border-green-500">
                  <span>{item.title}</span>
                  <span>Rp. {item.amount.toLocaleString('id-ID')}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold">Pengeluaran</h3>
            <ul className="mx-8">
              {expense.map((item)=> (
                <li key={item.id} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm mb-2 border-l-4 border-red-400">
                  <span>{item.title}</span>
                  <span>Rp. {item.amount.toLocaleString('id-ID')}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
export default App