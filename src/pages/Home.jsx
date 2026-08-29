import Hero from '../sections/Hero'
import Introduction from '../sections/Introduction'
import ServicesList from '../sections/ServicesList'
import Process from '../sections/Process'
import WhyChooseUs from '../sections/WhyChooseUs'
import Testimonials from '../sections/Testimonials'
import ConsultationCTA from '../components/ConsultationCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Introduction />
      <ServicesList />
      <Process />
      <WhyChooseUs />
      <Testimonials />
      <ConsultationCTA dark />
    </>
  )
}
