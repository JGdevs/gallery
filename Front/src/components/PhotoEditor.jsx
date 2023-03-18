import {useState,useRef,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {saveEdit} from '../services/images';
import useImages from '../context/ImagesContext';
import useConf from '../context/ConfContext';
import Loader from './Loader';
import styles from '../styles/PhotoEditor.module.css';

const PhotoEditor = () => {

	let {position} = useParams();

	const {getImage,setImages} = useImages(),

	image = getImage(position),

	imgRef = useRef(),

	{conf} = useConf(),

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

		const save = window.confirm('save edit image?');

		if (!save) return;

		const canvas = document.createElement('canvas'),

		ctx = canvas.getContext('2d');

		canvas.width = editImg.naturalWidth;

		canvas.height = editImg.naturalHeight;

		ctx.filter = editImg.style.filter;

		ctx.drawImage(editImg,0,0);	

		const newImg = {

			...originalImg,
			name:`edit-${originalImg.name}`,
			src:canvas.toDataURL(`image/${originalImg.type}`,.5).split("base64,")[1],

		}

		delete newImg._id;

		saveEdit(newImg).then(res => {

			if(!res.err) {

				window.alert('image save successfully');
				setImages(prevImages => [...prevImages,res]);

			}

			else console.log(res.err);

		});

	}

	return (

	<div className={`${styles.container} child-bg-${conf.theme}`}>
  
	  <div className={styles.wrapper}>
	    
	    <div className={styles.editorPanel}>
	      
	      <div className={styles.filter}>
	        
	        <label className={styles.filter}>Filters</label>
	        <div className={styles.options}>

	          <button className={styles.button} id="brightness">Brightness</button>
	          <button className={styles.button} id="saturation">Saturation</button>
	          <button className={styles.button} id="inversion">Inversion</button>
	          <button className={styles.button} id="grayscale">Grayscale</button>

	        </div>

	      </div>

	      <div className={styles.slider}>
	          
	        <div className={styles.filterInfo}>
	          
	          <p className={styles.name}>Brightness</p>
	          <p className={styles.value}>100%</p>

	        </div>

	        <input 

	        	className={styles.input}
	        	type="range" 
	        	value={selectedOption.value}
	        	min={selectedOption.range.min} 
	        	max={selectedOption.range.max}
	        	onChange={handlerSliderChange}

	        />

	      </div>

	      <div className={styles.rotate}>

	        <label className={styles.title}>Rotate & Flip</label>

	        <div className={styles.options}>
	          <button id="left"><i class="bi-arrow-clockwise"></i></button>
	          <button id="right"><i className="fa-solid fa-rotate-right"></i></button>
	          <button id="horizontal"><i className='bx bx-reflect-vertical'></i></button>
	          <button id="vertical"><i className='bx bx-reflect-horizontal' ></i></button>
	        </div>

	      </div>

	    </div>

	    <div className={styles.img}>
	      <img src={image?.src} alt={image?.name}/>
	    </div>

	  </div>

	  <div className={styles.controls}>

	    <button className={styles.resetFilter}>Reset Filters</button>

	    <div className={styles.row}>
	      <input className={styles.fileInput} type="file" accept="image/*" hidden/>
	      <button className={`${styles.chooseImg} ${styles.button}`}>Choose Image</button>
	      <button className={`${styles.saveImg} ${styles.button}`}>Save Image</button>
	    </div>
	    
	  </div>

</div>

	)

}

export default PhotoEditor;