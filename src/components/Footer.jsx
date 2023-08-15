import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black py-8 text-center text-white bottom-0 w-full absolute">
      <div className="justify-center">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            marginBottom: 5,
          }}
        >
          <a href="https://www.facebook.com/sistemacic">
            <FaFacebookF
              style={{
                fontSize: 30,
                color: "#FFF",
                margin: 5,
              }}
            />
          </a>
          <a href="https://www.instagram.com/sistemacostarricensecic/">
            <FaInstagram
              style={{
                fontSize: 30,
                color: "#FFF",
                margin: 5,
              }}
            />
          </a>
          <a href="#">
            <FaTwitter
              style={{
                fontSize: 30,
                color: "#FFF",
                margin: 5,
              }}
            />
          </a>
        </div>
        <div>Copyright &copy; 2023. All right reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
