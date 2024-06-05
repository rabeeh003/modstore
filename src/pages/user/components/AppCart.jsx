import React from 'react'
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';


function AppCart({ item }) {
    const navigate = useNavigate()
    return (
        <div>
            <Card shadow="sm" className='min-w-[150px]' isPressable onPress={() => navigate(`/apps/${item.id}`, { state: { appData: item } })}>
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
                        <div className='truncate overflow-hidden text-ellipsis h-7 text-wrap'>
                            {
                                item?.labels?.map((data)=>(
                                    <span key={data.id} className='pr-2'>{data.name}</span>
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