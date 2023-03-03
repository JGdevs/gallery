import {useState,useRef,useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import useModals from '../context/ModalContext';
import useConf from '../context/ConfContext';

const Image = ({image,pos = false}) => {

	const [source,setSource] = useState(null),

	{setImageModal} = useModals(),

	{conf} = useConf(),

	imageRef = useRef(),

	location = useLocation().pathname;

	function HandlerClick () {

		if(location === '/Upload') return false;

		setImageModal(pos);

	}

	useEffect(() => {

		if(conf.gridStyle === 'mansory' && location !== '/Upload') {

			imageRef.current.style.gridRowEnd = 'span ' + Math.round(Math.random() * 2);

			imageRef.current.style.gridColumnEnd = 'span ' + Math.round(Math.random() * 2);

		}

		if(!image.src) {

			const reader = new FileReader();

			reader.addEventListener("loadend", (e) => setSource(e.target.result));

			reader.readAsDataURL(image);

		}

		else setSource(image.src);

	},[image]);

	useEffect(() => {

	},[source]);

	return (

		<div className={`image ${conf.borderImgs} ${source == null ? 'placeholder' : ''}`} ref={imageRef} onClick={HandlerClick}>
			
			{source && <img className={`${conf.borderImgs}`} src={source}/>}

		</div>

	);

}

export default Image;