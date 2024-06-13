import { Card, CardBody, Image } from '@nextui-org/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SuggestBlogCard({data, setData}) {
    const navigate = useNavigate()
    const navi = ()=>{
        if (setData) {
            setData(data)
        }
        navigate(`/blog/${data.id}`, {state:{data:data}})
    }
    return (
        <div>
            <article className='max-w-[85vw] w-[500px] sm:max-w-[300px] m-auto'>
                <Card shadow="sm" className='w-full h-full p-0' isPressable onPress={navi}>
                    <CardBody className="overflow-visible p-0">
                        <div className='m-auto p-4 w-full'>
                            <Image
                                isBlurred
                                radius="lg"
                                width="100%"
                                alt={""}
                                className="h-40 w-full object-cover"
                                // src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                src={data.image}
                            />
                            {/* <div className='truncate overflow-hidden text-ellipsis h-16 pt-2'> */}
                            <h1 className="mt-2 line-clamp-2 text-md/relaxed text-gray-500 dark:text-gray-400 font-semibold">
                                {data.head}
                            </h1>
                            {/* </div> */}
                            <Link to={''} className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-green-600">
                                Find out more

                                <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                                    &rarr;
                                </span>
                            </Link>
                        </div>
                    </CardBody>
                </Card>
            </article>
        </div>
    )
}

export default SuggestBlogCard