import type React from 'react'
import type { DistanceType, RegionType, UserPreferences } from '../../../types'

interface AdditionalDetailsProps {
	adults: number
	region: RegionType
	isLuxury: boolean
	distanceType: DistanceType
	isPlusOne: boolean
	preWeddingSpend: boolean
	preWeddingAmount: number
	isPhysicalGift: boolean
	physicalGiftAmount: number
	travelCostPerPerson: number
	hotelNights: number
	hotelNightCost: number
	customPlateMin: number
	customPlateMax: number
	hasSerenata: boolean
	updatePref: <K extends keyof UserPreferences>(
		key: K,
		value: UserPreferences[K],
	) => void
}

export const AdditionalDetails: React.FC<AdditionalDetailsProps> = ({
	adults,
	region,
	isLuxury,
	distanceType,
	isPlusOne,
	preWeddingSpend,
	preWeddingAmount,
	isPhysicalGift,
	physicalGiftAmount,
	travelCostPerPerson,
	hotelNights,
	hotelNightCost,
	customPlateMin,
	customPlateMax,
	hasSerenata,
	updatePref,
}) => {
	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<label
					htmlFor="region"
					className="font-medium text-slate-500 text-xs uppercase tracking-wider"
				>
					Area Geografica
				</label>
				<select
					id="region"
					value={region}
					onChange={(e) => updatePref('region', e.target.value as RegionType)}
					className="w-full cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
				>
					<option value="north">Nord Italia (Costi più alti)</option>
					<option value="center">Centro Italia (Costi medi)</option>
					<option value="south">Sud Italia (Costi più contenuti)</option>
				</select>
			</div>
			<div className="space-y-2">
				<label
					htmlFor="customPlateMin"
					className="font-medium text-slate-500 text-xs uppercase tracking-wider"
				>
					Range Costo Ricevimento Stimato (€)
				</label>
				<div className="flex items-center gap-2">
					<div className="flex-1 space-y-1">
						<span className="font-bold text-[10px] text-slate-400 uppercase">
							Minimo
						</span>
						<select
							id="customPlateMin"
							value={customPlateMin}
							onChange={(e) => {
								const val = parseInt(e.target.value, 10)
								updatePref('customPlateMin', val)
								if (val > customPlateMax) {
									updatePref('customPlateMax', val)
								}
							}}
							className="w-full cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-2 py-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-500"
						>
							{[100, 120, 150, 180, 200, 250, 300, 350, 400, 450, 500].map(
								(v) => (
									<option key={v} value={v}>
										€{v}
									</option>
								),
							)}
						</select>
					</div>
					<span className="mt-4 text-slate-400">-</span>
					<div className="flex-1 space-y-1">
						<span className="font-bold text-[10px] text-slate-400 uppercase">
							Massimo
						</span>
						<select
							id="customPlateMax"
							value={customPlateMax}
							onChange={(e) => {
								const val = parseInt(e.target.value, 10)
								updatePref('customPlateMax', val)
								if (val < customPlateMin) {
									updatePref('customPlateMin', val)
								}
							}}
							className="w-full cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-2 py-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-500"
						>
							{[100, 120, 150, 180, 200, 250, 300, 350, 400, 450, 500].map(
								(v) => (
									<option key={v} value={v}>
										€{v}
									</option>
								),
							)}
						</select>
					</div>
				</div>
			</div>

			<div className="space-y-2">
				<label
					htmlFor="distanceType"
					className="font-medium text-[10px] text-slate-500 uppercase tracking-wider"
				>
					Trasferta e Distanza
				</label>
				<select
					id="distanceType"
					value={distanceType}
					onChange={(e) =>
						updatePref('distanceType', e.target.value as DistanceType)
					}
					className="w-full cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
				>
					<option value="none">Nessuna Trasferta</option>
					<option value="medium">
						Distanza Media (Dentro provincia/regione)
					</option>
					<option value="long">Distanza Lunga (Fuori regione/Estero)</option>
				</select>
			</div>

			{distanceType === 'long' && (
				<div className="fade-in zoom-in animate-in space-y-4 rounded-xl border border-blue-100 bg-blue-50 p-4 duration-200">
					<p className="font-semibold text-blue-600 text-xs uppercase">
						Dettagli Trasferta
					</p>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div className="space-y-1">
							<label
								htmlFor="travelCostPerPerson"
								className="font-bold text-[10px] text-blue-500 uppercase"
							>
								Viaggio a persona (€)
							</label>
							<input
								type="number"
								id="travelCostPerPerson"
								value={travelCostPerPerson || ''}
								onChange={(e) =>
									updatePref(
										'travelCostPerPerson',
										parseInt(e.target.value, 10) || 0,
									)
								}
								placeholder="0"
								className="w-full rounded border border-blue-200 bg-white px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-400"
							/>
							<small className="text-[10px] text-blue-500 italic">
								Comprensivo AND-RIT
							</small>
						</div>
						<div className="space-y-1">
							<label
								htmlFor="hotelNights"
								className="font-bold text-[10px] text-blue-500 uppercase"
							>
								Notti in Hotel
							</label>
							<input
								type="number"
								id="hotelNights"
								min="1"
								value={hotelNights || ''}
								onChange={(e) =>
									updatePref('hotelNights', parseInt(e.target.value, 10) || 1)
								}
								placeholder="1"
								className="w-full rounded border border-blue-200 bg-white px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-400"
							/>
							<small className="text-[10px] text-blue-500 italic">
								Quante notti rimarrai?
							</small>
						</div>
						<div className="space-y-1 sm:col-span-2">
							<label
								htmlFor="hotelNightCost"
								className="font-bold text-[10px] text-blue-500 uppercase"
							>
								Costo Hotel a notte (€)
							</label>
							<input
								type="number"
								id="hotelNightCost"
								value={hotelNightCost || ''}
								onChange={(e) =>
									updatePref(
										'hotelNightCost',
										parseInt(e.target.value, 10) || 0,
									)
								}
								placeholder="0"
								className="w-full rounded border border-blue-200 bg-white px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-400"
							/>
							<small className="text-[10px] text-blue-500 italic">
								Il costo che sosterrai a notte in Hotel
							</small>
						</div>
					</div>
				</div>
			)}

			<h3 className="font-medium text-slate-500 text-sm uppercase tracking-wider">
				Fattori Esterni
			</h3>

			<div className="grid grid-cols-1 gap-3">
				<label
					className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${isLuxury ? 'border-rose-200 bg-rose-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}
				>
					<input
						type="checkbox"
						checked={isLuxury}
						onChange={(e) => updatePref('isLuxury', e.target.checked)}
						className="mt-0.5 h-5 w-5 rounded border-slate-300 text-rose-500 accent-rose-500 focus:ring-rose-500"
					/>
					<div className="flex flex-col">
						<span className="font-medium text-sm">Location di Lusso</span>
						<span className="text-[10px] text-slate-500">
							Resort, ville storiche o cantine rinomate (+ quota)
						</span>
					</div>
				</label>

				<label
					className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${hasSerenata ? 'border-rose-200 bg-rose-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}
				>
					<input
						type="checkbox"
						checked={hasSerenata}
						onChange={(e) => updatePref('hasSerenata', e.target.checked)}
						className="mt-0.5 h-5 w-5 rounded border-slate-300 text-rose-500 accent-rose-500 focus:ring-rose-500"
					/>
					<div className="flex flex-col">
						<span className="font-medium text-sm">Partecipo alla Serenata</span>
						<span className="text-[10px] text-slate-500">
							Partecipo ai festeggiamenti pre-nozze (+5%)
						</span>
					</div>
				</label>

				{adults <= 2 && (
					<label
						className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${isPlusOne ? 'border-rose-200 bg-rose-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}
					>
						<input
							type="checkbox"
							checked={isPlusOne}
							onChange={(e) => updatePref('isPlusOne', e.target.checked)}
							className="mt-0.5 h-5 w-5 rounded border-slate-300 text-rose-500 accent-rose-500 focus:ring-rose-500"
						/>
						<div className="flex flex-col">
							<span className="font-medium text-sm">
								Sono un "Accompagnatore"
							</span>
							<span className="text-[10px] text-slate-500">
								Accompagno un invitato senza conoscere bene gli sposi
							</span>
						</div>
					</label>
				)}

				<label
					className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${preWeddingSpend ? 'border-rose-200 bg-rose-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}
				>
					<input
						type="checkbox"
						checked={preWeddingSpend}
						onChange={(e) => updatePref('preWeddingSpend', e.target.checked)}
						className="mt-0.5 h-5 w-5 rounded border-slate-300 text-rose-500 accent-rose-500 focus:ring-rose-500"
					/>
					<div className="flex flex-col">
						<span className="font-medium text-sm">
							Spese Addio Celibato/Nubilato
						</span>
						<span className="text-[10px] text-slate-500">
							Già speso per eventi pre-matrimoniali (- quota)
						</span>
					</div>
				</label>

				<label
					className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${isPhysicalGift ? 'border-rose-200 bg-rose-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}
				>
					<input
						type="checkbox"
						checked={isPhysicalGift}
						onChange={(e) => updatePref('isPhysicalGift', e.target.checked)}
						className="mt-0.5 h-5 w-5 rounded border-slate-300 text-rose-500 accent-rose-500 focus:ring-rose-500"
					/>
					<div className="flex flex-col">
						<span className="font-medium text-sm">
							Ho già fatto un regalo fisico
						</span>
						<span className="text-[10px] text-slate-500">
							Mobilio, elettrodomestici o lista nozze (- quota)
						</span>
					</div>
				</label>

				{isPhysicalGift && (
					<div className="fade-in zoom-in animate-in space-y-4 rounded-xl border border-rose-100 bg-rose-50 p-4 duration-200">
						<p className="font-semibold text-rose-600 text-xs uppercase">
							Dettaglio Regalo Fisico
						</p>
						<div className="space-y-2">
							<label
								htmlFor="physicalGiftAmount"
								className="font-bold text-[10px] text-rose-500 uppercase"
							>
								Valore del regalo fisico (€)
							</label>
							<input
								type="number"
								id="physicalGiftAmount"
								value={physicalGiftAmount || ''}
								onChange={(e) =>
									updatePref(
										'physicalGiftAmount',
										parseInt(e.target.value, 10) || 0,
									)
								}
								className="w-full rounded border border-rose-200 bg-white px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-rose-400"
								placeholder="Lascia vuoto per riduzione fissa del 20%"
							/>
							<p className="text-[10px] text-rose-400 leading-tight">
								* Se non inserisci una cifra, il sistema applicherà una
								riduzione forfettaria del 20% sulla busta finale.
							</p>
						</div>
					</div>
				)}
				{preWeddingSpend && (
					<div className="fade-in zoom-in animate-in space-y-4 rounded-xl border border-rose-100 bg-rose-50 p-4 duration-200">
						<p className="font-semibold text-rose-600 text-xs uppercase">
							Dettaglio Spese Pre-Matrimonio
						</p>
						<div className="space-y-1">
							<label
								htmlFor="preWeddingAmount"
								className="font-bold text-[10px] text-rose-500 uppercase"
							>
								Quanto hai speso (€)
							</label>
							<input
								type="number"
								id="preWeddingAmount"
								value={preWeddingAmount || ''}
								onChange={(e) =>
									updatePref(
										'preWeddingAmount',
										parseInt(e.target.value, 10) || 0,
									)
								}
								className="w-full rounded border border-rose-200 bg-white px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-rose-400"
								placeholder="0"
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
