// data.js
// static assets for local faculties (Expo/React Native require a reference, not a string URI)
import designImg from './assets/innovation.jpg';
import architectureImg from './assets/architecturee.jpg';
import businessImg from './assets/business.jpg';
import ictImg from './assets/ict.jpg';
import communicationImg from './assets/journalism.jpg';
import tourismImg from './assets/hotel.jpg';
import IctLab from './assets/ICTLAB.jpeg';


export const FACULTIES = [
  {
    id: 'design',
    name: 'Faculty of Design Innovation',
    // use the imported image object instead of a string name
    image: designImg,
    courses: [
      { id: 'creative-advertising', name: 'Diploma in Creative Advertising', description: 'Develop campaigns that move people. Learn the full process from brief to concept to execution across digital and traditional media.', requirements: 'Minimum 3 C grades and 2 D passes with at least a D in English. Portfolio required.', outcomes: 'Art Director, Brand Strategist, Creative Consultant, Copywriter.', duration: '3 Years', image: 'https://i.pinimg.com/1200x/05/ae/dd/05aedd2bf9adcb5c64363f2681cca69f.jpg', video: 'https://youtu.be/fC_5ewWI3HI?si=1EF1ng4eT3SYLlp7' },
      { id: 'graphic-design', name: 'Diploma in Graphic Design', description: 'Visual communication is a language. Learn typography, layout, brand identity and digital design.', requirements: 'Minimum 3 C grades and 2 D passes with at least a D in English. Portfolio required.', outcomes: 'Graphic Designer, UI Designer, Brand Identity Specialist, Art Director.', duration: '3 Years', image: 'https://i.pinimg.com/736x/4a/06/03/4a0603a2e2be0a5f8ca95a180a38a828.jpg', video: 'https://youtu.be/YqQx75OPRa0?si=PqeLynZKp_9yGrXN' },
      { id: 'fashion', name: 'Diploma in Fashion and Apparel Design', description: 'From sketch to garment. Fashion design, pattern-making and the business of style.', requirements: 'Minimum 3 C grades and 2 D passes with at least a D in English. Portfolio required.', outcomes: 'Fashion Designer, Stylist, Textile Designer, Fashion Entrepreneur.', duration: '3 Years', image: 'https://i.pinimg.com/736x/8f/0b/4c/8f0b4c8d970b97615cff992bfab8ca1b.jpg', video: 'https://youtu.be/YxeFR0ToXhM?si=sxeVBnIjNGvUm98n' },
    ],
  },
  {
    id: 'architecture',
    name: 'Faculty of Architecture & Built Environment',
    // local asset reference
    image: architectureImg,
    courses: [
      { id: 'arch-tech', name: 'Degree in Architectural Technology', description: 'The technical backbone of great buildings. Structural systems and digital modelling tools.', requirements: 'Minimum 3 C grades and 2 D passes. At least a D in Mathematics and English.', outcomes: 'Architectural Technologist, CAD Designer, Building Inspector.', duration: '3 Years', image: 'https://i.pinimg.com/1200x/7b/97/cf/7b97cfe32e34d3d93717b2e7fd8cf6f9.jpg', video: 'https://youtu.be/5l8hpt4BXBc?si=Piw8DKEJWZrv0p1P'},
      { id: 'construction', name: 'Diploma in Architectural Technology', description: 'Lead projects from groundbreaking to handover. Site management and team coordination.', requirements: 'Minimum 3 C grades and 2 D passes.', outcomes: 'Construction Manager, Project Coordinator, Site Supervisor.', duration: '3 Years', image: 'https://i.pinimg.com/736x/a9/35/cd/a935cd01b13ee987aa523493bb69639a.jpg', video: 'https://youtu.be/5l8hpt4BXBc?si=Piw8DKEJWZrv0p1'},
    ],
  },
  {
    id: 'tourism',
    name: 'Faculty of Creativity in Tourism & Hospitality',
    image: tourismImg,
    courses: [
      { id: 'tourism-mgmt', name: 'Degree in Tourism Management', description: 'Lead the future of travel. Tourism planning, destination management and sustainable tourism.', requirements: 'Minimum 4 C grades and 2 D passes including English and Geography.', outcomes: 'Tourism Manager, Destination Planner, Travel Consultant.', duration: '4 Years', image: 'https://i.pinimg.com/1200x/29/18/68/29186832dc36aa3a621b65611dd95613.jpg', video: 'https://youtu.be/nHZ7RLnZ5bU?si=T0gxo_myZ5WJLuCm' },
      { id: 'hotel-mgmt', name: 'Diploma in Hotel Management', description: 'Run world-class hospitality operations. Front office, food and beverage and housekeeping.', requirements: 'Minimum 3 C grades and 2 D passes including a D in English.', outcomes: 'Hotel Manager, Front Office Manager, Hospitality Consultant.', duration: '3 Years', image:'https://i.pinimg.com/736x/25/c1/20/25c120cb76857d55ff47ecd22c518c1e.jpg', video: 'https://youtu.be/VaQpLCfNPhU?si=6vPYx7rPtPjnt43n' },
      { id: 'events-mgmt', name: 'Diploma in Events Management', description: 'Design and deliver memorable events from conferences to festivals.', requirements: 'Minimum 3 C grades and 2 D passes including a D in English.', outcomes: 'Events Manager, Wedding Planner, Conference Coordinator.', duration: '3 Years', image: 'https://i.pinimg.com/736x/1f/f4/22/1ff422ba4ffed80c1640dfa287500e43.jpg', video: 'https://youtu.be/H6Kzuh6SuEQ?si=Q4JikMnpfiFXVLo2' },
      { id: 'tour-ops', name: 'Diploma in Tourism Management', description: 'Practical tourism skills for guiding, tour operation and visitor management.', requirements: 'Minimum 3 C grades and 2 D passes.', outcomes: 'Tour Operator, Visitor Guide, Tourism Officer.', duration: '3 Years', image: 'https://i.pinimg.com/736x/8d/72/ed/8d72edd470406735ba564553b0db68bb.jpg', video: 'https://youtu.be/nHZ7RLnZ5bU?si=T0gxo_myZ5WJLuCm' },
      { id: 'catering', name: 'Certificate in Catering and Home Science', description: 'Food preparation, nutrition and professional kitchen management.', requirements: 'Minimum 3 C grades and 2 D passes.', outcomes: 'Chef, Caterer, Nutrition Advisor, Food Entrepreneur.', duration: '2 Years', image: 'https://i.pinimg.com/736x/77/f6/42/77f64279f3c137dca3579340f3f58624.jpg', video: 'https://youtu.be/V3Q-ymJMUnc?si=8syM1Zl221tN9eYu' },
    ],
  },
  {
    id: 'business',
    name: 'Faculty of Business & Globalization',
    image: businessImg,
    courses: [
      { id: 'international-business', name: 'Degree in International Business', description: 'Cross borders with confidence. Trade, global markets and multicultural management.', requirements: 'Minimum 4 C grades with at least a C in Commercial subjects and 2 D passes inclusive of Mathematics.', outcomes: 'International Trade Manager, Global Marketing Director, Business Analyst.', duration: '4 Years', image: 'https://i.pinimg.com/736x/d7/29/dd/d729dd5248143e120ca299cf3d448f9f.jpg', video: 'https://youtu.be/gnxSv2jjdlA?si=OIwXuWpCkBwzKFEA' },
      { id: 'entrepreneurship', name: 'Degree in Entrepreneurship', description: 'Build something from nothing. Idea validation, business planning and growth strategy.', requirements: 'Minimum 4 C grades with at least a C in Commercial subjects and 2 D passes inclusive of Mathematics.', outcomes: 'Entrepreneur, Startup Founder, Business Development Manager.', duration: '4 Years', image: 'https://i.pinimg.com/1200x/9a/e2/0e/9ae20e3ca0cee3884ecbaea8fe5b367f.jpg', video: 'https://youtu.be/UEngvxZ11sw?si=Jo6Ku1FW6SzhN5xF' },
      { id: 'hr-management', name: 'Degree in Human Resource Management', description: "People are an organisation's greatest asset. Attract, develop and retain talent.", requirements: 'Minimum 4 C grades with at least a C in Commercial subjects and 2 D passes inclusive of Mathematics.', outcomes: 'HR Manager, Talent Acquisition Specialist, OD Consultant.', duration: '4 Years', image: 'https://i.pinimg.com/736x/c7/2b/34/c72b3470411cf00864beee461df22b0a.jpg', video: 'https://youtu.be/aPEUKLxxh_k?si=-xM7kwk6H6DITkBF' },
      { id: 'marketing', name: 'Diploma in Marketing', description: 'Connect products to people. Consumer behaviour and brand strategy.', requirements: 'Minimum 3 C grades with at least a C in commercial subjects and 2 D passes.', outcomes: 'Marketing Manager, Brand Strategist, Digital Marketer.', duration: '3 Years', image: 'https://i.pinimg.com/736x/b6/2d/c8/b62dc8c25b5cae6cb5c4286e22e750d3.jpg', video: 'https://youtu.be/yHGRBTZI6w0?si=3uPJXvUYo791kTnD' },
      { id: 'retail-mgmt', name: 'Diploma in Retail Management', description: 'Run the stores of tomorrow. Operations, supply chain and customer experience.', requirements: 'Minimum 3 C grades with at least a C in commercial subjects and 2 D passes.', outcomes: 'Retail Manager, Store Operations Specialist, Merchandiser.', duration: '3 Years', image: 'https://i.pinimg.com/736x/eb/be/25/ebbe251160b6b33fa6cc0682f87c0cec.jpg', video: 'https://youtu.be/P1v755q359M?si=DglsI1I5uzriDnOy' },
    ],
  },
  {
    id: 'communication',
    name: 'Faculty of Communication, Media & Broadcasting',
    image: communicationImg,
    courses: [
      { id: 'professional-comm', name: 'Degree in Professional Communication', description: 'Words have power. Writing, public speaking and corporate communication.', requirements: 'Minimum 4 C grades and 2 D passes including a C in English Language.', outcomes: 'Communications Manager, Content Strategist, Public Affairs Officer.', duration: '4 Years', image: 'https://i.pinimg.com/1200x/e3/2c/a3/e32ca35134a56c5d2ef4f52cfc012afb.jpg', video: 'https://youtu.be/GrxHWrhEAis?si=5z1UPxDae5AygFTC' },
      { id: 'broadcasting', name: 'Degree in Broadcasting and Journalism', description: 'Be the voice people trust. Radio, television and digital journalism.', requirements: 'Minimum 4 C grades and 2 D passes including a C in English Language.', outcomes: 'Journalist, News Anchor, Radio Presenter, Digital Reporter.', duration: '4 Years', image: 'https://i.pinimg.com/736x/19/65/09/196509d4fccd24dc4b50e99ae8b9dd58.jpg', video: 'https://youtu.be/a7Y07B0xqbg?si=2R_uy8O16qR-g8MR' },
      { id: 'tv-film', name: 'Diploma in Television and Film Production', description: 'Cameras, lights, story. Pre-production to post for the screen industry.', requirements: 'Minimum 3 C grades and 2 D passes including a C in English Language.', outcomes: 'Film Director, Video Producer, Camera Operator, Editor.', duration: '3 Years', image: 'https://i.pinimg.com/736x/c9/de/57/c9de57c477df7de05ea298cb15c7260a.jpg', video: 'https://youtu.be/puF9CkvmJt0?si=GZu247P95gbAcQUJ' },
      { id: 'public-relations', name: 'Diploma in Public Relations', description: 'Shape perception, build reputation. PR strategy and crisis communication.', requirements: 'Minimum 3 C grades and 2 D passes including a C in English Language.', outcomes: 'PR Manager, Media Relations Officer, Communications Specialist.', duration: '3 Years', image: 'https://i.pinimg.com/736x/97/d4/13/97d41366454e1a05127b2e82ec7ddf93.jpg', video: 'https://youtu.be/VejDCJ9_wuk?si=KN0g0l-8Hso3vygq' },
      { id: 'media-journalism', name: 'Diploma in Journalism and Media', description: 'Reporting, writing and media production across print, broadcast and online.', requirements: 'Minimum 3 C grades and 2 D passes including a C in English Language.', outcomes: 'Reporter, Digital Content Creator, Media Producer.', duration: '3 Years', image: 'https://i.pinimg.com/736x/ac/18/a4/ac18a4f0b9973e67f8a796c7509673fd.jpg', video: 'https://youtu.be/AiV26v4hkLs?si=IWkusL8sF_4DSQca' },
    ],
  },
  {
    id: 'ict',
    name: 'Faculty of Information & Communication Technology',
    image: ictImg,
    courses: [
      { id: 'software-engineering', name: 'Degree in Software Engineering with Multimedia', description: 'Write code that works. Systems design, full-stack development and multimedia integration.', requirements: 'Minimum 4 C grades and 2 D passes. C or better in Mathematics.', outcomes: 'Software Engineer, Full-Stack Developer, Systems Architect.', duration: '4 Years', image: 'https://i.pinimg.com/1200x/f2/68/d0/f268d00826695db3b7cda9a58683cc73.jpg', video: 'https://youtu.be/cqTbaRVn7W0?si=BM4Hajbnne4fi67w' },
      { id: 'business-it', name: 'Degree in Business Information Technology', description: 'Where technology meets business strategy. ERP systems and digital transformation.', requirements: 'Minimum 4 C grades and 2 D passes. C or better in Mathematics.', outcomes: 'Business Analyst, IT Manager, ERP Consultant.', duration: '4 Years', image: 'https://i.pinimg.com/736x/ed/29/2f/ed292f7dd104e9567c2f8e9de3fa38d9.jpg', video: 'https://youtu.be/-Zpu85fWglA?si=fcOUIumrVOFqc5oN' },
      { id: 'info-tech', name: 'Degree in Information Technology', description: 'Networks, security, databases and systems administration.', requirements: 'Minimum 4 C grades and 2 D passes. C or better in Mathematics.', outcomes: 'Network Engineer, Cybersecurity Analyst, Systems Administrator.', duration: '4 Years', image: 'https://i.pinimg.com/1200x/bc/a2/dc/bca2dc734ec3c0aba832848e39e9a1fc.jpg', video: 'https://youtu.be/7BfdMKeLTj0?si=HMR2_NAt8SBRRpeA' },
      { id: 'multimedia-software', name: 'Diploma in Multimedia and Software Engineering', description: 'Creative technology at the intersection of media and code.', requirements: 'Minimum 3 C grades and 2 D passes. C or better in Mathematics.', outcomes: 'Web Developer, Mobile App Developer, Multimedia Specialist.', duration: '3 Years', image: 'https://i.pinimg.com/736x/9b/1b/1b/9b1b1b92f5a83ee9b066d40f2dace100.jpg', video: 'https://youtu.be/G-8cEeXPabA?si=j8qOiYwax3BU0Lqn' },
      { id: 'diploma-bit', name: 'Diploma in Business Information Technology', description: 'Practical hands-on IT skills. Networking, hardware and software support.', requirements: 'Minimum 3 C grades and 2 D passes. C or better in Mathematics.', outcomes: 'IT Support Specialist, Network Technician, Help Desk Analyst.', duration: '3 Years', image: 'https://i.pinimg.com/736x/fd/bd/58/fdbd58f49536beb7995b22e560557fb4.jpg', video: 'https://youtu.be/-Zpu85fWglA?si=fcOUIumrVOFqc5oN' },
      { id: 'diploma-it', name: 'Diploma in Information Technology', description: 'Practical hands-on IT skills. Networking, hardware and software support.', requirements: 'Minimum 3 C grades and 2 D passes. C or better in Mathematics.', outcomes: 'IT Support Specialist, Network Technician, Help Desk Analyst.', duration: '3 Years', image: 'https://i.pinimg.com/1200x/04/8c/0c/048c0c1e2dcf0f09ece754569135e576.jpg', video: 'https://youtu.be/7BfdMKeLTj0?si=HMR2_NAt8SBRRpeA' },
    ],
  },
];

