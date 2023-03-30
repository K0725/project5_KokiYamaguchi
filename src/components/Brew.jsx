import {useState} from 'react';

function Brew({name, street, city, state, postal, website, phone, type}) {
  const call = `tel:${phone}`

  return (
    <div className='BrewCard'>
      <h3>{name}</h3>
      <p>{street}, {city}, {state} {postal}</p>
      <p>Type: {type}</p>
      <button><a href={website} target="_blank">Website</a></button>
      <button><a href={call}>Phone</a></button>
    </div>
  )
}

export default Brew;