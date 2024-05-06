import React from 'react'
import { Avatar } from "@nextui-org/react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

function Home() {
    const list = [
        {
            title: "Orange",
            img: "/images/fruit-1.jpeg",
            price: "$5.50",
        },
        {
            title: "Tangerine",
            img: "/images/fruit-2.jpeg",
            price: "$3.00",
        },
        {
            title: "Raspberry",
            img: "/images/fruit-3.jpeg",
            price: "$10.00",
        },
        {
            title: "Lemon",
            img: "/images/fruit-4.jpeg",
            price: "$5.30",
        },
        {
            title: "Avocado",
            img: "/images/fruit-5.jpeg",
            price: "$15.70",
        },
        {
            title: "Lemon 2",
            img: "/images/fruit-6.jpeg",
            price: "$8.00",
        },
        {
            title: "Banana",
            img: "/images/fruit-7.jpeg",
            price: "$7.50",
        },
        {
            title: "Watermelon",
            img: "/images/fruit-8.jpeg",
            price: "$12.20",
        },
    ];

    return (
        <>
            <div className="container mx-auto gap-2 grid grid-cols-2 sm:grid-cols-4">
                {list.map((item, index) => (
                    <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
                        <CardBody className="overflow-visible p-0">
                            <Image
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                alt={item.title}
                                className="w-full object-cover h-[140px]"
                                src={item.img}
                            />
                        </CardBody>
                        <CardFooter className="text-small justify-between">
                            <b>{item.title}</b>
                            <p className="text-default-500">{item.price}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <div className="flex gap-4 items-center">
                <Avatar isBordered color='primary' radius="full" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                <Avatar isBordered color='warning' radius="lg" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                <Avatar isBordered color='secondary' radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                <Avatar isBordered color='success' radius="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
            </div>
        </>
    );
}

export default Home