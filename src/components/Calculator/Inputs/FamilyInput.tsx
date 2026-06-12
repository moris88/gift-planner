import { Baby, Users } from 'lucide-react'
import type React from 'react'
import type { UserPreferences } from '../../../types'

interface FamilyInputProps {
	adults: number
	children: number
	infants: number
	updatePref: <K extends keyof UserPreferences>(
		key: K,
		value: UserPreferences[K],
	) => void
}

export const FamilyInput: React.FC<FamilyInputProps> = ({
	adults,
	children,
	infants,
	updatePref,
}) => {
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
					<input
						type="number"
						id="adults"
						min="1"
						value={adults}
						onChange={(e) =>
							updatePref('adults', parseInt(e.target.value, 10) || 0)
						}
						className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
					/>
				</div>
				<div className="space-y-2">
					<label htmlFor="children" className="flex items-center gap-2 text-sm">
						<Baby className="h-4 w-4" /> Bambini
					</label>
					<input
						type="number"
						id="children"
						min="0"
						value={children}
						onChange={(e) =>
							updatePref('children', parseInt(e.target.value, 10) || 0)
						}
						className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="infants"
						className="flex items-center gap-2 text-sm opacity-50"
					>
						<Baby className="h-4 w-4" /> Neonati
					</label>
					<input
						type="number"
						id="infants"
						min="0"
						value={infants}
						onChange={(e) =>
							updatePref('infants', parseInt(e.target.value, 10) || 0)
						}
						className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
					/>
				</div>
			</div>
		</div>
	)
}
