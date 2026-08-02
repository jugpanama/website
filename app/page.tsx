import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import MeetTheTeam from '@/components/MeetTheTeam'
import UpcomingEvents from '@/components/UpcomingEvents'
import PastEvents from '@/components/PastEvents'
import Notes from '@/components/Notes'
import EventsEmbed from '@/components/EventsEmbed'
import Sponsors from '@/components/Sponsors'
import Footer from '@/components/Footer'
import {
  getNextEventWithEmbedFromMarkdown,
  getNotesFromMarkdown,
  getPastEventsFromMarkdown,
  getSponsorsFromMarkdown,
  getUpcomingEventsFromMarkdown,
} from '@/lib/content'

export default function Home() {
  const upcomingEvents = getUpcomingEventsFromMarkdown()
  const pastEvents = getPastEventsFromMarkdown()
  const pastEventsPreview = pastEvents.slice(0, 3)
  const nextEvent = getNextEventWithEmbedFromMarkdown()
  const sponsors = getSponsorsFromMarkdown()
  const notes = getNotesFromMarkdown()

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        {/* Spacer compensates for the floating focus-area card below Hero */}
        <div className="pt-14 sm:pt-16 md:pt-20">
          <About />
        </div>
        <MeetTheTeam />
        <UpcomingEvents upcomingEvents={upcomingEvents} />
        <PastEvents pastEvents={pastEventsPreview} totalCount={pastEvents.length} />
        <EventsEmbed nextEvent={nextEvent} />
        <Notes notes={notes} />
        {sponsors.length > 0 && <Sponsors sponsors={sponsors} />}
      </main>
      <Footer nextEvent={upcomingEvents[0] ?? null} />
    </>
  )
}
