import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key')

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError)
      return NextResponse.json(
        { error: 'Invalid JSON format' },
        { status: 400 }
      )
    }

    const { email, nombre, apellido } = body

    if (!email || !nombre || !apellido) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      )
    }

    // Verificar si la API key de Resend está configurada
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY no configurada, saltando envío de email')
      return NextResponse.json({ success: true, message: 'Email no enviado - API key no configurada' })
    }

    const { data, error } = await resend.emails.send({
      from: 'Bicicleteada por la Paz <noreply@bicicleteadaporlapazsanluis.com>',
      to: [email],
      subject: '¡Te has inscrito exitosamente a la Bicicleteada por la Paz! 🚴‍♀️',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmación de Inscripción</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981, #3b82f6); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🚴‍♀️ Bicicleteada por la Paz</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">San Luis 2024</p>
          </div>
          
          <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="color: #1f2937; margin-top: 0;">¡Hola ${nombre} ${apellido}!</h2>
            <p style="font-size: 16px; margin-bottom: 20px;">
              ¡Excelente! Te has inscrito exitosamente a la <strong>Bicicleteada por la Paz</strong>. 
              Estamos muy contentos de que formes parte de este evento tan especial.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 6px; border-left: 4px solid #10b981;">
              <h3 style="color: #059669; margin-top: 0;">📅 Detalles del Evento</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="margin: 8px 0;"><strong>📅 Fecha:</strong> Domingo 5 de octubre de 2024</li>
                <li style="margin: 8px 0;"><strong>🕘 Hora:</strong> 9:00 hs (llegar 15 min antes)</li>
                <li style="margin: 8px 0;"><strong>📍 Partida:</strong> Terrazas del Portezuelo, San Luis</li>
                <li style="margin: 8px 0;"><strong>🏁 Llegada:</strong> Polideportivo Ave Fénix</li>
                <li style="margin: 8px 0;"><strong>📏 Distancia:</strong> Aproximadamente 8 km</li>
                <li style="margin: 8px 0;"><strong>⏱️ Duración:</strong> 1-2 horas</li>
              </ul>
              
              <div style="text-align: center; margin-top: 20px;">
                <a href="https://www.google.com/maps/dir/Terrazas+del+Portezuelo,+Autopista+de+las+Serran%C3%ADas+Puntanas,+Km+783,+D5700+San+Luis/Polideportivo+Ave+F%C3%A9nix,+Avenida+del+Viento+Chorrillero,+San+Luis/@-33.297145,-66.2908144,14z/am=t/data=!4m18!4m17!1m5!1m1!1s0x95d43c2f5a73d1bf:0x7717856453193156!2m2!1d-66.2947326!2d-33.3040249!1m5!1m1!1s0x95d43e08914289a7:0x9c6ec42e2ffb7512!2m2!1d-66.2496757!2d-33.2848276!3e1!6m3!1i0!2i0!3i6?entry=ttu&g_ep=EgoyMDI1MDkwOC4wIKXMDSoASAFQAw%3D%3D" 
                   style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                  🗺️ Ver Recorrido en Google Maps
                </a>
              </div>
            </div>
          </div>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border: 1px solid #f59e0b; margin-bottom: 25px;">
            <h3 style="color: #92400e; margin-top: 0;">⚠️ Instrucciones Importantes</h3>
            <ul style="color: #92400e; margin: 0; padding-left: 20px;">
              <li><strong>🚴‍♀️ Bicicleta:</strong> Debe estar en buen estado (frenos, cambios, ruedas)</li>
              <li><strong>🪖 Casco:</strong> OBLIGATORIO para todos los participantes</li>
              <li><strong>💧 Hidratación:</strong> Trae agua suficiente para el recorrido</li>
              <li><strong>☀️ Protección solar:</strong> Gorra, protector solar, ropa cómoda</li>
              <li><strong>⏰ Puntualidad:</strong> Llega 15 minutos antes (8:45 hs)</li>
              <li><strong>📱 Comunicación:</strong> Mantén tu teléfono cargado</li>
            </ul>
          </div>
          
          <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; border: 1px solid #0ea5e9; margin-bottom: 25px;">
            <h3 style="color: #0c4a6e; margin-top: 0;">🎯 ¿Qué Esperar?</h3>
            <ul style="color: #0c4a6e; margin: 0; padding-left: 20px;">
              <li><strong>🌅 8:45 hs:</strong> Check-in y verificación de equipos</li>
              <li><strong>🚀 9:00 hs:</strong> Inicio de la bicicleteada</li>
              <li><strong>🏁 10:30-11:00 hs:</strong> Llegada al Polideportivo Ave Fénix</li>
              <li><strong>🎉 11:00 hs:</strong> Acto de cierre y sorteos</li>
              <li><strong>📸 11:30 hs:</strong> Fotos grupales y despedida</li>
            </ul>
          </div>
          
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border: 1px solid #22c55e; margin-bottom: 25px;">
            <h3 style="color: #166534; margin-top: 0;">🤝 Código de Conducta</h3>
            <ul style="color: #166534; margin: 0; padding-left: 20px;">
              <li>Respeta las señales de tránsito y semáforos</li>
              <li>Mantén la distancia de seguridad con otros ciclistas</li>
              <li>Usa las ciclovías cuando estén disponibles</li>
              <li>Ayuda a otros participantes si necesitan asistencia</li>
              <li>Disfruta del evento de manera responsable</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="font-size: 18px; color: #1f2937; margin-bottom: 20px;">
              <strong>¡Prepará tu bici, te esperamos!</strong>
            </p>
            <div style="background: #10b981; color: white; padding: 15px 30px; border-radius: 25px; display: inline-block; font-weight: bold;">
              🚴‍♀️ ¡Nos vemos el 5 de octubre! 🚴‍♂️
            </div>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center;">
            <h3 style="color: #1f2937; margin-top: 0;">📞 Contacto y Redes</h3>
            <p style="color: #4b5563; margin-bottom: 15px;">
              ¿Tienes preguntas? ¡Contáctanos!
            </p>
            <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
              <a href="mailto:info@bicicleteadaporlapazsanluis.com" style="color: #3b82f6; text-decoration: none; font-weight: bold;">
                📧 info@bicicleteadaporlapazsanluis.com
              </a>
              <a href="https://bicicleteadaporlapazsanluis.com" style="color: #3b82f6; text-decoration: none; font-weight: bold;">
                🌐 bicicleteadaporlapazsanluis.com
              </a>
            </div>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
            <p><strong>¡Gracias por ser parte de este evento especial!</strong></p>
            <p>Este correo fue enviado automáticamente. No respondas a este mensaje.</p>
            <p>© 2024 Bicicleteada por la Paz - San Luis, Argentina</p>
            <p>Desarrollado por <strong>deadlinestudiosm</strong></p>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Error enviando email:', error)
      return NextResponse.json(
        { error: 'Error al enviar el correo' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error en API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
