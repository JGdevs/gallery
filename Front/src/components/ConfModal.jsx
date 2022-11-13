import {useState} from 'react';
import useConf from '../context/ConfContext';
import {TYPES} from '../actions/confActions';

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
					
						<div className="conf-op-container">

							<span>Infinito</span>

							<label className="radio-container" htmlFor="infinite">

								<input className="radio-input" id="infinite" type="radio" name="typeLoad" checked={setChecked('typeLoad','infinite')} onChange={({target}) => changeConf(TYPES.changeTypeLoad,target.id)}/>
								<div className="radio-radio"></div>

							</label>

						</div>

						<div className="conf-op-container">

							<span>Paginacion</span>

							<label className="radio-container" htmlFor="forPage">
								
								<input className="radio-input" id="forPage" type="radio" name="typeLoad" checked={setChecked('typeLoad','forPage')} onChange={({target}) => changeConf(TYPES.changeTypeLoad,target.id)}/>
								<div className="radio-radio"></div>

							</label>

						</div>

					</form>

				)

			}

			case 'Order': {

				return (

					<form>
							
						<div className="conf-op-container">

							<span>Por Fecha</span>

							<label className="radio-container" htmlFor="byDate">
								
								<input className="radio-input" id="byDate" type="radio" name="order" onChange={({target}) => changeConf(TYPES.changeOrder,target.id)}/>
								<div className="radio-radio"></div>

							</label>

						</div>

						<div className="conf-op-container">

							<span>Por Nombre</span>

							<label className="radio-container" htmlFor="byName">
								
								<input className="radio-input" id="byName" type="radio" name="order" onChange={({target}) => changeConf(TYPES.changeOrder,target.id)}/>
								<div className="radio-radio"></div>

							</label>

						</div>

						<div className="conf-op-container">

							<span>Por Tipo</span>

							<label className="radio-container" htmlFor="byType">
								
								<input className="radio-input" id="byType" type="radio" name="order" onChange={({target}) => changeConf(TYPES.changeOrder,target.id)}/>
								<div className="radio-radio"></div>

							</label>

						</div>

						<div className="conf-op-container">

							<span>Por Tamanio</span>

							<label className="radio-container" htmlFor="bySize">
								
								<input className="radio-input" id="bySize" type="radio" name="order" onChange={({target}) => changeConf(TYPES.changeOrder,target.id)}/>
								<div className="radio-radio"></div>

							</label>

						</div>

					</form>

				)

			}

			case 'Border': {

				return (

					<form>
					
						<div className="conf-op-container">

							<span>Suaves</span>

							<label className="radio-container" htmlFor="circle-border">
							
								<input className="radio-input" id="circle-border" type="radio" name="borderImgs" checked={setChecked('borderImgs','circle-border')} onChange={({target}) => changeConf(TYPES.changeBorderImages,target.id)}/>
								<div className="radio-radio"></div>

							</label>

						</div>

						<div className="conf-op-container">

							<span>Solidos</span>

							<label className="radio-container" htmlFor="square-border">
						
								<input className="radio-input" id="square-border" type="radio" name="borderImgs" checked={setChecked('borderImgs','square-border')} onChange={({target}) => changeConf(TYPES.changeBorderImages,target.id)}/>
								<div className="radio-radio"></div>

							</label>	

						</div>

					</form>

				)
	
			}

			case 'Theme': {

				return (

					<form>
					
						<div className="conf-op-container">

							<span>Oscuro</span>

							<label className="radio-container" htmlFor="dark">
								
								<input className="radio-input" id="dark" type="radio" name="theme" checked={setChecked('theme','dark')} onChange={({target}) => changeConf(TYPES.changeTheme,target.id)}/>
								<div className="radio-radio"></div>

							</label>

						</div>

						<div className="conf-op-container">

							<span>Claro</span>

							<label className="radio-container" htmlFor="light">
								
								<input className="radio-input" id="light" type="radio" name="theme" checked={setChecked('theme','light')} onChange={({target}) => changeConf(TYPES.changeTheme,target.id)}/>
								<div className="radio-radio"></div>

							</label>

						</div>

					</form>


				)

			}

			case 'Style': {

				return (
					
					<form>
					
						<div className="conf-op-container">

							<span>Normal</span>

							<label className="radio-container" htmlFor="grid-gallery">
								
								<input className="radio-input" id="grid-gallery" type="radio" name="gridStyle" checked={setChecked('gridStyle','grid-gallery')} onChange={({target}) => changeConf(TYPES.changeGridStyle,target.id)}/>
								<div className="radio-radio"></div>

							</label>

						</div>

						<div className="conf-op-container">

							<span>Fluida</span>

							<label className="radio-container" htmlFor="mansory">
								
								<input className="radio-input" id="mansory" type="radio" name="gridStyle" checked={setChecked('gridStyle','mansory')} onChange={({target}) => changeConf(TYPES.changeGridStyle,target.id)}/>
								<div className="radio-radio"></div>

							</label>

						</div>

					</form>					

				)
				
			}

		}

	}

	return(

		<div className="modal bg-modal">

				<section className={`conf-modal child-bg-${conf.theme}`}>
					
					{confOptions()}

				</section>

		</div>

	);

}

export default ConfModal;