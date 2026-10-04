import { Product, Testimonial, LiveToastMessage, VideoReelItem } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Apex-X400 Heavy Duty CNC Lathe',
    category: 'CNC Lathes',
    sku: 'APEX-X400-CNC',
    price: 48500,
    discountPrice: 45900,
    stockStatus: 'In Stock',
    stockCount: 4,
    rating: 4.9,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1565043669-37f2251a3765?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1565043669-37f2251a3765?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1537462715879-363eab615ad9?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-machining-process-with-a-cnc-machine-42861-large.mp4',
    shortDescription: 'High-rigidity slant bed CNC lathe with Fanuc 0i-TF Plus control, 3000 RPM spindle, and 12-station servo turret.',
    fullDescription: 'The Apex-X400 is engineered for ultra-precision heavy-duty component manufacturing in automotive, aerospace, and energy sectors. Built on a Meehanite cast iron 45-degree slant bed with linear roller guideways, it guarantees exceptional thermal stability, vibration damping, and heavy chip removal rates.',
    specifications: {
      maxTurningDiameter: 'Ø 420 mm',
      spindleSpeed: '30 - 3,500 RPM',
      chuckSize: '10 inch (Hydraulic)',
      bedLength: '1,200 mm between centers',
      motorPower: '15 / 18.5 kW',
      weight: '4,600 kg',
      controlSystem: 'Fanuc 0i-TF / Siemens 828D'
    },
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'prod-2',
    name: 'Titan-T600 Ultra-Precision Turning Center',
    category: 'Turning Centers',
    sku: 'TITAN-T600-TC',
    price: 72000,
    stockStatus: 'Low Stock',
    stockCount: 2,
    rating: 5.0,
    reviewsCount: 24,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-metal-cutting-machine-42862-large.mp4',
    shortDescription: 'Sub-spindle equipped CNC turning center with live tooling capabilities and Y-axis off-center milling.',
    fullDescription: 'Designed for complete "Done-in-One" machining of complex complex parts. Features a powerful sub-spindle for back-end machining, driven live tools up to 6,000 RPM, and absolute optical encoders on all axes for sub-micron positional accuracy.',
    specifications: {
      maxTurningDiameter: 'Ø 550 mm',
      spindleSpeed: '4,500 RPM',
      chuckSize: '12 inch 3-Jaw + Sub-spindle',
      bedLength: '1,500 mm',
      motorPower: '22 / 26 kW',
      weight: '6,200 kg',
      controlSystem: 'Siemens SINUMERIK 840D sl'
    },
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'prod-3',
    name: 'Vortex-M505 High-Speed Vertical Milling Center',
    category: 'Milling & Boring',
    sku: 'VORTEX-M505-VMC',
    price: 59000,
    discountPrice: 55000,
    stockStatus: 'In Stock',
    stockCount: 5,
    rating: 4.8,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-machining-process-with-a-cnc-machine-42861-large.mp4',
    shortDescription: 'C-frame vertical machining center with 12,000 RPM direct-drive spindle and 24-tool arm type ATC.',
    fullDescription: 'The Vortex-M505 delivers exceptional rigidity and rapid traverse speeds (48 m/min on X/Y/Z). Ideal for mold making, medical implants, and high-precision aerospace brackets.',
    specifications: {
      maxTurningDiameter: 'Table 1,100 x 550 mm',
      spindleSpeed: '12,000 RPM (BT40)',
      chuckSize: 'N/A (Work Table)',
      bedLength: 'X: 1000 / Y: 550 / Z: 600 mm',
      motorPower: '11 / 15 kW',
      weight: '5,800 kg',
      controlSystem: 'Mitsubishi M80 / Fanuc 0i-MF'
    },
    isFeatured: true,
    isBestSeller: false
  },
  {
    id: 'prod-4',
    name: 'Carbide Turning Inserts TNMG16 (Box of 10)',
    category: 'Tooling & Inserts',
    sku: 'TOOL-TNMG-16',
    price: 145,
    discountPrice: 125,
    stockStatus: 'In Stock',
    stockCount: 150,
    rating: 4.9,
    reviewsCount: 180,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDescription: 'PVD multi-layer coated carbide inserts for high-speed steel and stainless steel roughing/finishing.',
    fullDescription: 'Premium micro-grain carbide substrate with titanium aluminum nitride (TiAlN) coating. Offers superior wear resistance and extended tool life under high cutting temperatures.',
    specifications: {
      maxTurningDiameter: 'N/A',
      spindleSpeed: 'Optimized up to 5,000 RPM',
      chuckSize: 'Standard ISO Holder',
      bedLength: 'TNMG 160408-MM',
      motorPower: 'N/A',
      weight: '0.15 kg / box',
      controlSystem: 'Universal'
    },
    isFeatured: false,
    isBestSeller: true
  },
  {
    id: 'prod-5',
    name: 'Hydraulic 3-Jaw Power Chuck 250mm',
    category: 'Spare Parts',
    sku: 'PART-CHUCK-250',
    price: 1850,
    discountPrice: 1690,
    stockStatus: 'In Stock',
    stockCount: 12,
    rating: 4.7,
    reviewsCount: 31,
    image: 'https://images.unsplash.com/photo-1537462715879-363eab615ad9?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537462715879-363eab615ad9?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDescription: 'High-speed through-hole hydraulic chuck with hardened alloy steel jaws and high gripping force.',
    fullDescription: 'Precision ground wedge-bar design ensures high rigidity and clamping accuracy under centrifugal forces up to 4,000 RPM.',
    specifications: {
      maxTurningDiameter: '250 mm (10 inch)',
      spindleSpeed: 'Max 4,000 RPM',
      chuckSize: 'A2-6 Direct Mount',
      bedLength: 'N/A',
      motorPower: 'Hydraulic Cylinder 35 kN',
      weight: '34 kg',
      controlSystem: 'Hydraulic Actuation'
    },
    isFeatured: false,
    isBestSeller: true
  }
];

