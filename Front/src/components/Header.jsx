import {useRef,useContext} from 'react';
import {NavLink,useLocation} from 'react-router-dom';
import useConf from '../context/ConfContext';
import useModals from '../context/ModalContext';
import useImages from '../context/ImagesContext';
import MenuMobile from './MenuMobile';
import DropDown from './DropDown';
import SearchModal from './SearchModal';

const Header = () => {

	const menuRef = useRef(),

	location = useLocation().pathname,

	{conf} = useConf(),

	{initialImages,setImages} = useImages(),

	{setSearchModal} = useModals();

	function toHome () {

		if(conf.typeLoad === 'forPage') setImages(initialImages);

	};

	function handlerMenu () {

		menuRef.current.classList.toggle('hidden')
		menuRef.current.classList.toggle('active')

	}

	function handlerSearch () {

		if(location === '/Configuraciones' || location === '/Editar' || location === '/Upload') return false;

		else setSearchModal(true);	

	}

	return (

		<header className={`header child-bg-${conf.theme}`}>
			
			<section className="header-start">
				
				<NavLink className="title" to={(conf.typeLoad == 'forPage') ? '/page/1' : '/'} onClick={toHome}>Galeria</NavLink>

				{
			
					(location == "/Upload") ? <label className="button in-mobile" htmlFor="save">guardar imagenes</label>

					: <NavLink className="button in-mobile" to="/Upload">subir imagenes</NavLink>

				}

			</section>		

			<section className="header-options">
				
				<DropDown/>

				<div className="search in-mobile" onClick={handlerSearch}>Buscar</div>

			</section>

			<i className="bi-list in-desktop fs-3 mr-rg mr-tp" onClick={handlerMenu}></i>

			<MenuMobile menuRef={menuRef} handlerMenu={handlerMenu}/>

		</header>

	);

}

export default Header;

