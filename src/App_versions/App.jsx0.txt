// src/App.jsx
// Fully self-contained — no Figma assets required.
// Images are loaded from Unsplash (free, no auth needed).
// Drop your own images into src/assets/ and swap the src= values.

import React from 'react';
import {
  Heart, MapPin, Clock, Calendar, Flower2, Users, Camera, Church,
  Globe, Star, Sparkles, Cross, Stethoscope, House, GraduationCap, HandHeart
} from 'lucide-react';

// ─── Swap these URLs for your local imports once you have the images ──────────
// e.g. import coupleImage from './assets/couple.jpg';
import coupleImage     from './assets/couple.jpg';
import rwandaLandscape from './assets/butare_scene.jpeg';
import missionWork     from './assets/kids.jpg';
import portugalVillage from './assets/chamas.jpeg';
// ─────────────────────────────────────────────────────────────────────────────

// Simple img wrapper that silently swaps to a gradient placeholder on error
function Img({ src, alt, className }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={e => {
        e.currentTarget.style.display = 'none';
      }}
      loading="lazy"
    />
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-neutral-50">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background couple photo */}
        <div className="absolute inset-0 z-0">
          <Img src={coupleImage} alt="Couple portrait" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/50 to-white/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-white/50" />
        </div>

        {/* Watermark crosses */}
        <div className="absolute top-8 right-8 opacity-10 z-10">
          <Cross className="w-24 h-24 text-gray-600" />
        </div>
        <div className="absolute bottom-8 left-8 opacity-10 z-10">
          <Cross className="w-16 h-16 text-gray-600" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-4 py-20 text-center max-w-6xl mx-auto space-y-16">

          {/* Decorative header */}
          <div className="flex justify-center items-center space-x-6">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-rose-300" />
            <div className="relative">
              <Heart className="w-12 h-12 text-rose-400 fill-current" />
              <Cross className="w-6 h-6 text-rose-300 absolute -top-2 -right-2" />
            </div>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-rose-300" />
          </div>

          <div className="space-y-4">
            <p className="text-rose-600 tracking-[0.5em] uppercase text-sm font-light">
              In the Name of the Father, Son & Holy Spirit
            </p>
            <div className="flex justify-center space-x-2">
              <Sparkles className="w-5 h-5 text-rose-300" />
              <Cross className="w-6 h-6 text-rose-400" />
              <Sparkles className="w-5 h-5 text-rose-300" />
            </div>
            <p className="text-gray-700 tracking-[0.3em] uppercase text-xs font-light">
              Two Hearts, Two Cultures, One Love in Christ
            </p>
          </div>

          {/* Names */}
          <div className="space-y-12">
            <div className="relative">
              <h1 className="text-7xl md:text-9xl lg:text-[10rem] text-gray-800 font-thin tracking-widest leading-none">
                Mary Lucy
              </h1>
              <div className="absolute -top-6 -right-6 w-12 h-12 border-2 border-rose-200 rounded-full opacity-60" />
              <div className="absolute -bottom-2 -left-8 opacity-20">
                <Cross className="w-8 h-8 text-rose-300" />
              </div>
            </div>

            <div className="flex items-center justify-center space-x-12 py-8">
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
              <div className="relative">
                <span className="text-rose-400 text-5xl font-thin italic">&amp;</span>
                <div className="absolute -top-4 -left-4 w-16 h-16 border border-rose-200 rounded-full opacity-30" />
              </div>
              <div className="w-32 h-px bg-gradient-to-l from-transparent via-rose-300 to-transparent" />
            </div>

            <div className="relative">
              <h1 className="text-7xl md:text-9xl lg:text-[7rem] text-gray-800 font-thin tracking-widest leading-none">
                Cormac Matthew Hugh
              </h1>
              <div className="absolute -bottom-6 -left-6 w-10 h-10 border-2 border-rose-200 rounded-full opacity-60" />
              <div className="absolute -top-2 -right-8 opacity-20">
                <Cross className="w-8 h-8 text-rose-300" />
              </div>
            </div>
          </div>

          {/* Invitation text */}
          <div className="space-y-8 py-12">
            <div className="flex justify-center space-x-3">
              {[300, 400, 500, 400, 300].map((shade, i) => (
                <div key={i} className={`w-1 h-1 bg-rose-${shade} rounded-full`} />
              ))}
            </div>
            <p className="text-2xl md:text-3xl text-gray-700 font-thin leading-relaxed max-w-3xl mx-auto">
              humbly request your presence and prayers
              <br />as they unite in the Sacrament of Holy Matrimony
              <br /><span className="text-gray-600 text-xl">across two celebrations</span>
            </p>
          </div>

          {/* Quote */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 max-w-2xl mx-auto border border-white/80">
            <p className="text-lg text-gray-700 italic mb-3">
              "What God has joined together, let no man separate."
            </p>
            <p className="text-sm text-gray-600">— Matthew 19:6</p>
          </div>

          {/* Scroll indicator */}
          <div className="pt-16">
            <div className="flex flex-col items-center space-y-3 text-gray-400">
              <p className="text-sm font-light tracking-wide">Continue your journey with us</p>
              <Cross className="w-4 h-4 text-gray-400" />
              <div className="w-px h-12 bg-gradient-to-b from-gray-400 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* ── RWANDA CEREMONY ──────────────────────────────────────────────── */}
      <div className="relative bg-gradient-to-b from-orange-50 to-orange-100 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Img src={rwandaLandscape} alt="Rwanda mountains" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-white/60" />
        </div>

        <div className="relative z-10 py-32 px-4">
          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="text-center mb-20">
              <div className="flex items-center justify-center space-x-6 mb-8">
                <div className="w-16 h-px bg-amber-400" />
                <div className="relative">
                  <Church className="w-10 h-10 text-amber-700" />
                  <Cross className="w-5 h-5 text-amber-500 absolute -top-1 -right-1" />
                </div>
                <div className="w-16 h-px bg-amber-400" />
              </div>
              <h2 className="text-5xl md:text-6xl font-thin text-gray-800 mb-6 tracking-wide">Holy Matrimony</h2>
              <p className="text-amber-800 tracking-[0.4em] uppercase text-sm font-light">Rwanda — Land of a Thousand Hills</p>
              <div className="mt-4 flex justify-center">
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-20 items-start">
              {/* Images */}
              <div className="relative order-2 lg:order-1 space-y-8">
                <div className="overflow-hidden rounded-[2rem] shadow-2xl">
                  <Img src={rwandaLandscape} alt="Rwanda landscape" className="w-full h-80 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent" />
                </div>
                <div className="overflow-hidden rounded-[2rem] shadow-2xl">
                  <Img src={missionWork} alt="Mission work with children" className="w-full h-64 object-cover" />
                </div>
              </div>

              {/* Details */}
              <div className="space-y-12 order-1 lg:order-2">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/70">
                  <div className="space-y-10">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                        <Globe className="w-8 h-8 text-amber-800" />
                      </div>
                      <div>
                        <p className="text-3xl text-amber-900 font-thin">Butare</p>
                        <p className="text-gray-600 text-lg">Rwanda</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex items-center space-x-4">
                        <Calendar className="w-6 h-6 text-amber-700" />
                        <p className="text-gray-800 font-medium text-lg">Thursday, June 3rd, 2027</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Clock className="w-6 h-6 text-amber-700" />
                        <p className="text-gray-800 font-medium text-lg">11:00 AM</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-8">
                      <div className="flex items-start space-x-4">
                        <MapPin className="w-6 h-6 text-amber-700 mt-1" />
                        <div>
                          <p className="text-gray-800 font-medium text-lg">
                            Community Chapel of the Servos de Maria de Coração de Jesus
                          </p>
                          <p className="text-gray-600">Huye District, Butare</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50/80 backdrop-blur-sm rounded-2xl p-8">
                  <p className="text-amber-900 font-medium mb-3 text-lg">Dress Code: Traditional or Formal</p>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Experience a beautiful Catholic ceremony celebrating holy matrimony in the
                    Land of a Thousand Hills. Food reception and celebration to follow at the community.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Week */}
            <div className="mt-24">
              <div className="bg-white rounded-[2rem] p-12 shadow-2xl max-w-5xl mx-auto border border-amber-100">
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <HandHeart className="w-8 h-8 text-orange-600" />
                    <Cross className="w-6 h-6 text-orange-500" />
                    <HandHeart className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-3xl font-thin text-gray-800 mb-4">Mission Work</h3>
                  <p className="text-orange-700 text-lg">Before our wedding celebration</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-10">
                  {[
                    { icon: GraduationCap, title: 'Teaching Children', desc: 'Join us in sharing knowledge and hope with local children, providing educational support and nurturing young minds.' },
                    { icon: Stethoscope, title: 'Visiting the Sick', desc: "Bring comfort and care to those in hospitals and healthcare facilities, sharing God's love through acts of compassion." },
                    { icon: HandHeart, title: 'Helping the Poor', desc: 'Serve alongside us in supporting those in need, providing food, shelter assistance, and essential resources.' },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="text-center space-y-4">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                        <Icon className="w-8 h-8 text-orange-700" />
                      </div>
                      <h4 className="text-xl font-medium text-gray-800">{title}</h4>
                      <p className="text-gray-600 leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-orange-50 rounded-2xl p-8 text-center">
                  <p className="text-gray-700 leading-relaxed text-lg mb-4">
                    <strong>28th May – 6th June 2027</strong> — Experience the true meaning of love through service.
                    Optional participation for wedding guests who feel called to join this mission of mercy.
                  </p>
                  <p className="text-orange-800 italic">
                    "Whatever you did for one of the least of these brothers and sisters of mine, you did for me." — Matthew 25:40
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TRANSITION ───────────────────────────────────────────────────── */}
      <div className="relative py-24 px-4 overflow-hidden bg-white">
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-16">
          <div className="flex justify-center items-center space-x-8">
            <Star className="w-5 h-5 text-blue-500" />
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
            <Cross className="w-8 h-8 text-blue-600" />
            <div className="w-24 h-px bg-gradient-to-l from-transparent via-blue-400 to-transparent" />
            <Star className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-8">
            <h3 className="text-4xl md:text-5xl font-thin text-gray-800">Then celebrate with us in Portugal</h3>
            <p className="text-2xl text-gray-700 font-light">for our Wedding Celebration</p>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-gray-100 shadow-md">
              <p className="text-lg text-gray-700 italic">"Love never fails"</p>
              <p className="text-sm text-gray-600 mt-2">— 1 Corinthians 13:8</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── PORTUGAL CELEBRATION ─────────────────────────────────────────── */}
      <div className="relative bg-gradient-to-b from-slate-50 to-slate-100 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50">
          <Img src={portugalVillage} alt="Portuguese architecture" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-white/50" />
        </div>

        <div className="relative z-10 py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="flex items-center justify-center space-x-6 mb-8">
                <div className="w-16 h-px bg-blue-400" />
                <div className="relative">
                  <Heart className="w-10 h-10 text-blue-600 fill-current" />
                  <Cross className="w-4 h-4 text-blue-400 absolute -top-1 -right-1" />
                </div>
                <div className="w-16 h-px bg-blue-400" />
              </div>
              <h2 className="text-5xl md:text-6xl font-thin text-gray-800 mb-6 tracking-wide">Wedding Celebration in Portugal</h2>
              <p className="text-blue-700 tracking-[0.4em] uppercase text-sm font-light">Torre de Dona Chama, Bragança</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-12">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/70">
                  <div className="space-y-10">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <Globe className="w-8 h-8 text-blue-700" />
                      </div>
                      <div>
                        <p className="text-3xl text-blue-800 font-thin">Torre de Dona Chama</p>
                        <p className="text-gray-600 text-lg">Bragança, Portugal</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex items-center space-x-4">
                        <Calendar className="w-6 h-6 text-blue-600" />
                        <p className="text-gray-800 font-medium text-lg">Summer 2027</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Clock className="w-6 h-6 text-blue-600" />
                        <p className="text-gray-800 font-medium text-lg">Time TBA</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-8">
                      <div className="flex items-start space-x-4">
                        <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                        <div>
                          <p className="text-gray-800 font-medium text-lg">Wedding Venue</p>
                          <p className="text-gray-600">Torre de Dona Chama, Bragança</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50/80 backdrop-blur-sm rounded-2xl p-8">
                  <p className="text-blue-900 font-medium mb-3 text-lg">Dress Code: Elegant</p>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Join us for a celebration in the beautiful region of Bragança, Portugal.
                    A festive reception will follow with traditional Portuguese cuisine, music, and dancing.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="overflow-hidden rounded-[2rem] shadow-2xl">
                  <Img src={portugalVillage} alt="Torre de Dona Chama, Portugal" className="w-full h-[28rem] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" />
                </div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-100 rounded-full opacity-70" />
                <div className="absolute -top-8 -left-8 w-20 h-20 border-2 border-blue-200 rounded-full opacity-80" />
                <div className="absolute top-4 right-4 opacity-60">
                  <Cross className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── JOURNEY INFORMATION ──────────────────────────────────────────── */}
      <div className="relative py-32 px-4 overflow-hidden bg-white">
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center space-y-10 mb-20">
            <div className="flex items-center justify-center space-x-6">
              <div className="w-20 h-px bg-gray-400" />
              <Users className="w-10 h-10 text-gray-700" />
              <div className="w-20 h-px bg-gray-400" />
            </div>
            <h2 className="text-5xl font-thin text-gray-800">Journey Information</h2>
            <p className="text-2xl text-gray-600 font-light max-w-3xl mx-auto">
              Join us for this unique celebration of love and faith
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Rwanda */}
            <div className="bg-white rounded-[2rem] p-16 shadow-2xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-50 rounded-full -translate-y-20 translate-x-20" />
              <div className="relative z-10">
                <h3 className="text-3xl font-thin text-amber-900 mb-10">Rwanda</h3>
                <div className="space-y-8 text-gray-700">
                  {[
                    ['Airport', 'Kigali International Airport'],
                    ['Dates', '28th May (departure from home country) – 6th June (Departure from Rwanda)'],
                    ['RSVP', 'Please RSVP by 1st August 2026. Guests will be added to a WhatsApp chat to co-ordinate flights, itinerary and accommodation.'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-start space-x-6">
                      <div className="w-3 h-3 bg-amber-500 rounded-full mt-2 shrink-0" />
                      <div>
                        <p className="font-medium text-lg">{label}:</p>
                        <p className="text-lg">{value}</p>
                      </div>
                    </div>
                  ))}
                  <div className="bg-amber-50 rounded-2xl p-6 mt-8">
                    <p className="text-amber-800 italic text-lg">Experience the warmth of Rwandan hospitality</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Portugal */}
            <div className="bg-white rounded-[2rem] p-16 shadow-2xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full -translate-y-20 translate-x-20" />
              <div className="relative z-10">
                <h3 className="text-3xl font-thin text-blue-900 mb-10">Portugal</h3>
                <div className="space-y-8 text-gray-700">
                  {[
                    ['Airport', 'Porto Airport'],
                    ['Dates', 'TBC'],
                    ['RSVP', 'Please RSVP by 1st August 2026. Guests will be added to a WhatsApp chat to co-ordinate flights, itinerary and accommodation.'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-start space-x-6">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 shrink-0" />
                      <div>
                        <p className="font-medium text-lg">{label}:</p>
                        <p className="text-lg">{value}</p>
                      </div>
                    </div>
                  ))}
                  <div className="bg-blue-50 rounded-2xl p-6 mt-8">
                    <p className="text-blue-800 italic text-lg">Experience the beauty of Northern Portuguese culture and cuisine</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PHOTOGRAPHY ──────────────────────────────────────────────────── */}
      <div className="relative py-24 px-4 overflow-hidden bg-neutral-50">
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-16">
          <div className="flex items-center justify-center space-x-6">
            <div className="w-16 h-px bg-rose-400" />
            <Camera className="w-10 h-10 text-rose-600" />
            <Cross className="w-8 h-8 text-rose-500" />
            <div className="w-16 h-px bg-rose-400" />
          </div>
          <div className="space-y-10">
            <h3 className="text-4xl font-thin text-gray-800">Sacred Memories & Photography</h3>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 max-w-4xl mx-auto shadow-2xl">
              <p className="text-gray-700 leading-relaxed text-xl mb-8">
                Both ceremonies will be professionally photographed with reverence and respect.
                We kindly request an unplugged ceremony in Rwanda to honor the sacred Catholic traditions
                and maintain the solemnity of the Mass. Portugal will welcome your joyful participation in capturing memories.
              </p>
              <div className="bg-rose-50 rounded-2xl p-6">
                <p className="text-rose-800 italic text-lg">"Be still and know that I am God" — Psalm 46:10</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── GIFTS ────────────────────────────────────────────────────────── */}
      <div className="py-32 px-4 bg-gradient-to-b from-rose-50 via-white to-rose-50">
        <div className="max-w-5xl mx-auto text-center space-y-16">
          <div className="flex items-center justify-center space-x-6">
            <div className="w-16 h-px bg-rose-400" />
            <div className="relative">
              <Heart className="w-10 h-10 text-rose-600" />
              <Cross className="w-5 h-5 text-rose-400 absolute -top-1 -right-1" />
            </div>
            <div className="w-16 h-px bg-rose-400" />
          </div>
          <h3 className="text-4xl font-thin text-gray-800">Gifts of Love & Service</h3>
          <div className="bg-white rounded-3xl p-16 shadow-2xl max-w-4xl mx-auto border border-rose-100">
            <div className="space-y-10">
              <div className="flex justify-center mb-8">
                <HandHeart className="w-12 h-12 text-rose-500" />
              </div>
              <p className="text-gray-700 leading-relaxed text-xl mb-8">
                Your presence at our celebrations is the greatest blessing we could receive.
                If you wish to honor our union with a gift, we humbly request that all offerings
                are intended towards providing for our new home together.
              </p>
              <div className="bg-rose-50 rounded-2xl p-10">
                <h4 className="text-2xl text-rose-800 mb-6 font-light">Your Gift Will Support:</h4>
                <div className="grid md:grid-cols-3 gap-8 text-left">
                  {[
                    { icon: House, title: 'Our New Home', desc: 'Furniture, fittings, decoration' },
                    { icon: Stethoscope, title: 'Project Indabo', desc: 'Funds for Rwandan children — food, clothes, shelter' },
                    { icon: HandHeart, title: 'Wedding Celebrations', desc: 'Catering and decoration' },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-start space-x-3">
                      <Icon className="w-6 h-6 text-rose-600 mt-1 shrink-0" />
                      <div>
                        <p className="font-medium text-rose-800">{title}</p>
                        <p className="text-gray-700 text-sm">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border-2 border-rose-200 rounded-2xl p-8">
                <p className="text-rose-800 italic text-lg">"It is more blessed to give than to receive" — Acts 20:35</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RSVP ─────────────────────────────────────────────────────────── */}
      <div className="py-32 px-4 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto text-center space-y-16">
          <div className="flex items-center justify-center space-x-6">
            <div className="w-20 h-px bg-gray-500" />
            <Flower2 className="w-10 h-10 text-gray-700" />
            <Cross className="w-8 h-8 text-gray-600" />
            <div className="w-20 h-px bg-gray-500" />
          </div>
          <h2 className="text-5xl font-thin text-gray-800">RSVP</h2>
          <div className="space-y-6">
            <p className="text-3xl text-gray-700 font-thin">Please respond by 1st August 2026</p>
            <p className="text-gray-600 text-xl">Please specify which celebration(s) you will attend</p>
            <p className="text-gray-600 text-lg">and if you feel called to join our mission week</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-white rounded-[2rem] p-16 shadow-2xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full -translate-y-16 translate-x-16" />
              <div className="relative z-10 space-y-8">
                <h4 className="text-3xl font-thin text-amber-900">Portuguese domiciled & all other guests</h4>
                <div className="space-y-6 text-gray-600">
                  <p className="text-xl">alvesmary98@gmail.com</p>
                  <p className="text-xl">+44 7729 361640</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-16 shadow-2xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-16 translate-x-16" />
              <div className="relative z-10 space-y-8">
                <h4 className="text-3xl font-thin text-blue-900">Irish domiciled & all other guests</h4>
                <div className="space-y-6 text-gray-600">
                  <p className="text-xl">comckennaa@gmail.com</p>
                  <p className="text-xl">+353 851094610</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-12 shadow-2xl max-w-3xl mx-auto">
            <p className="text-gray-600 italic text-lg">
              Please include dietary restrictions, accessibility needs, mission participation interest,
              and any special prayer intentions you'd like included in any of the Masses.
            </p>
          </div>
        </div>
      </div>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <div className="py-24 px-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="flex justify-center items-center space-x-8">
            <div className="w-4 h-4 bg-amber-400 rounded-full" />
            <Cross className="w-8 h-8 text-rose-500" />
            <div className="w-5 h-5 bg-rose-500 rounded-full" />
            <Cross className="w-8 h-8 text-rose-500" />
            <div className="w-4 h-4 bg-blue-400 rounded-full" />
          </div>
          <div className="space-y-8">
            <p className="text-3xl text-gray-700 font-thin italic">"Multiple cultures, one faith, infinite blessings"</p>
            <p className="text-gray-600 text-xl">
              Muito obrigado · Murakoze cyane · Thank you very much · Go raibh míle maith agat
            </p>
            <div className="bg-rose-50 rounded-2xl p-8 max-w-2xl mx-auto">
              <p className="text-rose-800 italic text-lg mb-3">
                "The Lord bless you and keep you. The Lord shine his face upon you and be gracious to you.
                The Lord look upon you kindly and give you peace."
              </p>
              <p className="text-gray-600">— Numbers 6:24–26</p>
            </div>
            <p className="text-gray-500">We are blessed to share these sacred moments with you!</p>
          </div>

          <div className="flex justify-center space-x-4 pt-12">
            <div className="w-1 h-12 bg-gradient-to-b from-rose-400 to-transparent" />
            <div className="w-1 h-16 bg-gradient-to-b from-rose-500 to-transparent" />
            <Cross className="w-8 h-8 text-rose-500 mt-2" />
            <div className="w-1 h-16 bg-gradient-to-b from-rose-500 to-transparent" />
            <div className="w-1 h-12 bg-gradient-to-b from-rose-400 to-transparent" />
          </div>
        </div>
      </div>

    </div>
  );
}
