import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import profile from '@/content/profile.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faLinkedin,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons'

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <Avatar className="w-24 h-24 mx-auto">
          <AvatarImage src={profile.avatar} alt={profile.name} />
          <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold">{profile.name}</h1>
        <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
          {profile.bio}
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="h-5 w-5">
                <FontAwesomeIcon icon={faGithub} />
              </div>
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a
              href={profile.social.x}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="h-5 w-5">
                <FontAwesomeIcon icon={faXTwitter} />
              </div>
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a
              href={profile.social.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="h-5 w-5">
                <FontAwesomeIcon icon={faLinkedin} />
              </div>
            </a>
          </Button>
        </div>
      </section>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-muted-foreground leading-relaxed">
            Welcome to my corner of the internet! I&apos;m passionate about web
            development, AI, technology, and sharing knowledge through writing.
            <br />
            Here you&apos;ll find my thoughts, tutorials, and experiences in the
            world of software development.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
