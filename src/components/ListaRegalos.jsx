import { useState } from 'react';
import './ListaRegalos.css'


function ListaRegalos() {
const [regalos, setRegalos] = useState(['Caramelos', 'Medias', 'Vitel Tone'])

  return (
    <div>
      <h1>Regalos:</h1>
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
