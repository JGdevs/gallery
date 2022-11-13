const Slider = ({min,max,value,handlerChange}) => {

	return(

		<div className="slider-container">
			
			<input className="slider" type="range" min={min} max={max} value={value} onChange={handlerChange}/>

		</div>

	)

}

export default Slider;