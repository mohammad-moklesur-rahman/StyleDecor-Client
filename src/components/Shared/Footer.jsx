import {
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content">
      {/* Main Content */}
      <div className="footer footer-center p-10 max-w-7xl mx-auto">
        {/* Contact Info */}
        <div>
          <span className="footer-title">Contact</span>
          <div className="space-y-2">
            <p className="flex items-center justify-center gap-2">
              <FaMapMarkerAlt /> Dhaka, Bangladesh
            </p>
            <p className="flex items-center justify-center gap-2">
              <FaPhoneAlt /> +880 1234 567 890
            </p>
            <p className="flex items-center justify-center gap-2">
              <FaEnvelope /> support@yourbusiness.com
            </p>
          </div>
        </div>

        {/* Working Hours */}
        <div>
          <span className="footer-title">Working Hours</span>
          <p className="flex items-center justify-center gap-2">
            <FaClock /> Sat – Thu: 9:00 AM – 8:00 PM
          </p>
          <p>Friday: Closed</p>
        </div>

        {/* Social Media */}
        <div>
          <span className="footer-title">Follow Us</span>
          <div className="flex justify-center gap-4">
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

      {/* Copyright */}
      <div className="footer footer-center p-4 bg-base-300">
        <p>© {new Date().getFullYear()} StyleDecor. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
