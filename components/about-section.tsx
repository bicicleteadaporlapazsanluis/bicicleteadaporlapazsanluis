import { Card, CardContent } from "@/components/ui/card"
import { Heart, Globe, Users } from "lucide-react"

export function AboutSection() {
  return (
    <section id="acerca" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">¿De qué se trata?</h2>

          <Card className="mb-12 border-border bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <p className="text-base md:text-lg leading-relaxed text-foreground">
                El domingo 5 de octubre a partir de las 9:00, las y los aficionados a pedalear podrán participar de la
                Bicicleteada por la Paz, una actividad que se encuadra dentro de{" "}
                <span className="font-semibold text-primary">"La Ruta por la Paz"</span>, una iniciativa global que
                busca conectar a todos los pueblos del mundo a través de la paz, para alcanzar una mayor interrelación y
                bienestar mutuo entre naciones y culturas.
              </p>
              <div className="mt-6 p-4 bg-primary rounded-lg border border-primary">
                <p className="text-primary-foreground font-semibold text-base md:text-lg">
                  ¡Abierto y gratuito a todo público!
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Paz</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Promovemos la paz y la armonía entre las comunidades
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Conexión Global</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Conectamos culturas y pueblos del mundo entero
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Comunidad</h3>
              <p className="text-sm md:text-base text-muted-foreground">Fortalecemos los lazos entre las personas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
