import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import MyContainer from "../components/Shared/MyContainer";

const Contact = () => {
  return (
    <div className="bg-secondary-content py-20 px-4">
      <MyContainer>
        <h1 className="text-4xl font-bold text-center mb-10">
          Contact <span className="text-primary">Us</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Get In Touch</h2>
            <p className="text-gray-600">
              Have questions or want to book a decoration service? Reach out to
              us anytime.
            </p>

            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-primary text-xl" />
              <span>+880 1234 567 890</span>
            </div>

            <div className="flex items-center gap-4">
              <FaEnvelope className="text-primary text-xl" />
              <span>support@styledecor.com</span>
            </div>

            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-primary text-xl" />
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>

          {/* Contact Form */}
          <form className="card bg-base-200 p-6 shadow-md space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
              required
            />
            <textarea
              placeholder="Your Message"
              className="textarea textarea-bordered w-full"
              rows="4"
              required
            ></textarea>
            <button className="btn btn-primary w-full">Send Message</button>
          </form>
        </div>
      </MyContainer>
    </div>
  );
};

export default Contact;
