export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="overlay"></div>

        <div className="hero-content">
          <h1>
            Create Beautiful
            <span> Memories</span>
          </h1>

          <p>Wedding | Birthday | Corporate | Engagement</p>

          <a
            href="/booking"
            className="btn"
            style={{
              backgroundColor: '#f59e0b',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '30px',
              textDecoration: 'none',
            }}
          >
            Book Now
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <h2 className="section-title">Our Services</h2>

          <div className="service-grid">
            <div className="card">
              <img src="/images/wedding.jpg" alt="Wedding" />
              <h3>Wedding Decoration</h3>
              <p>Beautiful wedding decorations with premium themes and unforgettable memories.</p>
              <a href="/booking" className="card-btn">Book Now</a>
            </div>

            <div className="card">
              <img src="/images/birthday.jpg" alt="Birthday" />
              <h3>Birthday Party</h3>
              <p>Creative birthday decorations for kids and adults with customized themes.</p>
              <a href="/booking" className="card-btn">Book Now</a>
            </div>

            <div className="card">
              <img src="/images/corporate.jpg" alt="Corporate" />
              <h3>Corporate Events</h3>
              <p>Professional corporate event planning with modern decoration and management.</p>
              <a href="/booking" className="card-btn">Book Now</a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>

          <div className="why-grid">
            <div className="why-card">
              <i className="fas fa-users"></i>
              <h3>Professional Team</h3>
              <p>Our experienced team plans and manages every event perfectly.</p>
            </div>

            <div className="why-card">
              <i className="fas fa-calendar-check"></i>
              <h3>500+ Events</h3>
              <p>We have successfully completed hundreds of memorable events.</p>
            </div>

            <div className="why-card">
              <i className="fas fa-star"></i>
              <h3>Premium Quality</h3>
              <p>Elegant decoration with high-quality materials and creative ideas.</p>
            </div>

            <div className="why-card">
              <i className="fas fa-headset"></i>
              <h3>24×7 Support</h3>
              <p>Our support team is always ready to help you before and after your event.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Our Gallery</h2>

          <div className="row g-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div className="col-lg-4 col-md-6" key={n}>
                <div className="gallery-item">
                  <img src={`/images/gallery${n}.jpg`} className="img-fluid" alt="" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
