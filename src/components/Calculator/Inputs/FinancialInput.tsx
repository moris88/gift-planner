import { Banknote, ChevronDown, Heart, TrendingUp } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'
import type { GenerosityType, UserPreferences } from '../../../types'

interface FinancialInputProps {
	ral: number
	hasInvestments: boolean
	generosity: GenerosityType
	updatePref: <K extends keyof UserPreferences>(
		key: K,
		value: UserPreferences[K],
	) => void
}

const RAL_OPTIONS = [
	{ label: 'Budget limitato', value: 15000 },
	{ label: 'Standard', value: 30000 },
	{ label: 'Sopra la media', value: 45000 },
	{ label: 'Elevata', value: 65000 },
	{ label: 'Molto alta', value: 100000 },
]

const GENEROSITY_OPTIONS: {
	label: string
	value: GenerosityType
	desc: string
}[] = [
	{ label: 'Normale', value: 'normal', desc: 'Regalo standard e corretto' },
	{
		label: 'Media (+20%)',
		value: 'medium',
		desc: 'Un piccolo pensiero in più',
	},
	{ label: 'Alta (+50%)', value: 'high', desc: "Regalo generoso e d'impatto" },
	{ label: 'Super generoso (+80%)', value: 'super', desc: 'Voglio esagerare' },
]

export const FinancialInput: React.FC<FinancialInputProps> = ({
	ral,
	hasInvestments,
	generosity,
	updatePref,
}) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div
			className={`space-y-4 rounded-xl border transition-all ${isOpen ? 'border-emerald-200 bg-slate-50/50 p-4' : 'border-slate-200 bg-white p-1'}`}
		>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="flex w-full items-center justify-between px-3 py-2 text-left"
			>
				<div className="flex items-center gap-2">
					<Banknote
						className={`h-4 w-4 ${isOpen ? 'text-emerald-500' : 'text-slate-400'}`}
					/>
					<div>
						<h3
							className={`font-bold text-xs uppercase tracking-wider ${isOpen ? 'text-slate-700' : 'text-slate-500'}`}
						>
							Situazione Economica & Generosità
						</h3>
						{!isOpen && (
							<p className="text-[10px] text-slate-400">
								Opzionale: Personalizza in base alle tue possibilità
							</p>
						)}
					</div>
				</div>
				<ChevronDown
					className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
				/>
			</button>

			{isOpen && (
				<div className="fade-in slide-in-from-top-2 animate-in space-y-6 duration-200">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div className="space-y-2">
							<label
								htmlFor="ral"
								className="font-medium text-slate-500 text-xs uppercase tracking-wider"
							>
								Budget
							</label>
							<select
								id="ral"
								value={ral}
								onChange={(e) =>
									updatePref('ral', parseInt(e.target.value, 10))
								}
								className="w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
							>
								{RAL_OPTIONS.map((opt) => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="generosity"
								className="font-medium text-slate-500 text-xs uppercase tracking-wider"
							>
								Livello Generosità
							</label>
							<select
								id="generosity"
								value={generosity}
								onChange={(e) =>
									updatePref('generosity', e.target.value as GenerosityType)
								}
								className="w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
							>
								{GENEROSITY_OPTIONS.map((opt) => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="space-y-3">
						<label
							className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${hasInvestments ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
						>
							<input
								type="checkbox"
								checked={hasInvestments}
								onChange={(e) => updatePref('hasInvestments', e.target.checked)}
								className="mt-0.5 h-5 w-5 rounded border-slate-300 text-emerald-500 accent-emerald-500 focus:ring-emerald-500"
							/>
							<div className="flex flex-col">
								<div className="flex items-center gap-1.5">
									<TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
									<span className="font-medium text-emerald-900 text-sm">
										Ho investimenti attualmente
									</span>
								</div>
								<span className="text-[10px] text-emerald-600/70">
									Riduci l'impatto sul liquido immediato (-10% sul regalo)
								</span>
							</div>
						</label>
					</div>

					{generosity !== 'normal' && (
						<div className="flex items-center gap-2 rounded-lg bg-rose-50 p-2 text-rose-700 text-xs">
							<Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
							<span>
								Hai scelto una generosità{' '}
								<strong>
									{
										GENEROSITY_OPTIONS.find((o) => o.value === generosity)
											?.label
									}
								</strong>
								: {GENEROSITY_OPTIONS.find((o) => o.value === generosity)?.desc}
							</span>
						</div>
					)}

					<small className="text-[10px] text-green-500 italic">
						Le indicazioni sono facoltative, altrimenti il sistema lascia i
						valori di default (BUDGET Standard E GENEROSITÀ Normale)
					</small>
				</div>
			)}
		</div>
	)
}
