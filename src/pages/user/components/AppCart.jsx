import React from 'react'
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

function AppCart({item}) {
    return (
        <div>
            <Card shadow="sm" isPressable onPress={() => console.log("item pressed")}>
                <CardBody className="overflow-visible p-0">
                    <div className='m-auto p-6'>
                        <Image
                            isBlurred
                            radius="lg"
                            width="100%"
                            alt={item?.name}
                            className="w-full max-w-[80px] md:max-w-[140px] object-cover h-[80px] md:h-[140px]"
                            src={item?.icon}
                        />
                        <div className=''>
                            <b className='text-sm md:text-lg text-wrap max-w-[80px] md:max-w-[140px]'>{item?.name}</b>
                            {/* <p className="text-default-500">{item.price}</p> */}
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default AppCart