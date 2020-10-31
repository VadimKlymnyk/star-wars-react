import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <div className='container'>
                <nav className='header-nav'>
                    <NavLink to='/'>Home</NavLink>
                    <Link to='/planets/'>Planets</Link>
                </nav>
            </div>
        </header>
    )
}

export {Header}
