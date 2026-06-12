import type React from 'react'
import type { CalculationResult } from '../../types'

interface GiftResultsProps {
	result: CalculationResult
}

export const GiftResults: React.FC<GiftResultsProps> = ({ result }) => {
	return (
		<section className="flex flex-col items-center justify-center space-y-6 rounded-2xl bg-rose-500 p-8 text-center text-white shadow-lg shadow-rose-200">
			<div>
				<h2 className="mb-4 font-medium text-rose-100 text-xs uppercase tracking-[0.2em]">
					{result.externalExpenses > 0
						? 'Budget Complessivo (Media)'
						: 'Media Consigliata'}
				</h2>
				<div className="font-bold text-5xl">
					€{result.average + result.externalExpenses}
				</div>
				{result.externalExpenses > 0 && (
					<p className="mt-2 text-rose-100 text-xs italic">
						Include Regalo (€{result.average}) + Trasferta (€
						{result.externalExpenses})
					</p>
				)}
			</div>

			<div className="grid w-full grid-cols-1 gap-4">
				<div className="rounded-xl border border-rose-400/30 bg-rose-600/30 p-4">
					<p className="mb-2 font-bold text-[10px] text-rose-100 uppercase">
						Range Regalo Consigliato
					</p>
					<div className="flex items-center justify-center gap-6">
						<div>
							<span className="block text-[10px] text-rose-200 uppercase">
								Min
							</span>
							<span className="font-bold text-2xl">€{result.min}</span>
						</div>
						<div className="h-8 w-px bg-rose-400/30"></div>
						<div>
							<span className="block text-[10px] text-rose-200 uppercase">
								Max
							</span>
							<span className="font-bold text-2xl">€{result.max}</span>
						</div>
					</div>
				</div>

				{result.externalExpenses > 0 && (
					<div className="rounded-xl border border-white/10 bg-white/10 p-4">
						<p className="mb-1 font-bold text-[10px] text-rose-100 uppercase">
							Spese Trasferta Stimata
						</p>
						<p className="font-bold text-2xl">€{result.externalExpenses}</p>
					</div>
				)}
			</div>

			<div className="flex flex-wrap justify-center gap-2">
				<div className="rounded-full bg-rose-600/50 px-4 py-2 pt-2 font-medium text-[10px] backdrop-blur-sm">
					Legame: {result.effectiveRelation}
				</div>
				<div className="rounded-full bg-white/20 px-4 py-2 pt-2 font-bold text-[10px] uppercase tracking-wider backdrop-blur-sm">
					Calcolo Personalizzato ✨
				</div>
			</div>
		</section>
	)
}
