import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronDown, 
  ChevronUp,
  Wrench,
  CircleDot,
  Wind,
  Hammer,
  Warehouse,
  Star,
  CheckCircle2,
  Clock
} from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

type Language = 'fi' | 'sv';

const translations = {
  fi: {
    nav: { services: 'Palvelut', prices: 'Hinnat', contact: 'Yhteys' },
    hero: {
      eyebrow: 'TORNION VANNEFIXAUS',
      headline: 'VANNEFIXAUS',
      subheadline: 'Rengaskauppa ja korjaamo Torniossa — ammattitaidolla ja joustavasti.',
      cta: 'Varaa aika',
      caption: 'Aukioloajat sopimuksen mukaan. Tule käymään!',
    },
    services: {
      tireWorks: {
        title: 'RENKAAT & VANTEET',
        subtitle: 'Myynti, asennus, tasapainotus ja korjaus — kaikki merkit saatavilla.',
        items: ['Rengastyö + tasapainotus (4kpl) — alk. 60 €', 'Rengashotelli (kausi) — alk. 80 €', 'Paikkaus — alk. 25 €'],
        cta: 'Kysy tarjous',
      },
      alignment: {
        title: 'NELIPYÖRÄSUUNTAUS',
        subtitle: 'Tarkka suuntaus ammattikalustolla — parempi ajotarkkuus ja rengaskestävyys.',
        price: 'Alk. 120 €',
        cta: 'Varaa suuntaus',
        note: 'Sisältää kulmien tarkistuksen ja raportin.',
      },
      ac: {
        title: 'ILMASTOINTIHUOLTO',
        subtitle: 'Täyttö, vuototesti ja desinfiointi — jotta ilma pysyy raikkaana.',
        items: ['R134a — alk. 75 €', 'R1234yf — alk. 120 €'],
        cta: 'Tarkista saatavuus',
      },
      wheelRepair: {
        title: 'VANTEIDEN OIKAISU',
        subtitle: 'Kieroutuneiden vanteiden suoristus ammattikalustolla.',
        items: ['Vanteen oikaisu (kiero / vaurio)', 'Tarkistus ja testaus'],
        cta: 'Lähetä kuva',
      },
      welding: {
        title: 'ALUMIINIHITSAUS',
        subtitle: 'TIG/MIG-hitsaus vanteille ja muille alumiinikomponenteille.',
        price: 'Kysy hinta',
        cta: 'Kysy tarjous',
        note: 'Myös muut hitsaustyöt sopimuksen mukaan.',
      },
    },
    additionalServices: {
      title: 'LISÄPALVELUT',
      items: [
        'Määräaikaishuollot',
        'Katsastuskorjaukset',
        'Vikakoodien luku & kuittaus',
        'Öljynvaihdot',
        'Jarrutyöt',
        'Alustatyöt',
      ],
    },
    reviews: {
      title: 'ASIAKKAAT',
      subtitle: 'Mitä paikalliset ajattelevat palvelustamme.',
      items: [
        { text: 'Todella nopea ja osaava palvelu. Rengas paikattu ja matka jatkui heti.', author: 'Mikko' },
        { text: 'Vanne oikaistiin ja tasapainotus tehtiin huolella. Ei enää tärinää.', author: 'Sara' },
        { text: 'Helppo ajanvaraus WhatsAppilla ja reilu hinnoittelu. Suosittelen!', author: 'Antti' },
      ],
      cta: 'Yhteystiedot',
    },
    faq: {
      title: 'USEIN KYSYTYT',
      subtitle: 'Lyhyet vastaukset — kysy lisää WhatsAppilla.',
      items: [
        { q: 'Miten ajan voi varata?', a: 'Nopeimmin WhatsAppilla tai soittamalla. Vahvistamme tarkan ajan ja työn sisällön.' },
        { q: 'Missä sijaitsette?', a: 'Harrinkuja 43, Tornio. Pihassa hyvin tilaa kääntyä ja odottaa.' },
        { q: 'Milloin olette auki?', a: 'Aukioloajat sopimuksen mukaan. Ota yhteyttä ja sovi aika!' },
        { q: 'Onko takuu?', a: 'Kyllä. Työlle myönnetään takuu. Kerromme siitä työn aloituksen yhteydessä.' },
      ],
    },
    contact: {
      title: 'YHTEYSTIEDOT',
      subtitle: 'Tule käymään tai ota yhteyttä — vastaamme nopeasti.',
      whatsapp: 'WhatsApp / Puhelin',
      email: 'Sähköposti',
      address: 'Osoite',
      hours: 'Aukioloajat',
      ctaPrimary: 'Ajanvaraus',
      ctaSecondary: 'Soita',
      note: 'Harrinkuja 43, Tornio. Pihassa hyvin tilaa ja helppo kääntyä peräkärryn kanssa.',
    },
  },
  sv: {
    nav: { services: 'Tjänster', prices: 'Priser', contact: 'Kontakt' },
    hero: {
      eyebrow: 'TORNIO FÄLGFIX',
      headline: 'FÄLGFIX',
      subheadline: 'Däckbutik och verkstad i Torneå — professionellt och flexibelt.',
      cta: 'Boka tid',
      caption: 'Öppettider enligt överenskommelse. Välkommen!',
    },
    services: {
      tireWorks: {
        title: 'DÄCK & FÄLGAR',
        subtitle: 'Försäljning, montering, balansering och reparation — alla märken tillgängliga.',
        items: ['Däckarbete + balansering (4st) — fr. 60 €', 'Däckhotell (säsong) — fr. 80 €', 'Lagning — fr. 25 €'],
        cta: 'Fråga om offert',
      },
      alignment: {
        title: '4-HJULSINSTÄLLNING',
        subtitle: 'Precis inställning med professionell utrustning.',
        price: 'Fr. 120 €',
        cta: 'Boka inställning',
        note: 'Inkluderar vinkelkontroll och rapport.',
      },
      ac: {
        title: 'AIRCON-SERVICE',
        subtitle: 'Påfyllning, läckagetest och desinficering.',
        items: ['R134a — fr. 75 €', 'R1234yf — fr. 120 €'],
        cta: 'Kolla tillgänglighet',
      },
      wheelRepair: {
        title: 'FÄLGRÄTNING',
        subtitle: 'Rätning av skeva fälgar med professionell utrustning.',
        items: ['Fälgrätning (skev / skada)', 'Kontroll och testning'],
        cta: 'Skicka bild',
      },
      welding: {
        title: 'ALUMINIUMSVETSNING',
        subtitle: 'TIG/MIG-svetsning för fälgar och andra aluminiumkomponenter.',
        price: 'Fråga om pris',
        cta: 'Fråga om offert',
        note: 'Även andra svetsjobb enligt överenskommelse.',
      },
    },
    additionalServices: {
      title: 'YTTERLIGARE TJÄNSTER',
      items: [
        'Periodisk service',
        'Besiktningsreparationer',
        'Felkodsläsning & kvittering',
        'Oljebyten',
        'Bromsarbete',
        'Underredearbete',
      ],
    },
    reviews: {
      title: 'KUNDER',
      subtitle: 'Vad lokalbefolkningen tycker om vår service.',
      items: [
        { text: 'Verkligen snabb och kunnig service. Däcket lagat och resan fortsatte direkt.', author: 'Mikko' },
        { text: 'Fälgen rätades och balanseringen gjordes noggrant. Ingen mer vibration.', author: 'Sara' },
        { text: 'Enkel bokning via WhatsApp och rimlig prissättning. Rekommenderar!', author: 'Antti' },
      ],
      cta: 'Kontaktuppgifter',
    },
    faq: {
      title: 'VANLIGA FRÅGOR',
      subtitle: 'Korta svar — fråga mer via WhatsApp.',
      items: [
        { q: 'Hur bokar jag tid?', a: 'Snabbast via WhatsApp eller genom att ringa.' },
        { q: 'Var finns ni?', a: 'Harrinkuja 43, Torneå. Gårdsplan med gott om utrymme.' },
        { q: 'När har ni öppet?', a: 'Öppettider enligt överenskommelse. Kontakta oss!' },
        { q: 'Finns det garanti?', a: 'Ja. Arbete ges garanti.' },
      ],
    },
    contact: {
      title: 'KONTAKTUPPGIFTER',
      subtitle: 'Kom förbi eller kontakta oss — vi svarar snabbt.',
      whatsapp: 'WhatsApp / Telefon',
      email: 'E-post',
      address: 'Adress',
      hours: 'Öppettider',
      ctaPrimary: 'Boka tid',
      ctaSecondary: 'Ring',
      note: 'Harrinkuja 43, Torneå. Gårdsplan med gott om utrymme.',
    },
  },
};

