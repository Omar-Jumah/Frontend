import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import PricingModal from './PricingModal.jsx';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
      <>
        <div className={styles.navbarContainer}>
          <div className={styles.logoSection}>
            <div className={styles.logo}>
              SmartShop <span>AI</span>
            </div>
          </div>

          <div className={`${styles.menuPanel} ${isMenuOpen ? styles.menuPanelOpen : ''}`}>
            <ul className={styles.navLinks}>
              <li onClick={() => scrollToSection('home')}>الرئيسية</li>
              <li onClick={() => scrollToSection('features')}>رحلتك معنا</li>
              <li onClick={() => { setIsModalOpen(true); setIsMenuOpen(false); }}>الأسعار</li>
              <li onClick={() => scrollToSection('contact')}>اتصل بنا</li>
            </ul>
            <button className={`${styles.btnAction} ${styles.mobileAction}`} onClick={() => navigate('/login')}>
              تسجيل الدخول
            </button>
          </div>

          <div className={styles.navActions}>
            <button className={`${styles.btnAction} ${styles.desktopAction}`} onClick={() => navigate('/login')}>
              تسجيل الدخول
            </button>
            <button
                className={`${styles.menuToggle} ${isMenuOpen ? styles.menuToggleOpen : ''}`}
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-label="فتح القائمة"
                aria-expanded={isMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        {isModalOpen && <PricingModal onClose={() => setIsModalOpen(false)} />}
      </>
  );
};
export default Navbar;