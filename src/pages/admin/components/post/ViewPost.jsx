import { Image, Input, Modal, ModalBody, ModalContent, ModalHeader, Textarea } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Axios from "../../utils/axios";
import { BaseUrl } from "../../utils/constData";

function ViewPost({ isOpen, onClose, data }) {
    const [labels, setLabels] = useState([])

    useEffect(() => {
        Axios.get(BaseUrl + 'labels/')
            .then((res) => {
                console.log("labels : ", res.data);
                const filteredLabels = res.data.results.filter(label => data.labels.includes(label.id));
                setLabels(filteredLabels);
            })
            .catch((error) => {
                console.error("There was an error fetching the labels!", error);
            });
    }, [data, BaseUrl]);


    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" className="modal-overlay scrollbar-hide scroll-smooth" scrollBehavior="inside">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <h2>{data.name}</h2>
                        </ModalHeader>
                        <ModalBody className="" >
                            <div className="w-full">
                                <Image width="100px" className="pb-3 m-auto" src={data.icon} />
                                <div>
                                    {labels?.map((label) => (
                                        <span key={label.id} className='text-sm border-2 py-1 font-medium md:py-0 px-2 mr-2 rounded-2xl'>{label.name}</span>
                                    ))}
                                </div>
                                <div className="flex flex-col py-3 gap-2">
                                    <Input type="text" disabled label="Category" value={data.category} />
                                    <Input type="text" disabled label="Download type" value={data.dype == true ? "File Link" : "Page Link"} />
                                    <Textarea disabled label="Downlad data" value={data.download} />
                                    <Textarea disabled label="Description" value={data.description} />
                                </div>
                            </div>
                        </ModalBody>
                    </>)}
            </ModalContent>
        </Modal>
    );
}
export default ViewPost;
