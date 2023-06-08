import { useRouter } from 'next/router';
import React from 'react'
import {useState,useEffect} from 'react';
import { ToastContainer } from 'react-toastify';
import Header from '~/components/Header';

type Props = {}

function cart({}: Props) {
    const [cart, setCart] = useState([]);
    let subTotal = cart.reduce((p, c) => p + (c.price * c.quantity), 0);
    let router = useRouter();
    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart')));
    }, [])

    let updateQ = (idx, e) => {
        cart[idx].quantity = e.target.value;
        setCart([...cart]);
        localStorage.setItem('cart', JSON.stringify(cart))
        isCartEmpty();
    }
    let deleteI = (idx) => {
        cart.splice(idx, 1);
        setCart([...cart]);
        localStorage.setItem('cart', JSON.stringify(cart));
        isCartEmpty();
    }
    let isCartEmpty = async () => {
        if (!cart.length || cart.every(v => v.quantity < 1)) {
            await toast('🦄 Cart Empty, Lets go back to shop!');
            setTimeout(() => {
                router.push('/')
            }, 5000);
            return true;
        }
        return false;
    }
    return (
        <>
            <ToastContainer position='top-center' />
            <div className="container mx-auto px-4 py-8">
                <div className='mb-5'>
                    <Header />
                </div>

                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                {!cart ? ('loading') : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* <!-- Cart items --> */}
                        <div>
                            {cart.map((i, idx) =>
                                <div className="flex items-center border-b py-4">
                                    <img src={i.image} alt="Item 1" className="w-16 h-16 md:w-24 md:h-24 mr-4" />
                                    <div>
                                        <h2 className="font-bold">{i.title}</h2>
                                        <p className="text-gray-600">Price: ${i.price}</p>
                                        <div className='flex justify-start gap-3'>
                                            <p className="text-gray-600">Quantity:
                                                <input type="number" min="0" defaultValue={i.quantity} onChange={(e) => updateQ(idx, e)} className='border-2 w-11 px-1 rounded-md shadow-sm ml-2' /></p>

                                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm tracking-wide  px-2 rounded" onClick={() => deleteI(idx)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* <!-- Cart summary --> */}
                        <div className="bg-gray-100 p-4">
                            <h2 className="font-bold text-lg mb-4">Summary</h2>
                            <p className="mb-2">Subtotal: ${subTotal}</p>
                            <p className="mb-2">Tax: ${(13 / 100 * subTotal).toFixed(2)}</p>
                            <p className="text-lg font-bold">Total: ${(subTotal + 13 / 100 * subTotal).toFixed(2)}</p>
                            <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => router.push('/checkout')}>Checkout</button>
                            <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => router.push('/')}>Continue Shopping</button>
                        </div>
                    </div>
                )}
            </div>
        </>

    )
}

export default cart