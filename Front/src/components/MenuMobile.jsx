import{NavLink} from 'react-router-dom';
import useConf from '../context/ConfContext';
import useModals from '../context/ModalContext';

const MenuMobile = ({menuRef,handlerMenu}) => {

	let {setSearchModal} = useModals(),

	{conf} = useConf();

	return(

		<aside className={`panel child-bg-${conf.theme} hidden`} ref={menuRef}>

			<i className="bi-x fs-3 mr-rg" onClick={handlerMenu}></i>
			
			<nav className="menu-mobile">
				
				<NavLink className={`text-${conf.theme}`} to="/Upload" onClick={handlerMenu}>Subir imagenes</NavLink>
				<div onClick={() => setSearchModal(true)}>buscar</div>
				<NavLink className={`text-${conf.theme}`} to="/Trash" onClick={handlerMenu}>Papelera</NavLink>
				<NavLink className={`text-${conf.theme}`} to="/Configuraciones" onClick={handlerMenu}>configuraciones</NavLink>

			</nav>

		</aside>

	);

}

export default MenuMobile;