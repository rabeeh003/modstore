import React, { useEffect, useState } from 'react'
import { Tabs, Tab, Card, CardBody, CardHeader, Avatar } from "@nextui-org/react";
import { AppWindow, EllipsisVertical, LayoutGrid, Rss } from 'lucide-react';
import { BaseUrl } from './utils/constData';
import Axios from './utils/axios';

// import ActionDrop from './components/ActionDrop';
const ActionDrop = React.lazy(() => import("./components/ActionDrop"));

function PostList() {
  const [apps, setApps] = useState()
  const [android, setAndroid] = useState()
  const [windows, setWindows] = useState()
  useEffect(() => {
    console.log("start to fetch data ");
    Axios.get(BaseUrl + "applications/").then((res) => {
      console.log("apps", res.data)
      setApps(res.data)
      const and = filterMethod(res.data, "android")
      const win = filterMethod(res.data, "windows")
      setWindows(win)
      setAndroid(and)
    }).catch((err) => console.log(err))
  }, [])
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
              <div className="container m-auto gap-3 py-5 pb-8 flex flex-wrap">
                {android?.map((data, index) => (
                  <div key={index} className='m-auto flex-none w-full px-4 md:max-w-[420px] '>
                    <Card>
                      <CardHeader className='flex justify-between'>
                        <Avatar src={data.icon} radius='lg' className="w-20 h-20 text-large" />
                        <React.Suspense fallback={<>...</>}> 
                          <ActionDrop data={data} />
                        </React.Suspense>
                      </CardHeader>
                      <CardBody>
                        <span className='text-xl font-bold'>{data.name}</span>
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
              <div className="container m-auto gap-3 py-5 pb-8 flex flex-wrap">
                {windows?.map((data, index) => (
                  <div key={index} className='m-auto flex-none w-full px-4 md:max-w-[420px] '>
                    <Card>
                      <CardHeader className='flex justify-between'>
                        <Avatar src={data.icon} radius='lg' className="w-20 h-20 text-large" />
                        <React.Suspense fallback={<>...</>}> 
                        <ActionDrop data={data}/>
                        </React.Suspense>
                      </CardHeader>
                      <CardBody>
                        <span className='text-xl font-bold'>{data.name}</span>
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
          />
        </Tabs>
      </div>
    </div>
  )
}

export default PostList