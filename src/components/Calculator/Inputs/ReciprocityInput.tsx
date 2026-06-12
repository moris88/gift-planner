import type React from 'react'
import type {
	EventType,
	ReciprocityType,
	UserPreferences,
} from '../../../types'

interface ReciprocityInputProps {
	reciprocity: ReciprocityType
	eventType: EventType
	receivedAmount: number
	receivedGroupSize: number
	updatePref: <K extends keyof UserPreferences>(
		key: K,
		value: UserPreferences[K],
	) => void
}

export const ReciprocityInput: React.FC<ReciprocityInputProps> = ({
	reciprocity,
	eventType,
	receivedAmount,
	receivedGroupSize,
	updatePref,
}) => {
	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div className="space-y-2">
					<label
						htmlFor="reciprocity"
						className="font-medium text-slate-500 text-sm uppercase tracking-wider"
					>
						Reciprocità
					</label>
					<select
						id="reciprocity"
						value={reciprocity}
						onChange={(e) =>
							updatePref('reciprocity', e.target.value as ReciprocityType)
						}
						className="w-full cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
					>
						<option value="none">Nessun precedente</option>
						<option value="received_similar">
							Ho ricevuto un regalo simile
						</option>
						<option value="to_match">Devo ricambiare un regalo generoso</option>
					</select>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="eventType"
						className="font-medium text-slate-500 text-sm uppercase tracking-wider"
					>
						Tipo Ricevimento
					</label>
					<select
						id="eventType"
						value={eventType}
						onChange={(e) =>
							updatePref('eventType', e.target.value as EventType)
						}
						className="w-full cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
					>
						<option value="full">Giornata Intera</option>
						<option value="half_day">Mezza Giornata (Pomeridiano)</option>
						<option value="evening">Solo Serale / Torta</option>
					</select>
				</div>
			</div>

			{reciprocity === 'received_similar' && (
				<div className="fade-in slide-in-from-top-2 animate-in space-y-4 rounded-xl border border-amber-100 bg-amber-50 p-4 duration-200">
					<p className="font-semibold text-amber-600 text-xs uppercase italic">
						Il regalo che ricevesti
					</p>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div className="space-y-1">
							<label
								htmlFor="receivedAmount"
								className="font-bold text-[10px] text-amber-700 uppercase"
							>
								Cifra ricevuta (€)
							</label>
							<input
								type="number"
								id="receivedAmount"
								value={receivedAmount}
								onChange={(e) =>
									updatePref(
										'receivedAmount',
										parseInt(e.target.value, 10) || 0,
									)
								}
								className="w-full rounded border border-amber-200 bg-white px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-amber-400"
								placeholder="Es. 300"
							/>
						</div>
						<div className="space-y-1">
							<label
								htmlFor="receivedGroupSize"
								className="font-bold text-[10px] text-amber-700 uppercase"
							>
								Quante persone erano?
							</label>
							<input
								type="number"
								id="receivedGroupSize"
								min="1"
								value={receivedGroupSize}
								onChange={(e) =>
									updatePref(
										'receivedGroupSize',
										parseInt(e.target.value, 10) || 1,
									)
								}
								className="w-full rounded border border-amber-200 bg-white px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-amber-400"
							/>
						</div>
					</div>
					<p className="text-[10px] text-amber-600 leading-tight">
						* L'app calcolerà la quota "pro-capite" storica e la riproporrà
						aggiornata per il tuo nucleo familiare attuale.
					</p>
				</div>
			)}
		</div>
	)
}
