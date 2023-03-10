import {useState,useRef,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {saveEdit} from '../services/images';
import useImages from '../context/ImagesContext';
import SidebarItem from './SidebarItem';
import Slider from './Slider';
import Loader from './Loader';
import styles from '../styles/PhotoEditor.module.css';

const PhotoEditor = () => {

	let {position} = useParams();

	const {getImage} = useImages(),

	image = getImage(position),

	imgRef = useRef(),

	Default_Options = [

		{

			name:'Brightness',
			property:'brightness',
			value:100,
			range:{

				min:0,
				max:200

			},
			unit:'%'
		},

		{

			name:'Contrast',
			property:'contrast',
			value:100,
			range:{

				min:0,
				max:200

			},
			unit:'%'
		},

		{

			name:'Saturation',
			property:'saturate',
			value:100,
			range:{

				min:0,
				max:200

			},
			unit:'%'
		},

		{

			name:'Grayscale',
			property:'grayscale',
			value:0,
			range:{

				min:0,
				max:200

			},
			unit:'%'
		},


		{

			name:'Sepia',
			property:'sepia',
			value:0,
			range:{

				min:0,
				max:200

			},
			unit:'%'
		},


		{

			name:'Hue-Rotate',
			property:'hue-rotate',
			value:0,
			range:{

				min:0,
				max:360

			},
			unit:'deg'
		},


		{

			name:'Blur',
			property:'blur',
			value:0,
			range:{

				min:0,
				max:200

			},
			unit:'px'
		}

	],

	[options,setOptions] = useState(Default_Options),

	[selectedOptionIndex,setSelectedOptionIndex] = useState(0),

	selectedOption = options[selectedOptionIndex];

	function handlerSliderChange ({target}) {

		setOptions(prevOptions => {

			return prevOptions.map((option,index) => {

				if(index !== selectedOptionIndex) return option;

				return {...option, value:target.value}

			})

		})

	}

	function getImageStyle () {

		const filters = options.map(option => `${option.property}(${option.value}${option.unit})`);

		return {filter: filters.join(' ')}

	}

	function saveEditImage (editImg,originalImg) {

		const canvas = document.createElement('canvas'),

		ctx = canvas.getContext('2d');

		canvas.width = editImg.naturalWidth;

		canvas.height = editImg.naturalHeight;

		ctx.filter = editImg.style.filter;

		ctx.drawImage(editImg,0,0);	

		const newImg = {

			...originalImg,
			name:`${originalImg.name}-edit.${originalImg.type}`,
			src:canvas.toDataURL(`image/${originalImg.type}`),

		}

		saveEdit(newImg).then(res => {

			if(!res.err) window.alert('image save successfully');
			else console.log(res.err);

		})

	}

	return (

		<div className={styles.editorContainer}>
			
			<div className={styles.editorImage}>

				{ 

					(image) ? <img className={styles.image} src={image.src} style={getImageStyle()} ref={imgRef}/> 

					: <Loader/>

				} 

			</div>

			<aside className={styles.editorAside}>
				
				<select className={styles.editorOptions} onChange={({target}) => setSelectedOptionIndex(parseInt(target.value))}>
				
					{options.map((option,index) => <SidebarItem key={index} name={option.name} index={index}/>)}

				</select>

				<Slider min={selectedOption.range.min} max={selectedOption.range.max} value={selectedOption.value} handlerChange={handlerSliderChange}/> 

				<button className={styles.editorButton} onClick={() => saveEditImage(imgRef.current,image)}>guardar</button>

			</aside>

		</div>

	)

}

export default PhotoEditor;

