import styles from '../styles/PhotoEditor.module.css';

const Slider = ({min,max,value,handlerChange}) => {

	return(

		<div className={styles.sliderContainer}>
			
			<input className={styles.slider} type="range" min={min} max={max} value={value} onChange={handlerChange}/>

		</div>

	)

}

export default Slider;