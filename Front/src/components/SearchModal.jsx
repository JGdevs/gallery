import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useConf from '../context/ConfContext';
import useModals from '../context/ModalContext';
import TypeSearch from './TypeSearch';
import styles from '../styles/SearchModal.module.css';

const SearchModal = () => {

	const [type,setType] = useState(null),

	[search,setSearch] = useState(null),

	nav = useNavigate(),

	{setSearchModal} = useModals(),

	{conf} = useConf();

	function HandlerSubmit (e) {

		e.preventDefault();

		if(type == null || search == null) {

			alert('the fields cannot be empty');

			return false;

		}

		nav(`/Search/${type}/${search}`);

		setSearchModal(false);

	}

	return (

		<section className={`${styles.modal} bg-modal`}>
			
			<div className={`${styles.searchContainer} child-bg-${conf.theme}`}>

				<section className={`${styles.detailsOptions} in-mobile`}>
				
					<i className="bi-x" onClick={() => setSearchModal(false)}></i>

				</section>
				
				<aside className={`${styles.searchOptions}`}>

					<select onChange={(e) => setType(e.target.value)}>

						<option selected="" disabled="" hidden="">Escoge un filtro de busqueda</option>
						<option value="name">Name</option>
						<option value="date">Date</option>
						<option value="type">Type</option>

					</select>

				</aside>

				<form className={`${styles.searchForm}`} onSubmit={HandlerSubmit}>

					{type && <TypeSearch type={type} setSearch={setSearch}/>}

					<input className={`${styles.searchInput}`} type="submit" value="Buscar"/>

				</form>

			</div>

		</section>

	)

}

export default SearchModal;

