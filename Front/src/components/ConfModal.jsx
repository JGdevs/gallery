import {useState} from 'react';
import useConf from '../context/ConfContext';
import {TYPES} from '../actions/confActions';
import styles from '../styles/ConfModal.module.css';

const ConfModal = ({option,setOption}) => {

	const {conf,dispatch} = useConf(),

	setChecked = (type,value) => (conf[type] === value) ? true : false;

	function changeConf (type,payload) {

		dispatch({type,payload});

		setTimeout(() => setOption(null),300);

	}

	function confOptions () {

		switch (option) {

			case 'Charge': {

				return (

					<form>
					
						<div className={styles.confOpContainer}>

							<span>Infinito</span>

							<label className={styles.radioContainer} htmlFor="infinite">

								<input className={styles.radioInput} id="infinite" type="radio" name="typeLoad" checked={setChecked('typeLoad','infinite')} onChange={({target}) => changeConf(TYPES.changeTypeLoad,target.id)}/>
								<div className={styles.radioRadio}></div>

							</label>

						</div>

						<div className={styles.confOpContainer}>

							<span>Paginacion</span>

							<label className={styles.radioContainer} htmlFor="forPage">
								
								<input className={styles.radioInput} id="forPage" type="radio" name="typeLoad" checked={setChecked('typeLoad','forPage')} onChange={({target}) => changeConf(TYPES.changeTypeLoad,target.id)}/>
								<div className={styles.radioRadio}></div>

							</label>

						</div>

					</form>

				)

			}

			case 'Order': {

				return (

					<form>
							
						<div className={styles.confOpContainer}>

							<span>Por Fecha</span>

							<label className={styles.radioContainer} htmlFor="byDate">
								
								<input className={styles.radioInput} id="byDate" type="radio" name="order" onChange={({target}) => changeConf(TYPES.changeOrder,target.id)}/>
								<div className={styles.radioRadio}></div>

							</label>

						</div>

						<div className={styles.confOpContainer}>

							<span>Por Nombre</span>

							<label className={styles.radioContainer} htmlFor="byName">
								
								<input className={styles.radioInput} id="byName" type="radio" name="order" onChange={({target}) => changeConf(TYPES.changeOrder,target.id)}/>
								<div className={styles.radioRadio}></div>

							</label>

						</div>

						<div className={styles.confOpContainer}>

							<span>Por Tipo</span>

							<label className={styles.radioContainer} htmlFor="byType">
								
								<input className={styles.radioInput} id="byType" type="radio" name="order" onChange={({target}) => changeConf(TYPES.changeOrder,target.id)}/>
								<div className={styles.radioRadio}></div>

							</label>

						</div>

						<div className={styles.confOpContainer}>

							<span>Por Tamanio</span>

							<label className={styles.radioContainer} htmlFor="bySize">
								
								<input className={styles.radioInput} id="bySize" type="radio" name="order" onChange={({target}) => changeConf(TYPES.changeOrder,target.id)}/>
								<div className={styles.radioRadio}></div>

							</label>

						</div>

					</form>

				)

			}

			case 'Border': {

				return (

					<form>
					
						<div className={styles.confOpContainer}>

							<span>Suaves</span>

							<label className={styles.radioContainer} htmlFor="circle-border">
							
								<input className={styles.radioInput} id="circle-border" type="radio" name="borderImgs" checked={setChecked('borderImgs','circle-border')} onChange={({target}) => changeConf(TYPES.changeBorderImages,target.id)}/>
								<div className={styles.radioRadio}></div>

							</label>

						</div>

						<div className={styles.confOpContainer}>

							<span>Solidos</span>

							<label className={styles.radioContainer} htmlFor="square-border">
						
								<input className={styles.radioInput} id="square-border" type="radio" name="borderImgs" checked={setChecked('borderImgs','square-border')} onChange={({target}) => changeConf(TYPES.changeBorderImages,target.id)}/>
								<div className={styles.radioRadio}></div>

							</label>	

						</div>

					</form>

				)
	
			}

			case 'Theme': {

				return (

					<form>
					
						<div className={styles.confOpContainer}>

							<span>Oscuro</span>

							<label className={styles.radioContainer} htmlFor="dark">
								
								<input className={styles.radioInput} id="dark" type="radio" name="theme" checked={setChecked('theme','dark')} onChange={({target}) => changeConf(TYPES.changeTheme,target.id)}/>
								<div className={styles.radioRadio}></div>

							</label>

						</div>

						<div className={styles.confOpContainer}>

							<span>Claro</span>

							<label className={styles.radioContainer} htmlFor="light">
								
								<input className={styles.radioInput} id="light" type="radio" name="theme" checked={setChecked('theme','light')} onChange={({target}) => changeConf(TYPES.changeTheme,target.id)}/>
								<div className={styles.radioRadio}></div>

							</label>

						</div>

					</form>


				)

			}

			case 'Style': {

				return (
					
					<form>
					
						<div className={styles.confOpContainer}>

							<span>Normal</span>

							<label className={styles.radioContainer} htmlFor="grid-gallery">
								
								<input className={styles.radioInput} id="grid-gallery" type="radio" name="gridStyle" checked={setChecked('gridStyle','grid-gallery')} onChange={({target}) => changeConf(TYPES.changeGridStyle,target.id)}/>
								<div className={styles.radioRadio}></div>

							</label>

						</div>

						<div className={styles.confOpContainer}>

							<span>Fluida</span>

							<label className={styles.radioContainer} htmlFor="mansory">
								
								<input className={styles.radioInput} id="mansory" type="radio" name="gridStyle" checked={setChecked('gridStyle','mansory')} onChange={({target}) => changeConf(TYPES.changeGridStyle,target.id)}/>
								<div className={styles.radioRadio}></div>

							</label>

						</div>

					</form>					

				)
				
			}

		}

	}

	return(

		<div className={`${styles.modal} bg-modal`}>

				<section className={`${styles.confModal} child-bg-${conf.theme}`}>
					
					{confOptions()}

				</section>

		</div>

	);

}

export default ConfModal;