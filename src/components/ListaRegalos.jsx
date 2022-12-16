import { useState, useEffect } from 'react';
import './ListaRegalos.css';
import Modal from 'react-modal'


function ListaRegalos() {
  const [nuevoRegalo, setNuevoRegalo] = useState('')
  const [regalos, setRegalos] = useState(() => {
    const regalosguardados = JSON.parse(localStorage.getItem("regalos"));
      if (regalosguardados) {
        return regalosguardados
      } else {
        return []
      }
  })
  const [cantidadregalos, setCantidadRegalos] = useState(0)
  const [imagenRegalo, setImagenRegalo] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [destinatario, setDestinatario] = useState('')
  const [editarRegaloId, setEditarRegaloId] = useState(null)

  const handleDelete = (id) =>{
    const regalosNoBorrados = regalos.filter(regalo=> id !== regalo.id)
    setRegalos(regalosNoBorrados)
  }

  const handleDeleteAll = () =>{
    setRegalos([])
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(nuevoRegalo !== ''){
      if(editarRegaloId){
        const regalosEditados = regalos.map(regalo => {
          if(regalo.id === editarRegaloId){
            return {...regalo, name: nuevoRegalo, cantidad: cantidadregalos, img: imagenRegalo, destinatario: destinatario}
          }
          return regalo
        })
        setRegalos(regalosEditados)
      }else{
        setRegalos([...regalos, {name: nuevoRegalo, id: regalos.length + 1, cantidad: cantidadregalos, img: imagenRegalo, destinatario: destinatario }])
      }
      setCantidadRegalos(0)
      setNuevoRegalo('')
      setDestinatario('')
      setOpenModal(false)
      setEditarRegaloId(null)
    }
  }

  const handleModal = (regalo) => {
    if(regalo){
      setNuevoRegalo(regalo.name)
      setCantidadRegalos(regalo.cantidad)
      setImagenRegalo(regalo.img)
      setDestinatario(regalo.destinatario)
      setEditarRegaloId(regalo.id)
    }
    setOpenModal(true)
  }

  const closeModal =(e) =>{
    setCantidadRegalos(0)
    setNuevoRegalo('')
    setDestinatario('')
    setOpenModal(false)
    setEditarRegaloId(null)
  }

  useEffect(()=>{
    localStorage.setItem("regalos", JSON.stringify(regalos));
  }, [regalos])

  return (
    <div className='container'>
      <h1>Regalos:</h1>
     
      <button onClick={() => handleModal()} className="agregarregalo" autoFocus>Agregar regalo</button>
      <Modal
        isOpen={openModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="overlayModal"
      >
        <form onSubmit={handleSubmit} className='formulario'>
          <input autoFocus value={nuevoRegalo} placeholder='Nombre Regalo' onChange={(e) => setNuevoRegalo(e.target.value)} type="text"/>
          <input value={imagenRegalo} placeholder='http:/image...' onChange={(e) => setImagenRegalo(e.target.value)} className='inputimage' type="text" ></input>
          <div className='inputnumber'>
            <input value={cantidadregalos} placeholder='cantidad' onChange={(e) => setCantidadRegalos(e.target.value)} type="number"></input>
          </div>
          <input value={destinatario} placeholder='Nombre destinatario' onChange={(e) => setDestinatario(e.target.value)} type="text"></input>
          <div className='formactions'>
          <button type="submit" className='formactionsbuttons'>{editarRegaloId ? 'Editar' : 'Agregar'}</button>
          <button onClick={closeModal}className='formactionsbuttons'>Cerrar</button>
          </div>
        </form>
      </Modal>
      {!regalos.length ? <span className="listavacia">No hay regalos grinch! agrega algo:)</span> :
      <div className="listaregalos" >
        <ul className="regalos">
        {regalos.map(regalo =>{
          return <li className="itemregalo" key={regalo.id}><img src={regalo.img} alt=""/><span>{regalo.name} {regalo.cantidad}</span><span>{regalo.destinatario}</span>
                  <button className="editar" onClick={()=>handleModal(regalo)}>E</button>
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
