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


const img = (name) => `${import.meta.env.BASE_URL}images/${name}`;

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
          className={`${smallScreen ? 'fixed inset-0 z-40' : 'absolute bottom-0 left-0 right-0 w-full h-full'} bg-black p-4 rounded-l overflow-y-auto transform transition-transform ease-in-out duration-500`}
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
            <div className="leading-6 font-lato">
              <p>Hej! I&apos;m Jarl Stephansson, a soon-to-be graduate of the Machine Learning master&apos;s programme at KTH. Hailing from the beautiful island of Gotland, I have three big passions in life: reading, snowboarding, and AI. I&apos;m deeply interested in LLMs and computer science as a whole!</p>
              <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
              <p>Through my studies at KTH and an exchange semester at EPFL, I have worked across the full front/backend stack as well as AI and data-driven development, both training and deploying models. I&apos;m currently based in Stockholm and looking for a new environment where I can apply what I&apos;ve learned and keep pushing further.</p>
              <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
              <p className="font-bold font-novaMono mb-3">Technical Skills</p>
              <div className="space-y-2">
                <div>
                  <span className="text-secondary font-bold">AI &amp; ML</span>
                  <span className="text-gray-300"> — Deep learning (PyTorch, TensorFlow), traditional ML (NumPy, scikit-learn), LLM fine-tuning, RAG pipelines</span>
                </div>
                <div>
                  <span className="text-secondary font-bold">Fullstack</span>
                  <span className="text-gray-300"> — TypeScript, JavaScript, React, FastAPI</span>
                </div>
                <div>
                  <span className="text-secondary font-bold">MLOps</span>
                  <span className="text-gray-300"> — Feature management, model versioning, scalable deployment</span>
                </div>
                <div>
                  <span className="text-secondary font-bold">Languages</span>
                  <span className="text-gray-300"> — Swedish (native), English (fluent)</span>
                </div>
              </div>
            </div>
          </div>
        )
        // RPG game: /images/RPG.png , link: https://github.com/max-andreasen/rpg-narration-game, what i did, create roll playing agent driven game with multiplayer front backend
        // HomerLLM, a fine tuned expert on the Illiad and odessy with a RAG pipeline, links: https://huggingface.co/spaces/StefanCoder1/LoreChat & https://github.com/JarlSteph/Lab2_ID2223 img: /images/homer.png
        // Birdup: a daily ML prediction system using a deep neural network to predict daily occurance of Eagle sightings in the reigons of sweden. /images/BirdUp.png 
        // EPFL DPO LLM finetuning: /images/epfl.png performed DPO to finetune a llm to answer quetions in the domain of computer sicence
      ) : title === "Portfolio" ? (
        // Your Portfolio-specific JSX goes here
        // You can customize this block for the Portfolio case
        <div
        ref={popupRef}
        className={`${smallScreen ? 'fixed inset-0 z-40' : 'absolute bottom-0 left-0 right-0 w-full h-full'} bg-black p-4 rounded-l overflow-y-auto transform transition-transform ease-in-out duration-500`}
        style={{ transform: `translateY(${isOpen ? 0 : '100%'})`, opacity: isOpen ? 1 : 0 }}
      >
            <h2 className="text-3xl font-bold mb-4 text-center font-novaMono">{title}</h2>
            <a href="https://github.com/JarlSteph" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 mb-6 text-gray-400 hover:text-white transition font-lato text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              github.com/JarlSteph
            </a>

            {/* RPG Narration Game */}
            <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />
            <p className="text-lg font-bold mb-3 font-novaMono">RPG Narration Game</p>
            <img className="max-w-full mx-auto mb-3" src={img("RPG.png")} alt="RPG Narration Game"/>
            <p className="leading-6 font-lato mb-2">An AI-driven role-playing game with a multiplayer front/backend. I built an agent that narrates and drives the story dynamically based on player decisions.</p>
            <a href="https://github.com/max-andreasen/rpg-narration-game" target="_blank" rel="noreferrer" className="inline-block mt-1 mb-2 text-primary hover:text-white font-lato text-sm transition">GitHub →</a>

            {/* HomerLLM */}
            <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />
            <p className="text-lg font-bold mb-3 font-novaMono">HomerLLM</p>
            <img className="max-w-full mx-auto mb-3" src={img("homer.png")} alt="HomerLLM"/>
            <p className="leading-6 font-lato mb-2">A fine-tuned language model specialising in the Iliad and Odyssey, augmented with a RAG pipeline to answer questions grounded in the source texts.</p>
            <div className="flex gap-4 mt-1 mb-2">
              <a href="https://huggingface.co/spaces/StefanCoder1/LoreChat" target="_blank" rel="noreferrer" className="text-primary hover:text-white font-lato text-sm transition">Demo →</a>
              <a href="https://github.com/JarlSteph/Lab2_ID2223" target="_blank" rel="noreferrer" className="text-primary hover:text-white font-lato text-sm transition">GitHub →</a>
            </div>

            {/* BirdUp */}
            <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />
            <p className="text-lg font-bold mb-3 font-novaMono">BirdUp</p>
            <img className="max-w-full mx-auto mb-3" src={img("BirdUp.png")} alt="BirdUp"/>
            <p className="leading-6 font-lato mb-2">A daily ML prediction system using a deep neural network to forecast Eagle sightings across regions of Sweden, updated automatically each day.</p>
            <a href="https://github.com/JarlSteph/BirdUp" target="_blank" rel="noreferrer" className="inline-block mt-1 mb-2 text-primary hover:text-white font-lato text-sm transition">GitHub →</a>

            {/* EPFL DPO Finetuning */}
            <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />
            <p className="text-lg font-bold mb-3 font-novaMono">EPFL — LLM Finetuning with DPO</p>
            <img className="max-w-full mx-auto mb-3" src={img("epfl.png")} alt="EPFL DPO"/>
            <p className="leading-6 font-lato mb-4">Applied Direct Preference Optimisation (DPO) to finetune a large language model on computer science Q&amp;A, improving answer quality and domain alignment.</p>
          </div>
) : title === "Experience" ? (
  <div
    ref={popupRef}
    className={`${smallScreen ? 'fixed inset-0 z-40' : 'absolute bottom-0 left-0 right-0 w-full h-full'} bg-black p-4 rounded-l overflow-y-auto transform transition-transform ease-in-out duration-500`}
    style={{ transform: `translateY(${isOpen ? 0 : '100%'})`, opacity: isOpen ? 1 : 0 }}
  >
    <h2 className="text-3xl font-bold mb-6 text-center font-novaMono">{title}</h2>

    {/* Bonnier News */}
    <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />
    <div className="flex justify-between items-baseline mb-1">
      <p className="text-lg font-bold font-novaMono">Bonnier News</p>
      <span className="text-xs text-gray-400 font-lato">Jan 2026 – Present</span>
    </div>
    <p className="text-sm text-secondary font-lato mb-2 italic">Masters Thesis & Summer Internship &mdash; Stockholm, SE</p>
    <img className="w-48 mx-auto mb-3" src={img("BN.png")} alt="Bonnier News"/>
    <ul className="leading-6 font-lato list-disc list-inside space-y-1 mb-3">
      <li>Fine-tuned and implemented RAG solutions to reduce hallucinations.</li>
      <li>Created training data and custom in-domain evaluation pipelines.</li>
    </ul>

    {/* TCO Development */}
    <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />
    <div className="flex justify-between items-baseline mb-1">
      <p className="text-lg font-bold font-novaMono">TCO Development</p>
      <span className="text-xs text-gray-400 font-lato">Sep 2023 – Sep 2025</span>
    </div>
    <p className="text-sm text-secondary font-lato mb-2 italic">Certification Team &mdash; Stockholm, SE</p>
    <img className="w-48 mx-auto mb-3" src={img("TCO.png")} alt="TCO"/>
    <ul className="leading-6 font-lato list-disc list-inside space-y-1 mb-3">
      <li>Administered lab certification data for a global sustainability-focused organisation.</li>
      <li>Maintained communication with laboratories worldwide, ensuring data accuracy.</li>
    </ul>

    {/* Trafikförvaltningen / SL */}
    <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />
    <div className="flex justify-between items-baseline mb-1">
      <p className="text-lg font-bold font-novaMono">Trafikförvaltningen</p>
      <span className="text-xs text-gray-400 font-lato">Jan 2024 – May 2024</span>
    </div>
    <p className="text-sm text-secondary font-lato mb-2 italic">Bachelors Thesis &mdash; Stockholm, SE</p>
    <img className="w-48 mx-auto mb-3" src={img("sl_pic.png")} alt="SL"/>
    <ul className="leading-6 font-lato list-disc list-inside space-y-1 mb-3">
      <li>Designed and trained a noise-adapted text-to-speech model using deep learning.</li>
      <li>Improved speech intelligibility in noisy environments by ~40%.</li>
    </ul>

    {/* KTH Teacher Assistant */}
    <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />
    <div className="flex justify-between items-baseline mb-1">
      <p className="text-lg font-bold font-novaMono">KTH Royal Institute of Technology</p>
      <span className="text-xs text-gray-400 font-lato">Mar 2024 – Sep 2024</span>
    </div>
    <p className="text-sm text-secondary font-lato mb-2 italic">Teacher Assistant &mdash; Stockholm, SE</p>
    <img className="w-48 mx-auto mb-3" src={img("KTH.png")} alt="KTH"/>
    <ul className="leading-6 font-lato list-disc list-inside space-y-1 mb-4">
      <li>Assisted in teaching machine learning courses for Media Technology students.</li>
      <li>Led a team of 14 within university student organisations.</li>
    </ul>
  </div>
  
) : title === "Contact Me" ? (
  <div>
        <div
          ref={popupRef}
          className={`${smallScreen ? 'fixed inset-0 z-40' : 'absolute bottom-0 left-0 right-0 w-full h-full'} bg-black p-4 rounded-l overflow-y-auto transform transition-transform ease-in-out duration-500`}
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
