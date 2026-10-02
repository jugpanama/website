import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import MeetTheTeam from '@/components/MeetTheTeam'
import UpcomingEvents from '@/components/UpcomingEvents'
import PastEvents from '@/components/PastEvents'
import Notes from '@/components/Notes'
import EventsEmbed from '@/components/EventsEmbed'
import Footer from '@/components/Footer'
import {
  getNextEventWithEmbedFromMarkdown,
  getNotesFromMarkdown,
  getPastEventsFromMarkdown,
  getUpcomingEventsFromMarkdown,
} from '@/lib/content'

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: 'es' | 'en' }> }) {
  const { locale } = await params
  const upcomingEvents = getUpcomingEventsFromMarkdown()
  const pastEvents = getPastEventsFromMarkdown()
  const pastEventsPreview = pastEvents.slice(0, 3)
  const nextEvent = getNextEventWithEmbedFromMarkdown()
  const notes = getNotesFromMarkdown(locale)

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <div className="pt-14 sm:pt-16 md:pt-20">
          <About />
        </div>
        <MeetTheTeam />
        <UpcomingEvents upcomingEvents={upcomingEvents} />
        <PastEvents pastEvents={pastEventsPreview} totalCount={pastEvents.length} />
        <EventsEmbed nextEvent={nextEvent} />
        <Notes notes={notes} />
      </main>
      <Footer nextEvent={upcomingEvents[0] ?? null} />
    </>
  )
}
