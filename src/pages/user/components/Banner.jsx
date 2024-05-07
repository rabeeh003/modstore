import React from 'react'
import { Input } from "@nextui-org/react";
import { SearchIcon } from 'lucide-react';

function Banner() {
    return (
        <div
            className="w-full h-64 md:h-[400px] "
            style={{
                backgroundImage: "url('https://wallpapercave.com/wp/wp11148267.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>

            <div className='w-3/4 m-auto flex flex-col justify-center items-center h-full'>
                <div className='relative left-0 right-0'>
            <h1 className="z-10 fixed blur-lg  text-white bg-clip-text text-3xl font-extrabold sm:text-5xl">Unlock Limitless <br /> Possibilities Here</h1>
            <h1 className="z-20  text-white stroke-black stroke-2 text-center bg-clip-text text-3xl font-extrabold sm:text-5xl">Unlock Limitless <br /> Possibilities Here</h1>

                </div>

                <Input
                    label="Search"
                    // isClearable
                    radius="lg"
                    classNames={{
                        label: "text-black/50 dark:text-white/90",
                        input: [
                            "bg-transparent",
                            "text-black/90 dark:text-white/90",
                            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                        ],
                        innerWrapper: "bg-transparent",
                        inputWrapper: [
                            "shadow-xl",
                            "bg-default-200/50",
                            "dark:bg-default/60",
                            "backdrop-blur-xl",
                            "backdrop-saturate-200",
                            "hover:bg-default-200/70",
                            "dark:hover:bg-default/70",
                            "group-data-[focused=true]:bg-default-200/50",
                            "dark:group-data-[focused=true]:bg-default/60",
                            "!cursor-text",
                        ],
                    }}
                    placeholder="Type to search..."
                    startContent={
                        <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                    }
                />
            </div>
        </div>
    )
}

export default Banner