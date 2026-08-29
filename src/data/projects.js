// Project data — placeholder structure for studio work.
// Real project images can be placed in /src/assets/projects/ and imported here.
// Until real assets are available, components render neutral placeholders.

const img = (n) => `/src/assets/projects/${n}`

export const projectCategories = [
  'All',
  'Residential Architecture',
  'Residential Interiors',
  'Commercial',
  'Hospitality',
  'Kitchen',
  'Bedroom',
  'Living Room',
  'Elevation',
  '3D Visualization',
]

// Each project uses placeholder data only — no invented client or project names.
export const projects = [
  {
    id: 'p-01',
    title: 'Alok Ji Tiwari',
    category: 'Residential Architecture',
    location: 'Indore, Madhya Pradesh',
    area: '—',
    year: '—',
    type: 'Architecture',
    image: '/projects/alok-ji-tiwari/01.jpg',
    accent: 'architectural',
    description:
      'A residential architecture project exploring plan efficiency, day-lighting and material restraint. Concept, plans, elevations and visualisation prepared as a coordinated architectural package.',
    galleryCount: 6,
  },
  {
    id: 'p-02',
    title: 'Aasish Ji Jain',
    category: 'Residential Interiors',
    location: 'Indore, Madhya Pradesh',
    area: '—',
    year: '—',
    type: 'Interior',
    image: '/projects/aasish-ji-jain/01.jpg',
    accent: 'interior',
    description:
      'Interior design project integrating living, dining and bedroom spaces through a consistent material palette and considered lighting design.',
    galleryCount: 5,
  },
  {
    id: 'p-03',
    title: 'Dr. Dharmendra Ji',
    category: 'Kitchen',
    location: 'Indore, Madhya Pradesh',
    area: '—',
    year: '—',
    type: 'Interior',
    image: '/projects/dr-dharmendra-jai/01.jpg',
    accent: 'interior',
    description:
      'Modular kitchen design with a clear workflow, optimised storage and a material composition that pairs warm wood tones with stone worktops.',
    galleryCount: 4,
  },
  {
    id: 'p-04',
    title: 'Nitesh Ji',
    category: 'Bedroom',
    location: 'Indore, Madhya Pradesh',
    area: '—',
    year: '—',
    type: 'Interior',
    image: '/projects/nitesh-ji/01.jpg',
    accent: 'interior',
    description:
      'Bedroom interior designed for calm, comfort and proportion. Integrated wardrobes, layered lighting and a quiet material palette.',
    galleryCount: 4,
  },
  {
    id: 'p-05',
    title: 'Satyendra Ji',
    category: 'Living Room',
    location: 'Indore, Madhya Pradesh',
    area: '—',
    year: '—',
    type: 'Interior',
    image: '/projects/satyendra-ji/01.jpg',
    accent: 'interior',
    description:
      'Living room design anchored by a feature TV unit, considered seating layout and a layered false ceiling with integrated lighting.',
    galleryCount: 5,
  },
  {
    id: 'p-06',
    title: 'Elevation Project',
    category: 'Elevation',
    location: 'Indore, Madhya Pradesh',
    area: '—',
    year: '—',
    type: 'Architecture',
    image: null,
    accent: 'architectural',
    description:
      'Building elevation study exploring proportion, massing and material expression for a residential façade.',
    galleryCount: 3,
  },
  {
    id: 'p-07',
    title: '3D Visualization',
    category: '3D Visualization',
    location: 'Indore, Madhya Pradesh',
    area: '—',
    year: '—',
    type: 'Visualisation',
    image: null,
    accent: '3d',
    description:
      'Photorealistic 3D visualisation exploring light, material and atmosphere for an architectural proposal.',
    galleryCount: 4,
  },
  {
    id: 'p-08',
    title: 'Commercial Project',
    category: 'Commercial',
    location: 'Indore, Madhya Pradesh',
    area: '—',
    year: '—',
    type: 'Commercial',
    image: null,
    accent: 'architectural',
    description:
      'Commercial interior designed for clear wayfinding, brand expression and an efficient working environment.',
    galleryCount: 4,
  },
  {
    id: 'p-09',
    title: 'Hospitality Project',
    category: 'Hospitality',
    location: 'Indore, Madhya Pradesh',
    area: '—',
    year: '—',
    type: 'Hospitality',
    image: null,
    accent: 'architectural',
    description:
      'Hospitality interior project organised around guest experience, sequence of arrival and material warmth.',
    galleryCount: 5,
  },
]

export const featuredProjects = projects.slice(0, 5)

export const getProjectById = (id) => projects.find((p) => p.id === id)
