import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Route } from "lucide-react";

export function RouteSection() {
  const routePoints = [
    { name: "Terrazas del Portezuelo", description: "Punto de partida", isStart: true },
    { name: "Corredor Vial Eva Perón", description: "Recorrido principal" },
    { name: "Parque de las Naciones", description: "Primera parada" },
    { name: "Riobamba", description: "Zona residencial" },
    { name: "Pasaje Callao", description: "Calle comercial" },
    { name: "Ciudad del Rosario", description: "Barrio histórico" },
    { name: "Avenida del Fundador", description: "Avenida principal" },
    { name: "Polideportivo Ave Fénix", description: "Punto de llegada", isEnd: true },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Recorrido</h2>
            <p className="text-lg text-muted-foreground">Conocé el trayecto que recorreremos juntos por San Luis</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Card className="border-border bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Route className="w-6 h-6" />
                  Puntos del Recorrido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {routePoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold ${
                          point.isStart
                            ? "bg-green-500 text-white"
                            : point.isEnd
                            ? "bg-red-500 text-white"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        {point.isStart ? "🚀" : point.isEnd ? "🏁" : index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-foreground font-medium">{point.name}</span>
                        </div>
                        <p className="text-sm text-muted-foreground ml-6">{point.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                    <Route className="w-5 h-5" />
                    Información del Recorrido
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-green-600">
                    <div>
                      <strong>Distancia:</strong> ~8 km
                    </div>
                    <div>
                      <strong>Duración estimada:</strong> 45-60 min
                    </div>
                    <div>
                      <strong>Dificultad:</strong> Fácil
                    </div>
                    <div>
                      <strong>Terreno:</strong> Urbano
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <MapPin className="w-6 h-6" />
                  Mapa del Recorrido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d26678.629354742654!2d-66.2908144!3d-33.297145!3m2!1i1024!2i768!4f13.1!4m13!3e1!4m5!1s0x95d43c2f5a73d1bf%3A0x7717856453193156!2sTerrazas%20del%20Portezuelo%2C%20Autopista%20de%20las%20Serran%C3%ADas%20Puntanas%2C%20Km%20783%2C%20D5700%20San%20Luis!3m2!1d-33.3040249!2d-66.2947326!4m5!1s0x95d43e08914289a7%3A0x9c6ec42e2ffb7512!2sPolideportivo%20Ave%20F%C3%A9nix%2C%20Avenida%20del%20Viento%20Chorrillero%2C%20San%20Luis!3m2!1d-33.2848276!2d-66.2496757!5e0!3m2!1ses-419!2sar!4v1757640717378!5m2!1ses-419!2sar"
                    width="600"
                    height="450"
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="mt-4 text-center">
                  <a
                    href="https://www.google.com/maps/dir/Terrazas+del+Portezuelo,+Autopista+de+las+Serran%C3%ADas+Puntanas,+Km+783,+D5700+San+Luis/Polideportivo+Ave+F%C3%A9nix,+Avenida+del+Viento+Chorrillero,+San+Luis/@-33.297145,-66.2908144,14z/am=t/data=!4m18!4m17!1m5!1m1!1s0x95d43c2f5a73d1bf:0x7717856453193156!2m2!1d-66.2947326!2d-33.3040249!1m5!1m1!1s0x95d43e08914289a7:0x9c6ec42e2ffb7512!2m2!1d-66.2496757!2d-33.2848276!3e1!6m3!1i0!2i0!3i6?entry=ttu&g_ep=EgoyMDI1MDkwOC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    <MapPin className="w-4 h-4" />
                    Ver recorrido completo en Google Maps
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
