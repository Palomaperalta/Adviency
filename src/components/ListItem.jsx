import './ListItem.css'

function ListItem({
    regalo,
    handleModal,
    handleDelete,
    handleDuplicate
}){
    return(
        <li className="itemregalo" key={regalo.id}>
            <div className='divimgnamedest'>
                {regalo.img ? <img src={regalo.img} alt=""/> : null }
                <span>{regalo.name} </span>
                <span>({regalo.cantidad})</span>
                <span>-</span>
                <span>${regalo.precio * regalo.cantidad}</span>
                <span>{regalo.destinatario}</span>
                <button className="actionbutton" onClick={()=>handleModal(regalo)}>E</button>
                <button className="actionbutton" onClick={()=>handleDuplicate(regalo)}>D</button>
                <button className="actionbutton" onClick={()=>handleDelete(regalo.id)}>X</button>
            </div>
        </li>
    )
}  


export default ListItem;