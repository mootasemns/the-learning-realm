import React from "react"; 

import '../../styles/Footer.css'
const Footer=()=>{
    return (
      <div className="footer">
        <hr></hr>
        <div className="sb_footer section_padding">
          <div className="sb_footer-links">
            <div className="sb_footer-links_div">
              <h4>For Business</h4>
              <hr></hr>
              <a href="/employer">
                <p>Employer</p>
              </a>
              <a href="/healthplan">
                <p>Health Plan</p>
              </a>
              <a href="/individual">
                <p>Individual</p>
              </a>
            </div>
            <div className="sb_footer-links_div">
              <h4>Resources</h4>
              <hr></hr>
              <a href="/resource">
                <p>Resource center</p>
              </a>
              <a href="/resource">
                <p>Testimonials</p>
              </a>
              <a href="/resource">
                <p>STV</p>
              </a>
            </div>
            
            <div className="sb_footer-links_div">
              <h4>Partners</h4>
              <hr></hr>
              <a href="/employer">
                <p>Swing Tech</p>
              </a>
            </div>
            
            <div className="sb_footer-links_div">
              <h4>Company</h4>
              <hr></hr>
              <a href="/about">
                <p>About</p>
              </a>
              <a href="/press">
                <p>Press</p>
              </a>
              <a href="/career">
                <p>Career</p>
              </a>
              <a href="/contact">
                <p>Contact</p>
              </a>
            </div>
          </div>

          <hr></hr>
          <div className="sb_footer-below">
            <div className="sb_footer-copyright">
              <p>@{new Date().getFullYear()} Learning Realm. All right reserved.</p>
            </div>
            <div className="sb_footer-below-links">
              <a href="/terms">
                <div>
                  <p>Terms & Conditions</p>
                </div>
              </a>
              <a href="/privacy">
                <div>
                  <p>Privacy</p>
                </div>
              </a>
              <a href="/security">
                <div>
                  <p>Security</p>
                </div>
              </a>
              <a href="/cookie">
                <div>
                  <p>Cookie Declaration</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Footer;