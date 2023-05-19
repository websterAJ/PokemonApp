import "./Footer.css"
export default function Footer() {
    return(
        <div className="footer">
            <div className="footer-content">
                <a href="https://github.com/websterAJ">
                    <span className="icon-github"></span>
                </a>
                <a href="https://www.linkedin.com/in/dev-alexander-torres/">
                    <span className="icon-linkedin"></span>
                </a>
                <p>© 2023 Alexander Torres. All Rights Reserved.</p>
                <div className="footer-content-left"></div>
                <div className="footer-content-right"></div>
            </div>
        </div>
    );
}