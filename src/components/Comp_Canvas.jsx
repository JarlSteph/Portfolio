import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls, Preload } from '@react-three/drei';
import { IoCaretBackCircle } from "react-icons/io5";
import Arrow from '../models/Arrow';
import Loader from './Loader';
import Model from '../models/Model';
import * as THREE from 'three';
import gsap from 'gsap';
import { AiFillLinkedin, AiFillContacts, AiFillHome, AiFillSmile } from "react-icons/ai";
import { FaSquarePhone } from "react-icons/fa6";
import { FaBriefcase } from "react-icons/fa";
import ScrollIcon from './ScrollIcon';
import Popup from './PopUp';



const Button = ({ position, onClick, controlsEnabled, shape, rotation }) => {
  const mesh = useRef();
  const { camera } = useThree();

  useFrame(() => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    if (controlsEnabled && camera) {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([mesh.current]);

      if (intersects.length > 0) {
        console.log('Button hovered or clicked!');
        // onClick(); // removed because it shouldn't be here
      }
    }
  });

  return (
    <mesh
      ref={mesh}
      position={position}
      rotation={rotation}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      <boxGeometry args={shape} />
      <meshBasicMaterial color={0xff0000} />
    </mesh>
  );
};

const useWindowResize = (breakpoint = 1024) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= breakpoint);
    };

    // Initial setup
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return isSmallScreen;
};

const BackButton = ({ onClick }) => {
  const buttonRef = useRef();
  const windowSize = useWindowResize(); 

  useEffect(() => {
    // Initial hidden state
    gsap.set(buttonRef.current, { autoAlpha: 0 });

    // Animation when showing
    gsap.to(buttonRef.current, { autoAlpha: 1, duration: 0.1, delay: 0.5 });
  }, []);

  const handleButtonClick = () => {
    // Animation when hiding
    gsap.to(buttonRef.current, { autoAlpha: 0, duration: 0.1, onComplete: onClick });
  };

  return (
    <div
      ref={buttonRef}
      className={`absolute  ${windowSize ? 'top-0 left-0' : 'top-10 left-10'} cursor-pointer text-primary p-2 bg-opacity-50 bg-transperent z-10`}
      onClick={handleButtonClick}
    >
      <IoCaretBackCircle size={50}/>
    </div>
  );
};

const BASE = import.meta.env.BASE_URL;

const MePopUp = {
  title: "About Me",
  text: "hi", imArray: [{src: `${BASE}images/selfie.png`, alt: "HEJ"}]
}
const ContactsPopUp = {
  title: "Contact Me",
  text: "GRRRR!",
  imArray: [{src: "/images/hero.jpg", alt: "HEJ"}]
}
const PortfolioPopUp = {
  title: "Portfolio",
  text: "pass",
  imArray: [{src: "/images/hero.jpg", alt: "HEJ"}]
}
const ExperiencePopUp = {
  title: "Experience",
  text: "pass",
  imArray: []
}



