import PropTypes from 'prop-types';
import ThemeToggler from './ThemeToggler';
import { useState, useEffect, useRef } from 'react';

function HeaderBar({level, currentScore, bestScore}) {
   // used for dynamic layout changes
   const flexDivRef = useRef(null);
   const [isWrapped, setIsWrapped] = useState("flex-row");

  // track if flex div is wrapped
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const childNode = entries[0].target.lastElementChild;
      setIsWrapped((childNode.offsetTop - entries[0].target.offsetTop > 5) ? true : false);
    });

    if (flexDivRef && flexDivRef.current) {
      resizeObserver.observe(flexDivRef.current);
    }
  }, [flexDivRef]);

  // change layout on flex wrap
  const iconsFlexStyle =  (isWrapped) ? "flex-col ml-[52px]" : "flex-row";
  const scorePadding = (isWrapped) ? "pl-[52px]": "px-[26px]";

  return (
    <header className="p-4 flex items-center bg-gradient-to-b from-secondary to-base-100">
      <div ref={flexDivRef} className='flex-1 flex flex-row flex-wrap items-center gap-4'>
        <div>
          <h1 className="text-xl text-primary-content font-space2p font-bold">POKEMEMORY</h1>
          <h4 className="font-space2p font-bold text-sm">Level {level+1}</h4>
        </div>
        <div className='flex-1 flex'>
          <button onClick={()=>window.modal_info.showModal()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
          </button>
          <div className={`mx-auto ${scorePadding} text-center text-accent`}>
            <p className='font-space2p text-[0.9rem] whitespace-nowrap'>Score: {currentScore}</p>
            <p className='font-space2p text-[0.9rem] whitespace-nowrap'>Best: {bestScore}</p>
          </div>
        </div>
      </div>
      <div className={`flex ${iconsFlexStyle} gap-4 gap-y-8 flex-wrap`}>
        <ThemeToggler />
        <a id="github-link" href="https://github.com/MisterRooster/memory-game/">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </a>
      </div>
    </header>
  );
}

HeaderBar.propTypes = {
  currentScore: PropTypes.number,
  bestScore: PropTypes.number,
};

export default HeaderBar;