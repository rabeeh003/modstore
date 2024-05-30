import React from 'react'
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";


function AppCart({ item }) {
    
    return (
        <div>
            <Card shadow="sm" className='min-w-[150px]' isPressable onPress={() => console.log("item pressed")}>
                <CardBody className="overflow-visible p-0">
                    <div className='m-auto p-4'>
                        <Image
                            isBlurred
                            radius="lg"
                            width="100%"
                            alt={item?.name}
                            className="w-full sm:w-[150px] object-cover h-[150px]  min-[350px]:w-[150px]"
                            src={item?.icon}
                        />
                        <div className='truncate overflow-hidden text-ellipsis h-16 pt-2'>
                            <b className='capitalize text-md md:text-lg text-wrap '>{item?.name}</b>
                            {/* <p className="text-default-500">{item.price}</p> */}
                        </div>
                        <div>
                            {
                                item.labels.map((data)=>(
                                    <p>{data.name}</p>
                                ))
                            }
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default AppCart