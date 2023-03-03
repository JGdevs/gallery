import useConf from '../context/ConfContext';
import styles from '../styles/ConfModal.module.css';

const ConfOption = ({value,name,action,setOption}) => {

	const {conf,dispatch} = useConf(),

	setChecked = (type,value) => (conf[type] === value) ? true : false;

	function changeConf (type,payload) {

		dispatch({type,payload});

		setTimeout(() => setOption(null),300);

	}

	return (

		<div className={styles.confOpContainer}>

			<span>{value}</span>

			<label className={styles.radioContainer} htmlFor={value}>
				
				<input 

					className={styles.radioInput} 
					id={value} 
					type="radio" 
					name={name} 
					checked={setChecked(name,value)} 
					onChange={({target}) => changeConf(action,target.id)}

				/>

				<div className={styles.radioRadio}></div>

			</label>

		</div>

	)

}

export default ConfOption;


	