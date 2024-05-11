import { Button, Image } from '@nextui-org/react'
import { Download } from 'lucide-react'
import React from 'react'

function PostPage() {
    return (
        <div className='container max-w-[1200px] mx-auto px-5 sm:px-10 mt-7'>
            <div className='sm:flex'>
                <div className='sm:sticky top-24 max-h-[350px] grid justify-center sm:min-w-[200px] md:min-w-[300px]'>
                    <Image
                        isBlurred
                        src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                        alt="NextUI Album Cover"
                        className="m-5 sm:m-[50px] w-[100px]  md:w-[200px]"
                    />
                    <div className="flex items-center justify-center">
                        {/* <Button isIconOnly color="danger" aria-label="Like">
                            <Share2Icon />
                        </Button> */}
                        <Button color="success" endContent={<Download />}>
                            Download
                        </Button>
                    </div>
                </div>
                <div>
                    <h1 className='font-mono font-semibold text-2xl sm:text-4xl pt-4 sm:pl-10'>Download My Little Universe (MOD, Unlimited Resources) 2.10.0 free on android</h1>
                    <p></p>
                </div>
            </div>
        </div>
    )
}

export default PostPage