import React, {useContext, useEffect, useState} from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from "../../Store/cart-context";
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext);
    const items = cartCtx.items;
    const [btnIsHighlited, setBtnHighLigted] = useState(false);
    const btnClasses = ` ${classes.button} ${btnIsHighlited ? classes.bump : ' '}`

    const numberOfCartItems = cartCtx.items.reduce((number, item) => {
        return number + item.amount;
    }, 0)

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnHighLigted(true)

        const timer = setTimeout(() => {
            setBtnHighLigted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items])


    return (
        <button className={btnClasses} onClick={props.onShowCart}>
             <span className={classes.icon}>
                 <CartIcon/>
             </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;