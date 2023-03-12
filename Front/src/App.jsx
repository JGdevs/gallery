import GalleryApp from './components/GalleryApp';
import {BrowserRouter} from 'react-router-dom'
import {ConfProvider} from './context/ConfContext';
import {ImagesProvider} from './context/ImagesContext';

function App() {

  return (

    <ConfProvider>

      <ImagesProvider>

        <BrowserRouter>

         <GalleryApp/>

        </BrowserRouter> 

      </ImagesProvider>

    </ConfProvider>

  );

}

export default App;
