import {useState,useEffect} from 'react';
import useConf from '../context/ConfContext';
import ConfModal from './ConfModal';

const Configurations = () => {

	const [option,setOption] = useState(null),

	{conf} = useConf();

	useEffect(() => {

		if(conf.theme === 'light') {

		document.querySelector('body').classList.add(conf.theme);
		document.querySelector('body').classList.remove('dark');
		document.querySelector('header').classList.add(`child-bg-${conf.theme}`);
		document.querySelector('header').classList.remove('child-bg-dark');

		}  

		else if (conf.theme === 'dark') {

			document.querySelector('body').classList.add(conf.theme);
			document.querySelector('body').classList.remove('light');
			document.querySelector('header').classList.add(`child-bg-${conf.theme}`);
			document.querySelector('header').classList.remove('child-bg-light');

		}

	},[conf.theme]);

	return (

		<article className="configurations">
				
				<h2>Configuraciones</h2>

				<section>

					<h3>Opciones de carga</h3>

					<ul className={`conf-section child-bg-${conf.theme}`}>

						<li className="conf-option" onClick={() => setOption('Charge')}>

							<span>Tipo de carga</span>

							<i></i>

						</li>


						<li className="conf-option" onClick={() => setOption('Order')}>

							<span>Ordernar</span>

							<i></i>

						</li>

					</ul>

				</section>

				<section>
				
					<h3>Apariencia</h3>

					<ul className={`conf-section child-bg-${conf.theme}`}>
						
						<li className="conf-option" onClick={() => setOption('Border')}>

							<span>Borde de las imagenes</span>

							<i></i>

						</li>

						<li className="conf-option" onClick={() => setOption('Theme')}>

							<span>Tema</span>

							<i></i>

						</li>

						<li className="conf-option" onClick={() => setOption('Style')}>

							<span>Estilo de la galeria</span>

							<i></i>

						</li>

					</ul>	

				</section>

				{option && <ConfModal option={option} setOption={setOption}/>}

		</article>

	);

}

export default Configurations;