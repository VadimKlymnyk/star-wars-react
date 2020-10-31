import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { useLocation } from 'react-router-dom';
import history from '../../utils/history';
import { getPlanets } from '../../api/request'

const PlanetsList = () => {
    const [planets, setPlanets] = useState([])
    const [count, setCount] = useState(1)
    const [selectedPage, setSelectedPage] = useState(0)
    const [flag, setFlag] = useState(false)
    let location = useLocation();

    useEffect(() => {
        if(location.search) setSelectedPage(+location.search.split('=')[1]-1)
        request(location.search)
    }, [location])

    const request = async (page) => {
        try {
            const response = await getPlanets('planets/'+ page)
            if(response) {
                setPlanets(response.results)
                setCount(response.count / 10)
            }
        } catch (e) {
            setFlag(true)
        }
    }

    const handleClick = (url) => {
        const id = url.split('/')[5]
        history.push(id)
    }

    const handlePageClick = ({selected}) => {
        history.push(`?page=${selected+1}`)
    }
    
    return (
        <div className='container'>
            {flag ? <h1>Page Not Found</h1> : null}
            {planets.length ? 
                <>
                    <h1>Planets</h1>
                    <ul>
                        {planets.map(planet => 
                            <li onClick={() => handleClick(planet.url)} key={planet.url} className='container-planet'>
                                <div>Название: {planet.name}</div>
                                <div>Климат: {planet.climate}</div>
                                <div>Население: {planet.population}</div>
                            </li>
                        )}
                    </ul>
                    <ReactPaginate 
                        previousLabel='<' 
                        nextLabel='>' 
                        pageCount={count}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={5}
                        forcePage={selectedPage}
                        activeClassName={'active'}
                    />
                </>
            : null
            } 
        </div>
    )
}

export {PlanetsList}
