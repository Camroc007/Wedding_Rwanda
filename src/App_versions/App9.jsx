// src/App.jsx — Masterclass Wedding Invitation
// Features: Cormorant Garamond luxury font · sticky nav with mobile menu ·
// smooth scroll · countdown timer · falling rose petals · grain texture overlay ·
// lightbox gallery · RSVP form (Web3Forms) · language toggle (EN / PT) ·
// parallax · zoom images · floating elements

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Heart, MapPin, Clock, Calendar, Flower2, Users, Camera, Church,
  Globe, Star, Sparkles, Cross, Stethoscope, House, GraduationCap,
  HandHeart, Menu, X, ChevronDown, Send, CheckCircle
} from 'lucide-react';

// ── Images — swap URLs for local imports when ready ───────────────────────────
import coupleImage     from './assets/lakecomo.jpg';
import rwandaLandscape from './assets/butare_scene.jpeg';
import missionWork     from './assets/kids.jpg';
import portugalVillage from './assets/chamas.jpeg';
import rwandaField from './assets/rwanda_field.jpg';
import sahara     from './assets/sahara.jpg';
import vietnam    from './assets/vietnam.jpg';
import milan      from './assets/milan.jpg';
import lakecomo   from './assets/cornwall.jpg';
import italy      from './assets/italy.jpg';

const galleryImages = [
  { src: rwandaField, caption: 'Rwanda',    position: 'left center' },
  { src: sahara,      caption: 'Morocco',   position: 'center 50%' },
  { src: vietnam,     caption: 'Vietnam',   position: 'center 70%' },
  { src: milan,       caption: 'Milan',     position: 'center 70%' },
  { src: lakecomo,    caption: 'Cornwall', position: 'center 70%' },
  { src: italy,       caption: 'Italy',     position: 'center 70%' },
];
// ─────────────────────────────────────────────────────────────────────────────

