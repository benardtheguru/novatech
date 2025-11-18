import React, { useEffect, useState } from "react";
import UserNavbar from "../components/navbar/UserNavbar.jsx";
import "../styles/UserDashboard.css";

const AboutUs = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) setUsername(user.name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">
      <UserNavbar username={username} onLogout={handleLogout} />
      <main className="dashboard-main">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-bold text-gray-900">About Us</h1>
          <div className="mt-6 text-gray-700">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Our Goals</h2>
              <p className="leading-relaxed">
                At NovaTech, our primary goal is to provide accurate, timely, and accessible diagnostic services to our community. We are committed to leveraging cutting-edge technology and methodologies to ensure that every patient and healthcare provider receives reliable results they can trust. We aim to streamline the testing process, from appointment scheduling to result delivery, making healthcare more efficient and patient-centric.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Our Core Values</h2>
              <ul className="list-disc list-inside leading-relaxed">
                <li className="mb-2"><strong>Integrity:</strong> We uphold the highest standards of honesty and ethics in all our operations. Patient confidentiality and data security are paramount.</li>
                <li className="mb-2"><strong>Accuracy:</strong> We are relentless in our pursuit of precision. Our labs are equipped with state-of-the-art technology, and our staff is trained to ensure the reliability of every test.</li>
                <li className="mb-2"><strong>Compassion:</strong> We understand that behind every sample is a person. We treat our patients with empathy, respect, and dignity.</li>
                <li className="mb-2"><strong>Innovation:</strong> We are committed to continuous improvement and innovation in the field of diagnostics, always seeking better ways to serve our patients and partners.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">What We Aim to Achieve</h2>
              <p className="leading-relaxed">
                We aim to be a leading diagnostic service provider, recognized for our commitment to quality, innovation, and patient care. We envision a future where everyone has access to reliable and affordable diagnostic services, empowering individuals to take control of their health. By building strong partnerships with healthcare providers and investing in research and development, we strive to contribute to a healthier society for generations to come.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
