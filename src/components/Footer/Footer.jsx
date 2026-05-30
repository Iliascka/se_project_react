import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__signature">Developed by Ilias Katsantonis</p>
      <p className="footer__date">{year}</p>
    </footer>
  );
}

export default Footer;
