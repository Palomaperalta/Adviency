import './ListItemPrevisualizar';

function ListItemPrevisualizar({
    regalo,
}){
    return(
        <li className="itemregalo" key={regalo.id}>
            <div className='divimgnamedest'>
                {regalo.img ? <img src={regalo.img} alt=""/> : null }
                <span>{regalo.name} </span>
                <span>({regalo.cantidad})</span>
                <span>{regalo.destinatario}</span>
            </div>
        </li>
    )
}  


export default ListItemPrevisualizar;