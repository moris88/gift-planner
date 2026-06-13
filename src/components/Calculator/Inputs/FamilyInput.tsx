import { Baby, Users } from 'lucide-react'
import type React from 'react'
import type { UserPreferences } from '../../../types'

interface FamilyInputProps {
	adults: number
	kidsCount: number
	infants: number
	updatePref: <K extends keyof UserPreferences>(
		key: K,
		value: UserPreferences[K],
	) => void
}

export const FamilyInput: React.FC<FamilyInputProps> = ({
	adults,
	kidsCount,
	infants,
	updatePref,
}) => {
	const options = Array.from({ length: 11 }, (_, i) => i)

	return (
		<div className="space-y-4">
			<h3 className="font-medium text-slate-500 text-sm uppercase tracking-wider">
				Nucleo Familiare
			</h3>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
				<div className="space-y-2">
					<label htmlFor="adults" className="flex items-center gap-2 text-sm">
						<Users className="h-4 w-4" /> Adulti
					</label>
					<select
						id="adults"
						value={adults}
						onChange={(e) => updatePref('adults', parseInt(e.target.value, 10))}
						className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
					>
						{options.slice(1).map((n) => (
							<option key={n} value={n}>
								{n}
							</option>
						))}
					</select>
				</div>
				<div className="space-y-2">
					<label htmlFor="children" className="flex items-center gap-2 text-sm">
						<Baby className="h-4 w-4" /> Bambini
					</label>
					<select
						id="children"
						value={kidsCount}
						onChange={(e) =>
							updatePref('children', parseInt(e.target.value, 10))
						}
						className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
					>
						{options.map((n) => (
							<option key={n} value={n}>
								{n}
							</option>
						))}
					</select>
					<small className="text-[10px] text-slate-500 italic">
						Età tra 2 e 12 anni
					</small>
				</div>
				<div className="space-y-2">
					<label htmlFor="infants" className="flex items-center gap-2 text-sm">
						<Baby className="h-4 w-4" /> Neonati
					</label>
					<select
						id="infants"
						value={infants}
						onChange={(e) =>
							updatePref('infants', parseInt(e.target.value, 10))
						}
						className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
					>
						{options.map((n) => (
							<option key={n} value={n}>
								{n}
							</option>
						))}
					</select>
					<small className="text-[10px] text-slate-500 italic">
						Età tra 0 e 2 anni
					</small>
				</div>
			</div>

			<small className="text-[10px] text-slate-500 italic leading-none">
				Nota: Il regalo consigliato è calcolato principalmente sui pasti degli
				adulti e dei bambini (pasto ridotto). I neonati non influenzano il
				calcolo, ma è importante includerli per una stima più accurata.
			</small>
		</div>
	)
}
