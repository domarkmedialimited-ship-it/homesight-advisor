import { useState } from "react";
import {
  Menu,
  X,
  Phone,
  Compass,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Building2,
  Home,
  ArrowRight,
  Instagram,
  Facebook,
} from "lucide-react";
import logo from "@/assets/sweethomes-logo.png";
import consultantHero from "@/assets/consultant-hero.jpeg";
import consultantStanding from "@/assets/consultant-standing.jpeg";
import propertyHome from "@/assets/property-home.jpg";
import propertyLand from "@/assets/property-land.jpg";
import propertyApartment from "@/assets/property-apartment.jpg";

const WHATSAPP = "https://wa.me/2348067562646";
const PHONE = "+2348067562646";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Why SweetHomes", href: "#why" },
  { label: "Services", href: "#services" },
  { label: "Properties", href: "#properties" },
  { label: "Contact", href: "#contact" },
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 h-20 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <img src={logo} alt="SweetHomes Realty" className="h-10 md:h-12 w-auto object-contain" />
        </a>
        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm tracking-wide text-navy hover:text-crimson transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-crimson text-white text-sm font-medium rounded-md hover:bg-crimson-dark transition-colors"
        >
          Speak With Us
        </a>
        <button
          className="lg:hidden text-navy"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-5 py-6 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base text-navy py-1"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center px-5 py-3 bg-crimson text-white rounded-md"
            >
              Speak With Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-navy text-white"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, rgba(7,16,47,1), rgba(30,59,99,0.95)), repeating-linear-gradient(45deg, transparent 0 40px, rgba(255,255,255,0.025) 40px 41px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/70 mb-6">
            <span className="h-px w-8 bg-crimson" />
            SweetHomes Realty
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
            Your Trusted Guide To The Right Investment.
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
            Find, secure, and invest in properties with confidence, structure, and trust.
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-crimson text-white font-medium rounded-md hover:bg-crimson-dark transition-colors"
            >
              Speak With Us <ArrowRight size={18} />
            </a>
            <a
              href="#properties"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/40 text-white font-medium rounded-md hover:bg-white/10 transition-colors"
            >
              View Properties
            </a>
          </div>
          <p className="text-sm text-white/60 italic font-accent">
            Property guidance for buyers, families, investors, and diaspora clients.
          </p>
        </div>
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-crimson" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-crimson" />
          <div className="relative rounded-lg overflow-hidden bg-navy-soft shadow-2xl">
            <img
              src={consultantHero}
              alt="Lead consultant at SweetHomes Realty"
              width={1024}
              height={1280}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
  light,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl mb-12 md:mb-16">
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] mb-4 ${
            light ? "text-white/70" : "text-crimson"
          }`}
        >
          <span className="h-px w-8 bg-crimson" />
          {eyebrow}
        </div>
      )}
      <h2
        className={`font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-5 ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {body && (
        <p className={`text-lg leading-relaxed ${light ? "text-white/75" : "text-muted-foreground"}`}>
          {body}
        </p>
      )}
    </div>
  );
}

