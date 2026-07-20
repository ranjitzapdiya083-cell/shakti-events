export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <h2>Shakti Events</h2>

        <p>
          Creating unforgettable memories with beautiful decorations and
          professional event management.
        </p>

        <div className="social">
          <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
          <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          <a href="https://wa.me/917016073709" target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>

        <p className="copy">© {year} Shakti Events | All Rights Reserved</p>
      </div>
    </footer>
  );
}
