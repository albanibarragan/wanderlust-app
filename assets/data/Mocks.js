export const currentUser = {
  id: 'me',
  username: 'gustavolozada',
  name: 'Gustavo Lozada',
  avatar: 'https://i.pravatar.cc/100?img=5',
  bio: 'Desarrollador, viajero y amante del café ☕🌍',
  followers: 320,
  following: 180,
  posts: 25,
  email: 'gustavo@example.com',
  location: 'Caracas, Venezuela',
  website: 'https://miportafolio.com',
  phone: '+58 412-1234567',
  birthday: '1998-07-15',
  joinedDate: '2022-03-10',
}

export const users = [
  {
    id: 'u1',
    username: 'viajero123',
    name: 'Carlos Méndez',
    avatar: 'https://i.pravatar.cc/100?img=3',
    bio: 'Explorador de ciudades y amante de los libros 📚🌍',
    followers: 210,
    following: 180,
    posts: 18,
    location: 'Buenos Aires, Argentina',
    website: 'https://carlosviaja.com',
    isFollowing: true,
  },
  {
    id: 'u2',
    username: 'aventurera',
    name: 'María López',
    avatar: 'https://i.pravatar.cc/100?img=4',
    bio: 'Viviendo aventuras en cada rincón del mundo ✈️🌎',
    followers: 340,
    following: 290,
    posts: 34,
    location: 'Madrid, España',
    website: 'https://aventurasmaria.com',
    isFollowing: false,
  },
];


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
];

export const likes = [
  {
    id: 'like1',
    postId: 'post1',
    userId: 'u2',
  },
  {
    id: 'like2',
    postId: 'post2',
    userId: 'u1',
  },
]

export const comments = [
  {
    id: 'comment1',
    postId: 'post1',
    userId: 'u2',
    comment: '¡Qué hermoso lugar! 😍',
    time: '2h ago',
  },
  {
    id: 'comment2',
    postId: 'post2',
    userId: 'u1',
    comment: 'Barcelona es simplemente mágica.',
    time: '3h ago',
  },
];
  