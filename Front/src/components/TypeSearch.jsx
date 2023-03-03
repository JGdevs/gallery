import styles from '../styles/SearchModal.module.css'

const TypeSearch = ({type,setSearch}) => {

	function HandlerChange (e) {setSearch(e.target.value)}

	function HandlerDate (e) {

		let date = e.target.value.split('-');

		date.reverse();

		let day = (date[0][0] == 0) ? date[0][1] : date[0],

		month = (date[1][0] == 0) ? date[1][1] : date[1];

		date[1] = day;

		date[0] = month;	

		setSearch(date.join('-'));	

	}

	switch (type) {
		
		case 'name': {

			return <input className={styles.searchInput} type="text" required onChange={HandlerChange}/>

		}

		case 'date': {

			return <input className={styles.searchInput} type="date" required onChange={HandlerDate}/>

		}

		case 'type': {

			return (

				<select className={styles.searchSelect} onChange={HandlerChange}>
					
					<option selected="" disabled="" hidden="">Select one format</option>
					<option value="jpeg">JPG</option>
					<option value="png">PNG</option>

				</select>
				
			)

		}
		
	}

}

export default TypeSearch;