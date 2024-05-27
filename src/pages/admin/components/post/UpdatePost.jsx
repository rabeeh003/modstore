import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import FileInput from "../FileInput";
import { Trash } from "lucide-react";
import Axios from "../../utils/axios";
import Labels from "./Labels";
import { BaseUrl } from "../../utils/constData";
import Notification, { notify } from "../../utils/Notification";


function UpdatePost({ isOpen, onClose, name, data }) {
    // if (!isOpen) return null;
    console.log("data to edit : ", data);
    // const notify = (type, data) => {
    //     if (type == "s") {
    //         toast.success(data, {
    //             position: "top-right",
    //             autoClose: 3000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //         }
    //         );
    //         return
    //     }
    //     if (type == "e") {
    //         console.log("working");
    //         toast.error(`error : ${data}`,
    //             {
    //                 position: "top-right",
    //                 autoClose: 3000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //             }
    //         );
    //         return
    //     }
    // };
    const [appName, setAppName] = useState("");
    const [category, setCategory] = useState("");
    const [icon, setIcon] = useState(null);
    const [dataIcon, setDataIcon] = useState(null);
    const [deleteIcon, setDeleteIcon] = useState(null);
    const [description, setDescription] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedFilesUrl, setSelectedFilesUrl] = useState([]);
    const [groupSelected, setGroupSelected] = useState([]);

    const handleIconChange = (e) => {
        const file = e.target.files[0];
        setIcon(file);
    };
    const removeIcon = () => {
        setIcon(null);
    };
    const delIcon = () => {
        setDeleteIcon(dataIcon);
        setDataIcon(null)
    };

    useEffect(() => {
        if (data) {
            setAppName(data.name || "");
            setCategory(data.category || "");
            setDescription(data.description || "");
            setGroupSelected(data.labels || []);
            setDataIcon(data.icon || null);
        }
        Axios.get(BaseUrl + `ref/img/?application=${data.id}`).then(
            (res) => {
                console.log(res.data)
                setSelectedFilesUrl(res.data)
            }
        ).catch((err) => console.error(err))
    }, [data]);

    const update = () => {
        const formData = new FormData();
        if (data.name !== appName){
            formData.append("name", appName);
        }
        if (data.category !== category){
            formData.append("category", category);
        }

        if (icon) {
            formData.append("icon", icon);
        }
        if (data.description !== description){
            formData.append("description", description);
        }

        // selectedFiles?.forEach((file, index) => {
        //     formData.append(`uploaded_images[${index}]`, file);
        // });

        groupSelected.forEach((labelId) => {
            formData.append('labels', labelId);
        });

        Axios.patch(BaseUrl + `applications/${data.id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                notify('s', "Post updated")
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
            <Notification />
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <h2>{name}</h2>
                        </ModalHeader>
                        <ModalBody >
                            <div className="flex flex-col gap-3" >
                                <div className="flex w-full ">
                                    <Input type="text" label="App name" value={appName} onChange={(e) => setAppName(e.target.value)} description="This also the heading of the post." />
                                </div>
                                <div className="sm:flex gap-2 justify-between">
                                    <Select
                                        // label={category}
                                        className="w-full"
                                        description="Select the category of the post."
                                        value={category}
                                        // defaultSelectedKeys={category}
                                        // defaultOpen={category}
                                        onChange={(e) => {
                                            console.log(category);
                                            setCategory(e.target.value)
                                            console.log(e.target.value, " : value.");
                                        }}
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
                                    {dataIcon ? (
                                        <div className="flex flex-col items-center">
                                            <img
                                                src={dataIcon}
                                                alt="Icon Preview"
                                                className="max-w-[100px] w-full rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                className="mt-2 text-red-500 bg-transparent border-none cursor-pointer hover:text-white hover:bg-purple-700"
                                                onClick={delIcon}
                                            >
                                                <Trash />
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
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
                                    )}
                                </div>
                                <div>
                                    <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)}></Textarea>
                                </div>
                                <div>
                                    <FileInput idd={data.id} selectedFilesUrl={selectedFilesUrl} setSelectedFilesUrl={setSelectedFilesUrl} />
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <button className="close-button" onClick={onClose}>
                                Close
                            </button>
                            <Button variant="shadow" className="bg-success-500" onClick={update}>
                                Submit
                            </Button>
                        </ModalFooter>
                    </>)}
            </ModalContent>
        </Modal>
    );
}
export default UpdatePost;
