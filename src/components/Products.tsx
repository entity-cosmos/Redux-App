import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../store/cartSlice'
import { STATUS, fetchProducts } from '../store/productSlice'
import { RootState, AppDispatch } from '../store/store'
import { Product } from '../types'

const Products: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { data: products, status } = useSelector((state: RootState) => state.products)
    
    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const handleAdd = (product: Product) => {
        dispatch(add(product))
    }

    if (status === STATUS.LOADING) return <h2>Loading...</h2>
    
    return (
        <div className='productsWrapper'>
            {
                products.map(product => (
                    <div className='card' key={product.id}>
                        <img src={product.image} alt={product.title} />
                        <h4>{product.title}</h4>
                        <h5>{product.price}</h5>
                        <button className='btn' onClick={() => { handleAdd(product) }}>Add to Cart</button>
                    </div>
                ))
            }
        </div>
    )
}

export default Products
