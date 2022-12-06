import { useState } from 'react';
import './ListaRegalos.css'


function ListaRegalos() {
const [nuevoRegalo, setNuevoRegalo] = useState('')
const [regalos, setRegalos] = useState([{name:'Caramelos', id: 0}, {name:'Medias',id: 1}, {name:'Vitel Tone', id:2}])

  const handleOnClick = () => {
    setRegalos([...regalos, {name: nuevoRegalo, id: regalos.length}])
    setNuevoRegalo('')
  }
  const handleDelete = (id) =>{
    console.log(id)
    const regalosNoBorrados = regalos.filter(regalo=> id !== regalo.id)
    setRegalos(regalosNoBorrados)
  }
   const handleDeleteAll = () =>{
    setRegalos([])
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
          return <li key={regalo.id}>{regalo.name}
                  <button onClick={()=>handleDelete(regalo.id)}>X</button></li>
        })}
        </ul>
      </div>
      <div className='borrartodo'>
        <button onClick={()=> handleDeleteAll()}>Borrar todo</button>
      </div>

    </div>
  );
}

export default ListaRegalos;
