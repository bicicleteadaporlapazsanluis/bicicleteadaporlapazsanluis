"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Trophy, Download, RefreshCw } from "lucide-react"
import { createClient } from "@/lib/client"
import { useToast } from "@/hooks/use-toast"

interface Registration {
  id: string
  email: string
  nombre: string
  apellido: string
  ciudad: string
  telefono: string
  organizacion_personal: string
  created_at: string
}

interface Winner {
  id: string
  registration_id: string
  prize: string
  created_at: string
  registrations: {
    nombre: string
    apellido: string
    email: string
  }
}

export default function AdminPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [winners, setWinners] = useState<Winner[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { addToast } = useToast()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const supabase = createClient()
      
      // Fetch registrations
      const { data: regData, error: regError } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false })

      if (regError) throw regError

      // Fetch winners with registration data
      const { data: winData, error: winError } = await supabase
        .from("raffle_winners")
        .select(`
          *,
          registrations (
            nombre,
            apellido,
            email
          )
        `)
        .order("created_at", { ascending: false })

      if (winError) throw winError

      setRegistrations(regData || [])
      setWinners(winData || [])
    } catch (error) {
      console.error("Error fetching data:", error)
      addToast({
        title: "Error",
        description: "No se pudieron cargar los datos.",
        variant: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const exportToCSV = () => {
    const csvContent = [
      ["Nombre", "Apellido", "Email", "Ciudad", "Teléfono", "Organización", "Fecha de Inscripción"],
      ...registrations.map(reg => [
        reg.nombre,
        reg.apellido,
        reg.email,
        reg.ciudad,
        reg.telefono,
        reg.organizacion_personal,
        new Date(reg.created_at).toLocaleDateString()
      ])
    ].map(row => row.join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `inscripciones-bicicleteada-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Cargando datos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
          <p className="text-gray-600">Bicicleteada por la Paz - San Luis</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Inscripciones</p>
                  <p className="text-2xl font-bold text-gray-900">{registrations.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ganadores</p>
                  <p className="text-2xl font-bold text-gray-900">{winners.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Download className="w-8 h-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Exportar</p>
                  <Button size="sm" onClick={exportToCSV} className="mt-2">
                    Descargar CSV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Winners Section */}
        {winners.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                Ganadores del Sorteo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {winners.map((winner, index) => (
                  <div key={winner.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-4">
                      <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold">{winner.registrations.nombre} {winner.registrations.apellido}</p>
                        <p className="text-sm text-gray-600">{winner.registrations.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-yellow-700">🏆 {winner.prize}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(winner.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Registrations Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-500" />
              Inscripciones ({registrations.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Nombre</th>
                    <th className="text-left p-2">Email</th>
                    <th className="text-left p-2">Ciudad</th>
                    <th className="text-left p-2">Organización</th>
                    <th className="text-left p-2">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((reg) => (
                    <tr key={reg.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{reg.nombre} {reg.apellido}</td>
                      <td className="p-2">{reg.email}</td>
                      <td className="p-2">{reg.ciudad}</td>
                      <td className="p-2">{reg.organizacion_personal}</td>
                      <td className="p-2">{new Date(reg.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
