import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer__text">
        Desenvolvido por <strong>Lucas Bertoli</strong> para Case
      </span>

      <div className="footer__actions">
        <a
          href="https://wa.me/5541991295522"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--whatsapp"
        >
          <FaWhatsapp className="btn__icon" />
          <span>WhatsApp</span>
        </a>
        <a
          href="https://instagram.com/lucabertog"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--instagram"
        >
          <FaInstagram className="btn__icon" />
          <span>Instagram</span>
        </a>
        <a
          href="https://lucabertog.bio.link"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--biolink"
        >
          <span className="btn__label-strong">Bio.link</span>
        </a>
      </div>
    </footer>
  );
}
