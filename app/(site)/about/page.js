export const metadata = { title: 'About Us | Shakti Events' };

export default function AboutPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <h1>About Us</h1>
          <p>Home / About</p>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="about-row">
            <div className="about-image">
              <img src="/images/about.jpg" alt="About Shakti Events" />
            </div>

            <div className="about-content">
              <h2>Welcome to Shakti Events</h2>

              <p>
                Shakti Events is a professional event management company
                specializing in Wedding Decorations, Birthday Parties,
                Corporate Events, Engagements, Baby Showers, and many more.
              </p>

              <p>
                Our mission is to turn your special moments into unforgettable
                memories through creative planning and premium decorations.
              </p>

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
                Book Your Event
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mission">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <h3>🎯 Our Mission</h3>
              <p>
                To deliver memorable events with creativity, professionalism,
                and customer satisfaction.
              </p>
            </div>

            <div className="mission-card">
              <h3>👁 Our Vision</h3>
              <p>
                To become one of India&apos;s most trusted and innovative event
                management companies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
