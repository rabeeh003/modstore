import React, { useRef } from "react";

const CreateFileInput = ({ selectedFiles, setSelectedFiles }) => {
    const inputRef = useRef();

    const handleOnChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            const newFiles = files.slice(0, 5 - selectedFiles.length);
            setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles].slice(0, 5));
        }
    };

    const onChooseFile = (event) => {
        event.preventDefault();
        inputRef.current.click();
    };

    const removeFile = (index) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col items-center">
            {selectedFiles.length < 5 ? (
                <>
                    <input
                        type="file"
                        ref={inputRef}
                        onChange={handleOnChange}
                        style={{ display: "none" }}
                        accept="image/*"
                        multiple
                    />
                    <button
                        type="button"
                        className="w-64 h-36 text-lg font-medium flex flex-col items-center justify-center gap-4 text-green-700 bg-white border-2 border-dashed border-green-700 rounded-xl cursor-pointer transition-all duration-300 ease-in-out hover:bg-white hover:text-green-700"
                        onClick={onChooseFile}
                    >
                        <span className="material-symbols-rounded text-3xl w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-700">
                            upload
                        </span>
                        Upload Images
                    </button>
                    <p className="text-[12px] text-gray-400">max image count 5.</p>
                </>
            ) : null}

            {selectedFiles.length > 0 && (
                <div className="mt-5 w-full flex flex-col items-center">
                    {selectedFiles.map((file, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between bg-green-100 border border-green-200 rounded-xl mt-2 p-4 w-full max-w-lg"
                        >
                            <div className="flex items-center">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="w-16 h-16 object-cover rounded-lg mr-4"
                                />
                                <p className="text-sm font-medium ml-4">{file.name}</p>
                            </div>
                            <button
                                type="button"
                                className="w-10 h-10 flex items-center justify-center text-red-700 bg-transparent border-none rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:text-white hover:bg-red-700"
                                onClick={() => removeFile(index)}
                            >
                                <span className="material-symbols-rounded">delete</span>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CreateFileInput;
