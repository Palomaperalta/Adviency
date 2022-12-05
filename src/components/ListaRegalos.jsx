import { useState } from 'react';
import './ListaRegalos.css'


function ListaRegalos() {
const [nuevoRegalo, setNuevoRegalo] = useState('')
const [regalos, setRegalos] = useState(['Caramelos', 'Medias', 'Vitel Tone'])


  const handleOnClick = () => {
    setRegalos([...regalos, nuevoRegalo])
    setNuevoRegalo('')
  }
  return (
    <div className='container'>
      <h1>Regalos:</h1>
      <div className='formulario'>
        <input value={nuevoRegalo} onChange={(e)=>setNuevoRegalo(e.target.value)} type="text"/>
        <button onClick={handleOnClick}>Agregar</button>
      </div>
      <div className="listaregalos" >
        <ul className="regalos">
        {regalos.map(regalo =>{
          return <li>{regalo}</li>
        })}
        </ul>
      </div>
    </div>
  );
}

export default ListaRegalos;