function App() {
  const [lang, setLang] = useState<Language>('fi');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const t = translations[lang];

  const heroRef = useRef<HTMLDivElement>(null);
  const tireWorksRef = useRef<HTMLDivElement>(null);
  const alignmentRef = useRef<HTMLDivElement>(null);
  const acRef = useRef<HTMLDivElement>(null);
  const wheelRepairRef = useRef<HTMLDivElement>(null);
  const weldingRef = useRef<HTMLDivElement>(null);
  const additionalRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      heroTl
        .fromTo('.hero-overlay', { opacity: 0 }, { opacity: 1, duration: 0.3 })
        .fromTo('.hero-eyebrow', { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, 0.2)
        .fromTo('.hero-headline', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.25)
        .fromTo('.hero-subheadline', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.4)
        .fromTo('.hero-cta', { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 }, 0.5)
        .fromTo('.hero-image-card', { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, 0.3)
        .fromTo('.hero-caption', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.6);

      const sections = [
        { ref: tireWorksRef, selector: '.tireworks-animate' },
        { ref: alignmentRef, selector: '.alignment-animate' },
        { ref: acRef, selector: '.ac-animate' },
        { ref: wheelRepairRef, selector: '.wheel-animate' },
        { ref: weldingRef, selector: '.welding-animate' },
        { ref: additionalRef, selector: '.additional-animate' },
      ];

      sections.forEach(({ ref, selector }) => {
        if (ref.current) {
          const elements = ref.current.querySelectorAll(selector);
          gsap.fromTo(elements, 
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: ref.current,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        }
      });

      if (reviewsRef.current) {
        gsap.fromTo('.reviews-heading', { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6,
          scrollTrigger: { trigger: reviewsRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        });
        gsap.fromTo('.review-card-item', { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.15,
          scrollTrigger: { trigger: '.reviews-grid', start: 'top 80%', toggleActions: 'play none none reverse' }
        });
      }

      if (faqRef.current) {
        gsap.fromTo('.faq-heading', { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6,
          scrollTrigger: { trigger: faqRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        });
        gsap.fromTo('.faq-row', { y: 20, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.4, stagger: 0.1,
          scrollTrigger: { trigger: '.faq-list', start: 'top 80%', toggleActions: 'play none none reverse' }
        });
      }

      if (contactRef.current) {
        gsap.fromTo('.contact-left', { x: -40, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.7,
          scrollTrigger: { trigger: contactRef.current, start: 'top 75%', toggleActions: 'play none none reverse' }
        });
        gsap.fromTo('.contact-right', { x: 40, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.7,
          scrollTrigger: { trigger: contactRef.current, start: 'top 75%', toggleActions: 'play none none reverse' }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const phoneNumber = '+358407571541';
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\+/g, '')}`;
  const telLink = `tel:${phoneNumber}`;

  return (
    <div className="relative bg-charcoal min-h-screen overflow-x-hidden">
      <div className="grain-overlay" />

      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-gradient-to-b from-charcoal/90 to-transparent">
        <div className="font-mono text-xs tracking-wider text-white/80">Tornion VanneFixaus</div>
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection(tireWorksRef)} className="nav-link">{t.nav.services}</button>
          <button onClick={() => scrollToSection(alignmentRef)} className="nav-link">{t.nav.prices}</button>
          <button onClick={() => scrollToSection(contactRef)} className="nav-link">{t.nav.contact}</button>
        </div>
        <div className="lang-toggle flex items-center gap-1">
          <button onClick={() => setLang('fi')} className={lang === 'fi' ? 'active' : ''}>FI</button>
          <span className="text-white/30">/</span>
          <button onClick={() => setLang('sv')} className={lang === 'sv' ? 'active' : ''}>SV</button>
        </div>
      </nav>

      <section ref={heroRef} className="relative min-h-screen w-full">
        <div className="absolute inset-0">
          <img src="./images/hero_workshop_bg.jpg" alt="Workshop" className="w-full h-full object-cover" />
          <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-charcoal/55 to-charcoal/85" />
        </div>
        <div className="hero-rule vertical-rule absolute left-[4.5vw] top-[18vh] h-[64vh] origin-top hidden lg:block" />
        <div className="hero-headline-block absolute left-[5vw] lg:left-[7vw] top-[15vh] lg:top-[18vh] w-[90vw] lg:w-[46vw]">
          <div className="hero-eyebrow font-mono text-xs tracking-widest text-white/60 mb-4">{t.hero.eyebrow}</div>
          <h1 className="hero-headline font-display text-[clamp(36px,10vw,84px)] font-bold text-white uppercase leading-[0.95] tracking-tight">{t.hero.headline}</h1>
          <p className="hero-subheadline mt-6 text-base lg:text-lg text-gray-text max-w-md">{t.hero.subheadline}</p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hero-cta btn-primary mt-8 inline-flex items-center gap-2">
            <MessageCircle size={18} />{t.hero.cta}
          </a>
        </div>
        <div className="hero-image-card image-card absolute right-[5vw] lg:right-[6vw] top-auto bottom-[15vh] lg:top-[18vh] w-[90vw] lg:w-[34vw] h-[30vh] lg:h-[56vh]">
          <img src="./images/hero_service_card.jpg" alt="Tire service" className="w-full h-full object-cover" />
        </div>
        <div className="hero-caption absolute right-[5vw] lg:right-[6vw] bottom-[5vh] lg:top-[78vh] w-[90vw] lg:w-[34vw]">
          <p className="text-sm text-white/60">{t.hero.caption}</p>
        </div>
      </section>

      <section ref={tireWorksRef} className="relative z-20 bg-charcoal py-20 lg:py-32 px-[5vw] lg:px-[6vw]">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <div className="tireworks-animate image-card w-full lg:w-[40vw] h-[35vh] lg:h-[56vh] flex-shrink-0">
            <img src="./images/tire_fitting.jpg" alt="Tire fitting" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="tireworks-animate flex items-center gap-3 mb-4">
              <CircleDot className="text-yellow-accent" size={24} />
              <span className="font-mono text-xs tracking-widest text-white/50">PALVELU 01</span>
            </div>
            <h2 className="tireworks-animate font-display text-[clamp(28px,8vw,64px)] font-bold text-white uppercase leading-tight tracking-tight">{t.services.tireWorks.title}</h2>
            <p className="tireworks-animate mt-4 text-gray-text max-w-md">{t.services.tireWorks.subtitle}</p>
            <div className="mt-8 space-y-0">
              {t.services.tireWorks.items.map((item, i) => (
                <div key={i} className="tireworks-animate flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-white/10 gap-1">
                  <span className="text-white/80 text-sm lg:text-base">{item.split('—')[0]}</span>
                  <span className="price-highlight font-semibold">{item.split('—')[1]}</span>
                </div>
              ))}
            </div>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="tireworks-animate btn-primary mt-8 inline-flex items-center gap-2">
              <MessageCircle size={18} />{t.services.tireWorks.cta}
            </a>
          </div>
        </div>
      </section>

      <section ref={alignmentRef} className="relative z-30 bg-charcoal py-20 lg:py-32 px-[5vw] lg:px-[7vw]">
        <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 items-center">
          <div className="flex-1">
            <div className="alignment-animate flex items-center gap-3 mb-4">
              <Wrench className="text-yellow-accent" size={24} />
              <span className="font-mono text-xs tracking-widest text-white/50">PALVELU 02</span>
            </div>
            <h2 className="alignment-animate font-display text-[clamp(28px,8vw,64px)] font-bold text-white uppercase leading-tight tracking-tight">{t.services.alignment.title}</h2>
            <p className="alignment-animate mt-4 text-gray-text max-w-md">{t.services.alignment.subtitle}</p>
            <div className="alignment-animate mt-8">
              <div className="text-2xl lg:text-3xl font-display font-bold text-yellow-accent mb-4">{t.services.alignment.price}</div>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                <MessageCircle size={18} />{t.services.alignment.cta}
              </a>
              <p className="mt-4 text-sm text-white/50 max-w-sm">{t.services.alignment.note}</p>
            </div>
          </div>
          <div className="alignment-animate image-card w-full lg:w-[40vw] h-[35vh] lg:h-[56vh] flex-shrink-0">
            <img src="./images/alignment.jpg" alt="Wheel alignment" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section ref={acRef} className="relative z-40 bg-charcoal py-20 lg:py-32 px-[5vw] lg:px-[6vw]">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <div className="ac-animate image-card w-full lg:w-[40vw] h-[35vh] lg:h-[56vh] flex-shrink-0">
            <img src="./images/ac_service.jpg" alt="AC service" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="ac-animate flex items-center gap-3 mb-4">
              <Wind className="text-yellow-accent" size={24} />
              <span className="font-mono text-xs tracking-widest text-white/50">PALVELU 03</span>
            </div>
            <h2 className="ac-animate font-display text-[clamp(28px,8vw,64px)] font-bold text-white uppercase leading-tight tracking-tight">{t.services.ac.title}</h2>
            <p className="ac-animate mt-4 text-gray-text max-w-md">{t.services.ac.subtitle}</p>
            <div className="mt-8 space-y-0">
              {t.services.ac.items.map((item, i) => (
                <div key={i} className="ac-animate flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-white/10 gap-1">
                  <span className="text-white/80 text-sm lg:text-base">{item.split('—')[0]}</span>
                  <span className="price-highlight font-semibold">{item.split('—')[1]}</span>
                </div>
              ))}
            </div>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="ac-animate btn-primary mt-8 inline-flex items-center gap-2">
              <MessageCircle size={18} />{t.services.ac.cta}
            </a>
          </div>
        </div>
      </section>

      <section ref={wheelRepairRef} className="relative z-50 bg-charcoal py-20 lg:py-32 px-[5vw] lg:px-[7vw]">
        <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 items-center">
          <div className="flex-1">
            <div className="wheel-animate flex items-center gap-3 mb-4">
              <Hammer className="text-yellow-accent" size={24} />
              <span className="font-mono text-xs tracking-widest text-white/50">PALVELU 04</span>
            </div>
            <h2 className="wheel-animate font-display text-[clamp(28px,8vw,64px)] font-bold text-white uppercase leading-tight tracking-tight">{t.services.wheelRepair.title}</h2>
            <p className="wheel-animate mt-4 text-gray-text max-w-md">{t.services.wheelRepair.subtitle}</p>
            <div className="mt-8 space-y-3">
              {t.services.wheelRepair.items.map((item, i) => (
                <div key={i} className="wheel-animate flex items-center gap-3">
                  <CheckCircle2 className="text-yellow-accent flex-shrink-0" size={18} />
                  <span className="text-white/80 text-sm lg:text-base">{item}</span>
                </div>
              ))}
            </div>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="wheel-animate btn-primary mt-8 inline-flex items-center gap-2">
              <MessageCircle size={18} />{t.services.wheelRepair.cta}
            </a>
          </div>
          <div className="wheel-animate image-card w-full lg:w-[40vw] h-[35vh] lg:h-[56vh] flex-shrink-0">
            <img src="./images/wheel_repair.jpg" alt="Wheel repair" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section ref={weldingRef} className="relative z-[60] bg-charcoal py-20 lg:py-32 px-[5vw] lg:px-[6vw]">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <div className="welding-animate image-card w-full lg:w-[40vw] h-[35vh] lg:h-[56vh] flex-shrink-0">
            <img src="./images/tire_hotel.jpg" alt="Welding" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="welding-animate flex items-center gap-3 mb-4">
              <Warehouse className="text-yellow-accent" size={24} />
              <span className="font-mono text-xs tracking-widest text-white/50">PALVELU 05</span>
            </div>
            <h2 className="welding-animate font-display text-[clamp(28px,8vw,64px)] font-bold text-white uppercase leading-tight tracking-tight">{t.services.welding.title}</h2>
            <p className="welding-animate mt-4 text-gray-text max-w-md">{t.services.welding.subtitle}</p>
            <div className="welding-animate mt-8">
              <div className="text-2xl lg:text-3xl font-display font-bold text-yellow-accent mb-4">{t.services.welding.price}</div>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                <MessageCircle size={18} />{t.services.welding.cta}
              </a>
              <p className="mt-4 text-sm text-white/50 max-w-sm">{t.services.welding.note}</p>
            </div>
          </div>
        </div>
      </section>

      <section ref={additionalRef} className="relative z-[65] bg-charcoal py-20 lg:py-32 px-[5vw] lg:px-[7vw]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="additional-animate flex items-center justify-center gap-3 mb-4">
            <Wrench className="text-yellow-accent" size={24} />
            <span className="font-mono text-xs tracking-widest text-white/50">MUUT PALVELUT</span>
          </div>
          <h2 className="additional-animate font-display text-[clamp(28px,8vw,64px)] font-bold text-white uppercase leading-tight tracking-tight">{t.additionalServices.title}</h2>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
            {t.additionalServices.items.map((item, i) => (
              <div key={i} className="additional-animate bg-white/5 border border-white/10 rounded-md p-4 flex items-center justify-center">
                <span className="text-white/80 text-sm lg:text-base text-center">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={reviewsRef} className="relative z-[70] bg-charcoal py-20 lg:py-32 px-[5vw] lg:px-[7vw]">
        <div className="reviews-heading mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Star className="text-yellow-accent" size={24} />
            <span className="font-mono text-xs tracking-widest text-white/50">PALAUTE</span>
          </div>
          <h2 className="font-display text-[clamp(28px,8vw,64px)] font-bold text-white uppercase leading-tight tracking-tight">{t.reviews.title}</h2>
          <p className="mt-4 text-gray-text max-w-md">{t.reviews.subtitle}</p>
        </div>
        <div className="reviews-grid grid md:grid-cols-3 gap-6 mb-12">
          {t.reviews.items.map((review, i) => (
            <div key={i} className="review-card-item review-card">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} className="text-yellow-accent fill-yellow-accent" size={16} />)}
              </div>
              <p className="text-white/90 mb-6 text-sm lg:text-base">"{review.text}"</p>
              <p className="font-mono text-sm text-white/50">— {review.author}</p>
            </div>
          ))}
        </div>
        <button onClick={() => scrollToSection(contactRef)} className="btn-outline inline-flex items-center gap-2">{t.reviews.cta}</button>
      </section>

      <section ref={faqRef} className="relative z-[80] bg-charcoal py-20 lg:py-32 px-[5vw] lg:px-[7vw]">
        <div className="faq-heading mb-12">
          <h2 className="font-display text-[clamp(28px,8vw,64px)] font-bold text-white uppercase leading-tight tracking-tight">{t.faq.title}</h2>
          <p className="mt-4 text-gray-text max-w-md">{t.faq.subtitle}</p>
        </div>
        <div className="faq-list max-w-3xl">
          {t.faq.items.map((item, i) => (
            <div key={i} className="faq-row faq-item">
              <button onClick={() => toggleFaq(i)} className="w-full py-5 flex items-center justify-between text-left gap-4">
                <span className="text-white font-medium pr-4 text-sm lg:text-base">{item.q}</span>
                {faqOpen === i ? <ChevronUp className="text-yellow-accent flex-shrink-0" size={20} /> : <ChevronDown className="text-white/50 flex-shrink-0" size={20} />}
              </button>
              {faqOpen === i && <div className="pb-5"><p className="text-gray-text text-sm lg:text-base">{item.a}</p></div>}
            </div>
          ))}
        </div>
      </section>

      <section ref={contactRef} className="relative z-[90] bg-light-bg">
        <div className="flex flex-col lg:flex-row">
          <div className="contact-left flex-1 py-16 lg:py-20 px-[5vw] lg:px-[7vw] flex flex-col justify-center">
            <h2 className="font-display text-[clamp(28px,8vw,64px)] font-bold text-charcoal uppercase leading-tight tracking-tight">{t.contact.title}</h2>
            <p className="mt-4 text-charcoal/70 max-w-md mb-10">{t.contact.subtitle}</p>
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <MessageCircle className="text-charcoal/60 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-mono text-xs tracking-wider text-charcoal/50 mb-1">{t.contact.whatsapp}</p>
                  <p className="text-charcoal font-medium">040 757 1541</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="text-charcoal/60 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-mono text-xs tracking-wider text-charcoal/50 mb-1">{t.contact.email}</p>
                  <p className="text-charcoal font-medium">tornionvannefixaus@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="text-charcoal/60 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-mono text-xs tracking-wider text-charcoal/50 mb-1">{t.contact.address}</p>
                  <p className="text-charcoal font-medium">Harrinkuja 43</p>
                  <p className="text-charcoal/60 text-sm">95420 Tornio</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="text-charcoal/60 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-mono text-xs tracking-wider text-charcoal/50 mb-1">{t.contact.hours}</p>
                  <p className="text-charcoal font-medium">{lang === 'fi' ? 'Sopimuksen mukaan' : 'Enligt överenskommelse'}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">
                <MessageCircle size={18} />{t.contact.ctaPrimary}
              </a>
              <a href={telLink} className="btn-outline border-charcoal/30 text-charcoal hover:border-yellow-accent hover:text-yellow-accent flex items-center gap-2">
                <Phone size={18} />{t.contact.ctaSecondary}
              </a>
            </div>
            <p className="text-charcoal/50 text-sm max-w-md">{t.contact.note}</p>
          </div>
          <div className="contact-right lg:w-[55%] h-[40vh] lg:min-h-[600px] relative">
            <img src="./images/location_map.jpg" alt="Location map" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
          </div>
        </div>
        <footer className="bg-charcoal py-8 px-[5vw] lg:px-[7vw]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-mono text-xs tracking-wider text-white/50">Tornion VanneFixaus © 2024</div>
            <div className="text-white/30 text-sm text-center">Rengaskauppa ja korjaamo</div>
          </div>
        </footer>
      </section>

      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-[100] bg-green-500 text-white p-3 lg:p-4 rounded-full shadow-lg hover:scale-110 transition-transform" aria-label="WhatsApp">
        <MessageCircle size={24} />
      </a>
    </div>
  );
}

export default App;
