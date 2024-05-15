import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FileInputReact } from 'file-input-react'
import FileInput from "../FileInput";
import { Delete, DeleteIcon, LucideDelete, Trash } from "lucide-react";

function CreatePost({ isOpen, onClose, name, data }) {
    if (!isOpen) return null;

    const [appName, setAppName] = useState("");
    const [categories, setCategories] = useState([]);
    const [icon, setIcon] = useState(null);
    const [description, setDescription] = useState("");
    const [screenshots, setScreenshots] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleIconChange = (e) => {
        const file = e.target.files[0];
        setIcon(file);
    };
    const removeIcon = () => {
        setIcon(null);
    };

    useEffect(()=>{
        setAppName(data?.appName)
        // .... add all to that
    },[])
    return (
        <Modal isOpen={isOpen} onClose={onClose} isDismissable={false} size="xl" className="modal-overlay scrollbar-hide scroll-smooth" scrollBehavior="inside">
            {/* <div className="modal"> */}
            {/* <div className="modal-content"> */}
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <h2>{name}</h2>
                        </ModalHeader>
                        <ModalBody >
                            <div className="flex flex-col gap-3" >
                                <div className="flex w-full ">
                                    <Input type="text" label="App name" description="This also the heading of the post." />
                                </div>
                                <div className="sm:flex gap-2 justify-between">
                                    <Select
                                        label="Select an category"
                                        className="w-full"
                                        description="Select the category of the post."
                                    >
                                        <SelectItem value={"android"}>
                                            Android
                                        </SelectItem>
                                        <SelectItem value={"windows"}>
                                            windows
                                        </SelectItem>
                                    </Select>
                                </div>
                                <div className="flex-none">
                                    <label className="text-small">Icon Image:</label>
                                    {/* <FileInputReact type="file" id="icon" accept="image/*" className="max-w-xs w-full" onChange={handleIconChange} description="App icon." /> */}
                                    {icon ? (
                                        <div className="flex flex-col items-center">
                                            <img
                                                src={URL.createObjectURL(icon)}
                                                alt="Icon Preview"
                                                className="max-w-[100px] w-full rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                className="mt-2 text-red-500 bg-transparent border-none cursor-pointer hover:text-white hover:bg-purple-700"
                                                onClick={removeIcon}
                                            >
                                                <Trash/>
                                            </button>
                                        </div>
                                    ) : (
                                        <input
                                            type="file"
                                            id="icon"
                                            accept="image/*"
                                            className="max-w-xs w-full"
                                            onChange={handleIconChange}
                                        />
                                    )}
                                </div>
                                <div>
                                    <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)}></Textarea>
                                </div>
                                <div>
                                    <FileInput selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <button className="close-button" onClick={onClose}>
                                Close
                            </button>
                            <Button variant="shadow" className="bg-success-500" onClick={onClose}>
                                Submit
                            </Button>
                        </ModalFooter>
                    </>)}
            </ModalContent>
            {/* </div> */}
            {/* </div> */}
        </Modal>
    );
}
export default CreatePost;