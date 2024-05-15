import { Button, Textarea } from '@nextui-org/react'
import React from 'react'

function Advertisement() {
    return (
        <div className='container m-auto py-10 px-3'>
            <span className='text-xl font-semibold'>Home Advertisement</span>
            <div className='pt-5 pb-10'>
                <Textarea
                    // label="Home Advertisement"
                    placeholder="Paste your advertisement iframe code"
                    className=""
                    description="This advertisement display on Home page."
                />
                <Button variant='bordered' className='bg-success-400 font-bold'>Update</Button>
            </div>
            <span className='text-xl font-semibold'>Download Advertisement</span>
            <div className='pt-5 mb-10'>
                <Textarea
                    // label="Download Advertisement"
                    placeholder="Paste your advertisement iframe code"
                    className=""
                    description="This advertisement display on download popup."
                />
                <Button variant='bordered' className='bg-success-400 font-bold'>Update</Button>
            </div>
        </div>
    )
}

export default Advertisement