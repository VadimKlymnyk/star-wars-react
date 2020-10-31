import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getPeople, getPlanets } from '../../api/request';


const Planet = () => {
    const { id } = useParams();
    const [planet, setPlanet] = useState({})
    const [peoples, setPeoples] = useState([])
    const [flag, setFlag] = useState(false)
    
    useEffect(() => {
        request(id)
    }, [id])

    useEffect(() => {
        if(planet.residents && planet.residents.length) requestPeople(planet.residents)
    }, [planet])

    const request = async (planetId) => {
        
        try {
            const response = await getPlanets(`planets/${planetId}`)
            if(response) {
                setPlanet(response)
            }
        } catch (e) {
            setFlag(true)
        }
    }

    const requestPeople = async (listUrl) => {
        const peoplesName = await Promise.all(listUrl.map(async (url) => {
            const response = await getPeople(url)
            if(response) return response.name
        }));
        setPeoples(peoplesName) 
    }

    return (
        <div>
            {flag ? <h1>Planet Not Found</h1> : null}
            {planet.name && 
                <> 
                    <h1>Planet {planet.name}</h1>
                    <ul className='planet-information'> 
                        <li> Период оборота: {planet.rotation_period} </li>
                        <li> Диаметр: {planet.diameter} </li>
                        <li> Климат: {planet.climate} </li>
                        <li> Гравитация: {planet.gravity} </li>
                        <li> Тип местности: {planet.terrain} </li>
                        <li> Население: {planet.population} </li>
                        {peoples.length ?
                            <div className='peoples-container'>
                                <div className='title'>Известные жители:</div>
                                <ul className='peoples'> 
                                    {peoples.map((people, i) => 
                                        <li key={i}>{people}</li>
                                    )}
                                </ul>
                            </div>
                            : null
                        }
                    </ul>
                </>
            }
        </div>
    )
}

export {Planet}