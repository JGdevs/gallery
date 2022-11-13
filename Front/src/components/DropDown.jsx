import {useRef} from 'react';
import {NavLink} from 'react-router-dom';
import useConf from '../context/ConfContext';
import './dropdown.css';

const DropDown = () => {

	const dropDownRef = useRef(),

	{conf} = useConf(),

	handlerDropDown = (e) => dropDownRef.current.classList.toggle('is-active');

	return(

			<nav className="dropdown in-mobile mr-rg-2" ref={dropDownRef} onClick={handlerDropDown}>

				<button className="link fs--2">Opciones</button>
				
				<ul className={`dropdown-menu child-bg-${conf.theme}`}>
					
					<NavLink to="/Trash">papelera</NavLink>
					<NavLink to="/Configuraciones">configuraciones</NavLink>

				</ul>

			</nav>

	);

} 

export default DropDown;