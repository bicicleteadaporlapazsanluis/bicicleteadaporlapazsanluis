import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Heart } from "lucide-react"

export function SponsorsSection() {
  const sponsors = [
    {
      name: "Gobierno de San Luis",
      logo: "/logos/sanluisprovincia.png",
      description: "Gobierno Provincial",
    },
    {
      name: "UPF ARGENTINA",
      logo: "/logos/upf.jpg",
      description: "Universal Peace Federation",
    },
    {
      name: "Fernando González Zunino",
      logo: null,
      icon: Heart,
      description: "Embajador para la Paz",
    },
    {
      name: "Rotary Club Sierras San Luis",
      logo: "/logos/rotaryclub.jpg",
      description: "Organización de servicio",
    },
    {
      name: "SERVO",
      logo: "/logos/servo.jpg",
      description: "Fábrica de productos anti pinchazos",
    },
    {
      name: "Triunfo Seguros",
      logo: "/logos/triunfoseguros.png",
      description: "Seguros",
    },
    {
      name: "JK",
      logo: "/logos/jk.jpg",
      description: "Patrocinador",
    },
    {
      name: "Gorila",
      logo: "/logos/gorila.png",
      description: "Patrocinador",
    },
    {
      name: "Fuera de Eje",
      logo: "/logos/fueradeeje.png",
      description: "Medios",
    },
    {
      name: "Fox Sports",
      logo: "/logos/foxsports.png",
      description: "Medios Deportivos",
    },
    {
      name: "Deadline Studios",
      logo: "/logos/deadline.png",
      description: "Producción",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Invitan</h2>
            <p className="text-lg text-muted-foreground">Organizaciones que hacen posible este evento</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsors.map((sponsor, index) => (
              <Card
                key={index}
                className={`text-center border-border backdrop-blur-sm hover:shadow-xl hover:scale-105 transition-all duration-300 hover:-translate-y-2`}
              >
                <CardHeader className="pb-4">
                  <div className={`w-full h-24 flex items-center justify-center mx-auto mb-4 relative rounded-lg`}>
                    {sponsor.logo ? (
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        width={150}
                        height={150}
                        className="object-contain max-w-full max-h-full"
                      />
                    ) : sponsor.icon ? (
                      <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
                        <sponsor.icon className="w-10 h-10 text-red-500" />
                      </div>
                    ) : null}
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
