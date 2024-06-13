import React, { useEffect, useState } from 'react';
import { Button, Image, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure, Tooltip } from '@nextui-org/react';
import { Copy, CornerUpLeft, Download, SquareArrowOutUpLeft, Tags } from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress } from '@nextui-org/react';
import { BaseUrl } from '../admin/utils/constData';

function PostPage() {
    const { appid } = useParams();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [ads, setAds] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [appData, setAppData] = useState({});
    const [imageData, setImageData] = useState();
    const [isCopied, setIsCopied] = useState(false); // State to manage copied tooltip
    const [downloadCompleted, setDownloadCompleted] = useState(false); // State to track download completion
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState(0);

    const initialData = location.state?.appData;

    useEffect(() => {
        if (!initialData) {
            axios.get(BaseUrl + `/apps/${appid}/`)
                .then(res => {
                    setAppData(res.data.results);
                    axios.get(BaseUrl + `ref/img/?application=${appid}`).then(
                        (res) => {
                            setImageData(res.data.results);
                        }
                    ).catch((err) => console.error(err));
                })
                .catch(error => console.error('Error fetching data:', error));
        } else {
            axios.get(BaseUrl + `ref/img/?application=${appid}`).then(
                (res) => {
                    setAppData(initialData);
                    setImageData(res.data.results);
                }
            ).catch((err) => console.error(err));
        }
    }, [appid, initialData]);

    useEffect(() => {
        axios.get(BaseUrl + "ads/list/")
            .then(res => {
                setAds(res.data.results);
            }).catch(err => console.error(err));
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset copied state after 2 seconds
    };
    let interval;
    const handleDownload = () => {
        // Simulate download completion
        console.log(("hjooo"));
        setValue(0)
        clearInterval(interval)
        interval = setInterval(() => {
            if (value <= 100) {
                setValue((v) => {
                    if (v >= 100) {
                        clearInterval(interval);
                        return 100
                    }
                    else return v + 10
                });
            }
        }, 1000);
    };

    return (
        <div className='relative container max-w-[1050px] mx-auto px-5 sm:px-10 mt-3 pb-10'>
            <div className='sticky w-full flex justify-between mb-5'>
                <Button className='min-w-10 p-0' color='' variant='flat' onClick={() => navigate(-1)}>
                    <CornerUpLeft />
                </Button>
                <div className='flex gap-3'>
                    <Tooltip placement='bottom-end' content={isCopied ? "Copied!" : "Copy URL"}>
                        <Button isIconOnly color="success" variant='flat' aria-label="Copy URL" onClick={handleCopy}>
                            <Copy />
                        </Button>
                    </Tooltip>
                    <Tooltip placement='bottom-end' content='Share with friends'>
                        <Button isIconOnly color="success" variant="flat" aria-label="Share">
                            <SquareArrowOutUpLeft />
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <div className='sm:flex'>
                <div className='sm:sticky top-24 max-h-[350px] grid justify-center sm:min-w-[200px] md:min-w-[300px]'>
                    <Image
                        isBlurred
                        src={appData?.icon}
                        alt="NextUI Album Cover"
                        className="m-5 w-[100px] md:w-[200px]"
                    />
                    <div className="flex items-center justify-center">
                        <Button onPress={() => {
                            onOpen()
                            handleDownload()
                        }} color="success" variant='shadow' endContent={<Download />}>
                            Download
                        </Button>
                    </div>
                </div>
                <div className='pt-4 sm:pl-10'>
                    <h1 className='font-mono pb-4 font-semibold text-2xl sm:text-3xl md:text-4xl'>{appData.name}</h1>
                    <div className='flex mb-3'>
                        <Tags className='my-auto mr-2' />
                        {appData?.labels?.map((label) => (
                            <span key={label.id} className='text-sm border-2 py-1 font-medium md:py-0 px-2 mr-2 rounded-2xl'>{label.name}</span>
                        ))}
                    </div>
                    <p className='sm:text-[18px] text-justify '>{appData.description}</p>
                </div>
            </div>
            <div className='lg:pt-14'>
                <h1 className='font-sans pt-4 font-semibold text-xl sm:text-3xl md:text-4xl'>Images</h1>
                <div className="mt-5 flex  gap-3 scrollbar-hide overflow-auto mx-auto py-2 lg:px-22">
                    {imageData?.map((image, index) => (
                        <img
                            key={index}
                            alt="gallery"
                            className="h-60 rounded-lg  m-auto"
                            src={image.image}
                        />

                    ))}
                </div>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="bg-background" size={"5xl"} backdrop={"blur"} placement='bottom-center sm:top-center'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-success-500">Download</ModalHeader>
                            <ModalBody>
                                <div className='m-auto'>
                                    {ads[0] && (
                                        <>
                                            <div dangerouslySetInnerHTML={{ __html: ads[0].code }}></div>
                                        </>
                                    )}
                                </div>
                                {value != 100 ? (
                                    <div className='m-auto'>
                                        <p>Processing</p>
                                        <CircularProgress
                                            aria-label="Loading..."
                                            size="lg"
                                            value={value}
                                            color="warning"
                                            showValueLabel={true}
                                        />
                                    </div>
                                ) : (
                                    <div className='w-full text-center'>
                                        {appData.dtype ? (
                                            <a download={appData.download} href={appData.download}>
                                                <Button variant='flat' color="success">
                                                    Download
                                                </Button>
                                            </a>
                                        ) : (
                                            <a href={appData.download} target="_blank" rel="noopener noreferrer">
                                                <Button variant='flat' color="success">
                                                    Link
                                                </Button>
                                            </a>
                                        )}
                                    </div>
                                )}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default PostPage;
