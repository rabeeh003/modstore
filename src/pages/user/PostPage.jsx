import { CircularProgress, Image } from '@nextui-org/react'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import axios from 'axios';
import { Download, NotebookPen } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { BaseUrl } from '../admin/utils/constData';

function PostPage() {
    const { appid } = useParams();
    console.log("appid :", appid);
    const images = [
        "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp",
        "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp",
        "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp",
        "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp",
        "https://an1.com/uploads/screenshots/6976/thumbs/my-little-universe-816638.webp",
        "https://play-lh.googleusercontent.com/W7J_rhJYWt65XQHaZ7N_6Nptu0wC6n4k9WX59qg46KRpe9b5I1LarJqZ7L-Uu9okgA=w526-h296-rw"
    ];
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [currentImage, setCurrentImage] = useState(0)

    const [value, setValue] = React.useState(0);
    const [seconds, setSeconds] = useState(10);
    const [isActive, setIsActive] = useState(false);

    const location = useLocation();
    const initialData = location.state?.appData;
    console.log("Received location:", location);
    console.log("Received initialData:", initialData);

    const [appData, setAppData] = useState(initialData || {});
    const [imageData, setImageData] = useState();

    useEffect(() => {
        if (!initialData) {
            axios.get(BaseUrl + `/apps/${appid}/`)
                // .then(response => response.json())
                .then(res => {
                    setAppData(res.data)
                    axios.get(BaseUrl + `ref/img/?application=${appid}`).then(
                        (res) => {
                            console.log("images of application : " + res.data)
                            setImageData(res.data)
                        }
                    ).catch((err) => console.error(err))
                })
                .catch(error => console.error('Error fetching data:', error));
        } else {
            axios.get(BaseUrl + `ref/img/?application=${appid}`).then(
                (res) => {
                    console.log("images of application : " + res.data)
                    setImageData(res.data)
                }
            ).catch((err) => console.error(err))
        }
    }, [appid, initialData]);

    useEffect(() => {
        let intervalId;
        if (isActive && seconds < 100) {
            intervalId = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 10);
                setValue((v) => (v >= 100 ? 0 : v + 10));
            }, 1400);
        }
        return () => clearInterval(intervalId);
    }, [seconds, isActive, value]);

    return (
        <div className='container max-w-[1200px] mx-auto px-5 sm:px-10 mt-7 pb-10'>
            <div className='sm:flex'>
                <div className='sm:sticky top-24 max-h-[350px] grid justify-center sm:min-w-[200px] md:min-w-[300px]'>
                    <Image
                        isBlurred
                        // src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                        src={appData?.icon}
                        alt="NextUI Album Cover"
                        className="m-5 sm:m-[50px] w-[100px]  md:w-[200px]"
                    />
                    <div className="flex items-center justify-center">
                        {/* <Button isIconOnly color="danger" aria-label="Like">
                            <Share2Icon />
                        </Button> */}
                        <Button onPress={onOpen} onClick={() => setIsActive(true)} color="success" endContent={<Download />}>
                            Download
                        </Button>
                    </div>
                </div>
                <div className='pt-4 sm:pl-10'>
                    <h1 className='font-mono pb-4 font-semibold text-2xl sm:text-3xl md:text-4xl'>{appData.name}</h1>
                    <div>
                        {appData?.labels?.map((label) => (
                            <span key={label} className='border-2 py-1 px-2 mr-2 rounded-2xl'>{label.name}</span>
                        ))}
                    </div>
                    <NotebookPen className='mt-5' />
                    <p className='sm:text-[18px] text-justify '>{appData.description}</p>
                </div>
            </div>
            <div>
                <div className="mt-5 mx-auto px-5 py-2 lg:px-32 lg:pt-24">
                    <div className="m-1 flex flex-wrap md:-m-2 justify-center">

                        {imageData && (
                            <Image
                                src={imageData[currentImage]?.image}
                                alt='image'
                                className='w-full max-w-[600px] h-full max-h-[600px]'
                            />
                        )}
                        <div className='flex mt-5 justify-center'>
                            {imageData?.map((image, index) => (
                                <div className="w-1/4 p-1 md:p-2 max-h-[120px]" key={index} onClick={() => setCurrentImage(index)}>
                                    <img
                                        alt="gallery"
                                        className="block h-full w-full rounded-lg object-cover object-center"
                                        src={image.image}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="bg-background" size={"5xl"} backdrop={"blur"} placement='bottom-center sm:top-center ' >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-success-500">Download</ModalHeader>
                            <ModalBody>
                                <div className='m-auto'>
                                    <Image
                                        src='https://www.gstatic.com/play/games/carousel/com.more.dayzsurvival.gp-497d114e.jpg'
                                        className='w-full '
                                    />
                                </div>
                                {seconds != 100 ? (
                                    <div className='m-auto'>
                                        {/* <p>{seconds}</p> */}
                                        <CircularProgress
                                            aria-label="Loading..."
                                            size="lg"
                                            value={seconds}
                                            color="warning"
                                            showValueLabel={true}
                                        />
                                    </div>
                                ) : (
                                    <div className='w-full text-center'>
                                        <Button variant='flat' color="success">
                                            Download
                                        </Button>
                                    </div>
                                )}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default PostPage