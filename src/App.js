import {
    useRef,
    useState
} from 'react';

import GreenText     from './components/GreenText';
import exportAsImage from './utils/exportAsImage';

import './css/index.css';

function App() {
    const gtContainer = useRef();
    const [imgData, setImgData] = useState({
        src: 'none',
        size: 0,
        type: 'none'
    });

    const saveImage = () => {
        exportAsImage(gtContainer.current, 'greentext');
    };

    const loadImg = (event) => {
        const file = event.target.files[0];

        setImgData({
            src:  URL.createObjectURL(file),
            size: Math.ceil(file.size / 1000),
            type: file.type.split('/')[1].toUpperCase(),
        });
    }

    return (
        <div className="App">
            <div className="m-auto w-[90%] md:w-[512px]">
                <div className="w-full mt-5 flex flex-row justify-between">
                    <input type="file" id="myImage" onChange={loadImg} hidden />
                    <label htmlFor="myImage" className="mx-auto button">Upload Image</label>
                    <button className="mx-auto button" onClick={saveImage}>Download</button>
                </div>
                <GreenText ref={gtContainer}>
                    <GreenText.Header />
                    <GreenText.Body imgData={imgData} />
                </GreenText>
            </div>
        </div>
    );
}

export default App;
