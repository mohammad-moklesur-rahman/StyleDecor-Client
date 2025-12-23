import {
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import MyContainer from "./MyContainer";

const Footer = () => {
  return (
    <footer className="bg-primary-content text-base-content">
      <MyContainer>
        {/* Main Content */}
        <div className="py-10">
          <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-3 lg:text-left">
            {/* Contact Info */}
            <div className="grid justify-center">
              <span className="footer-title">Contact</span>
              <div className="mt-3 space-y-2">
                <p className="flex items-center justify-center gap-2 lg:justify-start">
                  <FaMapMarkerAlt /> Dhaka, Bangladesh
                </p>
                <p className="flex items-center justify-center gap-2 lg:justify-start">
                  <FaPhoneAlt /> +880 1234 567 890
                </p>
                <p className="flex items-center justify-center gap-2 lg:justify-start">
                  <FaEnvelope /> support@yourbusiness.com
                </p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="grid justify-center">
              <span className="footer-title">Working Hours</span>
              <div className="mt-3 space-y-2">
                <p className="flex items-center justify-center gap-2 lg:justify-start">
                  <FaClock /> Sat – Thu: 9:00 AM – 8:00 PM
                </p>
                <p>Friday: Closed</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="grid justify-center">
              <span className="footer-title">Follow Us</span>
              <div className="mt-4 flex justify-center gap-4 lg:justify-start">
                <a className="btn btn-circle btn-outline hover:btn-primary">
                  <FaFacebookF />
                </a>
                <a className="btn btn-circle btn-outline hover:btn-primary">
                  <FaInstagram />
                </a>
                <a className="btn btn-circle btn-outline hover:btn-primary">
                  <FaXTwitter />
                </a>
              </div>
            </div>
          </div>
        </div>
      </MyContainer>

      {/* Copyright */}
      <div className="bg-secondary py-4 text-center text-sm">
        <p>© {new Date().getFullYear()} StyleDecor. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
