import GalleryApp from './components/GalleryApp';
import {ConfProvider} from './context/ConfContext';
import {ImagesProvider} from './context/ImagesContext';

function App() {

  return (

    <ConfProvider>

      <ImagesProvider>

       <GalleryApp/>

      </ImagesProvider> 

    </ConfProvider>

  );

}

export default App;
