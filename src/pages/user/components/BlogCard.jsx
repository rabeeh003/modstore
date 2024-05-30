import { Card, CardBody, Image } from '@nextui-org/react'
import React from 'react'
import { Link } from 'react-router-dom'

function BlogCard() {
    return (
        <div>
            <article className='max-w-[25vw]'>
                <Card shadow="sm" className='' isPressable onPress={() => console.log("item pressed")}>
                    <CardBody className="overflow-visible p-0">
                        <div className='m-auto p-4'>
                            <Image
                                isBlurred
                                radius="lg"
                                width="100%"
                                alt={""}
                                className="h-56 w-full object-cover"
                                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                            />
                            {/* <div className='truncate overflow-hidden text-ellipsis h-16 pt-2'> */}
                            <p className="mt-2 line-clamp-5 text-sm/relaxed text-gray-500 dark:text-gray-400">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus
                                pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis quidem,
                                mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius atque
                                dignissimos. Molestias explicabo corporis voluptatem?
                            </p>
                            {/* </div> */}
                            <Link to={''} className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
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

export default BlogCard