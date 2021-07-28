import React from 'react'

import Button from './Button'
import Country from './Country'


const CountryItem = ({ country, onClickHandler }) => <p>{country.name} <Button text="Show" value={country.alpha3Code} onClick={onClickHandler} /></p>

const Countries = ({ countries, onClickHandler, selectedCountry }) => {

    if (selectedCountry !== '')
        return <Country key={selectedCountry.name} country={selectedCountry} />

    const result = countries['length']

    if (result > 10)
        return <p>Too many matches, specify another filter</p>

    if (result === 0)
        return <p>No match</p>

    if (result === 1)
        return <Country key={countries[0].name} country={countries[0]} />

    return countries.map((country) => <CountryItem key={country.name} country={country} onClickHandler={onClickHandler} />)

}

export default Countries