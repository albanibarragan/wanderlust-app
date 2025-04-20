export const currentUser = {
  id: 'me',
  username: 'gustavolozada',
  name: 'Gustavo Lozada',
  avatar: 'https://i.pravatar.cc/100?img=5',
  bio: 'Desarrollador, viajero y amante del café ☕🌍',
  location: 'Caracas, Venezuela',
  stats: {
    posts: 25,
    followers: 320,
    following: 180,
  },
};
// USERS
export const users = [
  {
    id: 'u1',
    username: 'viajero123',
    name: 'Carlos Méndez',
    avatar: 'https://i.pravatar.cc/100?img=3',
    bio: 'Explorador de ciudades y amante de los libros 📚🌍',
    location: 'Buenos Aires, Argentina',
    website: 'https://carlosviaja.com',
    stats: { posts: 18, followers: 210, following: 180 },
    isFollowing: true,
  },
  {
    id: 'u2',
    username: 'aventurera',
    name: 'María López',
    avatar: 'https://i.pravatar.cc/100?img=4',
    bio: 'Viviendo aventuras en cada rincón del mundo ✈️🌎',
    location: 'Madrid, España',
    website: 'https://aventurasmaria.com',
    stats: { posts: 34, followers: 340, following: 290 },
    isFollowing: false,
  },
  {
    id: 'u3',
    username: 'naturelover',
    name: 'Elena Torres',
    avatar: 'https://i.pravatar.cc/100?img=5',
    bio: 'La naturaleza es mi hogar 🌲🌎',
    location: 'Santiago, Chile',
    website: 'https://elenatorres.cl',
    stats: { posts: 12, followers: 150, following: 100 },
    isFollowing: true,
  },
  {
    id: 'u4',
    username: 'foodie',
    name: 'Diego Hernández',
    avatar: 'https://i.pravatar.cc/100?img=6',
    bio: 'Descubriendo sabores en cada rincón 🍲🍷',
    location: 'Lima, Perú',
    website: 'https://diegocome.com',
    stats: { posts: 22, followers: 410, following: 210 },
    isFollowing: false,
  },
];

// POSTS
export const posts = [
  {
    id: 'post1',
    userId: 'u1',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=60',
    country: 'Italia',
    countryFlag: '🇮🇹',
    location: 'Roma',
    time: '1h ago',
    title: 'Descubriendo el Coliseo',
    content: 'Una experiencia mágica en una ciudad llena de historia.',
    likes: 245,
    isFavorite: true,
  },
  {
    id: 'post2',
    userId: 'u2',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=500&q=60',
    country: 'España',
    countryFlag: '🇪🇸',
    location: 'Barcelona',
    time: '3h ago',
    title: 'Arte y arquitectura',
    content: 'La Sagrada Familia es impresionante.',
    likes: 310,
    isFavorite: false,
  },
  {
    id: 'post3',
    userId: 'u3',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=60',
    country: 'Canadá',
    countryFlag: '🇨🇦',
    location: 'Montañas Rocosas',
    time: '5h ago',
    title: 'Conexión natural',
    content: 'Caminando entre montañas y lagos cristalinos.',
    likes: 190,
    isFavorite: true,
  },
  {
    id: 'post4',
    userId: 'u4',
    image: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=500&q=60',
    country: 'Japón',
    countryFlag: '🇯🇵',
    location: 'Tokio',
    time: '7h ago',
    title: 'Sabores del mundo',
    content: 'Probando ramen auténtico en las calles de Tokio.',
    likes: 370,
    isFavorite: false,
  },
];

// LIKES
export const likes = [
  { id: 'like1', postId: 'post1', userId: 'u2' },
  { id: 'like2', postId: 'post2', userId: 'u1' },
  { id: 'like3', postId: 'post3', userId: 'u4' },
  { id: 'like4', postId: 'post4', userId: 'u3' },
  { id: 'like5', postId: 'post4', userId: 'u1' },
];

// COMMENTS
export const comments = [
  { id: 'comment1', postId: 'post1', userId: 'u2', comment: '¡Qué hermoso lugar! 😍', time: '2h ago' },
  { id: 'comment2', postId: 'post2', userId: 'u1', comment: 'Barcelona es simplemente mágica.', time: '3h ago' },
  { id: 'comment3', postId: 'post3', userId: 'u4', comment: 'La naturaleza es vida 🌿', time: '5h ago' },
  { id: 'comment4', postId: 'post4', userId: 'u3', comment: '¡Quiero ese ramen ya! 🍜', time: '6h ago' },
  { id: 'comment5', postId: 'post4', userId: 'u2', comment: 'Japón es un sueño ❤️', time: '7h ago' },
];
