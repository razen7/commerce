import { useRouter } from 'next/router';
import React from 'react'
import ItemComponent from '~/components/item/ItemComponent';

function ItemPage() {
    const router =useRouter();
    const { itemId } = router.query;
    return (
        <ItemComponent/>
    )
}

export default ItemPage