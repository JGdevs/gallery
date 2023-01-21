import {useState,useEffect,useLayoutEffect} from 'react';
import {useParams,useNavigate,useLocation} from 'react-router-dom';
import {HelpHttp} from '../helpers/HelpHttp';
import useModals from '../context/ModalContext';
import useImages from '../context/ImagesContext';
import useConf from '../context/ConfContext';
import Image from './Image';
import ImageModal from './ImageModal';
import SearchModal from './SearchModal';
import Void from './Void';
import Loader from './Loader';

const Gallery = () => {

	let location = useLocation();

	const [loader,setLoader] = useState(false),

	nav = useNavigate(),

	{imageModal,searchModal} = useModals(),

	{images,setImages,hasMore,setHasMore} = useImages(),

	{conf} = useConf(),

	api = HelpHttp();

	let {n} = useParams(),

	url = 'http://localhost:4069';

	if(images && conf.typeLoad === 'forPage' && images.length > 9) images.splice(10); 

	function prevAndNext (e) {

		if(loader) return false; 

		if(e.target.id === 'prev') n = (!n) ? 2 : parseInt(n) - 1;

		else n = (!n) ? 2 : parseInt(n) + 1;

		nav(`/Page/${n}`);

	}

	useEffect(() => {

		if(conf.typeLoad === "forPage" && n) {

			setLoader(true);

			let newUrl = `${url}/Page/${n}`;

			api.get(newUrl).then(res => {

				if(!res.err) {

					setImages(res.docs);

					setHasMore(res.hasMore);

					setLoader(false);

				}

				else console.log(res.err);

			});

		}

	},[n])

	useLayoutEffect(() => {

		if(location.pathname == '/page/1') setHasMore(true);

	},[location])

	useEffect(() => {

		if(images && conf.typeLoad === 'infinite') {

			const observer = new IntersectionObserver(entries => {

				let newUrl = `${url}/infinite/${images.length}`;

				if(entries[0].isIntersecting) {

					api.get(newUrl).then(res => {

						if(!res.err) {

							observer.disconnect();

							if(res.length == 0 ) {alert('se acabaron las imagenes'); return false}

							setImages([...images,...res]);

						}

						else console.log(res.err);

					});

				}

			},{threshold:1});

			observer.observe(document.querySelector(`.${conf.gridStyle}`).lastElementChild);

		}

		else return;

	},[images]);

	return (

		<>

			<section className={`${conf.gridStyle}`}>

				{

					(loader) ? <Loader/> 

					: (!images) ? <Loader/> 

					: images.length > 0 && images.map((image,i) => <Image pos={i} key={i + 1} image={image}/>)

				}

				{searchModal && <SearchModal/>}

			</section>

			{(imageModal === 0 || imageModal) && <ImageModal images={images}/>}

			{images && images.length == 0 && <Void origin="gallery"/>}

			{!loader && conf.typeLoad === 'forPage' &&

				<div className="nav-pages">
			
					{n >= 2 && <button className={`button child-bg-${conf.theme}`} id="prev" onClick={prevAndNext}>anterior</button>}

					{hasMore && <button className={`button child-bg-${conf.theme}`} id="next" onClick={prevAndNext}>siguiente</button>}

				</div>

			}

		</>

	);

}

export default Gallery;