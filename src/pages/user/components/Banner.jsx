import { Button, Input } from "@nextui-org/react";
import { SearchIcon } from 'lucide-react';

function Banner({ searchQuery, setSearchQuery, filtering }) {
    return (
        <div
            className="w-full h-64 md:h-[400px] "
            style={{
                backgroundImage: "url('https://wallpapercave.com/wp/wp11148267.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>

            <div className='w-4/4 px-2 md:w-2/4 m-auto flex flex-col justify-center items-center h-full'>
                <div className='relative left-0 right-0'>
                    <h1 className="z-10  blur-lg  text-white bg-clip-text text-3xl font-extrabold sm:text-5xl">Unlock Limitless <br /> Possibilities Here</h1>
                    <h1 className="z-20 text-white stroke-black stroke-2 text-center bg-clip-text text-3xl font-extrabold sm:text-5xl">Unlock Limitless <br /> Possibilities Here</h1>

                </div>
                <div className='flex items-center mt-4 gap-1 justify-center'>
                    
                    <Input
                        // label="Search"
                        isClearable
                        className='flex-auto border-2 rounded-xl dark:border-green-400'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        radius="xl"
                        classNames={{
                            label: "text-black/50 dark:text-white/90",
                            input: [
                                "bg-transparent",
                                "text-black/90 dark:text-white/90",
                                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                "h-20"
                            ],
                            innerWrapper: "bg-transparent",
                            inputWrapper: [
                                "px-3 py-5",
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
                                // "mt-4",
                            ],
                        }}
                        placeholder="Find your application..."
                    // startContent={
                    // }
                    />
                    <Button onClick={() => filtering()} className='border-2 dark:border-green-400 rounded-xl w-fit m-auto !cursor-text shadow-xl bg-default-200/50 dark:bg-default/60 backdrop-blur-xl hover:bg-default-200/70 dark:hover:bg-default/70 group-data-[focused=true]:bg-default-200/50 dark:group-data-[focused=true]:bg-default/60 '>
                        <SearchIcon className="text-white dark:text-green-400" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Banner