import {createContext,useState,useContext} from 'react';

const ModalContext = createContext(),

useModals = () => useContext(ModalContext),

ModalProvider = ({children}) => {

	const [imageModal,setImageModal] = useState(false),

	[searchModal,setSearchModal] = useState(false),

	data = {

		imageModal,
		setImageModal,
		searchModal,
		setSearchModal,

	};

	return <ModalContext.Provider value={data}>{children}</ModalContext.Provider>

}

export default useModals;
export {ModalProvider};
