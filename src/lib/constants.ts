import { NavLink, Project, ProcessStep, SiteMetadata, SocialLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Works', href: '#works' },
  { label: 'Skills', href: '#skills' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
  // { label: 'Blog', href: '/blog' },
  // { label: 'Work', href: '/work' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/rajan-khadkaa' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/rajan-khadka-106868268/' },
  { name: 'WhatsApp', url: 'https://wa.me/+9779814364007?text=Hello%20Rajan,%20Let%27s%20work%20together.' }
];

// Only show these two case studies in the Works section
export const WORKS = [
  {
    num: '01',
    slug: 'safetrack',
    title: 'Safetrack',
    tag: 'Mobile App Design',
    description:
      'A mobile app for parents with real-time location tracking, school schedules, and event notifications unified in one glanceable interface. Research-led, tested twice.',
    image: '/case study resources/safetrack/safetrack-colored-bg.png',
  },
  {
    num: '02',
    slug: 'hrms',
    title: 'HRMS',
    tag: 'Web Application Design',
    description:
      'A web-based HR management system connecting recruitment, employee management, and payroll workflows. Built to eliminate the manual handoffs that cause delays and errors.',
    image: '/case study resources/hrms/hrms-colored-bg.png',
  },
];


export const SKILLS_LIST = [
  'Figma',
  'Photoshop',
  'Illustrator',
  // 'Spline (3D Design)',
  'Stitch (AI Design Tool)',
  // 'Web Design',
  'Interface Design',
  'React',
  'Tailwind CSS',
  'Next.js',
  'Git',
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    num: '01',
    title: 'Discover',
    description: 'Understanding the problem, the audience, and what success looks like before any screens get drawn.',
  },
  {
    num: '02',
    title: 'Design',
    description: 'Low-fidelity sketches to high-fidelity prototypes. The simplest thing that works beautifully.',
  },
  {
    num: '03',
    title: 'Test',
    description: 'Real users, real tasks. I watch for where the design breaks instead of guessing what works.',
  },
  {
    num: '04',
    title: 'Refine',
    description: 'Shipping is not the end. I iterate based on real usage and keep polishing until the details feel effortless.',
  },
];

export const SITE_METADATA: SiteMetadata = {
  name: 'Rajan',
  title: 'Rajan Designer',
  description: 'Building thoughtful interfaces and creative experiences.',
  email: 'rajankhadkaa0809@gmail.com',
};
