import { useRef, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowRight, Check, ChevronDown, Copy, Hammer, House, Menu, Ruler, X } from 'lucide-react';
import kitchenInspiration from './assets/kitchen-inspiration.jpg';

const services = [
  {
    number: '01',
    title: 'Kitchen renovations',
    description: 'A better rhythm for the heart of your home. From thoughtful refreshes to a full reworking of the room.',
    detail: 'Cabinetry · surfaces · lighting · layout',
    icon: House,
    id: 'kitchen',
  },
  {
    number: '02',
    title: 'Bathroom renovations',
    description: 'Practical, considered spaces made for the start and end of every day.',
    detail: 'Tile · vanities · fixtures · storage',
    icon: Ruler,
    id: 'bathroom',
  },
  {
    number: '03',
    title: 'General contracting',
    description: 'The careful hands and steady coordination that bring the rest of your home plan together.',
    detail: 'Interior updates · repairs · finish work',
    icon: Hammer,
    id: 'general',
  },
];

const faqs = [
  {
    question: 'What kinds of projects do you take on?',
    answer: 'JulSan Home Improvement helps homeowners with kitchen renovations, bathroom renovations, and general contracting. Share what you have in mind and the team can help you start a conversation about scope.',
  },
  {
    question: 'Which areas do you serve?',
    answer: 'JulSan is a Northern New Jersey contractor. Include your town in the estimate inquiry so the team can understand where your project is located.',
  },
  {
    question: 'What should I include in an estimate inquiry?',
    answer: 'A few details go a long way: the type of space, what you hope to change, your town, and any timing you already have in mind. Photos or measurements can be shared when you speak directly with the team.',
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [prepared, setPrepared] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setMenuOpen(false);
  const prepareInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const text = [
      'Estimate inquiry for JulSan Home Improvement',
      '',
      `Name: ${data.get('name')}`,
      `Town: ${data.get('town')}`,
      `Project type: ${data.get('project')}`,
      `Email: ${data.get('email')}`,
      `Phone (optional): ${data.get('phone') || 'Not provided'}`,
      `Project details: ${data.get('details')}`,
      `Timing: ${data.get('timing') || 'Not specified'}`,
    ].join('\n');
    setPrepared(text);
    setCopied(false);
    setCopyError('');
    window.setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 40);
  };

  const copyInquiry = async () => {
    try {
      await navigator.clipboard.writeText(prepared);
      setCopied(true);
      setCopyError('');
    } catch {
      setCopyError('Clipboard access is unavailable in this browser. Select the inquiry text above and copy it manually.');
    }
  };

  return (
    <main>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="JulSan Home Improvement home" onClick={closeMenu} data-testid="link-home">
            <span className="brand-mark">J<span>·</span>S</span>
            <span className="brand-name">JulSan <small>HOME IMPROVEMENT</small></span>
          </a>
          <nav className={`desktop-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            <a href="#services" onClick={closeMenu}>What we do</a>
            <a href="#approach" onClick={closeMenu}>Our approach</a>
            <a href="#questions" onClick={closeMenu}>Questions</a>
            <a className="nav-mobile-cta" href="#estimate" onClick={closeMenu}>Start an inquiry <ArrowRight size={15} /></a>
          </nav>
          <a className="button button-dark header-cta" href="#estimate" data-testid="link-header-estimate">
            Request an estimate <ArrowRight size={16} />
          </a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow reveal"><span className="eyebrow-line" /> Northern New Jersey · Home improvement</div>
          <h1 className="font-display reveal reveal-delay-1">A home that<br />works <em>beautifully.</em></h1>
          <p className="hero-intro reveal reveal-delay-2">Thoughtful renovations, practical know-how, and a local team that cares about the details as much as you do.</p>
          <div className="hero-actions reveal reveal-delay-3">
            <a href="#estimate" className="button button-clay" data-testid="link-hero-estimate">Tell us what you're planning <ArrowRight size={17} /></a>
            <a href="#services" className="text-link">Explore our services <ArrowDown size={15} /></a>
          </div>
          <div className="hero-note"><span className="note-dot" /> Kitchens, bathrooms &amp; the spaces in between</div>
        </div>
        <div className="hero-visual">
          <img src={kitchenInspiration} alt="Illustrative inspiration: a warm, light-filled kitchen with oak cabinetry and muted green accents" />
          <div className="image-caption"><span>IDEAS FOR HOME</span><span>01 / 03</span></div>
          <div className="hero-stamp"><span>Good work<br />starts with<br /><i>a conversation.</i></span><ArrowDown size={18} /></div>
          <div className="inspiration-label">Illustrative inspiration — not a JulSan project</div>
        </div>
        <div className="hero-index" aria-hidden="true">01 — 03</div>
      </section>

      <section className="intro-band" aria-label="Our promise">
        <div className="intro-label eyebrow">A good place to begin</div>
        <p>Not just a new room.<br /><span>A little more ease in everyday life.</span></p>
        <a href="#approach" className="round-link" aria-label="Learn about our approach"><ArrowDown size={18} /></a>
      </section>

      <section className="services-section section-wrap" id="services">
        <div className="section-heading">
          <div>
            <div className="eyebrow section-eyebrow">What we can help with</div>
            <h2 className="font-display">Room to make<br /><em>your own.</em></h2>
          </div>
          <p>Every home has its own way of working. We bring a practical eye to the spaces you want to change—and care to the work behind them.</p>
        </div>
        <div className="service-list">
          {services.map(({ number, title, description, detail, icon: Icon, id }) => (
            <article className="service-row" key={number} id={id} data-testid={`service-${id}`}>
              <span className="service-number">{number}</span>
              <div className="service-icon"><Icon size={22} strokeWidth={1.45} /></div>
              <div className="service-copy">
                <h3 className="font-display">{title}</h3>
                <p>{description}</p>
              </div>
              <span className="service-detail">{detail}</span>
              <a href="#estimate" className="service-arrow" aria-label={`Ask about ${title}`}><ArrowRight size={19} /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="approach-section" id="approach">
        <div className="approach-aside">
          <div className="eyebrow">The JulSan way</div>
          <div className="approach-number">02<span>/</span>03</div>
          <p>Good work is more than what you see when the dust settles. It is how the whole process feels along the way.</p>
          <a href="#estimate" className="button button-light">Start with a conversation <ArrowRight size={16} /></a>
        </div>
        <div className="approach-main">
          <h2 className="font-display">Clear thinking.<br /><em>Careful doing.</em></h2>
          <div className="approach-steps">
            <article><span>01</span><div><h3>First, we listen.</h3><p>Tell us what is and isn't working. We start by understanding the home you have and the change you want.</p></div></article>
            <article><span>02</span><div><h3>Then, we make a plan.</h3><p>We talk through the scope, the details, and the practical decisions that help a project move forward thoughtfully.</p></div></article>
            <article><span>03</span><div><h3>We mind the details.</h3><p>From the first conversation to the finishing touches, we aim to make the work feel considered and clear.</p></div></article>
          </div>
        </div>
      </section>

      <section className="inspiration-section">
        <div className="inspiration-image">
          <img src={kitchenInspiration} alt="Conceptual kitchen inspiration featuring natural wood, stone, and evergreen cabinetry" loading="lazy" />
          <span className="image-tag">A thought to start from</span>
          <span className="inspiration-label">Illustrative inspiration — not a JulSan project</span>
        </div>
        <div className="inspiration-copy">
          <div className="eyebrow">Make space for the everyday</div>
          <h2 className="font-display">The right details<br />change <em>everything.</em></h2>
          <p>More useful storage. Light where you need it. Finishes that feel like you. A renovation can be a chance to make the familiar work a little harder—and feel a little more like home.</p>
          <a href="#estimate" className="text-link dark-link">Talk through your project <ArrowRight size={16} /></a>
        </div>
      </section>

      <section className="faq-section section-wrap" id="questions">
        <div className="faq-intro">
          <div className="eyebrow">Before we begin</div>
          <h2 className="font-display">A few things<br /><em>you may wonder.</em></h2>
          <p>Have a different question? Include it with your inquiry and we can take it from there.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <article className={`faq-item ${openFaq === index ? 'faq-open' : ''}`} key={faq.question}>
              <button type="button" className="faq-question" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index} data-testid={`button-faq-${index}`}>
                <span>{faq.question}</span><ChevronDown size={18} />
              </button>
              {openFaq === index && <p className="faq-answer">{faq.answer}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className="estimate-section" id="estimate">
        <div className="estimate-shell">
          <div className="estimate-copy">
            <div className="eyebrow">Your next step</div>
            <h2 className="font-display">Tell us a little<br />about <em>your place.</em></h2>
            <p>Share the outline of what you are thinking. We will help you shape a useful first conversation.</p>
            <div className="estimate-side-note"><span className="note-dot" /> For homeowners in Northern New Jersey</div>
          </div>
          <div className="estimate-form-wrap">
            <form className="estimate-form" onSubmit={prepareInquiry}>
              <div className="form-row">
                <label>Your name<input name="name" autoComplete="name" placeholder="How should we address you?" required data-testid="input-name" /></label>
                <label>Your town<input name="town" autoComplete="address-level2" placeholder="Northern NJ town" required data-testid="input-town" /></label>
              </div>
              <div className="form-row">
                <label>Project type<select name="project" required defaultValue="" data-testid="select-project"><option value="" disabled>Select one</option><option>Kitchen renovation</option><option>Bathroom renovation</option><option>General contracting</option><option>Not sure yet</option></select></label>
                <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required data-testid="input-email" /></label>
              </div>
              <div className="form-row">
                <label>Phone <span className="optional">(optional)</span><input name="phone" type="tel" autoComplete="tel" placeholder="If you'd like to include it" data-testid="input-phone" /></label>
                <label>Ideal timing <span className="optional">(optional)</span><select name="timing" defaultValue="" data-testid="select-timing"><option value="">Choose a timeframe</option><option>As soon as practical</option><option>In the next few months</option><option>Later this year</option><option>Still exploring</option></select></label>
              </div>
              <label>What are you hoping to change?<textarea name="details" rows={4} placeholder="A few words about the space, what is working, and what you would like to be different..." required data-testid="input-details" /></label>
              <div className="form-bottom">
                <p>Your details stay in this browser until you choose to copy the inquiry.</p>
                <button type="submit" className="button button-clay" data-testid="button-prepare-inquiry">Prepare my inquiry <ArrowRight size={16} /></button>
              </div>
            </form>
            {prepared && (
              <div className="prepared-panel" ref={resultRef} aria-live="polite" data-testid="status-prepared">
                <div className="prepared-heading"><span className="prepared-check"><Check size={16} /></span><div><strong>Your inquiry is ready to copy.</strong><p>It has not been sent. JulSan has not received your information.</p></div></div>
                <textarea className="prepared-text" value={prepared} readOnly aria-label="Prepared inquiry text" onFocus={(event) => event.currentTarget.select()} data-testid="output-inquiry" />
                <div className="prepared-actions"><button type="button" className="button button-dark copy-button" onClick={copyInquiry} data-testid="button-copy-inquiry"><Copy size={15} />{copied ? 'Copied to clipboard' : 'Copy inquiry text'}</button><span>{copyError || 'Paste it into a message to JulSan when you have their contact details.'}</span></div>
              </div>
            )}
            <p className="privacy-note">This form prepares text for you to copy. It does not send or store your inquiry, and no message is transmitted to JulSan.</p>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#top" data-testid="link-footer-home"><span className="brand-mark">J<span>·</span>S</span><span className="brand-name">JulSan <small>HOME IMPROVEMENT</small></span></a>
        <p>Thoughtful home improvement<br />for Northern New Jersey.</p>
        <nav aria-label="Footer navigation"><a href="#services">Services</a><a href="#approach">Our approach</a><a href="#questions">Questions</a><a href="#estimate">Estimate inquiry</a></nav>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} JulSan Home Improvement</span><a href="https://ladmedia.co" target="_blank" rel="noopener noreferrer">Built and powered by LAD MEDIA</a></div>
      </footer>
    </main>
  );
}

export default App;