const Comp_Canvas = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [controlsEnabled, setControlsEnabled] = useState(true);
  
  const isSmallScreen = useWindowResize();
  const cameraRef = useRef();

  const MirrorPosition = new THREE.Vector3(0, 0, -3);
  const MirrorAngle = new THREE.Vector3(0, 0, 0);
  const ComputerPosition = new THREE.Vector3(14, 3, -10);
  const ComputerAngle = new THREE.Vector3(0, 0, 0);
  const PaperPosition = new THREE.Vector3(0, 5, 0);
  const PaperAngle = new THREE.Vector3(4, 12, -10);
  const ExperiencePosition = new THREE.Vector3(8, -1, -8); // TODO: fix this angle
  const ExperienceAngle = new THREE.Vector3(5, 0, 0);

  const SideBar = ({ text1, text2, text3, text4, handleButtonClick}) => {
    const sidebarClass = `flex ${isSmallScreen ? 'flex-row w-full justify-around items-center p-2' : 'flex-col h-full w-16 items-center py-4'} bg-black`;
    const sidebarItemClass = `m-2 ${isSmallScreen ? 'mr-3' : 'mb-3'}`;

    return (
      <div className={sidebarClass}>
        <SideBarIcon className={sidebarItemClass} icon={<AiFillSmile size={50} />} text={text3} downIcon={isSmallScreen} onClick={() => handleButtonClick(ComputerPosition, ComputerAngle, MePopUp)}/>
        <SideBarIcon className={sidebarItemClass} icon={<AiFillContacts size={50} />} text={text2} downIcon={isSmallScreen} onClick={() => handleButtonClick(PaperPosition, PaperAngle,  PortfolioPopUp)}/>
        <SideBarIcon className={sidebarItemClass} icon={<FaBriefcase size={45} />} text={text4} downIcon={isSmallScreen} onClick={() => handleButtonClick(ExperiencePosition, ExperienceAngle, ExperiencePopUp)}/>
        <SideBarIcon className={sidebarItemClass} icon={<FaSquarePhone size={50} />} text={text1} downIcon={isSmallScreen} onClick={() => handleButtonClick(MirrorPosition, MirrorAngle, ContactsPopUp)}  />
    
      </div>
    );
  };

  const handleButtonClick = (zoomedPosition, angle, newPopupContent) => {
    setControlsEnabled(false); // Disable controls immediately
    setShowPopup(!showPopup);

    if (newPopupContent) {
      setPopupContent(newPopupContent);
    }

    if (!showPopup) {
      if (cameraRef.current) {
        gsap.to(cameraRef.current.position, { x: zoomedPosition.x, y: zoomedPosition.y, z: zoomedPosition.z, duration: 0.5 });    
        gsap.to(cameraRef.current.rotation, { x: angle.x, y: angle.y, z: angle.z, duration: 0.5 });
        if (angle.x !== 0){
          gsap.to(cameraRef.current.position, { x: angle.x, y: angle.y, z: angle.z, duration: 0.5 });
           
        }
      }
    } else {
      const defaultPosition = new THREE.Vector3(30, 10, 0);
      const defaultAngle = new THREE.Vector3(0, 0, 0);

      if (cameraRef.current) {
        gsap.to(cameraRef.current.position, { x: defaultPosition.x, y: defaultPosition.y, z: defaultPosition.z, duration: 0.5 });
        gsap.to(cameraRef.current.rotation, { x: defaultAngle.x, y: defaultAngle.y, z: defaultAngle.z, duration: 0.5 });

        setControlsEnabled(true); // Enable controls immediately
      }
    }
  };

  const SideBarIcon = ({ icon, text = 'tooltip', onClick, downIcon}) => {
    let iconClass = downIcon ? "sidebar-tooltip2" : "sidebar-tooltip";
    return(
      <div className="sidebar-icon group" onClick={onClick}>
        {icon}
        <span className={`${iconClass} group-hover:scale-100`}>{text}</span>

      </div>
    )};

  const [popupContent, setPopupContent] = useState({
    title: "About Me",
    text: "Hi and Welcome to my website! You can navigate using either the sidebar or by dragging the room on the left. Enjoy!",
    imArray: [{src: "/images/hero.jpg", alt: "HEJ"}, {src: "/images/hero.jpg", alt: "HEJ"}]
  });
  
  return (
    <div className = {`flex ${isSmallScreen ? 'flex-col-reverse h-screen' : 'flex-row h-screen'}`}> 
      <div className={`relative ${isSmallScreen ? 'h-2/3 w-full' : 'w-[55%] h-full'} background-color-black`}>
        {showPopup && (
          <BackButton onClick={() => {
            handleButtonClick(MirrorPosition, MirrorAngle);
          }} />
        )}
        
        <Canvas
          frameloop="demand"
          camera={{ position: [30, 10, 0], near: 0.1, far: 1000, rotation: [0, 0, 0] }}
          gl={{ preserveDrawingBuffer: true }}
          onCreated={({ camera }) => (cameraRef.current = camera)}
        >
          
          <ambientLight intensity={1} />
          <Suspense fallback={<Loader />}>
            <Model />
            <Button position={[-1.8, 1.5, 20.1]} shape={[4,6,0.1]} onClick={() => handleButtonClick(MirrorPosition, MirrorAngle,  ContactsPopUp)} controlsEnabled={controlsEnabled}  />
            <Button position={[-0.5, -20.4, 3.1]} shape={[3,5,2.2]} onClick={() => handleButtonClick(PaperPosition, PaperAngle, PortfolioPopUp)} controlsEnabled={controlsEnabled} rotation={[0,2,0]} />
            <Button position={[-15.4, -10.94, -3.1]} shape={[0.19,1.8,2.9]} onClick={() => handleButtonClick(ComputerPosition, ComputerAngle, MePopUp)} controlsEnabled={controlsEnabled} rotation={[0,0.439,0.1]}/>
            <Button position={[-21, -2.5, -10.5]} shape={[4.2, 5.5, 0.1]} onClick={() => handleButtonClick(ExperiencePosition, ExperienceAngle, ExperiencePopUp)} controlsEnabled={controlsEnabled} rotation={[0, Math.PI/2, 0]}/>
            <Arrow positionArr={[-16,-8.2,-3]} color={"Deeppink"} rotation={[0, 0, (3/2)*Math.PI]}/>
            <Arrow positionArr={[-20, 2.1, -10.5]} color={"Deeppink"} rotation={[0, 0, (3/2)*Math.PI]}/>
            <Arrow positionArr={[-0.5,-18,7]} color={"Deeppink"} rotation={[0, (1/2)*Math.PI, 0]} nr={2}/>
            <Arrow positionArr={[-2,-3.5, 19.4]} color={"Deeppink"} rotation={[0, Math.PI/2, Math.PI/2]} nr={3}/>
            <OrbitControls
              enableZoom={false}
              enableRotate={controlsEnabled}
              maxPolarAngle={controlsEnabled ? Math.PI / 2 : 2*Math.PI}
              minPolarAngle={controlsEnabled ? Math.PI / 2 : 0}
              minAzimuthAngle={controlsEnabled ? (0.98)  : undefined}
              maxAzimuthAngle={controlsEnabled ? (Math.PI * 1) : undefined}
            />
          </Suspense>
          <Preload all={true} />
        </Canvas>
      </div>

      <ScrollIcon isSmallScreen={isSmallScreen}/>

      <div className={`${isSmallScreen ? 'h-1/3 w-full flex-col' : 'w-[45%] h-full flex-row'} flex`}>
        {isSmallScreen && <SideBar text1="Contact" text2="Portfolio" text3="About Me" text4="Experience" handleButtonClick={handleButtonClick}/>}
        <div className={`flex-1 bg-black text-white ${isSmallScreen ? 'px-4 py-2' : 'p-9'} overflow-y-hidden relative`}>
          <div className={`transition-opacity duration-500 ${showPopup ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <h1 className="text-4xl mb-4 mt-8">
              <br />
              <span className="text-primary font-bold font-novaMono text-6xl">Jarl</span>{' '}
              <br />
              <span className="text-secondary font-bold font-novaMono text-5xl">Stephansson</span>
            </h1>
            <p className="text-sm text-gray-500 font-lato font-bold mb-8 z-20 w-[90%]">
              Hello and welcome to my personal website! Explore my space using the icons or drag around the room clicking on the red spaces to discover more about me. Enjoy your visit!
            </p>
          </div>
          <Popup isOpen={showPopup} onClose={() => setShowPopup(false)} title={popupContent.title} text={popupContent.text} imArray={popupContent.imArray} smallScreen={isSmallScreen}/>
        </div>
        {!isSmallScreen && <SideBar text1="Contact" text2="Portfolio" text3="About Me" text4="Experience" handleButtonClick={handleButtonClick}/>}
      </div>
          
    </div>
  );
};

export default Comp_Canvas;