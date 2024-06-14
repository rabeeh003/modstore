import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { EllipsisVertical } from "lucide-react";
import Axios from "../utils/axios.jsx";
import { BaseUrl } from "../utils/constData.jsx";
import { useNavigate } from "react-router-dom";

export default function ActionDropBlog({ data }) {
    const navigate = useNavigate()

    const deleteItem = () => {
        Axios.delete(BaseUrl + `blog/${data.id}/`)
            .then((res) => {
                console.log(res.data)
            }).catch(err => console.error(err))
    }

    return (
        <>
            {/* <Dropdown>
                <DropdownTrigger>
                    <EllipsisVertical />
                </DropdownTrigger>
                <DropdownMenu aria-label="Action event example">
                    <DropdownItem key="view" onClick={() => navigate('/admin/create-blog', { state: { placeholder: data, view: true } })}>View</DropdownItem>
                    <DropdownItem key="edit" onClick={() => navigate('/admin/create-blog', { state: { placeholder: data } })}>Edit</DropdownItem>
                    <DropdownItem key="delete" onClick={deleteItem}>Delete</DropdownItem>
                </DropdownMenu>
            </Dropdown> */}
            <div className="flex flex-wrap gap-1 m-3">
                <Button variant="faded" className="min-w-0 p-3" color="success" onClick={() => navigate('/admin/create-blog', { state: { placeholder: data, view: true } })}>View</Button>
                <Button variant="faded" className="min-w-0 p-3" color="warning" onClick={() => navigate('/admin/create-blog', { state: { placeholder: data } })}>Edit</Button>
                <Button variant="faded" className="min-w-0 p-3" color="danger" onClick={deleteItem}>Delete</Button>
            </div>
        </>
    );
}
