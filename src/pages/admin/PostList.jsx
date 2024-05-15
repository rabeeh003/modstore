import React from 'react'
import { Tabs, Tab, Card, CardBody, CardHeader, Avatar } from "@nextui-org/react";
import { AppWindow, EllipsisVertical, LayoutGrid, Rss } from 'lucide-react';
import { Link } from 'react-router-dom';
import listData from '../../assets/Applist.json'
import ActionDrop from './components/ActionDrop';

function PostList() {
  
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
                {listData.map((data, index) => (
                  <div key={index} className='m-auto flex-none w-full px-4 md:max-w-[420px] '>
                    <Card>
                      <CardHeader className='flex justify-between'>
                        <Avatar src={data.img} radius='lg' className="w-20 h-20 text-large" />
                        <ActionDrop/>
                      </CardHeader>
                      <CardBody>
                        <span className='text-xl font-bold'>{data.title}</span>
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
          />
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