export const NEWS = [
  { id: 'n1', title: 'Limkokwing Opens New Creative Hub', date: 'March 2025', image: 'https://forumnews-sl.com/wp-content/uploads/2023/02/Limkokwing-University-Confers-Degrees-Diploma.jpg'},
  { id: 'n2', title: 'Annual Design Exhibition 2025', date: 'April 2025', image: 'https://fashiononlinejournalism.wordpress.com/wp-content/uploads/2013/06/969265_10151640147665498_555077466_n.jpg?'},
  { id: 'n3', title: 'New ICT Lab Unveiled on Campus', date: 'February 2025', image: IctLab },
  { id: 'n4', title: 'Student Business Pitch Competition', date: 'May 2025', image: 'https://media.licdn.com/dms/image/v2/D4D12AQH8CJBQRO2xGg/article-cover_image-shrink_720_1280/B4DZizgw6XGsAQ-/0/1755358409972?e=2147483647&v=beta&t=_nbiQM8akRfCeQTaJ9UFAW5MIr6CuLH5ZJMWKvCRxek' },
];

export const QUIZ_QUESTIONS = [
  { id: 'q1', question: 'Which activities interest you most?', options: [{ label: 'Visual storytelling and design', faculty: 'design' }, { label: 'Business strategy and leadership', faculty: 'business' }, { label: 'Technical problem solving', faculty: 'ict' }, { label: 'Media production and communication', faculty: 'communication' }, { label: 'Tourism and hospitality management', faculty: 'tourism' }, { label: 'Architecture and structural design', faculty: 'architecture' }] },
  { id: 'q2', question: 'How do you prefer to work?', options: [{ label: 'Creating visuals and concepts independently', faculty: 'design' }, { label: 'Leading teams and making strategic decisions', faculty: 'business' }, { label: 'Building systems and solving technical challenges', faculty: 'ict' }, { label: 'Communicating stories to a wide audience', faculty: 'communication' }, { label: 'Managing people and experiences', faculty: 'tourism' }, { label: 'Designing physical structures and spaces', faculty: 'architecture' }] },
  { id: 'q3', question: 'Which environment energises you?', options: [{ label: 'A creative studio', faculty: 'design' }, { label: 'A corporate boardroom or startup', faculty: 'business' }, { label: 'A technology lab or remote workspace', faculty: 'ict' }, { label: 'A newsroom or broadcast studio', faculty: 'communication' }, { label: 'A hotel, resort or event venue', faculty: 'tourism' }, { label: 'A construction site or drafting office', faculty: 'architecture' }] },
  { id: 'q4', question: 'Where do you see yourself in ten years?', options: [{ label: 'Running a design agency or creative studio', faculty: 'design' }, { label: 'Leading a company or launching a venture', faculty: 'business' }, { label: 'Building the next major software platform', faculty: 'ict' }, { label: 'Anchoring news or heading a media house', faculty: 'communication' }, { label: 'Managing a global hospitality brand', faculty: 'tourism' }, { label: 'Designing landmarks in a growing city', faculty: 'architecture' }] },
  { id: 'q5', question: 'Which school subject came naturally to you?', options: [{ label: 'Art and Design', faculty: 'design' }, { label: 'Commerce and Accounting', faculty: 'business' }, { label: 'Mathematics and Computer Science', faculty: 'ict' }, { label: 'English and Literature', faculty: 'communication' }, { label: 'Geography and Home Economics', faculty: 'tourism' }, { label: 'Technical Drawing and Mathematics', faculty: 'architecture' }] },
];

export const CONTACT = {
  address: 'Moshoeshoe Road, Maseru Central',
  poBox: 'PO Box 8971, Maseru 100, Lesotho',
  phone: '+266 22315767',
  tollfree: '80022066 / 80022088',
  website: 'www.limkokwing.net',
  facebook: 'facebook.com/limkokwing',
  email: 'info@limkokwing.net',
};
