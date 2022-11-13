import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useConf from '../context/ConfContext';
import useModals from '../context/ModalContext';

const SearchModal = () => {

	const [typeSearch,setTypeSearch] = useState(null),

	[searchValue,setSearchValue] = useState(null),

	nav = useNavigate(),

	HandlerChange = (e) => setSearchValue(e.target.value),

	{setSearchModal} = useModals(),

	{conf} = useConf();

	function HandlerDate (e) {

		let date = e.target.value.split('-');

		date.reverse();

		let day = (date[0][0] == 0) ? date[0][1] : date[0],

		month = (date[1][0] == 0) ? date[1][1] : date[1];

		date[1] = day;

		date[0] = month;	

		setSearchValue(date.join('-'));	

	}

	function HandlerSubmit (e) {

		e.preventDefault();

		if(typeSearch == null || searchValue == null) {

			alert('los campos no pueden estar vacios');

			return false;

		}

		nav(`/Search/${typeSearch}/${searchValue}`);

		setSearchModal(false);

	}

	function TypeSearch () {

		switch (typeSearch) {

			case 'name': {

				return <input className="search-input" type="text" required onChange={HandlerChange}/>

			}

			case 'date': {

				return <input className="search-input" type="date" required onChange={HandlerDate}/>

			}

			case 'type': {

				return (

					<select className="search-select" onChange={HandlerChange}>
						
						<option selected="" disabled="" hidden="">Escoge un formato</option>
						<option value="jpeg">JPG</option>
						<option value="png">PNG</option>

					</select>
					
				)

			}

		}

	}

	return (

		<section className="modal bg-modal">
			
			<div className={`search-container child-bg-${conf.theme}`}>

				<section className="details-options in-mobile">
				
					<i className="bi-x" onClick={() => setSearchModal(false)}></i>

				</section>
				
				<aside className="search-options">

					<select onChange={(e) => setTypeSearch(e.target.value)}>

						<option selected="" disabled="" hidden="">Escoge un filtro de busqueda</option>
						<option value="name">Nombre</option>
						<option value="date">Fecha</option>
						<option value="type">Tipo</option>

					</select>

				</aside>

				<form className="search-form" onSubmit={HandlerSubmit}>

					{typeSearch && TypeSearch()}

					<input className="search-submit" type="submit" value="Buscar"/>

				</form>

			</div>

		</section>

	)

}

export default SearchModal;

