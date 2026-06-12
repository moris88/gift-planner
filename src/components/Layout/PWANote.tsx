import type React from 'react'
import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'

export const PWANote: React.FC = () => {
	const [showNote, setShowNote] = useState(false)

	useEffect(() => {
		const isAndroid = /Android/i.test(navigator.userAgent)
		const isStandalone = window.matchMedia('(display-mode: standalone)').matches

		if (isAndroid && !isStandalone) {
			setShowNote(true)
		}
	}, [])

	if (!showNote) return null

	return (
		<div className="mx-auto mt-8 max-w-2xl px-4">
			<div className="flex items-center gap-3 rounded-xl border border-rose-100 bg-rose-50 p-4 text-rose-800 shadow-sm">
				<div className="rounded-full bg-rose-100 p-2 text-rose-600">
					<Download className="h-5 w-5" />
				</div>
				<div className="text-sm">
					<p className="font-semibold text-rose-900">Installa l'app su Android</p>
					<p className="text-rose-700">
						Tocca i tre puntini <span className="font-bold">⋮</span> in alto a
						destra nel browser e seleziona <span className="font-bold">"Installa app" oppure "Aggiungi a schermata Home"</span> per un accesso rapido.
					</p>
				</div>
			</div>
		</div>
	)
}
