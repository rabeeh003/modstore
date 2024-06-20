import React, { useEffect, useState } from 'react'
import { Tabs, Tab, Card, CardBody, CardHeader, Avatar, CardFooter } from "@nextui-org/react";
import { AppWindow, EllipsisVertical, LayoutGrid, Rss } from 'lucide-react';
import { BaseUrl } from './utils/constData';
import Axios from './utils/axios';
import { error } from 'jodit/esm/core/helpers';
import ActionDropBlog from './components/ActionDropBlog';

// import ActionDrop from './components/ActionDrop';
const ActionDrop = React.lazy(() => import("./components/ActionDrop"));

function PostList() {
  const [apps, setApps] = useState()
  const [android, setAndroid] = useState()
  const [windows, setWindows] = useState()
  const [blog, setBlog] = useState()
  const [refech, setRefech] = useState(0)
  useEffect(() => {
    console.log("start to fetch data ");
    Axios.get(BaseUrl + "applications/").then((res) => {
      console.log("apps", res.data.results)
      setApps(res.data.results)
      const and = filterMethod(res.data.results, "android")
      const win = filterMethod(res.data.results, "windows")
      setWindows(win)
      setAndroid(and)
    }).catch((err) => console.log(err))
    Axios.get(BaseUrl + "blog/")
      .then(res => {
        console.log(res.data)
        setBlog(res.data.results)
      })
      .catch(err => console.error(err))
  }, [refech])
  function filterMethod(apps, type) {
    const data = apps.filter((data) => data.category == type)
    return data
  }
  return (
    <div className='grid justify-center'>
      <div className="m-auto flex w-full overflow-y-hidden flex-col">
        <Tabs aria-label="Options" color="success" >
          <Tab
            key="photos"
            title={
              <div className="flex items-center space-x-2">
                <AppWindow />
                <span>Android</span>
              </div>
            }
          >
            <div className='fixed w-full max-h-[87vh] overflow-scroll scroll-smooth scrollbar-hide left-0'>
              <div className="my-4 pb-8 container max-w-[1050px] m-auto flex flex-wrap gap-4 justify-center sm:justify-normal sm:px-5">
                {android?.map((data, index) => (
                  <div key={index} className=''>
                    <Card >
                      <CardHeader className='flex p-3 justify-between flex-wrap'>
                        <Avatar src={data.icon} radius='lg' className="w-20 h-20 text-large" />
                        <React.Suspense fallback={<>...</>}>
                          <ActionDrop data={data} setRefech={() => setRefech()} />
                        </React.Suspense>
                      </CardHeader>
                      <CardBody>
                        <span className='text-md font-sans font-semibold'>{data.name}</span>
                      </CardBody>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </Tab>
          <Tab
            key="music"
            title={
              <div className="flex items-center space-x-2">
                <LayoutGrid />
                <span>Windows</span>
              </div>
            }
          >
            <div className='fixed w-full max-h-[87vh] overflow-scroll scroll-smooth scrollbar-hide left-0'>
              <div className="my-4 pb-8 container max-w-[1050px] m-auto flex flex-wrap gap-4 justify-center sm:justify-normal sm:px-5">
                {windows?.map((data, index) => (
                  <div key={index} className=''>
                    <Card>
                      <CardHeader className='flex p-3 justify-between flex-wrap'>
                        <Avatar src={data.icon} radius='lg' className="w-20 h-20 text-large" />
                        <React.Suspense fallback={<>...</>}>
                          <ActionDrop data={data} setRefech={() => setRefech()} />
                        </React.Suspense>
                      </CardHeader>
                      <CardBody>
                        <span className='text-md font-sans font-semibold'>{data.name}</span>
                      </CardBody>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </Tab>
          <Tab
            key="videos"
            title={
              <div className="flex items-center space-x-2">
                <Rss />
                <span>Blogs</span>
              </div>
            }
          >
            <div className='fixed w-full max-h-[87vh] overflow-scroll scroll-smooth scrollbar-hide left-0'>
              <div className="my-4 pb-8 container max-w-[1050px] m-auto flex flex-wrap gap-4 justify-center sm:justify-normal sm:px-5">
                {blog?.map((data, index) => (
                  <div key={index} className=''>
                    <Card className='max-w-[315px] w-[400px]'>
                      <CardHeader className='flex justify-between p-3 flex-wrap'>
                        <Avatar src={data.image} radius='lg' className="max-h-80 h-full w-full text-large" />
                      </CardHeader>
                      <CardBody>
                        <span className='text-md font-sans h-7 overflow-clip font-semibold'>{data.head}</span>
                      </CardBody>
                      <CardFooter className='flex justify-center'>
                        <React.Suspense fallback={<>...</>}>
                          <ActionDropBlog data={data} setRefech={() => setRefech()} />
                        </React.Suspense>
                      </CardFooter>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </Tab>

        </Tabs>
      </div>
    </div>
  )
}

export default PostList