function WhySection() {
  const items = [
    {
      icon: Compass,
      title: "Structured Guidance",
      body: "A clearer path from interest to ownership.",
    },
    {
      icon: ShieldCheck,
      title: "Trusted Support",
      body: "Professional help before, during, and after your decision.",
    },
    {
      icon: TrendingUp,
      title: "Long-Term Thinking",
      body: "Property choices shaped by value, access, and future demand.",
    },
  ];
  return (
    <section id="why" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeading
          eyebrow="Why SweetHomes"
          title="Property decisions need more than excitement."
          body="The right property should give you more than space. It should offer stability, value, and a clear reason to invest."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it) => (
            <div
              key={it.title}
              className="p-8 border border-border rounded-lg hover:border-crimson/40 hover:shadow-lg transition-all bg-card"
            >
              <div className="w-12 h-12 rounded-md bg-navy/5 flex items-center justify-center mb-5">
                <it.icon className="text-crimson" size={22} />
              </div>
              <h3 className="font-display text-xl text-navy mb-3">{it.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatWeDo() {
  const items = [
    { n: "01", title: "Find", body: "Property options that match your goal." },
    { n: "02", title: "Secure", body: "A more structured buying process." },
    { n: "03", title: "Invest", body: "Decisions built around long-term value." },
  ];
  return (
    <section id="services" className="py-20 md:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeading eyebrow="What We Do" title="We guide you from search to ownership." />
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it) => (
            <div
              key={it.n}
              className="p-8 bg-background border border-border rounded-lg relative overflow-hidden group"
            >
              <div className="font-display text-5xl text-crimson/15 mb-4 group-hover:text-crimson/30 transition-colors">
                {it.n}
              </div>
              <h3 className="font-display text-2xl text-navy mb-3">{it.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{it.body}</p>
              <div className="absolute top-0 left-0 h-px w-12 bg-crimson" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhoWeHelp() {
  const groups = [
    { title: "First-time home buyers", body: "Guidance for your first major property decision." },
    { title: "Working professionals", body: "Properties that support stability and future planning." },
    { title: "Young families", body: "Homes chosen for comfort, access, and everyday living." },
    { title: "Property investors", body: "Opportunities considered beyond price alone." },
    { title: "Diaspora buyers", body: "Support for investing back home with more confidence." },
  ];
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeading
          eyebrow="Who We Help"
          title="For buyers who want to move with confidence."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {groups.map((g) => (
            <div
              key={g.title}
              className="p-7 border border-border rounded-lg bg-card hover:bg-navy hover:text-white transition-colors group"
            >
              <h3 className="font-display text-lg mb-2 group-hover:text-white">{g.title}</h3>
              <p className="text-muted-foreground leading-relaxed group-hover:text-white/75">
                {g.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationIntel() {
  const points = [
    { title: "Access", body: "How easily people can move in and out." },
    { title: "Demand", body: "What makes the area useful to buyers and tenants." },
    { title: "Development", body: "What is growing around the property." },
    { title: "Future Value", body: "Why the location can matter beyond today." },
  ];
  return (
    <section
      className="py-20 md:py-28 bg-navy text-white relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(7,16,47,0.97), rgba(7,16,47,0.97)), repeating-linear-gradient(0deg, transparent 0 60px, rgba(255,255,255,0.03) 60px 61px), repeating-linear-gradient(90deg, transparent 0 60px, rgba(255,255,255,0.03) 60px 61px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeading
          light
          eyebrow="Location Intelligence"
          title="Not every location is worth your money."
          body="We help you look beyond price and consider access, demand, development, and future value."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p) => (
            <div key={p.title} className="border-t border-white/15 pt-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} className="text-crimson" />
                <h3 className="font-display text-xl text-white">{p.title}</h3>
              </div>
              <p className="text-white/70 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProperties() {
  const props = [
    {
      img: propertyHome,
      title: "Modern Family Home",
      location: "Lagos, Nigeria",
      type: "Residential",
      desc: "A refined home option for comfort, access, and everyday living.",
      Icon: Home,
    },
    {
      img: propertyLand,
      title: "Investment Land Opportunity",
      location: "Nigeria",
      type: "Land / Investment",
      desc: "A property option considered for access, growth, and future value.",
      Icon: MapPin,
    },
    {
      img: propertyApartment,
      title: "Premium Apartment Option",
      location: "Nigeria",
      type: "Apartment",
      desc: "A clean residential option for living, rental, or long-term planning.",
      Icon: Building2,
    },
  ];
  return (
    <section id="properties" className="py-20 md:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeading
          eyebrow="Featured Properties"
          title="Selected Property Opportunities"
          body="Explore homes and investment options chosen with purpose."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {props.map((p) => (
            <article
              key={p.title}
              className="bg-background rounded-lg overflow-hidden border border-border group hover:shadow-xl transition-all"
            >
              <div className="overflow-hidden aspect-[4/3]">
                <img
                  src={p.img}
                  alt={p.title}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-crimson mb-3">
                  <p.Icon size={14} /> {p.type}
                </div>
                <h3 className="font-display text-xl text-navy mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{p.location}</p>
                <p className="text-muted-foreground leading-relaxed mb-5">{p.desc}</p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-navy font-medium border-b border-crimson pb-1 hover:text-crimson transition-colors"
                >
                  Request Details <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    "Tell us what you need.",
    "Review suitable options.",
    "Inspect and compare.",
    "Move forward with guidance.",
  ];
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeading eyebrow="Our Process" title="A clearer way to begin." />
        <div className="grid md:grid-cols-4 gap-8 md:gap-4 relative">
          <div className="hidden md:block absolute top-6 left-[12%] right-[12%] h-px bg-border" />
          {steps.map((s, i) => (
            <div key={i} className="relative text-center md:text-left">
              <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-crimson text-white font-display text-lg mb-4 z-10">
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="font-display text-lg text-navy max-w-[14rem] mx-auto md:mx-0">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-20 md:py-28 bg-navy text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent 0 40px, rgba(214,13,12,0.5) 40px 41px)",
        }}
      />
      <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/70 mb-5">
            <span className="h-px w-8 bg-crimson" /> A Better Decision
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-5">
            Make your next property decision with confidence.
          </h2>
          <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-xl">
            SweetHomes Realty gives you the guidance, structure, and support to choose better.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-crimson text-white font-medium rounded-md hover:bg-crimson-dark transition-colors"
            >
              Speak With SweetHomes Realty
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/40 text-white font-medium rounded-md hover:bg-white/10 transition-colors"
            >
              Chat With Us On WhatsApp
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-4 -right-4 w-24 h-24 border-r-2 border-t-2 border-crimson" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 border-l-2 border-b-2 border-crimson" />
          <div className="relative rounded-lg overflow-hidden bg-navy-soft shadow-2xl">
            <img
              src={consultantStanding}
              alt="SweetHomes Realty lead consultant"
              width={1024}
              height={1280}
              loading="lazy"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.83a8.16 8.16 0 0 0 4.77 1.52V6.92a4.85 4.85 0 0 1-1.84-.23z" />
    </svg>
  );
}

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-2 gap-12">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Looking for the right property?"
            body="Share your budget, preferred location, and buying purpose. We'll guide you from there."
          />
          <div className="space-y-5">
            <a href={`tel:${PHONE}`} className="flex items-center gap-3 text-navy hover:text-crimson">
              <Phone size={18} className="text-crimson" />
              <span className="font-medium">+234 806 756 2646</span>
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-navy text-navy rounded-md hover:bg-navy hover:text-white transition-colors"
            >
              Chat With Us On WhatsApp
            </a>
            <div className="pt-6">
              <p className="text-sm uppercase tracking-wider text-muted-foreground mb-3">Follow Us</p>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/sweethomes_realty?igsh=OWgwN3loa3I4amlk"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-navy hover:bg-crimson hover:text-white hover:border-crimson transition-colors"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://www.facebook.com/share/1E9bomyjue/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-navy hover:bg-crimson hover:text-white hover:border-crimson transition-colors"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://www.tiktok.com/@sweethomes__realty?_r=1&_t=ZS-96KFvTr3nb3"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-navy hover:bg-crimson hover:text-white hover:border-crimson transition-colors"
                >
                  <TikTokIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-secondary rounded-lg p-6 md:p-8 border border-border">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-14 h-14 rounded-full bg-crimson/10 flex items-center justify-center mb-5">
                <ShieldCheck className="text-crimson" />
              </div>
              <h3 className="font-display text-2xl text-navy mb-3">Thank you.</h3>
              <p className="text-muted-foreground">SweetHomes Realty will contact you shortly.</p>
            </div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (submitting) return;
                setSubmitError(null);
                const fd = new FormData(e.currentTarget);
                const payload = {
                  name: String(fd.get("name") ?? ""),
                  phone: String(fd.get("phone") ?? ""),
                  email: String(fd.get("email") ?? ""),
                  location: String(fd.get("location") ?? ""),
                  budget: String(fd.get("budget") ?? ""),
                  purpose: String(fd.get("purpose") ?? ""),
                  message: String(fd.get("message") ?? ""),
                };
                setSubmitting(true);
                try {
                  const res = await fetch("/api/public/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                  });
                  if (!res.ok) throw new Error("Request failed");
                  setSubmitted(true);
                } catch {
                  setSubmitError(
                    "Something went wrong. Please try again or contact us directly on WhatsApp.",
                  );
                } finally {
                  setSubmitting(false);
                }
              }}
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full Name" name="name" required />
                <Field label="Phone Number" name="phone" type="tel" required />
              </div>
              <Field label="Email Address" name="email" type="email" required />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Preferred Location" name="location" />
                <Field label="Budget Range" name="budget" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Buying Purpose</label>
                <select
                  name="purpose"
                  className="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:border-crimson"
                >
                  <option>Live</option>
                  <option>Invest</option>
                  <option>Rent Out</option>
                  <option>Not Sure Yet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:border-crimson resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-crimson text-white font-medium rounded-md hover:bg-crimson-dark transition-colors"
              >
                Send Property Request
              </button>
              {submitError && (
                <p className="text-sm text-crimson mt-2" role="alert">
                  {submitError}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-navy mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:border-crimson"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-navy text-white pt-16 pb-8 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-crimson" />
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          <div>
            <div className="bg-white inline-block p-3 rounded-md mb-5">
              <img src={logo} alt="SweetHomes Realty" className="h-10 w-auto object-contain" />
            </div>
            <p className="font-display text-lg mb-2">Your Trusted Guide To The Right Investment.</p>
            <p className="text-white/70 text-sm leading-relaxed">
              Guiding buyers, families, and investors toward better property decisions.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm uppercase tracking-wider text-white/60 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-white/85 hover:text-crimson transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm uppercase tracking-wider text-white/60 mb-4">
              Contact
            </h4>
            <a
              href={`tel:${PHONE}`}
              className="block text-white/85 hover:text-crimson mb-4"
            >
              +234 806 756 2646
            </a>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/sweethomes_realty?igsh=OWgwN3loa3I4amlk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-crimson hover:border-crimson"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.facebook.com/share/1E9bomyjue/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-crimson hover:border-crimson"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://www.tiktok.com/@sweethomes__realty?_r=1&_t=ZS-96KFvTr3nb3"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-crimson hover:border-crimson"
              >
                <TikTokIcon size={16} />
              </a>
            </div>
          </div>
        </div>
        <p className="pt-6 text-center text-white/50 text-sm">
          © {new Date().getFullYear()} SweetHomes Realty. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <WhySection />
        <WhatWeDo />
        <WhoWeHelp />
        <LocationIntel />
        <FeaturedProperties />
        <Process />
        <FinalCTA />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}