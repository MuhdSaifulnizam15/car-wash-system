import React from 'react';

const Footer = () => {
  return (
    <footer className="footer footer-center w-full p-4 absolute max-md-bottom-10">
      <div className="text-center">
        <p>
          Copyright © {new Date().getFullYear()} -{' '}
          <a
            className="font-semibold"
            href="mailto:muhdsaifulnizam1998@gmail.com"
          >
            Yehga
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;