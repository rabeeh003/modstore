import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import FileInput from "../FileInput";
import { Trash } from "lucide-react";
import Axios from "../../utils/axios";
import Labels from "./Labels";
import { BaseUrl } from "../../utils/constData";
import Notification, { notify } from "../../utils/Notification";
import CreateFileInput from "../CreateFileInput";

function CreatePost({ isOpen, onClose, name, data,setRefech }) {
    // if (!isOpen) return null;


    const [appName, setAppName] = useState("");
    const [category, setCategory] = useState("");
    const [icon, setIcon] = useState(null);
    const [description, setDescription] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [groupSelected, setGroupSelected] = useState([]);

    const handleIconChange = (e) => {
        const file = e.target.files[0];
        setIcon(file);
    };
    const removeIcon = () => {
        setIcon(null);
    };

    useEffect(() => {
        if (data) {
            setAppName(data.appName || "");
            setCategory(data.category || "");
            setDescription(data.description || "");
            setGroupSelected(data.labels || []);
        }
    }, [data]);

    const create = () => {
        const formData = new FormData();
        formData.append("name", appName);
        formData.append("category", category);

        if (icon) {
            formData.append("icon", icon);
        }

        formData.append("description", description);

        selectedFiles.forEach((file, index) => {
            formData.append(`uploaded_images[${index}]`, file);
        });

        groupSelected.forEach((labelId) => {
            formData.append('labels', labelId);
        });

        Axios.post(BaseUrl + 'applications/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                notify('s', "Post created")
                setRefech((pre)=>pre++)
                console.log(response.data);
                onClose()
            })
            .catch((error) => {
                console.error(error);
                notify('e', error.message)
            });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isDismissable={false} size="xl" className="modal-overlay scrollbar-hide scroll-smooth" scrollBehavior="inside">
            <Notification/>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <h2>Create app</h2>
                        </ModalHeader>
                        <ModalBody >
                            <div className="flex flex-col gap-3" >
                                <div className="flex w-full ">
                                    <Input type="text" label="App name" value={appName} onChange={(e) => setAppName(e.target.value)} description="This also the heading of the post." />
                                </div>
                                <div className="sm:flex gap-2 justify-between">
                                    <Select
                                        label="Select a category"
                                        className="w-full"
                                        description="Select the category of the post."
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <SelectItem key="android" value="android">
                                            Android
                                        </SelectItem>
                                        <SelectItem key="windows" value="windows">
                                            Windows
                                        </SelectItem>
                                    </Select>
                                </div>
                                <div className="flex-none">
                                    <Labels groupSelected={groupSelected} setGroupSelected={setGroupSelected} />
                                </div>
                                <div className="flex-none">
                                    <label className="text-small">Icon Image:</label>
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
                                                <Trash />
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
                                    <CreateFileInput selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <button className="close-button" onClick={onClose}>
                                Close
                            </button>
                            <Button variant="shadow" className="bg-success-500" onClick={create}>
                                Submit
                            </Button>
                        </ModalFooter>
                    </>)}
            </ModalContent>
        </Modal>
    );
}
export default CreatePost;
