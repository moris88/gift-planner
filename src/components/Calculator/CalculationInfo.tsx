import { Info } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'
import type { CalculationStep, EventType } from '../../types'

interface CalculationInfoProps {
	eventType: EventType
	isLongDistance: boolean
	externalExpenses: number
	preWeddingSpend: boolean
	breakdown: CalculationStep[]
	customPlateMin: number
	customPlateMax: number
	infants: number
}

export const CalculationInfo: React.FC<CalculationInfoProps> = ({
	eventType,
	isLongDistance,
	externalExpenses,
	preWeddingSpend,
	breakdown,
	customPlateMin,
	customPlateMax,
	infants,
}) => {
	const [showInfo, setShowInfo] = useState(true)

	return (
		<section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
			<button
				type="button"
				onClick={() => setShowInfo(!showInfo)}
				className="group flex w-full items-center justify-between"
			>
				<div className="flex items-center gap-2">
					<Info className="h-5 w-5 text-rose-500" />
					<h2 className="font-semibold text-lg">Nota sul Calcolo</h2>
				</div>
				<div
					className={`transition-transform duration-300 ${showInfo ? 'rotate-180' : ''}`}
				>
					<span className="text-slate-300 group-hover:text-slate-500">▼</span>
				</div>
			</button>

			{showInfo && (
				<div className="fade-in slide-in-from-top-4 mt-6 animate-in space-y-6 text-slate-600 text-sm duration-300">
					<div className="space-y-4">
						<p>
							Il calcolo si basa sulla copertura del{' '}
							<strong>costo stimato del ricevimento</strong> (
							{eventType === 'full'
								? `€${customPlateMin}-€${customPlateMax}`
								: eventType === 'half_day'
									? `€${Math.round(customPlateMin * 0.8)}-€${Math.round(customPlateMax * 0.8)}`
									: `€${Math.round(customPlateMin * 0.6)}-€${Math.round(customPlateMax * 0.6)}`}{' '}
							per adulto) più un margine variabile legato al legame affettivo.
						</p>

						{infants > 0 && (
							<div className="rounded-lg border-emerald-400 border-l-4 bg-emerald-50 p-3 text-emerald-800">
								<strong>👶 Nota sui Neonati:</strong> Abbiamo escluso i neonati
								({infants}) dal calcolo economico poiché le strutture
								solitamente non applicano costi per i più piccoli. Il loro posto
								a tavola è un regalo degli sposi!
							</div>
						)}

						{eventType !== 'full' && (
							<div className="rounded-lg border-rose-400 border-l-4 bg-slate-50 p-3">
								<strong>
									Ricevimento{' '}
									{eventType === 'half_day' ? 'Pomeridiano' : 'Serale'}:
								</strong>{' '}
								Abbiamo applicato una riduzione del{' '}
								{eventType === 'half_day' ? '20%' : '40%'} poiché i costi per
								gli sposi sono generalmente più contenuti.
							</div>
						)}

						{isLongDistance && externalExpenses > 0 && (
							<div className="rounded-lg border-blue-400 border-l-4 bg-blue-50 p-3">
								<strong>Compromesso Trasferta:</strong> Dato che spendi €
								{externalExpenses} tra viaggio e hotel, abbiamo ridotto il
								regalo consigliato per aiutarti a bilanciare il budget,
								mantenendo comunque una quota minima per gli sposi.
							</div>
						)}

						{preWeddingSpend && (
							<p className="text-[12px] italic">
								* È stata applicata una piccola detrazione simbolica perché hai
								già contribuito alle spese degli eventi pre-matrimoniali.
							</p>
						)}
					</div>

					{/* Breakdown Section */}
					<div className="space-y-3">
						<h3 className="border-slate-100 border-b pb-2 font-bold text-[10px] text-slate-800 uppercase tracking-wider">
							Dettaglio del Calcolo (Trasparenza)
						</h3>
						<div className="space-y-2">
							{breakdown.map((step, index) => (
								<div
									key={index}
									className="flex items-start justify-between gap-4 border-slate-50 border-b py-1 text-[12px] last:border-0"
								>
									<span className="text-slate-500">{step.label}</span>
									<span className="whitespace-nowrap font-medium font-mono text-slate-700">
										{step.value}
									</span>
								</div>
							))}
						</div>
					</div>

					<div className="border-amber-400 border-l-4 bg-amber-50 p-3 text-amber-800 text-xs italic">
						Ricorda: queste sono stime basate su convenzioni sociali. Il regalo
						dovrebbe sempre riflettere le tue reali possibilità e il tuo affetto
						per la coppia.
					</div>
				</div>
			)}
		</section>
	)
}
