import {useEffect,useRef} from 'react';
import {useParams,useNavigate,useLocation} from 'react-router-dom';
import {getImages} from '../services/images';
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

	const nav = useNavigate(),

	btnsRef = useRef(),

	{imageModal,searchModal} = useModals(),

	{images,setImages,hasMore,setHasMore} = useImages(),

	{conf} = useConf();

	let {n} = useParams();

	if(images && conf.typeLoad === 'pagination' && images.length > 9) images.splice(10); 

	function prevAndNext (e) {

		if(e.target.id === 'prev') n = (!n) ? 2 : parseInt(n) - 1;

		else n = (!n) ? 2 : parseInt(n) + 1;

		btnsRef.current.classList.add('disabled');

		getImages(`/Page/${n}`).then(res => {

			if(!res.err) {

				btnsRef.current.classList.remove('disabled');

				nav(`/Page/${n}`);
				setImages(res.docs);
				setHasMore(res.hasMore);

			}

			else console.log(res.err);

		});

	}

	useEffect(() => {

		if(images && conf.typeLoad === 'infinite') {

			const observer = new IntersectionObserver(entries => {

				let newUrl = `/infinite/${images.length}`;

				if(entries[0].isIntersecting) {

					getImages(newUrl).then(res => {

						if(!res.err) {

							observer.disconnect();

							if(res.length == 0 ) {alert('se acabaron las imagenes'); return}

							else setImages([...images,...res]);

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

					(!images) ? <Loader/>

					: images.length > 0 && images.map((image,i) => <Image pos={i} key={i + 1} image={image}/>)

				}

				{searchModal && <SearchModal/>}

			</section>

			{(imageModal === 0 || imageModal) && <ImageModal images={images}/>}

			{images && images.length == 0 && <Void origin="gallery"/>}

			{conf.typeLoad === 'pagination' &&

				<div className="nav-pages" ref={btnsRef}>
			
					{n >= 2 && <button className={`button child-bg-${conf.theme}`} id="prev" onClick={prevAndNext}>anterior</button>}

					{hasMore && <button className={`button child-bg-${conf.theme}`} id="next" onClick={prevAndNext}>siguiente</button>}

				</div>

			}

		</>

	);

}

export default Gallery;