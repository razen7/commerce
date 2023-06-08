import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '~/app/slices/itemSlice';
import { AppDispatch, RootState } from '~/app/store';
import { Product as ProductType } from '~/types/products.types';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../Header';

const ItemComponent = () => {
    const tracking = useRef(true)
    const { items } = useSelector((state: RootState) => state.items)
    const [item, setItem] = useState<ProductType | null>(null);

    const dispatch = useDispatch<AppDispatch>()
    const count = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (count.current) {
            count.current.value = '1';
        }
        if (tracking.current) {
            dispatch(fetchItems())
        }
        return () => {
            tracking.current = false
        }
    }, [])

    let router = useRouter();
    useEffect(() => {
        let itemId = Number(router.query.itemId);
        setItem(items.find((v: ProductType) => {
            return v.id == itemId
        }));

    }, [items])


    const checkOut=()=>{
        let cart = localStorage.getItem('cart');
        if(!cart){
            addToCart();
        }
        router.push('/cart');
    }
    const addToCart = () => {
        let cart: any;
        cart = localStorage.getItem('cart');
        let curItem;
        if (item && count.current) {
            curItem = {
                id: item.id,
                title: item.title,
                image: item.image,
                price: item.price,
                quantity: Number(count.current.value)
            }
        }

        if (!cart) {
            cart = [curItem]
        } else {
            cart = JSON.parse(cart);
            let productExists = cart.find((v: { id: number }) => v.id === item.id);

            if (!productExists) {
                cart.push(curItem)
            } else {
                productExists.quantity = Number(productExists.quantity) + Number(count.current.value);
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        toast('Product added successfully!')
    }
    return (
        <div>
            <ToastContainer position='top-center' />

            <Header />

            {(!item) ? ('loading') : (
                <div className='flex max-md:flex-col mt-5 border-b-2 p-9'>
                    <div className='mb-5'>
                        <div className="flex justify-center mx-8">
                            <img src={item.image} alt="" className='max-h-[400px]' />
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className='font-bold mb-1'>{item.title}</div>
                        <div className='text-yellow-400 font-semibold flex gap-1 h-5'>
                            <span className='flex items-center'>User Rating</span>
                            <span className='flex items-center'>
                                <AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiOutlineStar />
                            </span>
                        </div>
                        <div className='border-y-[1px] my-2'></div>
                        <div>
                            <span className='text-sm text-gray-500 font-semibold'>Price </span>
                            <span className='text-red-400 font-semibold text-lg'>
                                ${item.price}</span>
                        </div>
                        <div className='mt-4 font-mono'>
                            {item.description}
                        </div>
                        <div className='flex justify-center'>
                            <div className='bg-yellow-200 rounded-md px-3 w-fit'>
                                <span className='font-semibold'>
                                    Quantity
                                </span>
                                <input type="number" name="count" ref={count} defaultValue="1" className='border-2 w-11 m-2 pl-2' />
                            </div>
                        </div>

                        <div className='w-full flex justify-center gap-8 mt-10 max-md:mt-6'>
                            <button className='rounded-full bg-yellow-300 px-4 py-1 font-semibold shadow-sm hover:bg-gray-100 hover:text-yellow-600 transition-all duration-200 w-36' onClick={() => addToCart()}>
                                Add to cart
                            </button>
                            <button className='rounded-full bg-yellow-300 px-4 py-1 font-semibold shadow-sm hover:bg-gray-100 hover:text-yellow-600 transition-all duration-200 w-36' onClick={() => checkOut()}>Buy Now</button>
                        </div>
                    </div>
                </div>
            )}</div>
    )
}

export default ItemComponent