import React, { useState, useEffect, useCallback, useRef } from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import PortfolioSection from './components/PortfolioSection';
import Cursor from './components/Cursor';
import Lightbox from './components/Lightbox';
import Navbar from './components/Navbar';

// Background Images (as discussed earlier)
const lightBg = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1920&auto=format&fit=crop'; // Example light background
const darkBg = 'https://images.unsplash.com/photo-1516410529446-2c777cb7366d?q=80&w=1920&auto=format&fit=crop'; // Example dark background

// createPlaceholderImage function abhi bhi rakhte hain, agar kahin zaroorat pade future mein
const createPlaceholderImage = (color, text) => {
  const svg = `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="${color}"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">${text}</text></svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImagesList, setCurrentImagesList] = useState([]);
  const [isBgImageLoaded, setIsBgImageLoaded] = useState(false);
  const backgroundRef = useRef(null);
  const [darkMode, setDarkMode] = useState(true);

  const currentBg = darkMode ? darkBg : lightBg;

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    setIsBgImageLoaded(false);
    const img = new Image();
    img.src = currentBg;
    img.onload = () => setIsBgImageLoaded(true);
  }, [currentBg]);

  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrolled = window.scrollY;
        backgroundRef.current.style.transform = `translateY(-${scrolled * 0.1}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionToggle = useCallback((sectionName) => {
    setActiveSection((prev) => (prev === sectionName ? null : sectionName));
  }, []);

  const openLightbox = (image, index, images) => {
    setCurrentImage(image);
    setCurrentImageIndex(index);
    setCurrentImagesList(images);
    setLightboxOpen(true);
  };

  const nextImage = useCallback(() => {
    if (!currentImagesList.length) return;
    const nextIndex = (currentImageIndex + 1) % currentImagesList.length;
    setCurrentImageIndex(nextIndex);
    setCurrentImage(currentImagesList[nextIndex]);
  }, [currentImageIndex, currentImagesList]);

  const prevImage = useCallback(() => {
    if (!currentImagesList.length) return;
    const prevIndex = (currentImageIndex - 1 + currentImagesList.length) % currentImagesList.length;
    setCurrentImageIndex(prevIndex);
    setCurrentImage(currentImagesList[prevIndex]);
  }, [currentImageIndex, currentImagesList]);

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
  };

  useEffect(() => {
    document.body.className = activeSection ? `${activeSection}-on` : '';
  }, [activeSection]);

  // **********************************************
  // ************ UPDATED PORTFOLIO ITEMS ************
  // **********************************************
  const portfolioItems = [
    { 
      name: 'demonslayer', 
      title: 'Demon Slayer', 
      subtitle: 'Kimetsu no Yaiba', 
      description: 'The story of Tanjiro Kamado and his journey to save his sister Nezuko from becoming a demon.', 
      images: [
        { src: 'https://i.ibb.co/L5Q2j85/tanjiro.jpg', alt: "Tanjiro Kamado" },
        { src: 'https://i.ibb.co/3sS7LqX/nezuko.jpg', alt: "Nezuko Kamado" },
        { src: 'https://i.ibb.co/k2h01xX/zenitsu.jpg', alt: "Zenitsu Agatsuma" },
        { src: 'https://i.ibb.co/m0f2m21/inosuke.jpg', alt: "Inosuke Hashibira" }
      ]
    },
    { 
      name: 'valorant', // Changed 'wildlife' to 'valorant' for clarity
      title: 'Valorant', 
      subtitle: 'Tactical FPS', 
      description: 'A team-based tactical shooter featuring unique agent abilities and competitive gameplay.', 
      images: [
        { src: 'https://i.ibb.co/n3t6R1G/jett.jpg', alt: "Jett" },
        { src: 'https://i.ibb.co/wCxK72M/sage.jpg', alt: "Sage" },
        { src: 'https://i.ibb.co/WcW6Y1d/reyna.jpg', alt: "Reyna" },
        { src: 'https://i.ibb.co/F82t1N3/viper.jpg', alt: "Viper" }
      ]
    },
    { 
      name: 'blackclover', 
      title: 'Black Clover', 
      subtitle: 'Magic & Adventure', 
      description: 'Follow Asta\'s journey to become the Wizard King in a world where magic is everything.', 
      images: [
        { src: 'https://i.ibb.co/7j5R9wX/asta.jpg', alt: "Asta" },
        { src: 'https://i.ibb.co/r2M3zK0/yuno.jpg', alt: "Yuno" },
        { src: 'https://i.ibb.co/zQxS2W3/noelle.jpg', alt: "Noelle Silva" },
        { src: 'https://i.ibb.co/30k12gJ/yami.jpg', alt: "Yami Sukehiro" }
      ]
    },
    { 
      name: 'angelofdeath', 
      title: 'Angel of Death', 
      subtitle: 'Psychological Horror', 
      description: 'A dark psychological thriller following Rachel Gardner\'s escape from a mysterious building.', 
      images: [
        { src: 'https://i.ibb.co/y51f1B7/rachel.jpg', alt: "Rachel Gardner" },
        { src: 'https://i.ibb.co/nC5R0jT/zack.jpg', alt: "Isaac Foster (Zack)" },
        { src: 'https://i.ibb.co/P44n017/danny.jpg', alt: "Danny" }
      ]
    },
    { 
      name: 'haikyuu', // Changed 'haiku' to 'haikyuu' for a more popular anime example
      title: 'Haikyuu!!', 
      subtitle: 'Volleyball Anime', 
      description: 'High school student Shoyo Hinata\'s journey to become the greatest volleyball player.', 
      images: [
        { src: 'https://i.ibb.co/wJv0wV3/hinata.jpg', alt: "Shoyo Hinata" },
        { src: 'https://i.ibb.co/q5k2c0j/kageyama.jpg', alt: "Tobio Kageyama" },
        { src: 'https://i.ibb.co/gP60w21/karasuno.jpg', alt: "Karasuno Team" }
      ]
    },
    { 
      name: 'deadpool', 
      title: 'Deadpool', 
      subtitle: 'Anti-Hero Action', 
      description: 'The merc with a mouth brings chaos and comedy to the superhero genre.', 
      images: [
        { src: 'https://i.ibb.co/y0L0VvS/deadpool.jpg', alt: "Deadpool" },
        { src: 'https://i.ibb.co/jR0c9M1/deadpool-wolverine.jpg', alt: "Deadpool & Wolverine" },
        { src: 'https://i.ibb.co/7C9D6g4/x-force.jpg', alt: "X-Force" }
      ]
    },
    { 
      name: 'deathnote', 
      title: 'Death Note', 
      subtitle: 'Psychological Thriller', 
      description: 'A brilliant student discovers a supernatural notebook that can kill anyone whose name is written in it.', 
      images: [
        { src: 'https://i.ibb.co/j6s2W3G/light-yagami.jpg', alt: "Light Yagami" },
        { src: 'https://i.ibb.co/Z2f4L2Q/l-lawliet.jpg', alt: "L Lawliet" },
        { src: 'https://i.ibb.co/gW51Msy/ryuk.jpg', alt: "Ryuk" },
        { src: 'https://i.ibb.co/2gL1C4S/misa-amane.jpg', alt: "Misa Amane" }
      ]
    },
    { 
      name: 'fairytail', 
      title: 'Fairy Tail', 
      subtitle: 'Magic Guild Adventure', 
      description: 'Join Natsu and his friends in the magical world of Fairy Tail guild adventures.', 
      images: [
        { src: 'https://i.ibb.co/N2z0xS0/natsu.jpg', alt: "Natsu Dragneel" },
        { src: 'https://i.ibb.co/T5s2d3d/lucy.jpg', alt: "Lucy Heartfilia" },
        { src: 'https://i.ibb.co/zV5w2m0/erza.jpg', alt: "Erza Scarlet" },
        { src: 'https://i.ibb.co/Gtn2p4R/gray.jpg', alt: "Gray Fullbuster" }
      ]
    },
    { 
      name: 'goku', 
      title: 'Goku', 
      subtitle: 'Dragon Ball Legend', 
      description: 'The legendary Saiyan warrior who always strives to become stronger and protect Earth.', 
      images: [
        { src: 'https://i.ibb.co/pP2q5H3/goku-super-saiyan.jpg', alt: "Son Goku" },
        { src: 'https://i.ibb.co/hK70R0p/vegeta-ssj.jpg', alt: "Vegeta" },
        { src: 'https://i.ibb.co/P1r1h2G/piccolo.jpg', alt: "Piccolo" },
        { src: 'https://i.ibb.co/gST1b4S/gohan-ssj.jpg', alt: "Gohan" }
      ]
    },
    { 
      name: 'jjk', 
      title: 'Jujutsu Kaisen', 
      subtitle: 'Supernatural Action', 
      description: 'Yuji Itadori joins a secret organization to fight deadly curses and save humanity.', 
      images: [
        { src: 'https://i.ibb.co/L5B0j1G/yuji.jpg', alt: "Yuji Itadori" },
        { src: 'https://i.ibb.co/Q8F7j8f/gojo.jpg', alt: "Satoru Gojo" },
        { src: 'https://i.ibb.co/P2j3k4F/megumi.jpg', alt: "Megumi Fushiguro" },
        { src: 'https://i.ibb.co/sW2h0w0/nobara.jpg', alt: "Nobara Kugisaki" }
      ]
    },
    { 
      name: 'mushoku', // Changed 'mosoku' to 'mushoku' for correct spelling
      title: 'Mushoku Tensei', 
      subtitle: 'Isekai Reincarnation', 
      description: 'A story of redemption and second chances in a magical fantasy world.', 
      images: [
        { src: 'https://i.ibb.co/x7R4g2H/rudeus.jpg', alt: "Rudeus Greyrat" },
        { src: 'https://i.ibb.co/V3Q1j9Y/eris.jpg', alt: "Eris Greyrat" },
        { src: 'https://i.ibb.co/wB7f2y4/roxy.jpg', alt: "Roxy Migurdia" },
        { src: 'https://i.ibb.co/fxy2m0z/sylphiette.jpg', alt: "Sylphiette" }
      ]
    },
    { 
      name: 'hero', 
      title: 'My Hero Academia', 
      subtitle: 'Superhero School', 
      description: 'Izuku Midoriya\'s journey to become the greatest hero in a world full of superpowers.', 
      images: [
        { src: 'https://i.ibb.co/0X2j3k0/deku.jpg', alt: "Izuku Midoriya (Deku)" },
        { src: 'https://i.ibb.co/S7q0R1W/bakugo.jpg', alt: "Katsuki Bakugo" },
        { src: 'https://i.ibb.co/L8y4c2R/todoroki.jpg', alt: "Shoto Todoroki" },
        { src: 'https://i.ibb.co/4Z5s1d0/all-might.jpg', alt: "All Might" }
      ]
    },
    { 
      name: 'naruto', 
      title: 'Naruto', 
      subtitle: 'Ninja Adventure', 
      description: 'The story of a young ninja who dreams of becoming the strongest leader of his village.', 
      images: [
        { src: 'https://i.ibb.co/7K0m3h2/naruto.jpg', alt: "Naruto Uzumaki" },
        { src: 'https://i.ibb.co/hX4q2g1/sasuke.jpg', alt: "Sasuke Uchiha" },
        { src: 'https://i.ibb.co/fS9r0y1/sakura.jpg', alt: "Sakura Haruno" },
        { src: 'https://i.ibb.co/gR2p3q0/kakashi.jpg', alt: "Kakashi Hatake" }
      ]
    },
    { 
      name: 'sevendeadlysins', // Changed 'sevnfsr' to 'sevendeadlysins'
      title: 'Seven Deadly Sins', 
      subtitle: 'Medieval Fantasy', 
      description: 'A disbanded group of knights reunite to save their kingdom from corruption.', 
      images: [
        { src: 'https://i.ibb.co/B4q0R2w/meliodas.jpg', alt: "Meliodas" },
        { src: 'https://i.ibb.co/J9j2k1L/ban.jpg', alt: "Ban" },
        { src: 'https://i.ibb.co/P5s0t1r/king.jpg', alt: "King" },
        { src: 'https://i.ibb.co/D4s3m2v/elizabeth.jpg', alt: "Elizabeth" }
      ]
    },
    { 
      name: 'cyberpunk', // Changed 'cyber' to 'cyberpunk'
      title: 'Cyberpunk', 
      subtitle: 'Futuristic Action', 
      description: 'A dystopian future where technology and humanity collide in spectacular fashion.', 
      images: [
        { src: 'https://i.ibb.co/k2L3j0H/david-martinez.jpg', alt: "David Martinez" },
        { src: 'https://i.ibb.co/W2z4x1m/lucy-cyberpunk.jpg', alt: "Lucy" },
        { src: 'https://i.ibb.co/N2w1h0z/rebecca-cyberpunk.jpg', alt: "Rebecca" }
      ]
    },
    { 
      name: 'comingsoon', // Changed 'cyber' (duplicate) to 'comingsoon'
      title: 'More Coming Soon', 
      subtitle: 'Stay Tuned!', 
      description: 'More amazing anime and content will be added to this collection. Keep checking back for updates!', 
      images: [
        { src: 'https://i.ibb.co/Pz0w2x4/coming-soon.jpg', alt: "Coming Soon" }
      ] 
    }
  ];
  // **********************************************
  // **********************************************

  return (
    <div>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Background Section */}
      <div
        ref={backgroundRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '120%',
          zIndex: -1,
          backgroundImage: `url("${currentBg}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: darkMode ? 'brightness(0.5)' : 'brightness(1)',
          opacity: isBgImageLoaded ? 1 : 0,
          transition: 'all 0.8s ease-in-out',
        }}
      />

      {/* Content Sections */}
      <HeroSection onSectionToggle={handleSectionToggle} portfolioItems={portfolioItems} />
      <AboutSection isActive={activeSection === 'about'} onClose={() => handleSectionToggle('about')} />
      <ContactSection isActive={activeSection === 'contact'} onClose={() => handleSectionToggle('contact')} />

      {portfolioItems.map((item) => (
        <PortfolioSection
          key={item.name}
          sectionClass={item.name}
          title={item.title}
          subtitle={item.subtitle}
          description={item.description}
          images={item.images} // Yahan ab real images pass hongi
          isActive={activeSection === item.name}
          onClose={() => handleSectionToggle(item.name)}
          onImageClick={openLightbox}
        />
      ))}

      <Lightbox 
        isOpen={lightboxOpen} image={currentImage} onClose={closeLightbox} 
        onNext={nextImage} onPrev={prevImage}
      />
      <Cursor />
    </div>
  );
}

export default App;