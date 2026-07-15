import { Link } from "react-router-dom";
import WaveDivider from "../components/WaveDivider";

const STATS = [
  { number: "120+", label: "Learning Resources" },
  { number: "40+", label: "Members Trained" },
  { number: "3", label: "Years of Work" },
  { number: "5", label: "Countries Reached" },
];

const RESOURCE_TYPES = [
  { icon: "📘", label: "Books", desc: "Curated reading on research methods, careers, and leadership." },
  { icon: "🎬", label: "Videos", desc: "Recorded sessions and short courses you can watch anytime." },
  { icon: "🔗", label: "Online Links", desc: "Hand-picked external resources worth your time." },
];

function Home() {
  return (
    <div>
      {/* HERO — asymmetric split, serif headline, two CTAs */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14 grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-3">
          <p className="eyebrow text-gold-500 mb-4">▪ Institute of Research &amp; Immersive Career Advancement</p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight text-ink mb-6">
            Practical knowledge for the careers being built in the Great Lakes region.
          </h1>
          <p className="text-ink-soft text-lg leading-relaxed mb-8 max-w-xl">
            IRICA gathers research, mentorship, and hands-on material into one place —
            so members spend less time searching and more time growing.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/materials"
              className="border border-forest-800 text-forest-800 hover:bg-forest-800 hover:text-white px-6 py-3 rounded-full font-medium transition"
            >
              Browse Materials
            </Link>
            <Link
              to="/checkout"
              className="bg-forest-800 hover:bg-forest-700 text-white px-6 py-3 rounded-full font-medium transition"
            >
              Subscribe Now
            </Link>
          </div>
        </div>

        {/* Editorial visual block — a stacked "card" motif standing in for imagery */}
        <div className="md:col-span-2">
          <div className="relative aspect-[4/5] rounded-2xl bg-forest-800 overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)]" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="eyebrow text-gold-400 mb-2">▪ Featured</p>
              <p className="font-serif text-white text-xl leading-snug">
                Research-backed guidance, one subscription away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STAT COUNTERS — mono numerals, thin rule above/below */}
      <section className="border-y border-ink/10 bg-forest-50">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <p className="font-mono text-3xl text-forest-800 mb-1">{stat.number}</p>
              <p className="eyebrow text-ink-soft">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <WaveDivider color="#F7F4EC" />

      {/* MISSION / VISION — two column editorial block */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <p className="eyebrow text-gold-500 mb-3">▪ Our Mission</p>
          <h2 className="font-serif text-2xl text-ink mb-3">
            Close the gap between ambition and access.
          </h2>
          <p className="text-ink-soft leading-relaxed">
            Many talented people are stopped not by ability, but by a lack of access
            to the right material at the right time. IRICA exists to remove that
            barrier — one subscription, one shelf of resources at a time.
          </p>
        </div>
        <div>
          <p className="eyebrow text-gold-500 mb-3">▪ Our Approach</p>
          <h2 className="font-serif text-2xl text-ink mb-3">
            Research, distilled into something usable.
          </h2>
          <p className="text-ink-soft leading-relaxed">
            Every book, video, and link on IRICA is chosen with one question in
            mind: will this actually help someone move forward this month? If not,
            it doesn't make the shelf.
          </p>
        </div>
      </section>

      {/* RESOURCE TYPES — editorial list, not generic icon cards */}
      <section className="bg-forest-950 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="eyebrow text-gold-400 mb-3">▪ What's Inside</p>
          <h2 className="font-serif text-2xl md:text-3xl mb-10">
            Three kinds of material, one membership.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
            {RESOURCE_TYPES.map((item) => (
              <div key={item.label} className="bg-forest-950 p-8">
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <p className="font-serif text-xl mb-2">{item.label}</p>
                <p className="text-forest-100/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="eyebrow text-gold-500 mb-3">▪ Ready when you are</p>
        <h2 className="font-serif text-3xl text-ink mb-6">
          One month of full access, starting today.
        </h2>
        <Link
          to="/checkout"
          className="inline-block bg-forest-800 hover:bg-forest-700 text-white px-8 py-3.5 rounded-full font-medium transition"
        >
          Subscribe Now
        </Link>
      </section>
    </div>
  );
}

export default Home;
