import { useEffect, useMemo, useState } from 'react'
import { RELATION_DATA } from '../constants/relations'
import type {
	CalculationResult,
	CalculationStep,
	UserPreferences,
} from '../types'

const DEFAULT_PREFS: UserPreferences = {
	adults: 2,
	children: 0,
	infants: 0,
	relation: 'friend_close',
	eventType: 'full',
	region: 'center',
	seniority: 'historical',
	reciprocity: 'none',
	isLuxury: false,
	isLongDistance: false,
	isPlusOne: false,
	preWeddingSpend: false,
	preWeddingAmount: 20,
	travelCostPerPerson: 0,
	hotelNights: 0,
	hotelNightCost: 80,
	receivedAmount: 0,
	receivedGroupSize: 1,
	customPlateMin: 150,
	customPlateMax: 200,
}

const REGION_FACTORS = {
	north: { label: 'Nord Italia', multiplier: 1.15 },
	center: { label: 'Centro Italia', multiplier: 1.0 },
	south: { label: 'Sud Italia', multiplier: 0.9 },
}

export const useWeddingGift = () => {
	const [prefs, setPrefs] = useState<UserPreferences>(() => {
		const saved = localStorage.getItem('wedding_gift_prefs')
		if (saved) {
			try {
				const parsed = JSON.parse(saved)
				const merged = { ...DEFAULT_PREFS, ...parsed }

				if (!(merged.relation in RELATION_DATA)) {
					merged.relation = DEFAULT_PREFS.relation
				}

				return merged
			} catch (e) {
				console.error('Failed to parse saved preferences', e)
			}
		}
		return DEFAULT_PREFS
	})

	const [isCalculating, setIsCalculating] = useState(false)
	const [showResults, setShowResults] = useState(false)
	const [loadingMessage, setLoadingMessage] = useState('')

	const MESSAGES = [
		'Analizzando il legame di parentela... (speriamo siano simpatici)',
		'Controllando il prezzo del caviale al mercato nero...',
		'Calcolando quante bomboniere prenderai a polvere...',
		"Verificando se c'è l'open bar (questo cambia tutto!)",
		'Contando i confetti nel sacchetto...',
		"Consultando l'ufficio complicazioni affari semplici...",
		'Sbirciando nella busta del vicino di tavolo...',
		"Valutando l'impatto del DJ set anni '90...",
		'Misurando la distanza dal buffet di dolci...',
		"Interpellando l'oracolo dei testimoni di nozze...",
		'Studiando il galateo del 1950 (e ignorandolo)...',
		"Pesando l'oro della bomboniera d'argento...",
		"Calcolando l'inflazione sui regali di nozze dal 2000...",
		'Analizzando la probabilità di un ballo di gruppo imbarazzante...',
		"Cercando di capire se 'niente regali' è una trappola...",
		'Stimando il costo della torta a 7 piani...',
		'Verificando la qualità del vino della casa...',
		'Calcolando quante ore durerà il servizio fotografico...',
		'Verificando la presenza di parenti serpenti...',
		'Simulando il lancio del bouquet in slow motion...',
		"Valutando la resistenza del fegato all'open bar...",
		'Calcolando il ricarico sui fiori fuori stagione...',
		'Controllando se il testimone ha perso le fedi...',
		'Analizzando la scaletta musicale (evitiamo i lenti)...',
		"Misurando l'entusiasmo della zia per il centro tavola...",
		'Verificando che lo sposo non sia scappato...',
		"Contando quanti 'viva gli sposi' serviranno...",
		"Studiando il posizionamento strategico vicino all'uscita...",
		'Calcolando il coefficiente di commozione della cerimonia...',
		'Verificando la compatibilità degli invitati al tavolo 12...',
	]

	useEffect(() => {
		localStorage.setItem('wedding_gift_prefs', JSON.stringify(prefs))
	}, [prefs])

	const updatePref = <K extends keyof UserPreferences>(
		key: K,
		value: UserPreferences[K],
	) => {
		setPrefs((prev) => ({ ...prev, [key]: value }))
		// Hide results when prefs change so they can recalculate
		setShowResults(false)
	}

	const calculate = () => {
		setIsCalculating(true)
		setShowResults(false)

		const randomMessage = MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
		setLoadingMessage(randomMessage)

		// Simulate calculation time
		setTimeout(() => {
			setIsCalculating(false)
			setShowResults(true)
		}, 3500)
	}

	const result = useMemo<CalculationResult>(() => {
		const data = RELATION_DATA[prefs.relation] || RELATION_DATA.friend_standard
		const region = REGION_FACTORS[prefs.region]
		const breakdown: CalculationStep[] = []

		// Calculate event type multiplier
		const eventMultiplier =
			prefs.eventType === 'full'
				? 1.0
				: prefs.eventType === 'half_day'
					? 0.8
					: 0.6

		// 1. Base Calculation (Using custom plate costs as baseline)
		// We calculate the raw base first, then apply the relationship weight
		const relationWeight = data.adult[0] / 180 // Use friend_standard (150-180) as base weight 1.0

		let min =
			(prefs.adults * prefs.customPlateMin +
				prefs.children * (prefs.customPlateMin * 0.5)) *
			relationWeight *
			region.multiplier
		let max =
			(prefs.adults * prefs.customPlateMax +
				prefs.children * (prefs.customPlateMax * 0.5)) *
			relationWeight *
			region.multiplier

		breakdown.push({
			label: `Base per ${data.label} (${prefs.adults} Ad. + ${prefs.children} Bamb.)`,
			value: `€${Math.round(min)} - €${Math.round(max)}`,
		})

		breakdown.push({
			label: `Adeguamento Regionale (${region.label} x${region.multiplier})`,
			value: 'Incluso nella base',
		})

		// 2. Event Type
		if (prefs.eventType !== 'full') {
			min *= eventMultiplier
			max *= eventMultiplier
			const perc = Math.round((1 - eventMultiplier) * 100)
			breakdown.push({
				label: `Tipo Ricevimento (${prefs.eventType === 'half_day' ? 'Mezza G.' : 'Serale'} -${perc}%)`,
				value: `€${Math.round(min)} - €${Math.round(max)}`,
			})
		}

		const canApplySecondaryGuest = prefs.adults <= 2
		const isSecondaryGuestActive = canApplySecondaryGuest && prefs.isPlusOne

		// 3. Secondary Guest
		if (isSecondaryGuestActive) {
			const bareMinimum =
				(prefs.adults * prefs.customPlateMin +
					prefs.children * (prefs.customPlateMin * 0.5)) *
				region.multiplier *
				eventMultiplier

			if (min > bareMinimum) {
				min = bareMinimum
				max = bareMinimum
				breakdown.push({
					label:
						'Invitato Secondario (Ridotto al solo costo stimato del pasto)',
					value: `Ricalcolato: €${Math.round(min)} - €${Math.round(max)}`,
				})
			} else {
				const deduction = 30
				min -= deduction
				max -= deduction
				breakdown.push({
					label: 'Invitato Secondario (Ulteriore riduzione forfait)',
					value: `-€${deduction}`,
				})
			}
		}

		// 4. Reciprocity
		if (!isSecondaryGuestActive) {
			if (
				prefs.reciprocity === 'received_similar' &&
				prefs.receivedAmount > 0
			) {
				const baselinePerPerson =
					prefs.receivedAmount / (prefs.receivedGroupSize || 1)
				const reciprocityBaseline =
					baselinePerPerson * (prefs.adults + prefs.children * 0.5)

				min = reciprocityBaseline * 0.95
				max = reciprocityBaseline * 1.05
				breakdown.push({
					label: `Reciprocità (Basata su €${prefs.receivedAmount} ricevuti)`,
					value: `€${Math.round(min)} - €${Math.round(max)}`,
				})
			} else if (prefs.reciprocity === 'to_match') {
				min *= 1.5
				max *= 1.5
				breakdown.push({
					label: 'Reciprocità (Regalo Generoso +50%)',
					value: `€${Math.round(min)} - €${Math.round(max)}`,
				})
			}

			// 5. Seniority
			if (
				prefs.seniority === 'historical' &&
				(prefs.relation.includes('friend') ||
					prefs.relation === 'family_distant' ||
					prefs.relation === 'family_remote')
			) {
				const addedMin = prefs.adults * 25
				const addedMax = prefs.adults * 40
				min += addedMin
				max += addedMax
				breakdown.push({
					label: 'Anzianità / Legame Storico',
					value: `+€${addedMin} - €${addedMax}`,
				})
			}

			// 6. Luxury
			if (prefs.isLuxury) {
				const addedMin = prefs.adults * 30
				const addedMax = prefs.adults * 50
				min += addedMin
				max += addedMax
				breakdown.push({
					label: 'Location di Lusso',
					value: `+€${addedMin} - €${addedMax}`,
				})
			}
		}

		// 7. Travel Cost
		const totalTravelCost =
			(prefs.adults + prefs.children + prefs.infants) *
			prefs.travelCostPerPerson
		const totalHotelCost = prefs.hotelNights * prefs.hotelNightCost
		const totalExternalExpenses = prefs.isLongDistance
			? totalTravelCost + totalHotelCost
			: 0

		if (prefs.isLongDistance && totalExternalExpenses > 0) {
			const travelDeduction = totalExternalExpenses * 0.35
			const prevMin = min
			min -= travelDeduction
			max -= travelDeduction

			// Floor logic using custom plate costs
			const floor =
				(prefs.adults * prefs.customPlateMin + prefs.children * 50) *
				region.multiplier *
				eventMultiplier

			if (min < floor) {
				const actualDeduction = prevMin - floor
				min = floor
				max = Math.max(max, floor + 30)
				breakdown.push({
					label: 'Detrazione Trasferta (Limitata al costo pasto)',
					value: `-€${Math.round(actualDeduction)}`,
				})
			} else {
				breakdown.push({
					label: 'Detrazione Trasferta (35% spese)',
					value: `-€${Math.round(travelDeduction)}`,
				})
			}
		}

		// 8. Pre-Wedding
		if (prefs.preWeddingSpend) {
			const deduction = prefs.preWeddingAmount
			min -= deduction
			max -= deduction
			breakdown.push({
				label: `Spese Pre-Matrimoniali (Quota: €${deduction})`,
				value: `-€${deduction}`,
			})
		}

		// Helper to round up to nearest 50
		const roundUp50 = (num: number) => Math.ceil(num / 50) * 50

		const average = roundUp50((min + max) / 2)

		// Calculate Affective Margin for transparency
		// We use the custom plate costs and event type for the base calculation
		const baseReceptionMin =
			prefs.adults * prefs.customPlateMin * region.multiplier * eventMultiplier
		const affectiveMargin = Math.max(0, Math.round(min) - baseReceptionMin)

		if (affectiveMargin > 0) {
			breakdown.splice(1, 0, {
				label: `Margine Affettivo (Oltre €${Math.round(prefs.customPlateMin * region.multiplier * eventMultiplier)}/adulto)`,
				value: `+€${Math.round(affectiveMargin)}`,
			})
		}

		return {
			min: Math.max(0, Math.round(min)),
			max: Math.max(0, Math.round(max)),
			average: Math.max(0, average),
			externalExpenses: Math.round(totalExternalExpenses),
			effectiveRelation: data.label,
			breakdown,
		}
	}, [prefs])

	return {
		prefs,
		updatePref,
		result,
		isCalculating,
		showResults,
		loadingMessage,
		calculate,
	}
}
