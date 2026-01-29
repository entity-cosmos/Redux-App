import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

const Navbar: React.FC = () => {
    const items = useSelector((state: RootState) => state.cart)
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className='logo'>Redux Store</span>
            <div>
                <Link className='navLink' to="/">Home</Link>
                <Link className='navLink' to="/cart">Cart</Link>
                <span className='cartCount'>Cart Items : {items.length}</span>
            </div>
        </div>
    )
}

export default Navbar
