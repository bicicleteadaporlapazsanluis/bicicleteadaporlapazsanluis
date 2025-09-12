import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Users, Award, Car } from "lucide-react"

export function SponsorsSection() {
  const sponsors = [
    {
      name: "Gobierno de San Luis",
      icon: Building,
      description: "Gobierno Provincial",
    },
    {
      name: "Rotary Club Sierras San Luis",
      icon: Users,
      description: "Organización de servicio",
    },
    {
      name: "Embajador para la Paz San Luis",
      icon: Award,
      description: "Representante de paz",
    },
    {
      name: "Automóvil Club",
      icon: Car,
      description: "Club automotor",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Invitan</h2>
            <p className="text-lg text-muted-foreground">Organizaciones que hacen posible este evento</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsors.map((sponsor, index) => (
              <Card
                key={index}
                className="text-center border-border bg-card/80 backdrop-blur-sm hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-4">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <sponsor.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-primary">{sponsor.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{sponsor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
