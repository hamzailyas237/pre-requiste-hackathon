

import React from 'react'
import { ProductCard } from '../../components/card/ProductCard';

const ProductDetail = ({ route }) => {
    return (
        <ProductCard product={route.params} detail={true}  />
    )
}

export default ProductDetail