// ── Translations ──────────────────────────────────────────────────────────────
const T = {
  EN: {
    lang: 'EN', flag: '🇬🇧',
    tagline: 'In the Name of the Father, Son & Holy Spirit',
    subtitle: 'Two Hearts, Two Cultures, One Love in Christ',
    invite: 'humbly request your presence and prayers as they unite in the Sacrament of Holy Matrimony',
    scroll: 'Continue your journey with us',
    nav: { rwanda: 'Rwanda', accommodation: 'Stay', flights: 'Flights', gallery: 'Gallery', rsvp: 'RSVP' },
    countdown: { days: 'Days', hours: 'Hours', mins: 'Minutes', secs: 'Seconds', until: 'Until the Rwanda Ceremony' },
    rwanda: 'Holy Matrimony', rwandaSub: 'Rwanda — Land of a Thousand Hills',
    mission: 'Mission', missionSub: 'Before our wedding celebration',
    missionItems: [
      { title: 'Teaching Children', desc: 'Join us in sharing knowledge and hope with local children.' },
      { title: 'Visiting the Sick', desc: "Bring comfort to hospitals, sharing God's love through compassion." },
      { title: 'Helping the Poor', desc: 'Serve those in need — food, shelter, and essential resources.' },
    ],
    missionDates: '28th May – 6th June 2027',
    missionNote: 'Optional participation for wedding guests who feel called to this mission of mercy.',
    safariTitle: 'Optional Safari Experience',
    safariSub: 'Saturday 5th June 2027 — Limited Places',
    safariDate: 'Saturday 5th June 2027',
    safariItinerary: 'We will be staying in Kigali on the 4th. The safari will pick us up at 3am on the morning of the 5th. We return in the afternoon, stay the night in Kigali, and fly back on the 6th.',
    safariNonSafari: 'Guests not joining the safari are welcome to remain with the Sisters and take the national bus from Butare to Kigali to catch their flight on the 6th.',
    safariBooking: 'This is separate from your RSVP. Please contact Mary or Cormac directly to register your interest.',
    safariContact: 'To register for the safari, contact us directly:',
    dressRwanda: 'Dress Code: Traditional or Formal',
    dressRwandaDesc: 'Experience a beautiful Catholic ceremony in the Land of a Thousand Hills. Food reception and celebration to follow at the community.',
    groundsRules: 'Community Grounds Rules',
    groundsRulesItems: ['No alcohol on the premises', 'Modest and non-revealing clothing at all times', 'Respect the prayerful atmosphere of the mission'],
    accommodationTitle: 'Where to Stay', accommodationSub: 'Accommodation options in Butare, Rwanda',
    galileoTitle: '⭐ Our Top Recommendation', galileoName: 'Galileo Stadium Hotel', galileoNote: 'Closest hotel to the wedding venue. We are currently negotiating a group discount rate — please contact Cormac or Mary for the latest pricing.',
    galileoUrl: 'https://galileostadiumhotel.com/',
    communityTitle: 'Free Accommodation — CSMCJ Mission House',
    communityDesc: 'The Sisters of the Congregation of the Servants of Mary of the Heart of Jesus (CSMCJ), within whose community grounds the wedding is taking place, have generously offered free accommodation within the grounds for all wedding guests.',
    communityDetails: ['Shared rooms: 4–5 people per room', 'Private toilet facilities included', 'Separate rooms: male-only / female-only / families', 'Located within the wedding venue grounds'],
    communityRules: '⚠️ Please note: Community Ground Rules apply',
    communityRulesItems: ['No alcohol on the premises', 'Modest and non-revealing clothing must be worn at all times', 'Respect the prayerful atmosphere of the mission community'],
    otherHotels: 'Other Hotels in Butare',
    flightsTitle: 'Getting There', flightsSub: 'Flights from London Heathrow to Kigali (RWI/KGL)',
    flightsDates: 'Indicative dates: Friday 28th May – Sunday 6th June 2027 (approx. 9 days)',
    flightsGroupNote: 'We are exploring group discount rates with each airline. If you have extra baggage allowance, please contact Cormac or Mary — we would love to fill it with donations for the mission!',
    flightsContactBaggage: 'Have extra baggage? Contact Cormac (+353 851094610) or Mary (+44 7729 361640)',
    airlines: [
      { name: 'RwandAir', code: 'WB', price: '£850–£1,100', duration: '~8h 30m', route: 'Direct (Heathrow → Kigali)', stops: 'Non-stop', color: 'blue', flag: '🇷🇼', note: 'National carrier of Rwanda — direct route, often best option for this journey.' },
      { name: 'Ethiopian Airways', code: 'ET', price: '£650–£900', duration: '~11–13h', route: 'Via Addis Ababa (ADD)', stops: '1 stop', color: 'amber', flag: '🇪🇹', note: 'Excellent African carrier with reliable connections through Addis Ababa Bole Airport.' },
      { name: 'Kenya Airways', code: 'KQ', price: '£700–£950', duration: '~12–14h', route: 'Via Nairobi (NBO)', stops: '1 stop', color: 'rose', flag: '🇰🇪', note: 'Good connections via Jomo Kenyatta International Airport, Nairobi.' },
      { name: 'Brussels Airlines', code: 'SN', price: '£450–£700', duration: '~10–11h', route: 'Via Brussels (BRU)', stops: '1 stop', color: 'purple', flag: '🇧🇪', note: 'Connects through Brussels Airport with strong African network.' },
      { name: 'Turkish Airlines', code: 'TK', price: '£600–£900', duration: '~12–14h', route: 'Via Istanbul (IST)', stops: '1 stop', color: 'red', flag: '🇹🇷', note: 'Connects through Istanbul Airport — one of the largest hubs in the world with frequent onward services to Kigali.' },
    ],
    flightsPriceNote: '* All prices are estimated return fares from London Heathrow. Book early for best rates. Group discounts are being arranged — watch the WhatsApp group for updates.',
    summer: 'Summer 2027', timeTBA: 'Time TBA',
    journey: 'Journey Information', journeySub: 'Join us for this unique celebration of love and faith',
    journeyItems: [
      { color: 'amber', title: 'Rwanda', items: [['Airport', 'Kigali International Airport (KGL)'], ['Dates', '28th May – 6th June 2027'], ['RSVP', 'By 1st August 2026 — guests added to WhatsApp group for coordination.']], note: 'Experience the warmth of Rwandan hospitality' },
    ],
    gallery: 'Our Story in Images', galleryHint: 'Click any image to explore',
    gifts: 'Gifts of Love & Service',
    giftsDesc: 'Your presence at our celebrations is the greatest blessing we could receive. If you wish to honour our union with a gift, we humbly request offerings towards our new home together.',
    giftsSupport: 'Your Gift Will Support',
    giftsItems: [
      { title: 'Our New Home', desc: 'Furniture, fittings, decoration' },
      { title: 'Project Indabo', desc: 'Rwandan children — food, clothes, shelter' },
      { title: 'Celebrations', desc: 'Catering and decoration' },
    ],
    rsvpTitle: 'RSVP', rsvpDeadline: 'Please respond by 1st August 2026',
    rsvpOr: 'Or fill in the form below',
    rsvpContacts: [
      { color: 'amber', title: 'Portuguese & all other guests', email: 'alvesmary98@gmail.com', phone: '+44 7729 361640' },
      { color: 'blue',  title: 'Irish & all other guests',      email: 'comckennaa@gmail.com',  phone: '+353 851094610' },
    ],
    rsvpForm: { name: 'Full Name', email: 'Email Address', attending: 'Which celebration(s) will you attend?',
      rwanda: 'Rwanda Ceremony (June 2027)',
      mission: 'I would like to join the Mission', dietary: 'Dietary Requirements / Accessibility Needs',
      guests: 'Names of Guests Attending', guestsPlaceholder: 'e.g. John Smith, Jane Smith',
      prayers: 'Special Prayer Intentions',
      accommodationPref: 'Accommodation Preference',
      accommodationOptions: ['Galileo Stadium Hotel (paid — group rate being arranged)', 'Free Community Accommodation at CSMCJ Mission House', 'Other (please specify below)'],
      airlinePref: 'Flight Booking Preference',
      airlineOptions: ['I want to be part of the group booking', 'I will book my own flight'],
      baggageLabel: 'Extra Baggage Allowance',
      baggageQuestion: 'Do you think you will have extra baggage allowance to carry donations?',
      baggageYes: 'Yes — I may have extra baggage',
      baggageNo: 'No — I will not have extra baggage',
      baggageKg: 'If yes, approximately how many extra kg do you expect to have available?',
      baggageKgPlaceholder: 'e.g. 10 kg',
      baggageNote: '🙏 Any extra baggage will be filled with donations for the mission community in Rwanda.',
      submit: 'Send RSVP', sending: 'Sending…', sent: 'RSVP Received! God bless you.' },
    footer: 'Multiple cultures, one faith, infinite blessings',
    thanks: 'Muito obrigado · Murakoze cyane · Thank you very much · Go raibh míle maith agat',
    footerQuote: '"The Lord bless you and keep you. The Lord shine his face upon you and be gracious to you. The Lord look upon you kindly and give you peace."',
    footerVerse: '— Numbers 6:24–26',
    footerBlessed: 'We are blessed to share these sacred moments with you!',
    bibleHero: '"What God has joined together, let no man separate."',
    bibleHeroRef: '— Matthew 19:6',
    bibleTransition: '"Love never fails"',
    bibleTransitionRef: '— 1 Corinthians 13:8',
    bibleMission: '"Whatever you did for one of the least of these… you did for me."',
    bibleMissionRef: '— Matthew 25:40',
    bibleGifts: '"It is more blessed to give than to receive"',
    bibleGiftsRef: '— Acts 20:35',
    biblePhoto: '"Be still and know that I am God"',
    biblePhotoRef: '— Psalm 46:10',
  },
  PT: {
    lang: 'PT', flag: '🇵🇹',
    tagline: 'Em Nome do Pai, do Filho e do Espírito Santo',
    subtitle: 'Dois Corações, Duas Culturas, Um Amor em Cristo',
    invite: 'pedem humildemente a vossa presença e orações enquanto se unem no Sacramento do Santo Matrimônio',
    scroll: 'Continue a jornada connosco',
    nav: { rwanda: 'Ruanda', accommodation: 'Alojamento', flights: 'Voos', gallery: 'Galeria', rsvp: 'RSVP' },
    countdown: { days: 'Dias', hours: 'Horas', mins: 'Minutos', secs: 'Segundos', until: 'Até à Cerimónia no Ruanda' },
    rwanda: 'Santo Matrimônio', rwandaSub: 'Ruanda — Terra dos Mil Colinas',
    mission: 'Missão', missionSub: 'Antes da nossa celebração de casamento',
    missionItems: [
      { title: 'Ensinar Crianças', desc: 'Junte-se a nós para partilhar conhecimento e esperança com crianças locais.' },
      { title: 'Visitar os Doentes', desc: 'Leve conforto aos hospitais, partilhando o amor de Deus através da compaixão.' },
      { title: 'Ajudar os Pobres', desc: 'Sirva os necessitados — alimentos, abrigo e recursos essenciais.' },
    ],
    missionDates: '28 de Maio – 6 de Junho de 2027',
    missionNote: 'Participação opcional para convidados do casamento que se sintam chamados a esta missão de misericórdia.',
    safariTitle: 'Experiência de Safari Opcional',
    safariSub: 'Sábado, 5 de Junho de 2027 — Lugares Limitados',
    safariDate: 'Sábado, 5 de Junho de 2027',
    safariItinerary: 'Ficaremos em Kigali no dia 4. O safari vem buscar-nos às 3h da manhã do dia 5. Regressamos de tarde, ficamos a noite em Kigali e voamos de regresso no dia 6.',
    safariNonSafari: 'Os convidados que não participam no safari são bem-vindos a permanecer com as Irmãs e apanhar o autocarro nacional de Butare para Kigali para apanhar o voo no dia 6.',
    safariBooking: 'Esta experiência é separada do seu RSVP. Contacte diretamente a Mary ou o Cormac para registar o seu interesse.',
    safariContact: 'Para se registar no safari, contacte-nos diretamente:',
    dressRwanda: 'Código de Vestuário: Tradicional ou Formal',
    dressRwandaDesc: 'Experiencie uma bela cerimónia católica no Ruanda. Receção com comida e celebração a seguir na comunidade.',
    groundsRules: 'Regras dos Terrenos da Comunidade',
    groundsRulesItems: ['Sem álcool nas instalações', 'Roupa modesta e não reveladora em todos os momentos', 'Respeite a atmosfera de oração da missão'],
    accommodationTitle: 'Onde Ficar', accommodationSub: 'Opções de alojamento em Butare, Ruanda',
    galileoTitle: '⭐ A Nossa Principal Recomendação', galileoName: 'Galileo Stadium Hotel', galileoNote: 'O hotel mais próximo do local do casamento. Estamos a negociar uma tarifa de grupo — contacte o Cormac ou a Mary para os preços mais recentes.',
    galileoUrl: 'https://galileostadiumhotel.com/',
    communityTitle: 'Alojamento Gratuito — Casa de Missão CSMCJ',
    communityDesc: 'As Irmãs da Congregação das Servas de Maria do Coração de Jesus (CSMCJ), nos terrenos da comunidade onde o casamento terá lugar, ofereceram generosamente alojamento gratuito nos terrenos para todos os convidados.',
    communityDetails: ['Quartos partilhados: 4–5 pessoas por quarto', 'Instalações sanitárias privativas incluídas', 'Quartos separados: só para homens / só para mulheres / famílias', 'Localizado nos terrenos do local do casamento'],
    communityRules: '⚠️ Nota: aplicam-se regras dos terrenos da comunidade',
    communityRulesItems: ['Sem álcool nas instalações', 'Roupa modesta e não reveladora em todos os momentos', 'Respeite a atmosfera de oração da comunidade missionária'],
    otherHotels: 'Outros Hotéis em Butare',
    flightsTitle: 'Como Chegar', flightsSub: 'Voos de Londres Heathrow para Kigali (RWI/KGL)',
    flightsDates: 'Datas indicativas: Sexta-feira 28 de Maio – Domingo 6 de Junho de 2027 (aprox. 9 dias)',
    flightsGroupNote: 'Estamos a explorar tarifas de grupo com cada companhia aérea. Se tiver franquia de bagagem extra, contacte o Cormac ou a Mary — adoraríamos enchê-la com donativos para a missão!',
    flightsContactBaggage: 'Tem bagagem extra? Contacte o Cormac (+353 851094610) ou Mary (+44 7729 361640)',
    airlines: [
      { name: 'RwandAir', code: 'WB', price: '£850–£1.100', duration: '~8h 30m', route: 'Direto (Heathrow → Kigali)', stops: 'Sem escalas', color: 'blue', flag: '🇷🇼', note: 'Transportadora nacional do Ruanda — rota direta, frequentemente a melhor opção.' },
      { name: 'Ethiopian Airways', code: 'ET', price: '£650–£900', duration: '~11–13h', route: 'Via Adis Abeba (ADD)', stops: '1 escala', color: 'amber', flag: '🇪🇹', note: 'Excelente transportadora africana com ligações fiáveis através do Aeroporto de Adis Abeba.' },
      { name: 'Kenya Airways', code: 'KQ', price: '£700–£950', duration: '~12–14h', route: 'Via Nairóbi (NBO)', stops: '1 escala', color: 'rose', flag: '🇰🇪', note: 'Boas ligações via Aeroporto Internacional Jomo Kenyatta, Nairóbi.' },
      { name: 'Brussels Airlines', code: 'SN', price: '£450–£700', duration: '~10–11h', route: 'Via Bruxelas (BRU)', stops: '1 escala', color: 'purple', flag: '🇧🇪', note: 'Ligações através do Aeroporto de Bruxelas com forte rede africana.' },
      { name: 'Turkish Airlines', code: 'TK', price: '£600–£900', duration: '~12–14h', route: 'Via Istambul (IST)', stops: '1 escala', color: 'red', flag: '🇹🇷', note: 'Ligações através do Aeroporto de Istambul — um dos maiores hubs do mundo com serviços frequentes para Kigali.' },
    ],
    flightsPriceNote: '* Todos os preços são tarifas de regresso estimadas de Londres Heathrow. Reserve cedo para melhores preços. Estão a ser negociados descontos de grupo.',
    summer: 'Verão de 2027', timeTBA: 'Hora a Confirmar',
    journey: 'Informações de Viagem', journeySub: 'Junte-se a nós nesta celebração única de amor e fé',
    journeyItems: [
      { color: 'amber', title: 'Ruanda', items: [['Aeroporto', 'Aeroporto Internacional de Kigali (KGL)'], ['Datas', '28 de Maio – 6 de Junho de 2027'], ['RSVP', 'Até 1 de Agosto de 2026 — convidados adicionados ao grupo WhatsApp para coordenação.']], note: 'Experiencie o calor da hospitalidade ruandesa' },
    ],
    gallery: 'A Nossa História em Imagens', galleryHint: 'Clique em qualquer imagem para explorar',
    gifts: 'Presentes de Amor e Serviço',
    giftsDesc: 'A vossa presença nas nossas celebrações é a maior bênção que poderíamos receber. Se desejarem honrar a nossa união com um presente, pedimos humildemente ofertas para o nosso novo lar.',
    giftsSupport: 'O Seu Presente Apoiará',
    giftsItems: [
      { title: 'O Nosso Novo Lar', desc: 'Mobília, equipamentos, decoração' },
      { title: 'Projeto Indabo', desc: 'Crianças ruandesas — alimentação, roupa, abrigo' },
      { title: 'Celebrações', desc: 'Catering e decoração' },
    ],
    rsvpTitle: 'RSVP', rsvpDeadline: 'Por favor, responda até 1 de Agosto de 2026',
    rsvpOr: 'Ou preencha o formulário abaixo',
    rsvpContacts: [
      { color: 'amber', title: 'Convidados domiciliados em Portugal e outros', email: 'alvesmary98@gmail.com', phone: '+44 7729 361640' },
      { color: 'blue',  title: 'Convidados domiciliados na Irlanda e outros',  email: 'comckennaa@gmail.com',  phone: '+353 851094610' },
    ],
    rsvpForm: { name: 'Nome Completo', email: 'Endereço de Email', attending: 'A que celebração(ões) irá?',
      rwanda: 'Cerimónia no Ruanda (Junho 2027)',
      mission: 'Gostaria de participar na Missão', dietary: 'Requisitos Alimentares / Necessidades de Acessibilidade',
      guests: 'Nomes dos Convidados que Virão', guestsPlaceholder: 'ex: João Silva, Maria Silva',
      prayers: 'Intenções de Oração Especiais',
      accommodationPref: 'Preferência de Alojamento',
      accommodationOptions: ['Galileo Stadium Hotel (pago — tarifa de grupo a confirmar)', 'Alojamento Gratuito na Casa de Missão CSMCJ', 'Outro (especifique abaixo)'],
      airlinePref: 'Preferência de Reserva de Voo',
      airlineOptions: ['Quero fazer parte da reserva de grupo', 'Vou reservar o meu próprio voo'],
      baggageLabel: 'Franquia de Bagagem Extra',
      baggageQuestion: 'Acha que terá franquia de bagagem extra para transportar donativos?',
      baggageYes: 'Sim — posso ter bagagem extra',
      baggageNo: 'Não — não terei bagagem extra',
      baggageKg: 'Se sim, quantos kg extra aproximadamente?',
      baggageKgPlaceholder: 'ex: 10 kg',
      baggageNote: '🙏 Qualquer bagagem extra será preenchida com donativos para a comunidade missionária no Ruanda.',
      submit: 'Enviar RSVP', sending: 'A enviar…', sent: 'RSVP Recebido! Deus vos abençoe.' },
    footer: 'Múltiplas culturas, uma fé, bênçãos infinitas',
    thanks: 'Muito obrigado · Murakoze cyane · Thank you · Go raibh míle maith agat',
    footerQuote: '"O Senhor te abençoe e te guarde. O Senhor faça resplandecer o seu rosto sobre ti e tenha misericórdia de ti. O Senhor volte o seu rosto para ti e te dê a paz."',
    footerVerse: '— Números 6:24–26',
    footerBlessed: 'Estamos abençoados por partilhar estes momentos sagrados convosco!',
    bibleHero: '"O que Deus uniu, o homem não separe."',
    bibleHeroRef: '— Mateus 19:6',
    bibleTransition: '"O amor nunca falha"',
    bibleTransitionRef: '— 1 Coríntios 13:8',
    bibleMission: '"O que fizestes a um destes meus irmãos mais pequeninos, a mim o fizestes."',
    bibleMissionRef: '— Mateus 25:40',
    bibleGifts: '"Há mais felicidade em dar do que em receber"',
    bibleGiftsRef: '— Actos 20:35',
    biblePhoto: '"Aquietai-vos e sabei que eu sou Deus"',
    biblePhotoRef: '— Salmo 46:10',
  },
};

