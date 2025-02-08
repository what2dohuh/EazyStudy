import React from 'react';
import '../style/footer.d.css'
const Footer = () => {
    return (
        <footer className="footer">
                <p className="quote">"Education is the most powerful weapon which you can use to change the world." - Nelson Mandela</p>
            <div className="footer-content">
                
                <div className="contact-info">
                    <h3>Contact Us</h3>
                    <p>Email: support@educonnect.com</p>
                    <p>Phone: +123-456-7890</p>
                </div>
                
                <div className="social-media">
                    <h3>Follow Us</h3>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
