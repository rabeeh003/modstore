import React, { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { EllipsisVertical } from "lucide-react";
import CreatePost from "./post/CreatePost.jsx";

export default function ParentComponent() {
    const [editOpen, setEditOpen] = React.useState(false);

    const handleEditClick = () => {
        setEditOpen(true);
    };

    const handleCloseEdit = () => {
        setEditOpen(false);
    };

    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <EllipsisVertical />
                </DropdownTrigger>
                <DropdownMenu aria-label="Action event example">
                    <DropdownItem key="view">View</DropdownItem>
                    <DropdownItem key="edit" onClick={handleEditClick}>Edit</DropdownItem>
                    <DropdownItem key="delete">Delete</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <CreatePost name="Edit post" isOpen={editOpen} onClose={handleCloseEdit} data={''} />
        </>
    );
}
