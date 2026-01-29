import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { remove } from '../store/cartSlice'
import { RootState, AppDispatch } from '../store/store'

const Cart: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const products = useSelector((state: RootState) => state.cart)

    const handleRemove = (productId: number) => {
        dispatch(remove(productId))
    }

    return (
        <div className='cartWrapper'>
            {
                products.map(product => (
                    <div className='cartCard' key={product.id}>
                        <img src={product.image} alt={product.title} />
                        <h5>{product.title}</h5>
                        <h5>{product.price}</h5>
                        <button className='btn' onClick={() => { handleRemove(product.id) }}>Remove</button>
                    </div>
                ))
            }
        </div>
    )
}

export default Cart
