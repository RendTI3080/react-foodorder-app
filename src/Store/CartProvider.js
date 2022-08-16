import React, {useReducer} from 'react';
import CartContext from "./cart-context";

const defaultCartState = {
    items : [],
    totalAmount : 0
}

const cartReducer = (state, action) => {
    if(action.type === 'ADD'){
        // Mencari apakah ada id yang sama yang telah ada
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id);

        // konfigurasi di items dengan id yang sudah ada
        const existingCartItem = state.items[existingCartItemIndex];
        // console.table(existingCartItem);

        let updateItems;
        // jika sebuah item dengan jenis tertentu sudah ditambahkan
        if(existingCartItem){
            const updateItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updateItems = [...state.items];
            updateItems[existingCartItemIndex] = updateItem
        }else {
            console.info('concat pertama di panggil');
            updateItems = state.items.concat(action.item);
        }

        const updateTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items: updateItems,
            totalAmount: updateTotalAmount
        }
    }

    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    return defaultCartState;
}


const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({
            type: 'ADD',
            item:item
        })
    }


    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id: id});
    }

    const cartContext = {
        items : cartState.items,
        totalAmount : cartState.totalAmount,
        addItem : addItemToCartHandler,
        deleteItem : removeItemFromCartHandler
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}


export default CartProvider;