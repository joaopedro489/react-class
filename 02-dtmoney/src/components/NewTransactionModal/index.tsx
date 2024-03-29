import ReactModal from 'react-modal'
import { Container, RadioBox, TransactionTypeContainer } from './styles'

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { FormEvent, useState } from 'react'
import { useTransactions } from '../../hooks/useTransactions'

interface NewTransactionModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

export const NewTransactionModal = ({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) => {
  const { createTransaction } = useTransactions()
  const [type, setType] = useState('deposit')
  const [title, setTitle] = useState('')
  const [value, setValue] = useState(0)
  const [category, setCategory] = useState('')

  const handleCreateNewTransaction = async (event: FormEvent) => {
    event.preventDefault()
    const data = {
      title,
      amount: value,
      category,
      type,
    }

    await createTransaction(data)
    setTitle('')
    setValue(0)
    setCategory('')
    setType('deposit')
    onRequestClose()
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <button
        type='button'
        onClick={onRequestClose}
        className='react-modal-close'
      >
        <img src={closeImg} alt='Fechar modal' />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input
          placeholder='Título'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type='number'
          placeholder='Valor'
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
        />
        <TransactionTypeContainer>
          <RadioBox
            type='button'
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor='green'
          >
            <img src={incomeImg} alt='Entrada' />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type='button'
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor='red'
          >
            <img src={outcomeImg} alt='Saída' />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input
          placeholder='Categoria'
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <button type='submit'>Cadastrar</button>
      </Container>
    </ReactModal>
  )
}
