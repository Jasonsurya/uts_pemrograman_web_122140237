import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState("");
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [errorProducts, setErrorProducts] = useState(null);

    const API_BASE_URL = 'http://localhost:6543';

    useEffect(() => {
        fetchProducts();
    }, [filter, sort]);

    const fetchProducts = async () => {
        setLoadingProducts(true);
        setErrorProducts(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/products?filter=${filter}&sort=${sort}`);
            setProducts(response.data.products);
            setLoadingProducts(false);
        } catch (error) {
            setErrorProducts(error.message);
            setLoadingProducts(false);
        }
    };

    const fetchProductDetail = async (productId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/products/${productId}`);
            setSelectedProduct(response.data.product);
        } catch (error) {
            console.error("Error fetching product detail:", error);
        }
    };

    const addToCart = (product) => {
        setCart((prev) => {
            const existingItem = prev.find((item) => item.id === product.id);
            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: existingItem.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const checkout = async (customerName, shippingAddress) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/checkout`, { cart, customerName, shippingAddress }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setCart([]); 
            alert(`Checkout successful! Order ID: ${response.data.order_id}`);
        } catch (error) {
            console.error("Checkout failed:", error);
            alert("Checkout failed. Please try again.");
        }
    };

    return (
        <ShopContext.Provider value={{
            cart,
            selectedProduct,
            setSelectedProduct: (product) => {
                setSelectedProduct(product);
                if (product) fetchProductDetail(product.id);
            },
            addToCart,
            removeFromCart,
            filter,
            setFilter,
            sort,
            setSort,
            products,
            loadingProducts,
            errorProducts,
            checkout
        }}>
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => useContext(ShopContext);