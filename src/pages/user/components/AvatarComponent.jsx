import React from 'react'
import { Avatar, AvatarGroup } from "@nextui-org/react";

function AvatarComponent({title="Social",max=3, total=5}) {
    return (
        <div className='pb-8'>
            <span className='text-lg font-bold'>{title}</span>
            <div className="flex pt-4 gap-4 items-center">
                <AvatarGroup isBordered radius='md' max={max} total={total}>
                    <Avatar isBordered color='primary' radius="md" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                    <Avatar isBordered color='warning' radius="md" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                    <Avatar isBordered color='secondary' radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                    <Avatar isBordered color='success' radius="md" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                    <Avatar isBordered color='primary' radius="md" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                </AvatarGroup>
            </div>
        </div>
    )
}

export default AvatarComponent