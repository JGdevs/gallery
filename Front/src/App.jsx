import GalleryApp from './components/GalleryApp';
import {BrowserRouter} from 'react-router-dom'
import {ConfProvider} from './context/ConfContext';
import {ImagesProvider} from './context/ImagesContext';

function App() {

  return (

    <BrowserRouter>

      <ConfProvider>

        <ImagesProvider>

         <GalleryApp/>

        </ImagesProvider> 

      </ConfProvider>

    </BrowserRouter>

  );

}

export default App;
