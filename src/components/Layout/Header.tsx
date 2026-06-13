import { Heart, User } from 'lucide-react'
import type React from 'react'

export const Header: React.FC = () => {
	return (
		<header className="mb-8 border-slate-200 border-b bg-white px-4 py-6">
			<div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 md:flex-row">
				<div className="flex items-center gap-3">
					<div className="rounded-full bg-rose-100 p-2">
						<Heart className="h-8 w-8 fill-rose-500 text-rose-500" />
					</div>
					<div>
						<h1 className="font-bold text-2xl tracking-tight">Wedding Gift Planner</h1>
						<p className="text-slate-500 text-sm">
							Calcola il regalo di matrimonio ideale
						</p>
					</div>
				</div>

				<div className="flex items-center gap-4 text-slate-400 text-xs">
					<div className="text-right">
						<p className="font-medium text-slate-600">Maurizio Tolomeo</p>
						<a
							href="https://www.mauriziotolomeo.it"
							target="_blank"
							className="transition-colors hover:text-rose-500"
							rel="noopener"
						>
							www.mauriziotolomeo.it
						</a>
					</div>
					<User className="h-8 w-8 rounded-full bg-slate-100 p-1.5 text-slate-400" />
				</div>
			</div>
		</header>
	)
}
