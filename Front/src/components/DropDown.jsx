import {useRef} from 'react';
import {NavLink} from 'react-router-dom';
import useConf from '../context/ConfContext';
import styles from '../styles/Dropdown.module.css';

const DropDown = () => {

	const dropDownRef = useRef(),

	{conf} = useConf(),

	handlerDropDown = (e) => dropDownRef.current.classList.toggle(`${styles.isActive}`);

	return(

			<nav className={`${styles.dropdown} in-mobile mr-rg-2`} ref={dropDownRef} onClick={handlerDropDown}>

				<button className={`${styles.link} fs--2`}>Opciones</button>
				
				<ul className={`${styles.dropdownMenu} child-bg-${conf.theme}`}>
					
					<NavLink to="/Trash">papelera</NavLink>
					<NavLink to="/Configuraciones">configuraciones</NavLink>

				</ul>

			</nav>

	);

} 

export default DropDown;