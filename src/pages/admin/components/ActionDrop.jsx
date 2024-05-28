import React, { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { EllipsisVertical } from "lucide-react";
import CreatePost from "./post/CreatePost.jsx";
import UpdatePost from "./post/UpdatePost.jsx";
import Axios from "../utils/axios.jsx";
import { BaseUrl } from "../utils/constData.jsx";
import ViewPost from "./post/ViewPost.jsx";

export default function ParentComponent({data, setRefech}) {
    const [editOpen, setEditOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);

    const handleEditClick = () => {
        setEditOpen(true);
    };

    const handleCloseEdit = () => {
        setEditOpen(false);
    };

    const deleteItem = ()=>{
        Axios.delete(BaseUrl+`applications/${data.id}/`).then((res)=>{
            console.log("res of delete :"+res);
            setRefech((pre)=>pre++)
        }).catch((err)=>console.error(err))
    }

    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <EllipsisVertical />
                </DropdownTrigger>
                <DropdownMenu aria-label="Action event example">
                    <DropdownItem key="view" onClick={()=>setViewOpen(true)}>View</DropdownItem>
                    <DropdownItem key="edit" onClick={handleEditClick}>Edit</DropdownItem>
                    <DropdownItem key="delete" onClick={deleteItem}>Delete</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <UpdatePost name="Edit post" isOpen={editOpen} onClose={handleCloseEdit} data={data} setRefech={setRefech} />
            <ViewPost isOpen={viewOpen} onClose={()=>setViewOpen(false)} data={data} />
        </>
    );
}
