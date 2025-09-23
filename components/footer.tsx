import { Heart, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-800 via-green-700 to-green-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center justify-center gap-3">
              <Heart className="w-6 h-6 md:w-8 md:h-8 text-red-400 animate-pulse" />
              ¡Prepará tu bici, te esperamos!
            </h3>
            <p className="text-base md:text-lg text-green-100 max-w-3xl mx-auto leading-relaxed">
              Sumate a esta iniciativa de paz el domingo 5 de octubre a las 9:00 hs en el Salón Malvinas Argentinas.
              Conectá con tu comunidad pedaleando por un mundo mejor.
            </p>
          </div>


          {/* Contact */}
          {/* <div className="flex justify-center mb-12">
            <a 
              href="mailto:contacto@bicicleteadaporlapaz.com" 
              className="bg-white/20 hover:bg-white/30 transition-all duration-300 p-3 rounded-full hover:scale-110"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div> */}

          {/* Quote and Copyright */}
          <div className="border-t border-green-600/30 pt-8">
            <blockquote className="text-green-200 italic text-lg mb-6 max-w-2xl mx-auto">
              "No hay camino hacia la paz, la paz es el camino"
              <footer className="text-sm text-green-300 mt-2">- Mahatma Gandhi</footer>
            </blockquote>
            <p className="text-green-300 text-sm">
              © 2025 Bicicleteada por la Paz - San Luis, Argentina. Todos los derechos reservados.
            </p>
            <p className="text-green-400 text-xs mt-2">
              Desarrollado por <span className="font-semibold">Deadline Studios</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
