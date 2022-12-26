import './FormRegalos.css'

function FormRegalos ({
    handleSubmit, 
    nuevoRegalo,
    imagenRegalo,
    cantidadregalos,
    destinatario,
    closeModal,
    editarRegaloId, 
    setNuevoRegalo, 
    setImagenRegalo, 
    setDestinatario, 
    setCantidadRegalos,
    precio,
    setPrecio
}) {
    
    return (
        <form onSubmit={handleSubmit} className='formulario'>
            <input autoFocus value={nuevoRegalo} placeholder='Nombre Regalo' onChange={(e) => setNuevoRegalo(e.target.value)} type="text"/>
            <input value={imagenRegalo} placeholder='http:/image...' onChange={(e) => setImagenRegalo(e.target.value)} className='inputimage' type="text" ></input>
            <div className='inputnumber'>
                <input value={cantidadregalos} placeholder='cantidad' onChange={(e) => setCantidadRegalos(e.target.value)} type="number"></input>
            </div>
            <input value={destinatario} placeholder='Nombre destinatario' onChange={(e) => setDestinatario(e.target.value)} type="text"></input>
            <input value={precio} placeholder='precio' onChange={(e) => setPrecio(e.target.value)} type="number"></input>
            <div className='formactions'>
                <button type="submit" className='formactionsbuttons buttonagregar'>{editarRegaloId ? 'Editar' : 'Agregar'}</button>
                <button onClick={closeModal} className='formactionsbuttons buttoncerrar'>Cerrar</button>
            </div>
        </form>
    )
}

export default FormRegalos;