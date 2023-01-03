import { useState, useEffect, useRef } from 'react';
import './ListaRegalos.css';
import AbstractModal from './AbstractModal';
import FormRegalos from './FormRegalos';
import ListItem from './ListItem';
import ListItemPrevisualizar from './ListItemPrevisualizar';
import sound from '../sounds/audio.mp3';
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai';


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
  const [precio, setPrecio] = useState(0)
  const [openModalPrevisualizar, setOpenModalPrevisualizar] = useState(false)
  const [playMusic, setPlayMusic] = useState(false)

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
            return {...regalo, name: nuevoRegalo, cantidad: cantidadregalos, img: imagenRegalo, destinatario: destinatario, precio: precio}
          }
          return regalo
        })
        setRegalos(regalosEditados)
      }else{
        setRegalos([...regalos, {name: nuevoRegalo, id: regalos.length + 1, cantidad: cantidadregalos, img: imagenRegalo, destinatario: destinatario, precio: precio }])
      }
      setCantidadRegalos(0)
      setNuevoRegalo('')
      setDestinatario('')
      setOpenModal(false)
      setEditarRegaloId(null)
      setPrecio(0)
    }
  }

  const handleModal = (regalo) => {
    if(regalo){
      setNuevoRegalo(regalo.name)
      setCantidadRegalos(regalo.cantidad)
      setImagenRegalo(regalo.img)
      setDestinatario(regalo.destinatario)
      setEditarRegaloId(regalo.id)
      setPrecio(regalo.precio)
    }
    setOpenModal(true)
  }
  const handlePrevisualizar = () =>{
    
    setOpenModalPrevisualizar(true)
  }
  const closeModalPrevisualizar =(e)=>{
    setOpenModalPrevisualizar(false)
  }
  const handleDuplicate = (regalo) => {
    const regaloDuplicado = {...regalo, id: regalos.length + 1}
    setRegalos([...regalos, regaloDuplicado])

    handleModal(regaloDuplicado)
  }

  const closeModal = (e) =>{
    setCantidadRegalos(0)
    setNuevoRegalo('')
    setDestinatario('')
    setOpenModal(false)
    setEditarRegaloId(null)
    setPrecio(0)
  }

  const handleImprimir = (e) =>{
    window.print()
  }
  useEffect(()=>{
    localStorage.setItem("regalos", JSON.stringify(regalos));
  }, [regalos])

  const audioref = useRef()
  const handlePlay = () =>{
    
    if(playMusic){
      audioref.current.pause()
    }else{
      audioref.current.play()
    }
    setPlayMusic(!playMusic)
  }

  return (
    <div className='container'>
      <h1>Regalos:</h1>
      <audio ref={audioref} loop> 
        <source src={sound} type="audio/mp3" /> 
      </audio>
      <button className='sound' onClick={handlePlay}>{!playMusic ? <AiOutlinePlayCircle /> : <AiOutlinePauseCircle />}</button>
      <button onClick={() => handleModal()} className="agregarregalo" autoFocus>Agregar regalo</button>
      <AbstractModal 
        openModal={openModal}
        closeModal={closeModal}
      >
        <FormRegalos
          handleSubmit={handleSubmit}
          nuevoRegalo={nuevoRegalo}
          imagenRegalo={imagenRegalo}
          cantidadregalos={cantidadregalos}
          destinatario={destinatario}
          closeModal={closeModal}
          editarRegaloId={editarRegaloId}
          setNuevoRegalo={setNuevoRegalo}
          setImagenRegalo={setImagenRegalo}
          setCantidadRegalos={setCantidadRegalos}
          setDestinatario={setDestinatario}
          precio={precio}
          setPrecio={setPrecio}
        >  
        </FormRegalos>
      </AbstractModal>
      {!regalos.length ? <span className="listavacia">No hay regalos grinch! agrega algo:)</span> :
      <div className="listaregalos" >
        <ul  className="regalos">
        {regalos.map(regalo =>{
          return  <ListItem
                    regalo={regalo}
                    handleModal={handleModal}
                    handleDelete={handleDelete}
                    handleDuplicate={handleDuplicate}
                  >
                  </ListItem>
        })}
        </ul>
      </div>
      }
      <div className='total'>Total $ {regalos.reduce((acc, regalo) =>{
        return acc + (Number(regalo.precio) * Number(regalo.cantidad))
      },0)}</div>
      <div className='borrartodo'>
        <button onClick={()=> handleDeleteAll()}>Borrar todo</button>
      </div>
      <div className='previsualizar'>
        <button className='buttonprevisualizar' onClick={()=> handlePrevisualizar()}>Previsualizar</button>
        <AbstractModal
          openModal={openModalPrevisualizar}
          closeModal={closeModalPrevisualizar}
        >
          <div id='print'>
            <h1 className='comprar'>Comprar:</h1>
            <div className='listaregalosprevisualizar'>
              <ul>
                {regalos.map(regalo =>{
                  return  <ListItemPrevisualizar
                            regalo={regalo}
                          >
                          </ListItemPrevisualizar>
                })}
              </ul>
            </div>
          </div>
          <button className='cerrarprevisualizar buttoncerrar' onClick={()=> closeModalPrevisualizar()}>Cerrar</button>
          <button className='cerrarprevisualizar' onClick={()=> handleImprimir()} >Imprimir</button>
        </AbstractModal>
      </div>
    </div>
  );
}

export default ListaRegalos;
