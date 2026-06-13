import type React from 'react'

export const Footer: React.FC = () => {
	return (
		<footer className="mx-auto mt-12 max-w-4xl px-4 text-center text-slate-400 text-xs">
			<p>
				© {new Date().getFullYear()} Wedding Gift Planner - Sviluppato da
				Maurizio Tolomeo
			</p>
		</footer>
	)
}
