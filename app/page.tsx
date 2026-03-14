import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import UpcomingEvents from '@/components/UpcomingEvents'
import PastEvents from '@/components/PastEvents'
import EventsEmbed from '@/components/EventsEmbed'
import Sponsors from '@/components/Sponsors'
import Footer from '@/components/Footer'
import {
  getNextEventWithEmbedFromMarkdown,
  getPastEventsFromMarkdown,
  getSponsorsFromMarkdown,
  getUpcomingEventsFromMarkdown,
} from '@/lib/content'

export default function Home() {
  const upcomingEvents = getUpcomingEventsFromMarkdown()
  const pastEvents = getPastEventsFromMarkdown()
  const pastEventsPreview = pastEvents.slice(0, 6)
  const nextEvent = getNextEventWithEmbedFromMarkdown()
  const sponsors = getSponsorsFromMarkdown()
  const communityStartYear = 2021
  const heroStats = {
    completedEvents: pastEvents.length,
    upcomingEvents: upcomingEvents.length,
    years: new Date().getFullYear() - communityStartYear,
  }
  const nextEventPrimaryHref = nextEvent?.streamOpen
    ? '/#transmision'
    : nextEvent?.registrationOpen
      ? '/#registro'
      : '/eventos/proximos'
  const nextEventPrimaryLabel = nextEvent?.streamOpen
    ? 'Ver transmisión'
    : nextEvent?.registrationOpen
      ? 'Ver registro'
      : 'Ver agenda'

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero
          stats={heroStats}
          primaryCtaHref={nextEventPrimaryHref}
          primaryCtaLabel={nextEventPrimaryLabel}
        />
        <About />
        <UpcomingEvents upcomingEvents={upcomingEvents} />
        <PastEvents pastEvents={pastEventsPreview} totalCount={pastEvents.length} />
        <EventsEmbed nextEvent={nextEvent} />
        <Sponsors sponsors={sponsors} />
      </main>
      <Footer nextEvent={upcomingEvents[0] ?? null} />
    </>
  )
}
