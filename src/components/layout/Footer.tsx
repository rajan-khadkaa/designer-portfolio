import React from 'react';
import { SOCIAL_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer id="footer-section">
      <p>© 2025 Rajan. All rights reserved.</p>
      <div>
        {/*add social media texts/links here like for example one is given below but this example below is not consistent with our design/code/approach/styles naming conventions/light and dark mode etc. and other things as well*/}
{/*
       <div className="socials text-center flex flex-row gap-3">
          {socialImgs.map((platform) => (
            <a
              key={platform.name}
              className={`cursor-pointer hover:mr-1 text-black-200 dark:text-white-200 hover:text-black dark:hover:text-white transform transition-all duration-300 relative overflow-hidden group flex gap-1 items-center justify-center`}
              href={platform.url}
              target="_blank"
            >
              <p className="text-base md:text-base ml-0">{platform.name}</p>

              <FaArrowUp
                className="-translate-x-[200%] rotate-90 transform transition-all duration-300 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-hover:translate-x-0 group-hover:rotate-45 "
                size={12}
              />
              <div className="w-[85%] transform transition-all duration-300 group-hover:w-[100%] absolute left-0 bottom-0 h-[0.08rem] bg-black-200 dark:bg-white-200 group-hover:bg-black dark:group-hover:bg-white"></div>
            </a>
          ))}
        </div> */}
      </div>
    </footer>
  );
}
