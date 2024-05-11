import React, { useState } from 'react'
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function AppSlider({list, title, idd}) {
    
    const rightMove = () => {
        var slider = document.getElementById(idd);
        slider.scrollLeft = slider.scrollLeft + 500
    }
    const leftMove = () => {
        var slider = document.getElementById(idd);
        slider.scrollLeft = slider.scrollLeft - 500
    }

    const [showButtons, setShowButtons] = useState(false)
    console.log("showButtons:", showButtons);
    return (
        <div>
            <span className='text-3xl font-bold'>{title}</span>
            <div className="flex gap-3 mt-4 align-middle items-center justify-between relative">
                <button className='bg-green-400 p-2 hidden sm:flex rounded-full font-bold absolute top-[40%] z-20 -left-3' onClick={leftMove}><ArrowLeft /></button>
                <div id={idd} className='h-full flex gap-5 md:gap-10 w-full p-3 overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide md:scrollbar-default' >
                    {list.map((item, index) => (
                        <Link to={'/appid'} className='max-w-[180px] flex-none' >
                        <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
                            <CardBody className="overflow-visible p-0">
                                <div className='m-auto p-6'>
                                    <Image
                                        isBlurred
                                        radius="lg"
                                        width="100%"
                                        alt={item.title}
                                        className="w-full max-w-[80px] md:max-w-[140px] object-cover h-[80px] md:h-[140px]"
                                        src={item.img}
                                    />
                                    <div className=''>
                                        <b className='text-md md:text-lg'>{item.title}</b>
                                        <p className="text-default-500">{item.price}</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Link>
                    ))}
                </div>
                <button className='bg-green-400 p-2 hidden sm:flex rounded-full font-bold absolute top-[40%] z-10 -right-5' onClick={rightMove}><ArrowRight /></button>
            </div>
            </div>
    )
}

export default AppSlider