// ── CSS injected once ─────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cormorant:ital,wght@0,300;1,300&display=swap');

  * { font-family: 'Cormorant Garamond', Georgia, serif; }

  @keyframes float      { 0%,100%{transform:translateY(0)}        50%{transform:translateY(-12px)} }
  @keyframes floatSlow  { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-8px) rotate(3deg)} }
  @keyframes fadeInUp   { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeInDown { from{opacity:0;transform:translateY(-30px)} to{opacity:1;transform:translateY(0)} }
  @keyframes scaleIn    { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
  @keyframes petalFall  {
    0%   { transform: translateY(-60px) rotate(0deg) translateX(0);   opacity: 0; }
    10%  { opacity: 0.8; }
    90%  { opacity: 0.6; }
    100% { transform: translateY(100vh) rotate(720deg) translateX(80px); opacity: 0; }
  }
  @keyframes grainMove  { 0%,100%{transform:translate(0,0)} 25%{transform:translate(-2%,-1%)} 50%{transform:translate(1%,2%)} 75%{transform:translate(-1%,1%)} }
  @keyframes navSlideIn { from{opacity:0;transform:translateY(-100%)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse      { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }

  .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
  .float        { animation: float      4s ease-in-out infinite; }
  .float-slow   { animation: floatSlow  6s ease-in-out infinite; }
  .hero-title   { animation: fadeInUp   1.2s cubic-bezier(0.22,1,0.36,1) both; }
  .hero-sub     { animation: fadeInDown 1s  cubic-bezier(0.22,1,0.36,1) 0.3s both; }
  .hero-quote   { animation: scaleIn    0.9s cubic-bezier(0.22,1,0.36,1) 0.7s both; }
  .nav-animate  { animation: navSlideIn 0.4s cubic-bezier(0.22,1,0.36,1); }

  .grain-overlay {
    position: fixed; inset: 0; z-index: 9999; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E");
    opacity: 0.035; animation: grainMove 0.5s steps(1) infinite;
  }

  .petal {
    position: fixed; top: -60px; pointer-events: none; z-index: 50;
    font-size: 1.2rem; animation: petalFall linear infinite;
    user-select: none;
  }

  .countdown-digit {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 300; line-height: 1;
    background: linear-gradient(135deg, #9f1239, #e11d48, #fb7185);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .lightbox-overlay {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.95); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
  }

  .nav-link {
    position: relative; letter-spacing: 0.15em; font-size: 0.8rem;
    text-transform: uppercase; font-weight: 400; transition: color 0.3s;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: -2px; left: 0;
    width: 0; height: 1px; background: currentColor;
    transition: width 0.3s cubic-bezier(0.22,1,0.36,1);
  }
  .nav-link:hover::after { width: 100%; }

  html { scroll-behavior: smooth; }

  .rsvp-input {
    width: 100%; padding: 0.75rem 1rem; border-radius: 0.75rem;
    border: 1px solid #e5e7eb; background: #fafafa;
    font-family: 'Cormorant Garamond', serif; font-size: 1.1rem;
    transition: border-color 0.3s, box-shadow 0.3s; outline: none;
  }
  .rsvp-input:focus { border-color: #fb7185; box-shadow: 0 0 0 3px rgba(251,113,133,0.15); }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #fda4af; border-radius: 2px; }

  .section-transition {
    position: relative;
  }
  .section-transition::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 1px; background: linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent);
  }
`;

// ── Helpers ───────────────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, className = '', delay = 0, direction = 'up' }) {
  const [ref, visible] = useReveal();
  const t = { up: 'translateY(40px)', down: 'translateY(-40px)', left: 'translateX(-50px)', right: 'translateX(50px)', scale: 'scale(0.9)' };
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : t[direction], transition: `opacity 0.9s ease ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

// ── FIX 1: style prop added so objectPosition is actually applied ─────────────
function ParallaxImg({ src, alt, className, strength = 0.15, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const fn = () => { const r = el.getBoundingClientRect(); el.style.transform = `translateY(${(r.top + r.height / 2 - window.innerHeight / 2) * strength}px)`; };
    window.addEventListener('scroll', fn, { passive: true }); fn();
    return () => window.removeEventListener('scroll', fn);
  }, [strength]);
  return <img ref={ref} src={src} alt={alt} className={className} loading="lazy" onError={e => { e.currentTarget.style.display = 'none'; }} style={{ willChange: 'transform', ...style }} />;
}

function ZoomCard({ src, alt, className, containerClass = '', onClick, position = 'center center' }) {
  return (
    <div className={containerClass} style={{ overflow: 'hidden', cursor: onClick ? 'pointer' : 'default' }} onClick={onClick}>
      <img src={src} alt={alt} className={className} loading="lazy" onError={e => { e.currentTarget.style.display = 'none'; }}
        style={{
          objectPosition: position,
          transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          willChange: 'transform'
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.07)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }} />
    </div>
  );
}

// ── Falling Petals ────────────────────────────────────────────────────────────
const PETALS = ['🌸', '🌹', '✨', '🌺', '💮', '🌷'];
function FallingPetals() {
  const petals = Array.from({ length: 18 }, (_, i) => ({
    id: i, emoji: PETALS[i % PETALS.length],
    left: `${(i * 5.5) % 100}%`,
    duration: `${6 + (i % 7)}s`,
    delay: `${(i * 0.7) % 8}s`,
    size: `${0.9 + (i % 4) * 0.25}rem`,
  }));
  return (
    <>
      {petals.map(p => (
        <div key={p.id} className="petal" style={{ left: p.left, animationDuration: p.duration, animationDelay: p.delay, fontSize: p.size }}>
          {p.emoji}
        </div>
      ))}
    </>
  );
}

// ── Countdown Timer ───────────────────────────────────────────────────────────
const WEDDING_DATE = new Date('2027-06-03T11:00:00');
function Countdown({ t }) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = WEDDING_DATE - new Date();
      if (diff <= 0) return;
      setTime({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    tick(); const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const units = [[time.d, t.days], [time.h, t.hours], [time.m, t.mins], [time.s, t.secs]];
  return (
    <div className="text-center">
      <p className="text-gray-500 tracking-[0.3em] uppercase text-xs mb-6">{t.until}</p>
      <div className="flex items-center justify-center space-x-2 md:space-x-6">
        {units.map(([val, label], i) => (
          <React.Fragment key={label}>
            <div className="text-center min-w-[4rem]">
              <div className="countdown-digit">{String(val).padStart(2, '0')}</div>
              <p className="text-gray-400 tracking-[0.2em] uppercase text-xs mt-2">{label}</p>
            </div>
            {i < 3 && <span className="text-rose-300 text-2xl font-thin mb-4">:</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose, onNext, onPrev }) {
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') onNext(); if (e.key === 'ArrowLeft') onPrev(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose, onNext, onPrev]);
  if (index === null) return null;
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button onClick={e => { e.stopPropagation(); onPrev(); }} className="absolute left-4 md:left-8 text-white/70 hover:text-white text-4xl font-thin transition-colors z-10" style={{ top: '50%', transform: 'translateY(-50%)' }}>‹</button>
      <div className="relative max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <img src={images[index].src} alt={images[index].caption} className="w-full max-h-[80vh] object-contain rounded-2xl" />
        <p className="text-white/70 text-center mt-4 tracking-widest text-sm uppercase">{images[index].caption}</p>
        <p className="text-white/40 text-center text-xs mt-2">{index + 1} / {images.length}</p>
      </div>
      <button onClick={e => { e.stopPropagation(); onNext(); }} className="absolute right-4 md:right-8 text-white/70 hover:text-white text-4xl font-thin transition-colors z-10" style={{ top: '50%', transform: 'translateY(-50%)' }}>›</button>
      <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"><X className="w-8 h-8" /></button>
    </div>
  );
}

// ── RSVP Form ─────────────────────────────────────────────────────────────────
const WEB3FORMS_KEY = '8ebd7fe2-03a7-4898-ad40-dea3fa2bda0a';

function RSVPForm({ t }) {
  const tf = t.rsvpForm;
  const [form, setForm] = useState({ name: '', email: '', rwanda: false, mission: false, guests: '', dietary: '', prayers: '', accommodationPref: '', accommodationOther: '', airlinePref: '', hasExtraBaggage: '', extraBaggageKg: '' });
  const [status, setStatus] = useState('idle');

  const handle = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const submit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...form }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch { setStatus('error'); }
  };

  if (status === 'sent') return (
    <div className="text-center py-16 space-y-6">
      <div className="float inline-block"><CheckCircle className="w-16 h-16 text-rose-400 mx-auto" /></div>
      <p className="text-2xl text-gray-700 font-thin">{tf.sent}</p>
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-600 tracking-widest uppercase text-xs mb-2">{tf.name}</label>
          <input name="name" value={form.name} onChange={handle} required className="rsvp-input" />
        </div>
        <div>
          <label className="block text-gray-600 tracking-widest uppercase text-xs mb-2">{tf.email}</label>
          <input name="email" type="email" value={form.email} onChange={handle} required className="rsvp-input" />
        </div>
      </div>

      <div>
        <label className="block text-gray-600 tracking-widest uppercase text-xs mb-4">{tf.attending}</label>
        <div className="space-y-3">
          {[['rwanda', tf.rwanda, 'amber'], ['mission', tf.mission, 'orange']].map(([key, label, color]) => (
            <label key={key} className="flex items-center space-x-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${form[key] ? `bg-${color}-500 border-${color}-500` : 'border-gray-300'}`}
                style={{ transition: 'all 0.2s' }}>
                {form[key] && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>
              <input type="checkbox" name={key} checked={form[key]} onChange={handle} className="sr-only" />
              <span className="text-gray-700 text-lg">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Accommodation Preference */}
      <div>
        <label className="block text-gray-600 tracking-widest uppercase text-xs mb-3">{tf.accommodationPref}</label>
        <div className="space-y-2">
          {tf.accommodationOptions.map((opt, i) => (
            <label key={i} className="flex items-center space-x-3 cursor-pointer">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${form.accommodationPref === opt ? 'bg-amber-500 border-amber-500' : 'border-gray-300'}`}>
                {form.accommodationPref === opt && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <input type="radio" name="accommodationPref" value={opt} checked={form.accommodationPref === opt} onChange={handle} className="sr-only" />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
        {form.accommodationPref === tf.accommodationOptions[2] && (
          <div className="mt-3">
            <label className="block text-gray-600 tracking-widest uppercase text-xs mb-2">Please specify</label>
            <input name="accommodationOther" value={form.accommodationOther} onChange={handle} className="rsvp-input" placeholder="e.g. Staying with friends, another hotel…" />
          </div>
        )}
      </div>

      {/* Airline Preference */}
      <div>
        <label className="block text-gray-600 tracking-widest uppercase text-xs mb-3">{tf.airlinePref}</label>
        <div className="space-y-2">
          {tf.airlineOptions.map((opt, i) => (
            <label key={i} className="flex items-center space-x-3 cursor-pointer">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${form.airlinePref === opt ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                {form.airlinePref === opt && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <input type="radio" name="airlinePref" value={opt} checked={form.airlinePref === opt} onChange={handle} className="sr-only" />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Extra Baggage */}
      <div className="bg-rose-50 rounded-2xl p-6 space-y-4">
        <label className="block text-rose-800 tracking-widest uppercase text-xs font-medium">{tf.baggageLabel}</label>
        <p className="text-gray-600 text-sm italic">{tf.baggageNote}</p>
        <p className="text-gray-700 text-sm font-medium">{tf.baggageQuestion}</p>
        <div className="space-y-2">
          {[[tf.baggageYes, 'yes'], [tf.baggageNo, 'no']].map(([label, val]) => (
            <label key={val} className="flex items-center space-x-3 cursor-pointer">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${form.hasExtraBaggage === val ? 'bg-rose-500 border-rose-500' : 'border-gray-300'}`}>
                {form.hasExtraBaggage === val && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <input type="radio" name="hasExtraBaggage" value={val} checked={form.hasExtraBaggage === val} onChange={handle} className="sr-only" />
              <span className="text-gray-700">{label}</span>
            </label>
          ))}
        </div>
        {form.hasExtraBaggage === 'yes' && (
          <div>
            <label className="block text-gray-600 tracking-widest uppercase text-xs mb-2">{tf.baggageKg}</label>
            <input name="extraBaggageKg" value={form.extraBaggageKg} onChange={handle} className="rsvp-input" placeholder={tf.baggageKgPlaceholder} />
          </div>
        )}
      </div>

      <div>
        <label className="block text-gray-600 tracking-widest uppercase text-xs mb-2">{tf.guests}</label>
        <textarea name="guests" value={form.guests} onChange={handle} rows={3} className="rsvp-input resize-none" placeholder={tf.guestsPlaceholder} />
      </div>

      <div>
        <label className="block text-gray-600 tracking-widest uppercase text-xs mb-2">{tf.dietary}</label>
        <textarea name="dietary" value={form.dietary} onChange={handle} rows={3} className="rsvp-input resize-none" />
      </div>

      <div>
        <label className="block text-gray-600 tracking-widest uppercase text-xs mb-2">{tf.prayers}</label>
        <textarea name="prayers" value={form.prayers} onChange={handle} rows={3} className="rsvp-input resize-none" />
      </div>

      <button type="submit" disabled={status === 'sending'}
        className="w-full py-4 px-8 bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-2xl tracking-widest uppercase text-sm flex items-center justify-center space-x-3 hover:from-rose-500 hover:to-rose-700 transition-all disabled:opacity-60"
        style={{ transition: 'all 0.3s', fontFamily: 'Cormorant Garamond, serif' }}>
        {status === 'sending' ? <><div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /><span>{tf.sending}</span></> : <><Send className="w-5 h-5" /><span>{tf.submit}</span></>}
      </button>
      {status === 'error' && <p className="text-center text-rose-600 text-sm">Something went wrong. Please email us directly.</p>}
    </form>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState('EN');
  const [navVisible, setNavVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const t = T[lang];

  useEffect(() => {
    const tag = document.createElement('style');
    tag.textContent = globalStyles;
    document.head.appendChild(tag);
    document.title = 'Mary Lucy & Cormac — Wedding 2027';
    return () => document.head.removeChild(tag);
  }, []);

  useEffect(() => {
    const fn = () => setNavVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMobileOpen(false); };

  const nextLightbox = useCallback(() => setLightboxIdx(i => (i + 1) % galleryImages.length), []);
  const prevLightbox = useCallback(() => setLightboxIdx(i => (i - 1 + galleryImages.length) % galleryImages.length), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-neutral-50 font-display">

      <div className="grain-overlay" aria-hidden="true" />
      <FallingPetals />
      <Lightbox images={galleryImages} index={lightboxIdx} onClose={() => setLightboxIdx(null)} onNext={nextLightbox} onPrev={prevLightbox} />

      {navVisible && (
        <nav className="nav-animate fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <button onClick={() => scrollTo('hero')} className="text-gray-800 tracking-widest text-sm font-light uppercase italic">
              ML & CMH
            </button>
            <div className="hidden md:flex items-center space-x-8">
              {[['rwanda', t.nav.rwanda], ['accommodation', t.nav.accommodation], ['flights', t.nav.flights], ['gallery', t.nav.gallery], ['rsvp', t.nav.rsvp]].map(([id, label]) => (
                <button key={id} onClick={() => scrollTo(id)} className="nav-link text-gray-600 hover:text-gray-900">{label}</button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 bg-gray-100 rounded-full p-1">
                {Object.values(T).map(({ lang: l, flag }) => (
                  <button key={l} onClick={() => setLang(l)}
                    className={`px-2 py-1 rounded-full text-xs tracking-wider transition-all ${lang === l ? 'bg-white shadow text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}>
                    {flag} {l}
                  </button>
                ))}
              </div>
              <button onClick={() => setMobileOpen(o => !o)} className="md:hidden text-gray-600">
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          {mobileOpen && (
            <div className="md:hidden border-t border-gray-100 bg-white/95 px-6 py-4 space-y-4">
              {[['rwanda', t.nav.rwanda], ['accommodation', t.nav.accommodation], ['flights', t.nav.flights], ['gallery', t.nav.gallery], ['rsvp', t.nav.rsvp]].map(([id, label]) => (
                <button key={id} onClick={() => scrollTo(id)} className="block w-full text-left text-gray-700 tracking-widest uppercase text-sm py-2 border-b border-gray-50">
                  {label}
                </button>
              ))}
            </div>
          )}
        </nav>
      )}

      {/* ── HERO ── */}
      <div id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ overflow: 'hidden' }}>
          {/* FIX 2: 'centre' typo corrected to 'center', value set to 65% */}
          <ParallaxImg src={coupleImage} alt="Couple portrait" className="w-full h-[120%] object-cover -mt-[10%]" strength={0.1} style={{ objectPosition: 'center 110%' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/45 to-white/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-white/50" />
        </div>

        <div className="absolute top-8 right-8 opacity-10 z-10 float-slow"><Cross className="w-24 h-24 text-gray-600" /></div>
        <div className="absolute bottom-8 left-8 opacity-10 z-10 float"><Cross className="w-16 h-16 text-gray-600" /></div>

        <div className="relative z-10 px-4 py-20 text-center max-w-6xl mx-auto space-y-14">
          <div className="hero-sub flex justify-center items-center space-x-6">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-rose-300" />
            <div className="relative float"><Heart className="w-12 h-12 text-rose-400 fill-current" /><Cross className="w-6 h-6 text-rose-300 absolute -top-2 -right-2" /></div>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-rose-300" />
          </div>

          <div className="hero-sub space-y-4" style={{ animationDelay: '0.2s' }}>
            <p className="text-rose-600 tracking-[0.5em] uppercase text-sm font-light">{t.tagline}</p>
            <div className="flex justify-center space-x-2"><Sparkles className="w-5 h-5 text-rose-300" /><Cross className="w-6 h-6 text-rose-400" /><Sparkles className="w-5 h-5 text-rose-300" /></div>
            <p className="text-gray-700 tracking-[0.3em] uppercase text-xs font-light">{t.subtitle}</p>
          </div>

          <div className="space-y-8">
            <div className="hero-title relative" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-7xl md:text-9xl lg:text-[10rem] text-gray-800 font-thin tracking-widest leading-none italic">Mary Lucy</h1>
              <div className="absolute -top-6 -right-6 w-12 h-12 border-2 border-rose-200 rounded-full opacity-60 float" />
            </div>
            <div className="hero-sub flex items-center justify-center space-x-12 py-4" style={{ animationDelay: '0.4s' }}>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
              <span className="text-rose-400 text-5xl font-thin italic">&amp;</span>
              <div className="w-32 h-px bg-gradient-to-l from-transparent via-rose-300 to-transparent" />
            </div>
            <div className="hero-title relative" style={{ animationDelay: '0.3s' }}>
              <h1 className="text-5xl md:text-7xl lg:text-[6rem] text-gray-800 font-thin tracking-widest leading-none italic">Cormac Matthew Hugh</h1>
              <div className="absolute -bottom-6 -left-6 w-10 h-10 border-2 border-rose-200 rounded-full opacity-60 float-slow" />
            </div>
          </div>

          <div className="hero-quote space-y-6 py-8 max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed italic">{t.invite}</p>
          </div>

          <div className="hero-quote bg-white/70 backdrop-blur-sm rounded-3xl p-8 max-w-2xl mx-auto border border-white/80 shadow-lg" style={{ animationDelay: '0.8s' }}>
            <Countdown t={t.countdown} />
          </div>

          <div className="hero-quote bg-white/60 backdrop-blur-sm rounded-3xl p-8 max-w-xl mx-auto border border-white/80" style={{ animationDelay: '1s' }}>
            <p className="text-lg text-gray-700 italic mb-2">{t.bibleHero}</p>
            <p className="text-sm text-gray-500">{t.bibleHeroRef}</p>
          </div>

          <div className="pt-8 float">
            <button onClick={() => scrollTo('rwanda')} className="flex flex-col items-center space-y-3 text-gray-400 mx-auto hover:text-gray-600 transition-colors">
              <p className="text-sm tracking-widest uppercase">{t.scroll}</p>
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── RWANDA ── */}
      <div id="rwanda" className="section-transition relative bg-gradient-to-b from-orange-50 to-amber-50 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-35" style={{ overflow: 'hidden' }}>
          <ParallaxImg src={rwandaLandscape} alt="Rwanda" className="w-full h-[120%] object-cover -mt-[10%]" strength={0.12} />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-white/50" />
        </div>
        <div className="relative z-10 py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-20">
              <div className="flex items-center justify-center space-x-6 mb-8">
                <div className="w-16 h-px bg-amber-400" />
                <div className="relative float"><Church className="w-10 h-10 text-amber-700" /><Cross className="w-5 h-5 text-amber-500 absolute -top-1 -right-1" /></div>
                <div className="w-16 h-px bg-amber-400" />
              </div>
              <h2 className="text-5xl md:text-7xl font-thin text-gray-800 mb-4 italic">{t.rwanda}</h2>
              <p className="text-amber-800 tracking-[0.4em] uppercase text-sm font-light">{t.rwandaSub}</p>
            </Reveal>

            <div className="grid lg:grid-cols-2 gap-20 items-start">
              <div className="space-y-8 order-2 lg:order-1">
                <Reveal direction="left" delay={100}>
                  <ZoomCard src={rwandaLandscape} alt="Rwanda" className="w-full h-80 object-cover" containerClass="rounded-[2rem] shadow-2xl" onClick={() => setLightboxIdx(1)} />
                </Reveal>
                <Reveal direction="left" delay={250}>
                  <ZoomCard src={missionWork} alt="Mission" className="w-full h-64 object-cover" containerClass="rounded-[2rem] shadow-2xl" onClick={() => setLightboxIdx(2)} />
                </Reveal>
              </div>
              <div className="space-y-8 order-1 lg:order-2">
                <Reveal direction="right" delay={150}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/70">
                    <div className="space-y-8">
                      <div className="flex items-center space-x-6">
                        <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center"><Globe className="w-7 h-7 text-amber-800" /></div>
                        <div><p className="text-3xl text-amber-900 font-thin italic">Butare</p><p className="text-gray-500">Rwanda</p></div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="flex items-center space-x-3"><Calendar className="w-5 h-5 text-amber-600" /><p className="text-gray-800 font-light">Thursday, June 3rd, 2027</p></div>
                        <div className="flex items-center space-x-3"><Clock className="w-5 h-5 text-amber-600" /><p className="text-gray-800 font-light">11:00 AM</p></div>
                      </div>
                      <div className="flex items-center space-x-3 bg-amber-50 rounded-xl px-4 py-3">
                        <Calendar className="w-5 h-5 text-amber-500 shrink-0" />
                        <p className="text-amber-800 font-light text-sm">Guests should plan to arrive <strong>Friday 28th May</strong> and depart <strong>Sunday 6th June 2027</strong></p>
                      </div>
                      <div className="border-t border-gray-100 pt-6 flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-amber-600 mt-1 shrink-0" />
                        <div><p className="text-gray-800 font-light">Community Chapel of the Servos de Maria de Coração de Jesus</p><p className="text-gray-400 text-sm mt-1">Huye District, Butare</p></div>
                      </div>
                    </div>
                  </div>
                </Reveal>
                <Reveal direction="right" delay={280}>
                  <div className="bg-amber-50/80 rounded-2xl p-7">
                    <p className="text-amber-900 font-medium mb-2">{t.dressRwanda}</p>
                    <p className="text-gray-600 leading-relaxed">{t.dressRwandaDesc}</p>
                  </div>
                </Reveal>
              </div>
            </div>

            <Reveal delay={150} className="mt-24">
              <div className="bg-white rounded-[2rem] p-12 shadow-2xl max-w-5xl mx-auto border border-amber-100">
                <div className="text-center mb-10">
                  <div className="flex items-center justify-center space-x-4 mb-5"><HandHeart className="w-7 h-7 text-orange-600" /><Cross className="w-5 h-5 text-orange-400 float" /><HandHeart className="w-7 h-7 text-orange-600" /></div>
                  <h3 className="text-3xl font-thin text-gray-800 italic mb-2">{t.mission}</h3>
                  <p className="text-orange-600 tracking-widest uppercase text-xs">{t.missionSub}</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 mb-10">
                  {[GraduationCap, Stethoscope, HandHeart].map((Icon, i) => (
                    <Reveal key={i} delay={i * 100}>
                      <div className="text-center space-y-4">
                        <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto" style={{ transition: 'transform 0.3s' }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15) rotate(5deg)'; }} onMouseLeave={e => { e.currentTarget.style.transform = ''; }}>
                          <Icon className="w-7 h-7 text-orange-700" />
                        </div>
                        <h4 className="text-lg font-medium text-gray-800">{t.missionItems[i].title}</h4>
                        <p className="text-gray-500 leading-relaxed text-sm">{t.missionItems[i].desc}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
                <div className="bg-orange-50 rounded-2xl p-8 text-center">
                  <p className="text-gray-700 leading-relaxed mb-3">{t.missionNote}</p>
                  <p className="text-orange-700 italic text-sm">{t.bibleMission} {t.bibleMissionRef}</p>
                </div>
              </div>
            </Reveal>

            {/* ── SAFARI ── */}
            <Reveal delay={200} className="mt-10">
              <div className="bg-white rounded-[2rem] p-12 shadow-2xl max-w-5xl mx-auto border border-green-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-green-50 rounded-full -translate-y-24 translate-x-24" />
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center space-x-4 mb-5">
                    <span className="text-4xl">🦁</span>
                    <span className="text-4xl">🌿</span>
                    <span className="text-4xl">🐘</span>
                  </div>
                  <h3 className="text-3xl font-thin text-gray-800 italic mb-2">{t.safariTitle}</h3>
                  <p className="text-green-700 tracking-widest uppercase text-xs mb-6">{t.safariSub}</p>
                  <div className="bg-green-50 rounded-2xl p-8 text-left space-y-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <p className="text-gray-700"><strong>{t.safariDate}</strong></p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <p className="text-gray-700">{t.safariItinerary}</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Star className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <p className="text-gray-700">{t.safariBooking}</p>
                    </div>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6 text-left">
                    <p className="text-amber-800 text-sm leading-relaxed">{t.safariNonSafari}</p>
                  </div>
                  <div className="bg-white border border-green-200 rounded-2xl p-6">
                    <p className="text-green-800 font-medium mb-4">{t.safariContact}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-gray-600 font-medium">Mary</p>
                        <p className="text-green-700">+44 7729 361640</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600 font-medium">Cormac</p>
                        <p className="text-green-700">+353 851094610</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── ACCOMMODATION ── */}
      <div id="accommodation" className="section-transition relative py-32 px-4 bg-gradient-to-b from-emerald-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-20">
            <div className="flex items-center justify-center space-x-6 mb-8"><div className="w-16 h-px bg-emerald-400" /><House className="w-9 h-9 text-emerald-700 float" /><div className="w-16 h-px bg-emerald-400" /></div>
            <h2 className="text-5xl md:text-6xl font-thin text-gray-800 mb-4 italic">{t.accommodationTitle}</h2>
            <p className="text-emerald-700 tracking-[0.3em] uppercase text-sm font-light">{t.accommodationSub}</p>
          </Reveal>

          {/* Free Community Accommodation — shown first */}
          <Reveal delay={100} className="mb-16">
            <div className="bg-white rounded-[2rem] p-10 shadow-2xl border border-emerald-200 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-50 rounded-full -translate-y-16 -translate-x-16" />
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center shrink-0"><Cross className="w-7 h-7 text-emerald-700" /></div>
                  <div>
                    <span className="inline-block bg-emerald-100 text-emerald-800 text-xs tracking-widest uppercase px-3 py-1 rounded-full mb-2">Free</span>
                    <h3 className="text-3xl font-thin text-gray-800 italic">{t.communityTitle}</h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">{t.communityDesc}</p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {t.communityDetails.map((detail, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 shrink-0" />
                      <p className="text-gray-600 text-sm">{detail}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                  <p className="text-amber-800 font-medium mb-3">{t.communityRules}</p>
                  <div className="space-y-2">
                    {t.communityRulesItems.map((rule, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 shrink-0" />
                        <p className="text-amber-800 text-sm">{rule}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Galileo — top paid pick */}
          <Reveal delay={150} className="mb-16">
            <div className="bg-white rounded-[2rem] p-10 shadow-2xl border-2 border-amber-300 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-50 rounded-full -translate-y-20 translate-x-20" />
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center shrink-0"><Star className="w-7 h-7 text-amber-600" /></div>
                  <div>
                    <p className="text-amber-700 tracking-widest uppercase text-xs font-medium mb-1">{t.galileoTitle}</p>
                    <h3 className="text-3xl font-thin text-gray-800 italic">{t.galileoName}</h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">{t.galileoNote}</p>
                <a href={t.galileoUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl tracking-widest uppercase text-xs transition-all"
                  style={{ transition: 'all 0.3s' }}>
                  <Globe className="w-4 h-4" /><span>Visit Website</span>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Other Hotels */}
          <Reveal delay={200}>
            <h3 className="text-3xl font-thin text-gray-700 italic text-center mb-10">{t.otherHotels}</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {[
                { name: 'Credo Hotel', rating: '3.9★', highlight: 'Pool & restaurant, close to main road', booking: 'https://www.credohotel.rw/' },
                { name: 'Irebero Boutique Hotel', rating: '4.3★', highlight: 'Intimate, near Ethnography Museum', booking: 'https://www.booking.com/hotel/rw/irebero-boutique.en-gb.html' },
              ].map(({ name, rating, highlight, booking }, i) => (
                <Reveal key={i} delay={i * 80} direction="up">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex flex-col"
                    style={{ transition: 'transform 0.3s, box-shadow 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                    <p className="text-yellow-500 text-sm mb-1">{rating}</p>
                    <h4 className="text-xl font-thin text-gray-800 italic mb-2">{name}</h4>
                    <p className="text-gray-500 text-sm mb-4 flex-1">{highlight}</p>
                    <a href={booking} target="_blank" rel="noopener noreferrer"
                      className="text-center text-xs tracking-widest uppercase text-emerald-700 border border-emerald-300 rounded-lg py-2 px-4 hover:bg-emerald-50 transition-colors">
                      Visit Website
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── FLIGHTS ── */}
      <div id="flights" className="section-transition relative py-32 px-4 bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-20">
            <div className="flex items-center justify-center space-x-6 mb-8"><div className="w-16 h-px bg-sky-300" /><Globe className="w-9 h-9 text-sky-600 float" /><div className="w-16 h-px bg-sky-300" /></div>
            <h2 className="text-5xl md:text-6xl font-thin text-gray-800 mb-4 italic">{t.flightsTitle}</h2>
            <p className="text-sky-700 tracking-[0.3em] uppercase text-sm font-light mb-4">{t.flightsSub}</p>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto">{t.flightsDates}</p>
          </Reveal>

          {(() => {
            const colorMap = {
              blue:   { bg: '#eff6ff', text: '#1d4ed8', badge: '#dbeafe', badgeText: '#1d4ed8', dot: '#bfdbfe' },
              amber:  { bg: '#fffbeb', text: '#b45309', badge: '#fef3c7', badgeText: '#b45309', dot: '#fde68a' },
              rose:   { bg: '#fff1f2', text: '#be123c', badge: '#ffe4e6', badgeText: '#be123c', dot: '#fecdd3' },
              purple: { bg: '#faf5ff', text: '#7e22ce', badge: '#f3e8ff', badgeText: '#7e22ce', dot: '#e9d5ff' },
              red:    { bg: '#fef2f2', text: '#b91c1c', badge: '#fee2e2', badgeText: '#b91c1c', dot: '#fecaca' },
            };
            const AirlineCard = ({ name, duration, route, stops, color, flag, note }) => {
              const c = colorMap[color] || colorMap.blue;
              return (
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative overflow-hidden"
                  style={{ transition: 'transform 0.3s, box-shadow 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full -translate-y-12 translate-x-12" style={{ background: c.dot }} />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{flag}</span>
                        <h3 className="text-2xl font-thin italic" style={{ color: c.text }}>{name}</h3>
                      </div>
                      <span className="text-xs tracking-widest uppercase px-3 py-1 rounded-full" style={{ background: c.badge, color: c.badgeText }}>{stops}</span>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-sm">Journey Time</span>
                        <span className="text-gray-700">{duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-sm">Route</span>
                        <span className="text-gray-700 text-right text-sm">{route}</span>
                      </div>
                    </div>
                    <div className="rounded-xl p-4" style={{ background: c.bg }}>
                      <p className="text-sm italic" style={{ color: c.text }}>{note}</p>
                    </div>
                  </div>
                </div>
              );
            };
            return (
              <>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {t.airlines.slice(0, 4).map(({ name, duration, route, stops, color, flag, note }, i) => (
                    <Reveal key={name} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 100}>
                      <AirlineCard name={name} duration={duration} route={route} stops={stops} color={color} flag={flag} note={note} />
                    </Reveal>
                  ))}
                </div>
                <div className="flex justify-center mb-12">
                  <div className="w-full md:w-1/2">
                    {t.airlines.slice(4).map(({ name, duration, route, stops, color, flag, note }) => (
                      <Reveal key={name} direction="up" delay={400}>
                        <AirlineCard name={name} duration={duration} route={route} stops={stops} color={color} flag={flag} note={note} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              </>
            );
          })()}

          <Reveal delay={300}>
            <div className="bg-rose-50 rounded-2xl p-8 max-w-3xl mx-auto text-center space-y-4">
              <HandHeart className="w-8 h-8 text-rose-500 mx-auto float" />
              <p className="text-rose-800 font-medium">{t.flightsGroupNote}</p>
              <div className="bg-white rounded-xl p-4 border border-rose-200">
                <p className="text-rose-700 text-sm font-medium">{t.flightsContactBaggage}</p>
              </div>
              <p className="text-gray-400 text-xs italic">{t.flightsPriceNote}</p>
            </div>
          </Reveal>
        </div>
      </div>


      {/* ── GALLERY ── */}
      <div id="gallery" className="section-transition py-32 px-4 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <div className="flex items-center justify-center space-x-6 mb-8"><div className="w-16 h-px bg-rose-300" /><Camera className="w-8 h-8 text-rose-500 float" /><div className="w-16 h-px bg-rose-300" /></div>
            <h2 className="text-5xl font-thin text-gray-800 italic mb-4">{t.gallery}</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <Reveal key={i} delay={i * 80} direction="scale">
                <ZoomCard
                  src={img.src} alt={img.caption}
                  position={img.position}
                  className="w-full h-48 md:h-64 object-cover"
                  containerClass={`rounded-2xl shadow-lg ${i === 0 ? 'md:col-span-2 md:row-span-1' : ''}`}
                  onClick={() => setLightboxIdx(i)}
                />
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <p className="text-center text-gray-400 text-sm tracking-widest uppercase mt-8">{t.galleryHint}</p>
          </Reveal>
        </div>
      </div>

      {/* ── GIFTS ── */}
      <div className="section-transition py-32 px-4 bg-gradient-to-b from-rose-50 via-white to-rose-50">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <Reveal><div className="flex items-center justify-center space-x-6"><div className="w-16 h-px bg-rose-300" /><div className="relative float"><Heart className="w-10 h-10 text-rose-500" /><Cross className="w-5 h-5 text-rose-300 absolute -top-1 -right-1" /></div><div className="w-16 h-px bg-rose-300" /></div></Reveal>
          <Reveal delay={100}><h3 className="text-4xl font-thin text-gray-800 italic">{t.gifts}</h3></Reveal>
          <Reveal delay={200}>
            <div className="bg-white rounded-3xl p-14 shadow-2xl border border-rose-100">
              <HandHeart className="w-12 h-12 text-rose-400 mx-auto mb-8 float" />
              <p className="text-gray-600 leading-relaxed text-xl mb-10 italic">{t.giftsDesc}</p>
              <div className="bg-rose-50 rounded-2xl p-10 mb-8">
                <h4 className="text-xl text-rose-700 mb-6 font-light tracking-widest uppercase text-sm">{t.giftsSupport}</h4>
                <div className="grid md:grid-cols-3 gap-8 text-left">
                  {[House, Stethoscope, HandHeart].map((Icon, i) => (
                    <div key={i} className="flex items-start space-x-3" style={{ transition: 'transform 0.3s' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(5px)'; }} onMouseLeave={e => { e.currentTarget.style.transform = ''; }}>
                      <Icon className="w-5 h-5 text-rose-500 mt-1 shrink-0" />
                      <div><p className="font-medium text-rose-800">{t.giftsItems[i].title}</p><p className="text-gray-500 text-sm">{t.giftsItems[i].desc}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-rose-600 italic">{t.bibleGifts} {t.bibleGiftsRef}</p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── RSVP ── */}
      <div id="rsvp" className="section-transition py-32 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-16">
            <div className="flex items-center justify-center space-x-6 mb-8"><div className="w-16 h-px bg-gray-400" /><Flower2 className="w-8 h-8 text-gray-600 float-slow" /><Cross className="w-7 h-7 text-gray-500 float" /><div className="w-16 h-px bg-gray-400" /></div>
            <h2 className="text-5xl font-thin text-gray-800 italic mb-4">{t.rsvpTitle}</h2>
            <p className="text-rose-600 text-base font-medium tracking-wide mt-2">Please respond by <strong className="font-bold text-rose-700">1st August 2026</strong></p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {t.rsvpContacts.map(({ color, title, email, phone }, i) => (
              <Reveal key={title} direction={i === 0 ? 'left' : 'right'} delay={i * 100}>
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center"
                  style={{ transition: 'transform 0.3s, box-shadow 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                  <h4 className={`text-xl font-thin text-${color}-800 italic mb-4`}>{title}</h4>
                  <p className="text-gray-600">{email}</p>
                  <p className="text-gray-600 mt-1">{phone}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
              <h3 className="text-2xl font-thin text-gray-700 italic text-center mb-8">{t.rsvpOr}</h3>
              <RSVPForm t={t} />
              {WEB3FORMS_KEY.includes('XXXX') && (
                <p className="text-center text-gray-400 text-xs mt-4 italic">
                  To enable the form: paste your full Web3Forms key at the top of App.jsx
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="section-transition py-24 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <Reveal>
            <div className="flex justify-center items-center space-x-6">
              <div className="w-3 h-3 bg-amber-300 rounded-full float" />
              <Cross className="w-7 h-7 text-rose-400 float-slow" />
              <div className="w-4 h-4 bg-rose-400 rounded-full float" />
              <Cross className="w-7 h-7 text-rose-400 float-slow" />
              <div className="w-3 h-3 bg-blue-300 rounded-full float" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-3xl text-gray-700 font-thin italic">"{t.footer}"</p>
            <p className="text-gray-400 mt-4 tracking-wide">{t.thanks}</p>
          </Reveal>
          <Reveal delay={200}>
            <div className="bg-rose-50 rounded-2xl p-8 max-w-2xl mx-auto">
              <p className="text-rose-700 italic leading-relaxed">{t.footerQuote}</p>
              <p className="text-gray-400 text-sm mt-3">{t.footerVerse}</p>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <p className="text-gray-400 text-sm">{t.footerBlessed}</p>
            <div className="flex justify-center space-x-3 mt-6">
              <div className="w-px h-10 bg-gradient-to-b from-rose-300 to-transparent" />
              <Cross className="w-6 h-6 text-rose-400 float" />
              <div className="w-px h-10 bg-gradient-to-b from-rose-300 to-transparent" />
            </div>
          </Reveal>
        </div>
      </div>

    </div>
  );
}
