import { useState } from 'react';
import './ListaRegalos.css'


function ListaRegalos() {
const [nuevoRegalo, setNuevoRegalo] = useState('')
const [regalos, setRegalos] = useState([{name:'Caramelos', id: 0}, {name:'Medias',id: 1}, {name:'Vitel Tone', id:2}])

  const handleOnClick = () => {
    if(nuevoRegalo !== '' && !regalos.some((regalo) =>  regalo.name.toLowerCase() === nuevoRegalo.toLowerCase())){
      setRegalos([...regalos, {name: nuevoRegalo, id: regalos.length}])
      setNuevoRegalo('')
    }    
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
      {!regalos.length ? <span className="listavacia">No hay regalos grinch! agrega algo:)</span> :
      <div className="listaregalos" >
        <ul className="regalos">
        {regalos.map(regalo =>{
          return <li className="itemregalo" key={regalo.id}><span>{regalo.name}</span>
                  <button className="delete" onClick={()=>handleDelete(regalo.id)}>X</button></li>
        })}
        </ul>
      </div>
      }
      <div className='borrartodo'>
        <button onClick={()=> handleDeleteAll()}>Borrar todo</button>
      </div>

    </div>
  );
}

export default ListaRegalos;
