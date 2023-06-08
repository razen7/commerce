import React from 'react'
import ProductComponent from '~/components/home/ProductComponent ';
import { Product as ProductType } from '~/types/products.types';

type Props = {
    item: ProductType;
};

function ProductPage({ item }: Props) {
    return (
        // <ProductComponent key={item.id} product={item} />
        <>product page</>
    )
}

export default ProductPage