export const INITIAL_VIDEO_REELS: VideoReelItem[] = [
  {
    id: 'reel-1',
    title: 'Apex-X400 Heavy Chip Removal & Precision Turning',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-machining-process-with-a-cnc-machine-42861-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1565043669-37f2251a3765?auto=format&fit=crop&w=600&q=80',
    viewsCount: 1420,
    likesCount: 385,
    machineModel: 'Apex-X400 CNC Lathe',
    viewsLog: [
      { deviceId: 'dev-demo-1', userName: 'Ing. Tariq', timestamp: '2026-10-04 10:30' },
      { deviceId: 'dev-demo-2', userName: 'Lahore Workshop', timestamp: '2026-10-04 11:15' }
    ],
    likesLog: [
      { deviceId: 'dev-demo-1', userName: 'Ing. Tariq', timestamp: '2026-10-04 10:31' }
    ],
    comments: [
      { id: 'c1', user: 'Ing. Tariq (Gujranwala)', text: 'Amazing surface finish on hardened steel!', time: '10m ago' },
      { id: 'c2', user: 'AutoParts Maker Lahore', text: 'What is the spindle motor rating?', time: '25m ago' }
    ]
  },
  {
    id: 'reel-2',
    title: 'Titan-T600 Live Tooling & Sub-Spindle Operation',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-metal-cutting-machine-42862-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
    viewsCount: 2180,
    likesCount: 512,
    machineModel: 'Titan-T600 Turning Center',
    viewsLog: [
      { deviceId: 'dev-demo-3', userName: 'Faisalabad Foundry', timestamp: '2026-10-04 09:00' }
    ],
    likesLog: [
      { deviceId: 'dev-demo-3', userName: 'Faisalabad Foundry', timestamp: '2026-10-04 09:02' }
    ],
    comments: [
      { id: 'c1', user: 'Faisalabad Foundry', text: 'Clean chip evacuation system.', time: '1h ago' }
    ]
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Ing. Hans-Dieter Weber',
    role: 'Managing Director',
    company: 'Weber Precision Gmbh (Stuttgart)',
    location: 'Germany',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    comment: 'We deployed three Apex-X400 CNC Lathes in our automotive drivetrain facility. The thermal stability and rigidity under continuous 3-shift operation have exceeded all expectations. Cycle times dropped by 22%.',
    rating: 5,
    machineUsed: 'Apex-X400 Heavy Duty CNC Lathe'
  },
  {
    id: 'test-2',
    clientName: 'Tariq Mehmood',
    role: 'Chief Technical Officer',
    company: 'Lahore Heavy Engineering Works',
    location: 'Pakistan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    comment: 'Mughalstech CNC Hub provided on-site installation and staff training within 48 hours of machine arrival. Their WhatsApp quotation and parts support is lightning fast. Exceptional engineering partners.',
    rating: 5,
    machineUsed: 'Titan-T600 Ultra-Precision Turning Center'
  }
];

export const INITIAL_LIVE_TOASTS: LiveToastMessage[] = [
  { id: 't-1', text: 'Factory owner in Gujranwala just requested a Proforma Quote for Apex-X400 CNC Lathe!', timeAgo: '2 mins ago' },
  { id: 't-2', text: 'Automotive tier-1 supplier in Sialkot ordered 20x Carbide Turning Inserts TNMG16.', timeAgo: '7 mins ago' },
  { id: 't-3', text: 'Precision tooling firm in Lahore booked a Live Video Demo call.', timeAgo: '14 mins ago' }
];
