import {useState,useEffect} from 'react';
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
	    name: 'Blur',
	    property: 'blur',
	    value: 0,
	    range: {
	      min: 0,
	      max: 20
	    },
	    unit: 'px'
  	},

  	{

  		name:'Invert',
  		property:'invert',
  		value:0,
  		range:{

  			min:0,
  			max:100

  		},
  		unit:'%'

  	}

	],

	orientationOptions = {

		rotate:0,
		horizontal:1,
		vertical:1

	},

	[options,setOptions] = useState(Default_Options),

	[selectedOptionIndex,setSelectedOptionIndex] = useState(0),

	[orientation,setOrientation] = useState(orientationOptions),

	selectedOption = options[selectedOptionIndex];

	function handlerSliderChange ({target}) {

		setOptions(prevOptions => {

			return prevOptions.map((option,index) => {

				if(index !== selectedOptionIndex) return option;

				return {...option, value:target.value}

			})

		})

	}

	function changeOrientation(action) {

		if(action === 'left') setOrientation(prevOr => {return{...prevOr,rotate:prevOr.rotate - 90}});
		else if(action === 'right') setOrientation(prevOr => {return{...prevOr,rotate:prevOr.rotate + 90}});
		else if(action === 'horizontal') setOrientation(prevOr => {return{...prevOr,horizontal:-prevOr.horizontal}});
		else if(action === 'vertical') setOrientation(prevOr => {return{...prevOr,vertical:-prevOr.vertical}});

	}

	function getImageStyle () {

		const filters = options.map(option => `${option.property}(${option.value}${option.unit})`),

		transform = `rotate(${orientation.rotate}deg) scale(${orientation.horizontal},${orientation.vertical})`;

		return {

			filter: filters.join(' '),
			transform

		}

	}

	function resetFilters () {

		setOptions(Default_Options);
		setOrientation(orientationOptions);

	}

	function saveEditImage (editImg,originalImg) {

		const save = window.confirm('save edit image?');

		if (!save) return;

		const canvas = document.createElement('canvas'),

		ctx = canvas.getContext('2d');

		canvas.width = editImg.naturalWidth;

		canvas.height = editImg.naturalHeight;

		ctx.translate(canvas.width / 2,canvas.height / 2);

		if(rotate !== 0) ctx.rotate(orientation.rotate * Math.PI / 180);

		ctx.scale(orientation.horizontal,orientation.vertical);

		ctx.filter = editImg.style.filter;

		ctx.drawImage(editImg,-canvas.width / 2,-canvas.height / 2,canvas.width,canvas.height);	

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

	<div className={`${styles.container} child-bg-${conf.theme} text-${conf.theme} border-${conf.theme}`}>
  
	  <div className={styles.wrapper}>
	    
	    <div className={styles.editorPanel}>
	      
	      <div className={styles.filter}>
	        
	        <label className={styles.filter}>Filters</label>
	        <div className={styles.options}>

	        	{

	        		options.map((op,index) => (

	        			<button 

	        				key={op.name}
	        				className={`${styles.button} ${(index === selectedOptionIndex) ? 'selected' : ''}`} 
	        				id={op.property} 
	        				onClick={({target}) => setSelectedOptionIndex(index)}>{op.name}

	        			</button>

	        		))

	        	}

	        </div>

	      </div>

	      <div className={styles.slider}>
	          
	        <div className={styles.filterInfo}>
	          
	          <p className="fs--2">{selectedOption.name}</p>
	          <p className="fs--2 mr-tp">{selectedOption.value}</p>

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
	          <button onClick={() => changeOrientation('left')}><i className="bi-arrow-clockwise"></i></button>
	          <button onClick={() => changeOrientation('right')}><i className="bi-arrow-counterclockwise"></i></button>
	          <button onClick={() => changeOrientation('horizontal')}><i className="bi-arrows-collapse special"></i></button>
	          <button onClick={() => changeOrientation('vertical')}><i className="bi-arrows-collapse"></i></button>
	        </div>

	      </div>

	    </div>

	    <div className={styles.img}>
	      <img style={getImageStyle()} src={image?.src} alt={image?.name}/>
	    </div>

	  </div>

	  <div className={styles.controls}>

	    <button className={styles.resetFilter} onClick={resetFilters}>Reset Filters</button>

	    <div className={styles.row}>
	      <button className={`${styles.saveImg} ${styles.button}`}>Save Image</button>
	    </div>
	    
	  </div>

</div>

	)

}

export default PhotoEditor;