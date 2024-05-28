import { Image, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Axios from "../../utils/axios";
import { BaseUrl } from "../../utils/constData";

function ViewPost({ isOpen, onClose, data }) {
    const [labels, setLabels] = useState([])
    // useEffect(() => {
    //     Axios.get(BaseUrl + 'labels/').then((res) => {
    //         console.log("labels : ", res.data);
    //         setLabels(res.data)
    //     })
    // }, [data]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" className="modal-overlay scrollbar-hide scroll-smooth" scrollBehavior="inside">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <h2>{data.name}</h2>
                        </ModalHeader>
                        <ModalBody >
                            <div>
                                <Image width="100px" src={data.icon}/>
                                {/* {data.labels?.map((data)=>(
                                    <span>{labels[data.id]}</span>
                                ))} */}
                            </div>
                        </ModalBody>
                    </>)}
            </ModalContent>
        </Modal>
    );
}
export default ViewPost;
