import {useState} from 'react';
import ConfOption from './ConfOption';
import useConf from '../context/ConfContext';
import styles from '../styles/ConfModal.module.css';

const ConfModal = ({op,setOption}) => {

	const {option,action} = op,

	{conf} = useConf();

	return (

		<div className={`${styles.modal} bg-modal`}>

			<section className={`${styles.confModal} child-bg-${conf.theme}`}>
				
				<form>
			
					{option.values.map((value,i) => <ConfOption key={i} value={value} name={option.name} action={action} setOption={setOption}/>)}

				</form>

			</section>

		</div>

	);

}

export default ConfModal;