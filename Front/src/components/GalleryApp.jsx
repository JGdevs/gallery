import {Routes,Route} from 'react-router-dom';
import {ModalProvider} from '../context/ModalContext';
import useConf from '../context/ConfContext';
import Header from './Header';
import Gallery from './Gallery';
import NewImages from './NewImages';
import SearchResult from './SearchResult';
import Trash from './Trash';
import Configurations from './Configurations';
import PhotoEditor from './PhotoEditor';

const GalleryApp = () => {

	const {conf} = useConf();

	if(conf.theme === 'light') {

		document.querySelector('body').classList.add(conf.theme);
		document.querySelector('body').classList.remove('dark');

	}  

	else if (conf.theme === 'dark') {

		document.querySelector('body').classList.add(conf.theme);
		document.querySelector('body').classList.remove('light');		

	}

	return (

		<>
				
			<ModalProvider>

				<Header/>

					<Routes>
		    			
		    		<Route path="/" element={<Gallery/>}/>

		    		<Route path="/Page/:n" element={<Gallery/>}/>

		    		<Route path="/Upload" element={<NewImages/>}/>

		    		<Route path="/Search/:filter/:search" element={<SearchResult/>}/>

						<Route path="/Configurations" element={<Configurations/>}/>			    		

		    		<Route path="/Trash" element={<Trash/>}/>

		    		<Route path="/Edit/:position" element={<PhotoEditor/>}/>

		    	</Routes>

	    </ModalProvider>

		</>

	);

};

export default GalleryApp;
