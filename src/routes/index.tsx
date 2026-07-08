import { createFileRoute } from "@tanstack/react-router";
import portraitImg from "@/assets/vishwa-portrait.png";
import travelImg from "@/assets/project-travel.jpg";
import youtubeImg from "@/assets/project-youtube.jpg";
import motionImg from "@/assets/project-motion.jpg";
import perfumeImg from "@/assets/project-perfume.jpg";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Hire Me" },
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vishwa — Video Editor & Motion Designer Portfolio" },
      {
        name: "description",
        content:
          "Vishwa is a video editor and motion graphics designer crafting cinematic edits, kinetic graphics and brand-ready visual stories.",
      },
      { property: "og:title", content: "Vishwa — Video Editor & Motion Designer" },
      {
        property: "og:description",
        content: "Cinematic edits, motion graphics and commercial work by Vishwa.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [pill, setPill] = useState({ width: 0, left: 0 });

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updatePill = () => {
      const link = linkRefs.current[activeSection];

      if (link) {
        setPill({
          width: link.offsetWidth,
          left: link.offsetLeft,
        });
      }
    };

    updatePill();

    window.addEventListener("resize", updatePill);

    return () => {
      window.removeEventListener("resize", updatePill);
    };
  }, [activeSection]);
  return (
    <div className="min-h-screen bg-slate-50 font-body text-slate-900 overflow-x-hidden">
      <style>{`
        .grid-bg {
          background-image:
            linear-gradient(rgba(59,130,246,0.10) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.10) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
      {/* Floating Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div
          ref={navRef}
          className="relative flex items-center gap-1 bg-white/80 backdrop-blur-md p-2 rounded-full border border-brand/10 shadow-xl shadow-brand/10"
        >
          <span
            className="absolute top-2 h-[calc(100%-1rem)] rounded-full bg-brand transition-[width,transform] duration-300 ease-out pointer-events-none"
            style={{
              width: `${pill.width-10}px`,
              transform: `translateX(${pill.left}px)`,
            }}
          />

          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              ref={(el) => {
                linkRefs.current[link.id] = el;
              }}
              href={`#${link.id}`}
              className={`relative z-10 px-5 py-2 rounded-full font-medium text-sm transition-colors duration-300 ${
                activeSection === link.id
                  ? "text-white"
                  : link.id === "contact"
                    ? "text-brand"
                    : "text-slate-900"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>{" "}
      {/* Hero */}
      <header
        id="home"
        className="relative min-h-[100vh] grid-bg flex items-end justify-center overflow-hidden pt-28"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-10" />

        {/* Giant background word */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <h1 className="font-display font-bold text-[15vw] leading-none text-brand/10 tracking-tighter uppercase mt-[-6%] animate-drift">
            PORTFOLIO
          </h1>
        </div>

        {/* Top tags floating */}
        <div className="absolute top-28 left-10 z-20 hidden md:block rotate-[-6deg]">
          <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-brand/10 text-xs font-bold uppercase tracking-widest text-brand">
            Portfolio &apos;26
          </div>
        </div>
        <div className="absolute top-32 right-10 z-20 hidden md:block rotate-[5deg]">
          <div className="bg-slate-900 text-white px-4 py-2 rounded-full shadow-lg text-xs font-bold uppercase tracking-widest">
            Now booking Q3
          </div>
        </div>

        {/* Portrait + card */}
        <div className="relative z-20 flex flex-col items-center">
          <img
            src={portraitImg}
            alt="Vishwa, video editor and motion designer"
            width={800}
            height={1000}
            className="w-[70vw] max-w-[320px] md:w-[440px] md:max-w-none h-auto drop-shadow-2xl"
          />

          <div className="absolute -bottom-4 -right-2 sm:-right-8 md:-right-20 bg-white p-4 sm:p-5 md:p-6 rounded-2xl shadow-2xl border border-brand/10 max-w-[200px] sm:max-w-[260px] rotate-3 animate-floaty">
            <h2 className="font-display text-2xl font-bold text-brand leading-tight">Vishwa.</h2>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-1">
              Video & Motion Artist
            </p>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed italic">
              &ldquo;Turning raw footage into rhythmic visual stories that stick.&rdquo;
            </p>
          </div>

          <div className="absolute -bottom-2 -left-6 md:-left-24 bg-brand text-white p-4 rounded-2xl shadow-2xl rotate-[-5deg] hidden md:block">
            <div className="font-display text-3xl font-bold leading-none">04+</div>
            <div className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-80">
              Years editing
            </div>
          </div>
        </div>
      </header>
      `{/* Marquee strip */}
      <section className="bg-slate-900 py-5 overflow-hidden border-y border-slate-800">
        <div className="flex w-max whitespace-nowrap animate-marquee">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-10 px-6 shrink-0">
              {[
                "Video Editing",
                "Motion Graphics",
                "Color Grading",
                "Sound Design",
                "Storytelling",
                "Branding",
                "Cinematic Edit",
                "Kinetic Type",
              ].map((w) => (
                <span key={w} className="flex items-center gap-10">
                  <span className="text-white font-display text-2xl font-bold uppercase tracking-tight">
                    {w}
                  </span>
                  <span className="text-brand text-2xl">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>
      {/* Projects */}
      <section id="work" className="py-24 bg-brand relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6">
            <div>
              <p className="text-white/60 text-xs font-bold uppercase tracking-[0.3em] mb-3">
                Selected Work
              </p>
              <h2 className="font-display text-5xl md:text-6xl font-bold text-white tracking-tighter">
                Recent Hits.
              </h2>
            </div>
            <p className="text-white/70 max-w-md text-base">
              A handful of edits, motion pieces and commercials that defined the last twelve months.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Project
              img={travelImg}
              tag="Travel Film"
              title="Arctic Whispers"
              sub="Cinematic Edit / Color Grade"
            />
            <Project
              img={youtubeImg}
              tag="YouTube"
              title="Talking Head Series"
              sub="12-Episode Post-Production"
            />
            <Project
              img={motionImg}
              tag="Motion Graphics"
              title="Think · Create · Grow"
              sub="Brand Motion / Social"
            />
            <Project
              img={perfumeImg}
              tag="Product Ad"
              title="Larulet Noir"
              sub="Commercial / FX & Sound"
            />
            <Project
              img={travelImg}
              tag="Documentary"
              title="Voice of Silence"
              sub="Short Documentary Edit"
            />
            <Project
              img={motionImg}
              tag="Branding"
              title="Pulse Identity"
              sub="Logo Motion / Reveals"
            />
          </div>
        </div>
      </section>
      {/* About & Skills */}
      <section id="about" className="px-6 py-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-widest">
              About
            </div>
            <h3 className="text-4xl md:text-5xl font-display font-bold leading-tight tracking-tight">
              I build <span className="text-brand italic">narratives</span> through motion and
              color.
            </h3>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
              I&apos;m Vishwa, a Video Editor and Motion Graphics Designer who loves turning raw
              footage into engaging visual stories. I work with creators, brands and businesses to
              craft content that connects — and leaves an impact.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Stat value="04+" label="Years Exp." />
              <Stat value="150+" label="Projects" />
              <Stat value="12M+" label="Total Views" />
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand/30 blur-3xl -mr-16 -mt-16" />
            <h4 className="font-display text-2xl font-bold mb-6">The Arsenal</h4>
            <div className="grid grid-cols-2 gap-3">
              <Tool color="#CF96FD" mark="Ae" name="After Effects" />
              <Tool color="#9494FF" mark="Pr" name="Premiere Pro" />
              <Tool color="#FF9A00" mark="Ai" name="Illustrator" />
              <Tool color="#31A8FF" mark="Ps" name="Photoshop" />
              <Tool color="#FF6B6B" mark="DR" name="DaVinci Resolve" />
              <Tool color="#FFD93D" mark="C4" name="Cinema 4D" />
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-4">
                Core Capabilities
              </p>
              <ul className="space-y-3">
                {[
                  "Narrative Color Grading",
                  "Kinetic Typography",
                  "Sound Design & Foley",
                  "Brand Identity Systems",
                ].map((c) => (
                  <li key={c} className="flex items-center gap-3 text-sm text-white/80">
                    <div className="size-1.5 rounded-full bg-brand" /> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Contact */}
      <footer id="contact" className="py-24 px-6 relative grid-bg">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-brand text-xs font-bold uppercase tracking-[0.3em] mb-6">
            Let&apos;s Work Together
          </p>
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-12 leading-[0.95]">
            Ready to{" "}
            <span className="text-brand underline decoration-4 underline-offset-8">animate</span>{" "}
            your vision?
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
            <ContactItem mark="@" label="Email" value="vishwa.editz@gmail.com" />
            <ContactItem mark="◎" label="Instagram" value="@vishwa.editz" />
            <ContactItem mark="▶" label="YouTube" value="Vishwa Editz" />
          </div>

          <a
            href="mailto:vishwa.editz@gmail.com"
            className="inline-block px-12 py-5 bg-slate-900 text-white rounded-full font-display font-bold text-lg md:text-xl hover:bg-brand transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-brand/20"
          >
            Let&apos;s Start a Project →
          </a>

          <p className="mt-24 text-slate-400 text-xs font-bold uppercase tracking-[0.3em]">
            © 2026 Vishwa Editz · Crafted for impact
          </p>
        </div>
      </footer>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-6 py-4 bg-white rounded-2xl shadow-sm border border-brand/10 flex flex-col">
      <span className="text-3xl font-display font-bold text-brand">{value}</span>
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
        {label}
      </span>
    </div>
  );
}

function Tool({ color, mark, name }: { color: string; mark: string; name: string }) {
  return (
    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
      <div
        className="size-10 rounded-lg grid place-items-center font-bold text-sm shrink-0"
        style={{ background: `${color}22`, color }}
      >
        {mark}
      </div>
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
}

function Project({
  img,
  tag,
  title,
  sub,
}: {
  img: string;
  tag: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-3xl mb-4 shadow-2xl">
        <img
          src={img}
          alt={title}
          loading="lazy"
          className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand">
          {tag}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
          <button className="w-fit px-5 py-2 bg-white text-brand rounded-full text-sm font-bold">
            ▶ Play Reel
          </button>
        </div>
      </div>
      <h4 className="font-display text-2xl font-bold text-white">{title}</h4>
      <p className="text-white/60 text-sm mt-1">{sub}</p>
    </div>
  );
}

function ContactItem({ mark, label, value }: { mark: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="size-12 rounded-full bg-white border border-brand/15 flex items-center justify-center text-brand text-lg font-bold group-hover:bg-brand group-hover:text-white transition-colors shadow-sm">
        {mark}
      </div>
      <div className="text-left">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
        <p className="font-display font-medium text-base md:text-lg">{value}</p>
      </div>
    </div>
  );
}
