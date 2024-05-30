import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Input, Spacer, Button, Image } from '@nextui-org/react';
import { Form, useLocation, useNavigate } from 'react-router-dom';
import { FileIcon, ImageUp, Trash2, UserIcon } from 'lucide-react';
import Axios from './utils/axios';
import { BaseUrl } from './utils/constData';
import { error } from 'jodit/esm/core/helpers';


function CreateBlog() {
    const location = useLocation();
    const { placeholder, view } = location.state || {};

    const navigate = useNavigate()
    const editor = useRef(null);
    const fileInputRef = useRef(null)
    const [content, setContent] = useState('');
    const [heading, setHeading] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [preview, setPreview] = useState(view | false);

    useEffect(() => {
        if (placeholder) {
            setContent(placeholder.data)
            setHeading(placeholder.head)
        }
    }, [])

    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Start typing...',
        height: 'calc(100vh - 180px)',
    }), [placeholder]);

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log(file);
            setThumbnail(file);
        }
    };

    const handleDeleteThumbnail = () => {
        setThumbnail(null);
        fileInputRef.current.value = null;
    };

    const create = () => {
        const data = new FormData()
        data.append("head", heading)
        data.append("image", thumbnail)
        console.log(typeof (thumbnail), thumbnail);
        data.append("data", content)
        Axios.post(BaseUrl + "blog/create/", data).then((res) => {
            console.log(res.data)
            navigate(-1)
        }).catch(err => console.error(err))
    }

    const update = () => {
        const data = new FormData()
        let ifup = false
        if (placeholder.head != heading) {
            data.append("head", heading)
            ifup = true
        }
        if (thumbnail) {
            data.append("image", thumbnail)
            ifup = true
        }
        if (content != placeholder.data) {
            data.append("data", content)
            ifup = true
        }
        if (ifup == true) {
            Axios.patch(BaseUrl + `blog/${placeholder.id}/`, data).then((res) => {
                console.log(res.data)
                navigate(-1)
            }).catch(err => console.error(err))
        }
    }

    return (
        <div className='bg-white text-black h-[93vh] p-4'>
            <div className='sm:flex flex-row-reverse gap-5 sm:pb-3'>
                <div className='flex pb-2 md:pt-0  justify-end gap-1'>
                    <Button variant='shadow' className='bg-red-400' onClick={() => navigate(-1)}>Cancel</Button>
                    <Button variant='shadow' className='bg-yellow-400' onClick={() => setPreview(val => !val)}>{preview == false ? "Preview" : 'Editor'}</Button>
                    <Button variant='shadow' className='bg-green-400' onClick={placeholder ? update : create}>{placeholder ? "Update" : "Save"}</Button>
                </div>
                {preview == false && (
                    <div className='flex w-full gap-1'>
                        <Input
                            autoFocus
                            startContent={<UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                            label="Heading"
                            placeholder="Enter heading"
                            variant="bordered"
                            type='text'
                            fullWidth
                            clearable
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                        />
                        {thumbnail ? (
                            <div
                                variant='shadow'
                                onClick={handleDeleteThumbnail}
                                className='bg-red-400 m-auto p-2 rounded-md'
                            >
                                <Trash2 />
                            </div>
                        ) : (
                            <div
                                variant='shadow'
                                onClick={() => fileInputRef.current.click()}
                                className='bg-gray-400 m-auto p-2 rounded-md'
                            >
                                <ImageUp />
                            </div>
                        )}
                        {thumbnail ? (
                            <Image
                                src={URL.createObjectURL(thumbnail)}
                                className='h-[50px]'
                                alt="Thumbnail preview"
                            />
                        ) : (
                            <>
                                {placeholder && (
                                    <Image
                                        src={placeholder?.image}
                                        className='h-[50px]'
                                        alt="Thumbnail preview"
                                    />
                                )}
                            </>
                        )}
                        <input
                            type="file"
                            accept='image/*'
                            onChange={handleThumbnailChange}
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                        />
                    </div>
                )}
            </div>
            <Spacer y={1.5} />
            {preview ? (
                <div className='mt-4'>
                    <h2>Output Content:</h2>
                    <div
                        dangerouslySetInnerHTML={{ __html: content }}
                        className='border p-4 mt-2'
                    />
                </div>
            ) : (
                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1}
                    onBlur={newContent => setContent(newContent)}
                    onChange={newContent => setContent(newContent)}
                />

            )}
        </div>
    )
}

export default CreateBlog;
