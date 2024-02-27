import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'

interface Transaction {
  id: number
  title: string
  type: string
  category: string
  amount: number
  createdAt: string
}

type TransactionsInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsProviderProps {
  children: React.ReactNode
}

interface TransactionsContextData {
  transactions: Transaction[]
  createTransaction: (transaction: TransactionsInput) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
)

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api.get('transactions').then((response) => {
      const transactionsWithAmountCent = response.data.transactions.map(
        (transaction: Transaction) => {
          return {
            ...transaction,
            amount: transaction.amount / 100,
          }
        }
      )
      setTransactions(transactionsWithAmountCent)
    })
  }, [])

  const createTransaction = async (transactionInput: TransactionsInput) => {
    const response = await api.post('/transactions', {
      ...transactionInput,
      amount: transactionInput.amount * 100,
      createdAt: new Date(),
    })
    const { transaction } = response.data
    const transactionWithAmountCent = {
      ...transaction,
      amount: transaction.amount / 100,
    }
    setTransactions([...transactions, transactionWithAmountCent])
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)

  return context
}
