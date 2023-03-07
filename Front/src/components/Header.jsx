import {useRef,useContext} from 'react';
import {NavLink,useLocation} from 'react-router-dom';
import useConf from '../context/ConfContext';
import useModals from '../context/ModalContext';
import useImages from '../context/ImagesContext';
import MenuMobile from './MenuMobile';
import DropDown from './DropDown';
import SearchModal from './SearchModal';
import styles from '../styles/Header.module.css';

const Header = () => {

	const menuRef = useRef(),

	location = useLocation().pathname,

	{conf} = useConf(),

	{setImages} = useImages(),

	{setSearchModal} = useModals();

	function handlerMenu () {

		menuRef.current.classList.toggle('hidden')
		menuRef.current.classList.toggle('active')

	}

	function handlerSearch () {

		if(location === '/Configuraciones' || location === '/Editar' || location === '/Upload') return false;

		else setSearchModal(true);	

	}

	return (

		<header className={`${styles.header} child-bg-${conf.theme}`}>
			
			<section className={styles.headerStart}>
				
				<NavLink className="title" to={(conf.typeLoad == 'pagination') ? '/page/1' : '/'}>Gallery</NavLink>

				{
			
					(location == "/Upload") ? <label className="button in-mobile" htmlFor="save">Save images</label>

					: <NavLink className="button in-mobile" to="/Upload">Upload images</NavLink>

				}

			</section>		

			<section className={styles.headerOptions}>
				
				<NavLink className="mr-rg-2 in-mobile" to="/Configurations">Configurations</NavLink>

				<div className="in-mobile" onClick={handlerSearch}>Search</div>

			</section>

			<i className="bi-list in-desktop fs-2 mr-rg mr-tp" onClick={handlerMenu}></i>

			<MenuMobile menuRef={menuRef} handlerMenu={handlerMenu}/>

		</header>

	);

}

export default Header;

