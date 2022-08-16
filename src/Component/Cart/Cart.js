import {useContext} from "react";
import Modal from '../UI/Modal';
import CartItem from "./CartItem";
import CartContext from "../../Store/cart-context";
import classes from './Cart.module.css';

const Cart = (props) => {

    const ctxCart = useContext(CartContext);
    const totalAmount = `${ctxCart.totalAmount.toFixed(2)}`;
    const hasItem = ctxCart.items.length > 0;


    const addCartItemHandler = item => {
        ctxCart.addItem({...item, amount: 1});
    }
    const removeCartItemHandler = id => {
        ctxCart.deleteItem(id)
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {ctxCart.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onAdd={addCartItemHandler.bind(null, item)}
                    onRemove={removeCartItemHandler.bind(null, item.id)}
                />
            ))}
        </ul>
    );

    return (
        <Modal onHideCart={props.onHideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
                {hasItem && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;
