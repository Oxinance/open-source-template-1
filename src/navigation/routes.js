import Home from "../views/Home";
import Login from "../views/Login";
import Cart from "../views/Cart";


const routes = [
    { path: "/", element: <Home/> },
    { path: "/cart", element: <Cart/> },
    { path: "/login", element: <Login/> }
]

export default routes;