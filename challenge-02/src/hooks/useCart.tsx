import { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../services/api'
import { Product, Stock } from '../types'

interface CartProviderProps {
  children: React.ReactNode
}

interface UpdateProductAmount {
  productId: number
  amount: number
}

interface CartContextData {
  cart: Product[]
  addProduct: (productId: number) => Promise<void>
  removeProduct: (productId: number) => void
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart')

    if (storagedCart) {
      return JSON.parse(storagedCart)
    }

    return []
  })

  const addProduct = async (productId: number) => {
    try {
      const hasCartProduct = cart.find((product) => product.id === productId)
      if (hasCartProduct) {
        const { data: stock } = await api.get<Stock>(`/stock/${productId}`)
        if (stock.amount < hasCartProduct.amount + 1) {
          toast.error('Quantidade solicitada fora de estoque')
          return
        }
        const newCart = cart.map((product) =>
          product.id === productId
            ? {
                ...product,
                amount: product.amount + 1,
              }
            : product
        )
        setCart(newCart)
        localStorage.setItem('@RocketShoes:cart', JSON.stringify(newCart))
        return
      } else {
        const { data: product } = await api.get<Product>(
          `/products/${productId}`
        )
        const newCart = [
          ...cart,
          {
            ...product,
            amount: 1,
          },
        ]
        setCart(newCart)
        localStorage.setItem('@RocketShoes:cart', JSON.stringify(newCart))
        return
      }
    } catch {
      toast.error('Erro na adição do produto')
      return
    }
  }

  const removeProduct = (productId: number) => {
    try {
      const hasProduct = cart.find((product) => product.id === productId)
      if (!hasProduct) {
        toast.error('Erro na remoção do produto')
        return
      }
      const filteredCart = cart.filter((product) => product.id !== productId)
      setCart(filteredCart)
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(filteredCart))
      return
    } catch {
      toast.error('Erro na remoção do produto')
      return
    }
  }

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if (amount <= 0) return
      const { data: stock } = await api.get<Stock>(`/stock/${productId}`)
      if (stock.amount < amount) {
        toast.error('Quantidade solicitada fora de estoque')
        return
      }
      const newCart = cart.map((product) =>
        product.id === productId
          ? {
              ...product,
              amount,
            }
          : product
      )
      setCart(newCart)
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(newCart))
      return
    } catch {
      toast.error('Erro na alteração de quantidade do produto')
      return
    }
  }

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextData {
  const context = useContext(CartContext)

  return context
}
