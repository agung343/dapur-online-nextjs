'use client'
import { createContext, useEffect, useReducer } from "react";

export const CartContext = createContext({
    items: [],
    addMeal: (item) => {},
    decreaseMeal: (id) => {},
    clearMeal: (id) => {},
    clearCart: () => {
    }
})

function cartReducer(state, action) {
    switch(action.type) {
        case "INCREASE": {
            const exisitingCartIndex = state.items.findIndex(item => item.id === action.item.id)
            const updatedItems = [...state.items]

            if (exisitingCartIndex > -1) {
                const existingItem = state.items[exisitingCartIndex]
                const updatedItem = {
                    ...existingItem,
                    quantity: existingItem.quantity + 1
                }
                updatedItems[exisitingCartIndex] = updatedItem
            } else {
                updatedItems.push({
                    ...action.item,
                    quantity: 1
                })
            }
            return {...state, items: updatedItems}
        }

        case "DECREASE": {
            const existingCartIndex = state.items.findIndex(item => item.id === action.id)
            const existingCartItem = state.items[existingCartIndex]
            const updatedItems = [...state.items]

            if (existingCartItem.quantity === 1) {
                updatedItems.splice(existingCartIndex, 1)
            } else {
                const updatedItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity - 1
                }
                updatedItems[existingCartIndex] = updatedItem
            }
            return {...state, items: updatedItems}
        }

        case "CLEAR_MEAL": {
            const updatedItems = state.items.filter(item => item.id !== action.id)
            return {...state, items: updatedItems}
        }

        case "CLEAR_CART": {
            return  {
                ...state, items: []
            }
        }

        default:
            return state
    }
}

export default function CartContextProvider({children}) {
    const [cartState, dispatch] = useReducer(cartReducer, {items: []})

    function addMeal(item) {
        dispatch({
            type: "INCREASE", item
        })
    }

    function decreaseMeal(id) {
        dispatch({
            type: "DECREASE", id
        })
    }

    function clearMeal(id) {
        dispatch({
            type: "CLEAR_MEAL", id
        })
    }

    function clearCart() {
        dispatch({type: "CLEAR_CART"})
    }

    const value={
        items: cartState.items,
        addMeal,
        decreaseMeal,
        clearMeal,
        clearCart
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}