import PageHero from '../components/PageHero'
import FeaturedProjects from '../sections/FeaturedProjects'

export default function Portfolio() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Projects with purpose."
        description="Explore our architecture, interiors and visualization work. Use the slider to move through each project."
      />
      <FeaturedProjects />
    </>
  )
}
