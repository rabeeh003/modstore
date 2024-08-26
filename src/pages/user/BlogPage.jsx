import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { cn } from "../../utils/cn";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, Image, Tooltip } from "@nextui-org/react";
import axios from "axios";
import { BaseUrl } from "../admin/utils/constData";
import { ChevronRight, CloudDownload, Copy, CornerUpLeft, SquareArrowOutUpLeft } from "lucide-react";
import SuggestBlogCard from "./components/SuggestBlogCard";
import ReactGA from 'react-ga4'
import AdsComponent from "./components/AdsComponent";

function BlogPage({ children, className }) {
  // my initialization code start
  const { blogid } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const initialData = location.state?.data;
  const initialSuggest = location.state?.suggest;
  const [data, setData] = useState(initialData || {});
  const [suggest, setSuggest] = useState(initialSuggest || []);
  const [isCopied, setIsCopied] = useState(false);

  // ReactGA page views
  useEffect(() => {
    ReactGA.send({ hitType: "BlogView", page: location.pathname + location.search });
  }, [location]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    if (!data) {
      axios.get(`${BaseUrl}blog/get/${blogid}/`)
        .then(res => setData(res.data))
        .catch(err => console.error(err));
    }
    if (!initialSuggest) {
      axios.get(`${BaseUrl}blog/?length=3`)
        .then(res => setSuggest(res.data.results))
        .catch(err => console.error(err));
    }
    scrollToTop()
  }, [blogid, data, initialData, initialSuggest]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset copied state after 2 seconds
  };

  // my initialization code is end

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight - 200);
    }
  }, [data]);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [80, svgHeight]),
    {
      stiffness: 500,
      damping: 90,
    }
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 2], [80, svgHeight - 200]),
    {
      stiffness: 500,
      damping: 90,
    }
  );

  return (
    <div className="relative container max-w-[1050px] mx-auto px-5 sm:px-10 mt-3 pb-10">
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
      <motion.div
        ref={ref}
        className={cn("relative w-full max-w-4xl mx-auto h-full", className)}
      >
        <div className="absolute -left-4 md:-left-20 top-3">
          <motion.div
            transition={{ duration: 0.2, delay: 0.5 }}
            animate={{
              boxShadow: scrollYProgress.get() > 0 ? "none" : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
            className="ml-[27px] h-4 w-4 rounded-full border border-neutral-200 shadow-sm flex items-center justify-center"
          >
            <motion.div
              transition={{ duration: 0.2, delay: 0.5 }}
              animate={{
                backgroundColor: scrollYProgress.get() > 0 ? "white" : "var(--emerald-500)",
                borderColor: scrollYProgress.get() > 0 ? "white" : "var(--emerald-600)",
              }}
              className="h-2 w-2 rounded-full border border-neutral-300 bg-white"
            />
          </motion.div>
          <svg
            viewBox={`0 0 20 ${svgHeight}`}
            width="20"
            height={svgHeight}
            className="ml-4 block"
            aria-hidden="true"
          >
            <motion.path
              d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
              fill="none"
              stroke="#9091A0"
              strokeOpacity="0.16"
              transition={{ duration: 10 }}
            />
            <motion.path
              d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="1.25"
              className="motion-reduce:hidden"
              transition={{ duration: 10 }}
            />
            <defs>
              <motion.linearGradient
                id="gradient"
                gradientUnits="userSpaceOnUse"
                x1="2"
                x2="3"
                y1={y1}
                y2={y2}
              >
                <stop stopColor="#18fc55" stopOpacity="0" />
                <stop stopColor="#92dfb3" />
                <stop offset="0.325" stopColor="#28ff02" />
                <stop offset="1" stopColor="#48ffb9" stopOpacity="0" />
              </motion.linearGradient>
            </defs>
          </svg>
        </div>
        <div ref={contentRef} className="pt-12">
          <Card shadow="sm" className="m-1">
            <CardBody className="overflow-visible grid justify-items-center">
              <Image src={data.image} className="w-full bg-red-500" />
            </CardBody>
            <CardFooter>
              <h1 className="text-2xl md:text-4xl py-2 font-mono font-bold">{data.head}</h1>
            </CardFooter>
          </Card>
          <Card shadow="sm" className="m-1">
            <CardBody className="overflow-visible">
              <div dangerouslySetInnerHTML={{ __html: data.data }} />
            </CardBody>
          </Card>
        </div>
      </motion.div>
      <div>
        <div className="container m-auto">
          <Link to="">
            <div className="flex py-6 align-middle justify-between px-5 ">
              <span className="text-3xl font-bold">Suggest blogs</span>
              <ChevronRight className="my-auto" />
            </div>
          </Link>
            <AdsComponent dataAdSlot="4281835525"/>
          <div className="flex m-auto justify-center gap-5 flex-wrap">
            {suggest.map((data) => (
              <div key={data.id} className="flex-none px-1 sm:px-0">
                <SuggestBlogCard data={data} setData={setData} />
              </div>
            ))}
          </div>
          <div className="py-4 w-full grid grid-flow-col">
            <Link to={"/blog"} className="m-auto">
              <Button className="text-center bg-green-400"><CloudDownload />show more blogs</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
