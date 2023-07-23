export default function FooterBar() {
  return (
    <footer className="flex justify-center p-4 text-base-content text-[10px] bg-gradient-to-b from-base-200 to-base-300">
      <p>
        Copyright © <a className="underline" href="https://github.com/MisterRooster">MisterRooster</a> 2023
        - 
        <a
          id="github-link"
          className="mx-2 px-2 bg-base-100 text-base-content rounded-lg"
          href="https://github.com/MisterRooster/pokememory">
            <svg className="inline mx-1" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            source code
          </a>
      </p>
    </footer>
  );
}