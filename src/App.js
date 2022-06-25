import { useRef, useState } from 'react';
import './css/index.css';
import SlateEditor from './SlateEditor';

import exportAsImage from './utils/exportAsImage';

function App() {
    const gtContainer = useRef();
    const [imgData, setImgData] = useState({ src: 'none', size: 0, type: 'none' });
    const saveImage = () => exportAsImage(gtContainer.current, 'greentext');

    const loadImg = (event) => {
        const file = event.target.files[0];

        setImgData({
            src:  URL.createObjectURL(file),
            size: Math.ceil(file.size / 1000),
            type: file.type.split('/')[1].toUpperCase(),
        });
    }

    const getRandomInt = () => Math.floor((Math.random() * (99999999 - 11111111 + 1)) + 11111111);

    return (
        <div className="App">
            <div className="w-1/3 m-auto mt-5 flex flex-row justify-between">
                <input type="file" id="myImage" onChange={loadImg} hidden />
                <label for="myImage" className="mx-auto button">Upload Image</label>
                <button className="mx-auto button" onClick={saveImage}>Download</button>
            </div>
            <div className="flex flex-col text-[#810000] w-1/3 m-auto border border-[#d9bfb7] bg-[#f0e0d6] rounded-md" ref={gtContainer}>
                <div className="flex justify-between px-2 py-[2.5px] bg-[#e2d1c6] border-b border-[#d9bfb7] text-sm">
                    <span className="text-[#117743] font-bold">Anonymous</span>
                    <span>{new Date().toLocaleString()}</span>
                    <span>No.{getRandomInt()}</span>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-col w-1/4 p-2 border-r border-[#d9bfb7]">
                        <span><img className="rounded-md" width="128" src={imgData.src} alt="sample" /></span>
                        <span className="mt-2 text-center">{imgData.size} KB {imgData.type}</span>
                    </div>
                    <div className="flex flex-grow w-full p-2">
                        <SlateEditor />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;