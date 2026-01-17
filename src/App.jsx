import React, { useState, useEffect, useCallback } from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import PortfolioSection from './components/PortfolioSection';
import Cursor from './components/Cursor';
import Lightbox from './components/Lightbox';

const createPlaceholderImage = (color, text) => {
  const svg = `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="${color}"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">${text}</text></svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

function App() {
  const [activeSection, setActiveSection] = useState(null); // 'about', 'contact', or a portfolio item class
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImagesList, setCurrentImagesList] = useState([]);

  const handleSectionToggle = useCallback((sectionName) => {
    setActiveSection((prevActiveSection) =>
      prevActiveSection === sectionName ? null : sectionName
    );
  }, []);

  const openLightbox = (image, index, images) => {
    setCurrentImage(image);
    setCurrentImageIndex(index);
    setCurrentImagesList(images);
    setLightboxOpen(true);
  };

  const nextImage = useCallback(() => {
    if (!currentImagesList || currentImagesList.length === 0) return;
    const nextIndex = (currentImageIndex + 1) % currentImagesList.length;
    setCurrentImageIndex(nextIndex);
    setCurrentImage(currentImagesList[nextIndex]);
  }, [currentImageIndex, currentImagesList]);

  const prevImage = useCallback(() => {
    if (!currentImagesList || currentImagesList.length === 0) return;
    const prevIndex = (currentImageIndex - 1 + currentImagesList.length) % currentImagesList.length;
    setCurrentImageIndex(prevIndex);
    setCurrentImage(currentImagesList[prevIndex]);
  }, [currentImageIndex, currentImagesList]);

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
  };

  // Effect to add/remove classes from body for styling transitions
  useEffect(() => {
    document.body.className = ''; // Clear existing classes
    if (activeSection) {
      document.body.classList.add(`${activeSection}-on`);
    }
  }, [activeSection]);

  const portfolioItems = [
    { name: 'demonslayer', title: 'Demon Slayer', subtitle: 'Kimetsu no Yaiba', description: 'The story of Tanjiro Kamado and his journey to save his sister Nezuko from becoming a demon.', images: [
      { src: createPlaceholderImage('#e17055', 'Tanjiro Kamado'), alt: "Tanjiro" },
      { src: createPlaceholderImage('#d63031', 'Nezuko Kamado'), alt: "Nezuko" },
      { src: createPlaceholderImage('#f1c40f', 'Zenitsu Agatsuma'), alt: "Zenitsu" },
      { src: createPlaceholderImage('#0984e3', 'Inosuke Hashibira'), alt: "Inosuke" }
    ]},
    { name: 'wildlife', title: 'Valorant', subtitle: 'Tactical FPS', description: 'A team-based tactical shooter featuring unique agent abilities and competitive gameplay.', images: [
      { src: createPlaceholderImage('#ff7675', 'Jett'), alt: "Jett" },
      { src: createPlaceholderImage('#74b9ff', 'Sage'), alt: "Sage" },
      { src: createPlaceholderImage('#a29bfe', 'Reyna'), alt: "Reyna" },
      { src: createPlaceholderImage('#55efc4', 'Viper'), alt: "Viper" }
    ]},
    { name: 'nature', title: 'Black Clover', subtitle: 'Magic & Adventure', description: 'Follow Asta\'s journey to become the Wizard King in a world where magic is everything.', images: [
      { src: createPlaceholderImage('#2d3436', 'Asta'), alt: "Asta" },
      { src: createPlaceholderImage('#00b894', 'Yuno'), alt: "Yuno" },
      { src: createPlaceholderImage('#0984e3', 'Noelle Silva'), alt: "Noelle" },
      { src: createPlaceholderImage('#d63031', 'Yami Sukehiro'), alt: "Yami" }
    ]},
    { name: 'blackclover', title: 'Angel of Death', subtitle: 'Psychological Horror', description: 'A dark psychological thriller following Rachel Gardner\'s escape from a mysterious building.', images: [
      { src: createPlaceholderImage('#636e72', 'Rachel Gardner'), alt: "Rachel" },
      { src: createPlaceholderImage('#d63031', 'Isaac Foster'), alt: "Zack" },
      { src: createPlaceholderImage('#0984e3', 'Danny'), alt: "Danny" }
    ]},
    { name: 'angelofdeath', title: 'Haiku', subtitle: 'Poetry & Art', description: 'Beautiful Japanese poetry that captures moments in time with elegant simplicity.', images: [
      { src: createPlaceholderImage('#fdcb6e', 'Autumn Breeze'), alt: "Autumn" },
      { src: createPlaceholderImage('#81ecec', 'Winter Silence'), alt: "Winter" },
      { src: createPlaceholderImage('#55efc4', 'Spring Bloom'), alt: "Spring" }
    ]},
    { name: 'haiku', title: 'Deadpool', subtitle: 'Anti-Hero Action', description: 'The merc with a mouth brings chaos and comedy to the superhero genre.', images: [
      { src: createPlaceholderImage('#d63031', 'Deadpool'), alt: "Deadpool" },
      { src: createPlaceholderImage('#f1c40f', 'Wolverine'), alt: "Wolverine" },
      { src: createPlaceholderImage('#2d3436', 'X-Force'), alt: "X-Force" }
    ]},
    { name: 'deadpool', title: 'Death Note', subtitle: 'Psychological Thriller', description: 'A brilliant student discovers a supernatural notebook that can kill anyone whose name is written in it.', images: [
      { src: createPlaceholderImage('#000000', 'Light Yagami'), alt: "Light" },
      { src: createPlaceholderImage('#dfe6e9', 'L Lawliet'), alt: "L" },
      { src: createPlaceholderImage('#636e72', 'Ryuk'), alt: "Ryuk" },
      { src: createPlaceholderImage('#fd79a8', 'Misa Amane'), alt: "Misa" }
    ]},
    { name: 'deathnote', title: 'Fairy Tail', subtitle: 'Magic Guild Adventure', description: 'Join Natsu and his friends in the magical world of Fairy Tail guild adventures.', images: [
      { src: createPlaceholderImage('#e17055', 'Natsu Dragneel'), alt: "Natsu" },
      { src: createPlaceholderImage('#ffeaa7', 'Lucy Heartfilia'), alt: "Lucy" },
      { src: createPlaceholderImage('#d63031', 'Erza Scarlet'), alt: "Erza" },
      { src: createPlaceholderImage('#74b9ff', 'Gray Fullbuster'), alt: "Gray" }
    ]},
    { name: 'fairytale', title: 'Goku', subtitle: 'Dragon Ball Legend', description: 'The legendary Saiyan warrior who always strives to become stronger and protect Earth.', images: [
      { src: createPlaceholderImage('#e67e22', 'Son Goku'), alt: "Goku" },
      { src: createPlaceholderImage('#6c5ce7', 'Vegeta'), alt: "Vegeta" },
      { src: createPlaceholderImage('#00b894', 'Piccolo'), alt: "Piccolo" },
      { src: createPlaceholderImage('#fab1a0', 'Gohan'), alt: "Gohan" }
    ]},
    { name: 'goku', title: 'Jujutsu Kaisen', subtitle: 'Supernatural Action', description: 'Yuji Itadori joins a secret organization to fight deadly curses and save humanity.', images: [
      { src: createPlaceholderImage('#fd79a8', 'Yuji Itadori'), alt: "Itadori" },
      { src: createPlaceholderImage('#74b9ff', 'Satoru Gojo'), alt: "Gojo" },
      { src: createPlaceholderImage('#0984e3', 'Megumi Fushiguro'), alt: "Megumi" },
      { src: createPlaceholderImage('#e17055', 'Nobara Kugisaki'), alt: "Nobara" }
    ]},
    { name: 'jjk', title: 'Mushoku Tensei', subtitle: 'Isekai Reincarnation', description: 'A story of redemption and second chances in a magical fantasy world.', images: [
      { src: createPlaceholderImage('#fab1a0', 'Rudeus Greyrat'), alt: "Rudeus" },
      { src: createPlaceholderImage('#d63031', 'Eris Greyrat'), alt: "Eris" },
      { src: createPlaceholderImage('#0984e3', 'Roxy Migurdia'), alt: "Roxy" },
      { src: createPlaceholderImage('#55efc4', 'Sylphiette'), alt: "Sylphy" }
    ]},
    { name: 'mosoku', title: 'My Hero Academia', subtitle: 'Superhero School', description: 'Izuku Midoriya\'s journey to become the greatest hero in a world full of superpowers.', images: [
      { src: createPlaceholderImage('#00b894', 'Izuku Midoriya'), alt: "Deku" },
      { src: createPlaceholderImage('#e17055', 'Katsuki Bakugo'), alt: "Bakugo" },
      { src: createPlaceholderImage('#ff7675', 'Shoto Todoroki'), alt: "Todoroki" },
      { src: createPlaceholderImage('#ffeaa7', 'All Might'), alt: "All Might" }
    ]},
    { name: 'hero', title: 'Naruto', subtitle: 'Ninja Adventure', description: 'The story of a young ninja who dreams of becoming the strongest leader of his village.', images: [
      { src: createPlaceholderImage('#f39c12', 'Naruto Uzumaki'), alt: "Naruto" },
      { src: createPlaceholderImage('#0984e3', 'Sasuke Uchiha'), alt: "Sasuke" },
      { src: createPlaceholderImage('#fd79a8', 'Sakura Haruno'), alt: "Sakura" },
      { src: createPlaceholderImage('#b2bec3', 'Kakashi Hatake'), alt: "Kakashi" }
    ]},
    { name: 'naruto', title: 'Seven Deadly Sins', subtitle: 'Medieval Fantasy', description: 'A disbanded group of knights reunite to save their kingdom from corruption.', images: [
      { src: createPlaceholderImage('#00b894', 'Meliodas'), alt: "Meliodas" },
      { src: createPlaceholderImage('#d63031', 'Ban'), alt: "Ban" },
      { src: createPlaceholderImage('#fab1a0', 'King'), alt: "King" },
      { src: createPlaceholderImage('#fd79a8', 'Elizabeth'), alt: "Elizabeth" }
    ]},
    { name: 'sevnfsr', title: 'Cyberpunk', subtitle: 'Futuristic Action', description: 'A dystopian future where technology and humanity collide in spectacular fashion.', images: [
      { src: createPlaceholderImage('#ffeaa7', 'David Martinez'), alt: "David" },
      { src: createPlaceholderImage('#a29bfe', 'Lucy'), alt: "Lucy" },
      { src: createPlaceholderImage('#55efc4', 'Rebecca'), alt: "Rebecca" }
    ]},
    { name: 'cyber', title: 'More Coming Soon', subtitle: 'Stay Tuned!', description: 'More amazing anime and content will be added to this collection. Keep checking back for updates!', images: [
      { src: createPlaceholderImage('#b2bec3', 'Coming Soon'), alt: "Coming Soon" }
    ] }
  ];


  return (
    <div>
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
          images={item.images}
          isActive={activeSection === item.name}
          onClose={() => handleSectionToggle(item.name)}
          onImageClick={openLightbox}
        />
      ))}
      <Lightbox 
        isOpen={lightboxOpen} 
        image={currentImage} 
        onClose={closeLightbox} 
        onNext={nextImage}
        onPrev={prevImage}
      />
      <Cursor />
    </div>
  );
}

export default App;