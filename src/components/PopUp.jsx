import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { AiFillLinkedin, AiFillMail } from "react-icons/ai";
import { FaSquarePhone } from "react-icons/fa6";
import SidebarComponents from './SideBar';
import ContactForm from './email';



function PhoneHandler (){
  const textToCopy = '0790138286';
  // Create a temporary input element
  const tempInput = document.createElement('input');
  tempInput.value = textToCopy;
  document.body.appendChild(tempInput);
  // Select the text in the input element
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // For mobile devices
  // Copy the selected text to the clipboard
  document.execCommand('copy'); // dont know what this does 
  // Remove the temporary input element
  document.body.removeChild(tempInput);
  alert('Text copied to clipboard: ' + textToCopy);


}
function LinkedInHandler(){
  window.location.href = "https://www.linkedin.com/in/jarl-stephansson-507080254/"
}


const Popup = ({ isOpen, onClose, title, text, imArray, smallScreen }) => {
  const popupRef = useRef(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const handleMailClick = () => {
    setShowContactForm(!showContactForm);
  };

  useEffect(() => {
    const timeline = gsap.timeline({ paused: true });

    timeline.fromTo(
      popupRef.current,
      { y: '100%', opacity: 0 },
      { duration: 0.2, y: isOpen ? 0 : '100%', opacity: isOpen ? 1 : 0, ease: 'none' }
    );

    timeline.play();
  }, [isOpen]);


  return (
    <div>
      <br />
      <br />
      <br />

      {title === "About Me" ? (
        isOpen && (
          <div
          ref={popupRef}
          className={`fixed bottom-0 right-0 ${smallScreen ? 'w-full' : 'w-1/3'} h-2/3 bg-black p-4 rounded-l overflow-y-auto transform transition-transform ease-in-out duration-500`}
          style={{ transform: `translateY(${isOpen ? 0 : '100%'})`, opacity: isOpen ? 1 : 0 }}
        >
            <h2 className="text-3xl font-bold mb-4 text-center font-novaMono">{title}</h2>
            <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />

            <div className="flex justify-between mb-4">
              {imArray.map((image, index) => (
                <img
                  key={index}
                  className="max-w-full mx-auto" // Apply max-width: 100%
                  src={image.src}
                  alt={image.alt}
                />
              ))}
            </div>
            <div className="leading-6 font-lato ">
              <p>Hej! I'm Jarl Stephansson, a dedicated and imaginative student hailing from the beautiful island of Gotland in Sweden. Currently immersed in my studies at KTH, I'm in my third year, planning to specialize in interactive technology. My profound passion lies in the convergence of graphics, design, and sound as I explore the dynamic intersection of creativity and technology.</p>
              <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
              
              <p>During my tenure at KTH, I immersed myself in student organizations, actively contributing to design and communication initiatives. Leading a team of approximately 10 individuals, I gained hands-on experience in problem-solving, fostered a heightened sense of responsibility, and cultivated creativity.</p>
            </div>
          </div>
        )
      ) : title === "Portfolio & Previous Work" ? (
        // Your Portfolio-specific JSX goes here
        // You can customize this block for the Portfolio case
        <div
        ref={popupRef}
        className={`fixed bottom-0 right-0 ${smallScreen ? 'w-full' : 'w-1/3'} h-2/3 bg-black p-4 rounded-l overflow-y-auto transform transition-transform ease-in-out duration-500`}
        style={{ transform: `translateY(${isOpen ? 0 : '100%'})`, opacity: isOpen ? 1 : 0 }}
      >
            <h2 className="text-3xl font-bold mb-4 text-center font-novaMono">{title}</h2>
            <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
            <p className='text-1xl font-bold mb-4 font-novaMono'> Action!</p>
            <div className="flex justify-between mb-4">
              
                <img className="max-w-full mx-auto" src="src/assets/images/SS.png" alt="Action!"/>
            </div>
            <div className="leading-6 font-lato ">
              <p>Together with three friends, I collaborated on the development of a movie quiz web application using React and JavaScript. Throughout this project, I gained valuable experience in backend programming, with a specific focus on managing the application state and implementing the code required to execute the logic of the quiz.</p>
              <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
              <p className='text-1xl font-bold mb-4 font-novaMono'> Bachelor's thesis in collaboration with SL</p>
              <img className="w-80 mx-auto" src="src/assets/images/sl_pic.png" alt="SL"/>
              <p>I'm currently immersed in my bachelor's thesis project in collaboration with SL. In this pursuit, I'm exploring strategies to improve the clarity of text-to-speech systems amidst noisy surroundings. My passion for acoustics and sound fuels this research, with the goal of producing a captivating and impactful thesis.</p>
              <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
              <p className='text-1xl font-bold mb-4 font-novaMono'> Administrative officer at TCO development</p>
              <img className="w-80 mx-auto" src="src/assets/images/TCO.png" alt="TCO" />
              <p>I have been contributing to TCO Certified for a significant period, where my responsibilities involve administering lab data and maintaining effective communication with these laboratories. In this role, meticulous attention to detail is crucial, and I embrace the substantial responsibility it entails. My commitment to this work is fueled by a genuine concern for the environment, aligning with my dedication to contributing positively to sustainable practices.</p>



            </div>
          </div>
) : title === "Contact Me" ? (
  <div>
        <div
          ref={popupRef}
          className={`fixed bottom-0 right-0 ${smallScreen ? 'w-full' : 'w-1/3'} h-2/3 bg-black p-4 rounded-l overflow-y-auto transform transition-transform ease-in-out duration-500`}
          style={{ transform: `translateY(${isOpen ? 0 : '100%'})`, opacity: isOpen ? 1 : 0 }}
        >
            <h2 className="text-3xl font-bold mb-4 text-center font-novaMono">{title}</h2>
            <div className="leading-6 font-lato ">
              <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
            </div>
            <div onClick={LinkedInHandler} className="flex items-center" >
              <SidebarComponents.SideBarIcon icon={<AiFillLinkedin size={50} />} text="LinkedIn"/>
              <p className='ml-2 text-bold text-secondary hover:text-white transition'>LinkedIn</p>
            </div>
            <hr className="my-2 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
            <div className="flex items-center"  onClick={handleMailClick}>
              <SidebarComponents.SideBarIcon icon={<AiFillMail size={50} />} text="Mail" />
              <p className='ml-2 text-bold text-secondary hover:text-white transition'>Send a Mail</p>

            </div>
            <hr className="my-2 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
            <div className="flex items-center" onClick={PhoneHandler}>
              <SidebarComponents.SideBarIcon icon={<FaSquarePhone size={50} />} text="Phone" />
              <p className='ml-2 text-bold text-secondary hover:text-white transition'>Phone Nummer</p>
            </div>
            <hr className="my-2 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
            {showContactForm && (
              <ContactForm isVisible={true} />
            )}
          </div>
        
  </div>
) : null}
</div>
);
};

export default Popup;
