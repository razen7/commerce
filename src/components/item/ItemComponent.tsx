import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '~/app/slices/itemSlice';
import { AppDispatch, RootState } from '~/app/store';
import { Product as ProductType } from '~/types/products.types';


const ItemComponent = () => {
    const tracking = useRef(true)
    const { items } = useSelector((state: RootState) => state.items)
    const [item, setItem] = useState(null);

    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
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

    return (
        <div>{items===null?('loading'):(item.id)}</div>

    )
}

export default ItemComponent