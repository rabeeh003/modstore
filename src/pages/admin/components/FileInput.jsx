import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Axios from "../utils/axios";
import { BaseUrl } from "../utils/constData";

const FileInput = ({  selectedFilesUrl, setSelectedFilesUrl, idd }) => {
    const inputRef = useRef(null);
    const [newFiles, setNewFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]); 
    const [placeholdersCount, setPlaceholdersCount] = useState([]);
    
    const maxImages = 5;

    useEffect(() => {
        // Recalculate the placeholders count whenever existingImages or newFiles changes
        setPlaceholdersCount(maxImages - (selectedFilesUrl.length + newFiles.length));
        console.log("new files url :",newFiles);
        console.log("new files :",selectedFiles);
    }, [selectedFilesUrl, newFiles]);

    const handleOnChange = async (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            const newFile = files[0];
            // const newFileUrl = URL.createObjectURL(newFile);
            // if (selectedFilesUrl.length + newFiles.length < maxImages) {
            //     setSelectedFiles((prevFiles) => [...prevFiles, newFile]);
            //     setNewFiles((prevUrls) => [...prevUrls, newFileUrl]);
            // }
            const submitData = new FormData()
            submitData.append("image",newFile)
            submitData.append("application",idd)
            try {
                console.log("start to update:");
                Axios.post(BaseUrl+`/ref/img/`,submitData).then((res)=>{
                    setSelectedFilesUrl((prevFiles) => [...prevFiles, res.data]);
                    console.log("image updated : ",res.data);
                })
                console.log("DON DON DON DONs");
            } catch (error) {
                console.error("Error deleting image:", error);
            }
        }
    };

    const onChooseFile = (event) => {
        // event.preventDefault();
        inputRef.current.click();
    };

    const removeFile = async (index,image, type) => {
        if (type === "existing") {
            const img = selectedFilesUrl[index];
            try {
                await Axios.delete(BaseUrl+`/ref/img/${image.id}/`);
                setSelectedFilesUrl((prevFiles) => prevFiles.filter((_, i) => i !== index));
            } catch (error) {
                console.error("Error deleting image:", error);
            }
        } else {
            setNewFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
            setSelectedFiles((prevUrls) => prevUrls.filter((_, i) => i !== index));
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="mt-5 w-full flex flex-col items-center">
                {selectedFilesUrl.map((image, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between bg-green-100 border border-green-200 rounded-xl mt-2 p-4 w-full max-w-lg"
                    >
                        <div className="flex items-center">
                            <img
                                src={image.image} // assuming image object has a url property
                                alt={image.id} // assuming image object has a name property
                                className="w-16 h-16 object-cover rounded-lg mr-4"
                            />
                            <p className="text-sm font-medium ml-4">{image.name}</p>
                        </div>
                        <button
                            type="button"
                            className="w-10 h-10 flex items-center justify-center text-red-700 bg-transparent border-none rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:text-white hover:bg-red-700"
                            onClick={() => removeFile(index,image, "existing")}
                        >
                            <span className="material-symbols-rounded">delete</span>
                        </button>
                    </div>
                ))}

                {newFiles?.map((file, index) => (
                    <div
                        key={selectedFilesUrl.length + index}
                        className="flex items-center justify-between bg-green-100 border border-green-200 rounded-xl mt-2 p-4 w-full max-w-lg"
                    >
                        <div className="flex items-center">
                            <img
                                src={newFiles[index]}
                                alt={index}
                                className="w-16 h-16 object-cover rounded-lg mr-4"
                            />
                            <p className="text-sm font-medium ml-4">{file.name}</p>
                        </div>
                        <button
                            type="button"
                            className="w-10 h-10 flex items-center justify-center text-red-700 bg-transparent border-none rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:text-white hover:bg-red-700"
                            onClick={() => removeFile(index, "new")}
                        >
                            <span className="material-symbols-rounded">delete</span>
                        </button>
                    </div>
                ))}

                {selectedFilesUrl.length + newFiles.length < maxImages && (
                    <div
                        className="flex items-center justify-between bg-white border border-dashed border-green-700 rounded-xl mt-2 p-4 w-full max-w-lg cursor-pointer"
                        onClick={onChooseFile}
                    >
                        <input
                            type="file"
                            ref={inputRef}
                            onChange={handleOnChange}
                            style={{ display: "none" }}
                            accept="image/*"
                        />
                        <span className="material-symbols-rounded text-3xl w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-700">
                            add
                        </span>
                        <p className="text-sm font-medium ml-4">Add Image</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileInput;
