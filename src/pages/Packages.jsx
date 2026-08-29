import { Check, MessageCircle } from 'lucide-react'
import PageHero from '../components/PageHero'
import ConsultationCTA from '../components/ConsultationCTA'
import { packages } from '../data/packages'
import { whatsappLink } from '../utils/config'

export default function Packages() {
  return (
    <>
      <PageHero
        eyebrow="Our Design Packages"
        title="A clear start for every project."
        description="Choose the level of design support that matches your project and stage of planning."
      />

      <section className="bg-cream py-20 md:py-32">
        <div className="container-architectural">
          <div className="grid grid-cols-12 gap-6 md:gap-8 items-start">
            {packages.map((pkg, index) => (
              <article
                key={pkg.id}
                className={`col-span-12 md:col-span-4 border p-6 md:p-8 flex flex-col relative overflow-hidden ${
                  index === 0
                    ? 'bg-cream text-charcoal border-charcoal/15'
                    : index === 1
                      ? 'bg-[#ded8cc] text-charcoal border-charcoal/25 md:-mt-8'
                      : 'bg-charcoal text-cream border-[#b8a47d]/60 md:-mt-16'
                } group transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.025] hover:shadow-2xl`}
                style={index > 0 ? {
                  backgroundImage: index === 1
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.32), transparent 38%), repeating-linear-gradient(0deg, rgba(23,23,23,0.035) 0, rgba(23,23,23,0.035) 1px, transparent 1px, transparent 5px)'
                    : 'linear-gradient(135deg, rgba(184,164,125,0.16), transparent 36%), repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 7px)',
                } : undefined}
              >
                {index === 2 && <div className="absolute top-0 left-0 right-0 h-1 bg-[#b8a47d]" />}
                <div className="flex items-center justify-between gap-4 mb-8">
                  <span className={`label-meta ${index === 2 ? 'text-cream/60' : ''}`}>0{index + 1}</span>
                  {index === 1 && <span className="label-meta text-charcoal/60">Most popular</span>}
                  {index === 2 && <span className="label-meta text-[#b8a47d]">Complete solution</span>}
                </div>
                <h2 className={`heading-display text-3xl md:text-4xl mb-5 ${index === 2 ? 'text-cream' : 'text-charcoal'}`}>{pkg.name}</h2>
                <p className={`font-display text-2xl md:text-3xl mb-2 ${index === 2 ? 'text-[#d3bf96]' : 'text-charcoal'}`}>
                  {pkg.price}
                </p>
                <p className={`text-xs leading-relaxed min-h-10 mb-8 ${index === 2 ? 'text-cream/60' : 'text-muted'}`}>
                  {pkg.priceNote}
                </p>

                <div className={`border-t pt-6 flex-1 ${index === 2 ? 'border-cream/15' : 'border-charcoal/15'}`}>
                  <ul className="flex flex-col gap-4">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                        <Check size={16} className="shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`mt-8 pt-6 border-t ${index === 2 ? 'border-cream/15' : 'border-charcoal/15'}`}>
                  {pkg.audience && (
                    <p className={`text-sm leading-relaxed mb-6 ${index === 2 ? 'text-cream/70' : 'text-muted'}`}>
                      <span className="font-medium">Ideal for:</span> {pkg.audience}
                    </p>
                  )}
                  <a
                    href={whatsappLink(`Hello Style Structure Studio, I am interested in the ${pkg.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-3 w-full px-5 py-3 text-xs uppercase tracking-wider transition-colors ${index === 2 ? 'bg-[#d3bf96] text-charcoal hover:bg-cream' : 'bg-charcoal text-cream hover:bg-ink'}`}
                  >
                    <MessageCircle size={15} />
                    Enquire on WhatsApp
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA dark />
    </>
  )
}
