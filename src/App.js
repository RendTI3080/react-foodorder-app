import React,{useState} from'react';
import Header from "./Component/Layout/Header";
import Meals from "./Component/Meals/Meals";
import Cart from "./Component/Cart/Cart";
import CartProvider from "./Store/CartProvider";

const App = () => {
    const [cartIsShow, setCartIsShow] = useState(false);

    const showCartHandler = () => {
        setCartIsShow(true);
    }

    const hideCartHandler = () => {
        setCartIsShow(false);
    }
    return (
        <CartProvider>
            {
                cartIsShow === true &&
                <Cart onHideCart={hideCartHandler}></Cart>
            }
            <Header onShowCart={showCartHandler}></Header>
            <main>
                <Meals></Meals>
            </main>
        </CartProvider>
    )
}

export default App;
