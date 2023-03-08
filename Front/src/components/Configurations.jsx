import {useState,useEffect} from 'react';
import useConf from '../context/ConfContext';
import ConfModal from './ConfModal';
import {TYPES} from '../actions/confActions';
import {options} from '../data/options';
import styles from '../styles/Configurations.module.css';

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

		<article className={styles.configurations}>
				
				<h2>Configurations</h2>

				<section>

					<h3>Charge options</h3>

					<ul className={`${styles.confSection} child-bg-${conf.theme}`}>

						<li className={styles.confOption} onClick={() => setOption({option:options.typeLoad,action:TYPES.changeTypeLoad})}>

							<span>Type of load</span>

							<i></i>

						</li>

					</ul>

				</section>

				<section>
				
					<h3>Appearance</h3>

					<ul className={`${styles.confSection} child-bg-${conf.theme}`}>
						
						<li className={styles.confOption} onClick={() => setOption({option:options.borderImgs,action:TYPES.changeBorderImages})}>

							<span>Border</span>

							<i></i>

						</li>

						<li className={styles.confOption} onClick={() => setOption({option:options.theme,action:TYPES.changeTheme})}>

							<span>Theme</span>

							<i></i>

						</li>

						<li className={styles.confOption} onClick={() => setOption({option:options.gridStyle,action:TYPES.changeGridStyle})}>

							<span>Gallery style</span>

							<i></i>

						</li>

					</ul>	

				</section>

				{option && <ConfModal op={option} setOption={setOption}/>}

		</article>

	);

}

export default Configurations;