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
	hotelNights: 1,
	hotelNightCost: 80,
	receivedAmount: 0,
	receivedGroupSize: 1,
	customPlateMin: 150,
	customPlateMax: 200,
	ral: 30000,
	hasInvestments: false,
	hasSerenata: false,
	generosity: 'normal',
	isPhysicalGift: false,
	physicalGiftAmount: 0,
}

const REGION_FACTORS = {
	north: { label: 'Nord Italia', multiplier: 1.15 },
	center: { label: 'Centro Italia', multiplier: 1.0 },
	south: { label: 'Sud Italia', multiplier: 0.9 },
}

const GENEROSITY_FACTORS = {
	normal: { label: 'Normale', multiplier: 1.0 },
	medium: { label: 'Media', multiplier: 1.2 },
	high: { label: 'Alta', multiplier: 1.4 },
	super: { label: 'Super generoso', multiplier: 1.8 },
}

const getRALMultiplier = (ral: number) => {
	if (ral < 20000) return 0.8
	if (ral < 35000) return 1.0
	if (ral < 55000) return 1.2
	if (ral < 80000) return 1.4
	return 1.6
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

		// 1. Base Calculation (Using relationship multipliers on reception costs)
		let min =
			(prefs.adults * prefs.customPlateMin * data.adult[0] +
				prefs.children * prefs.customPlateMin * data.child[0]) *
			region.multiplier
		let max =
			(prefs.adults * prefs.customPlateMax * data.adult[1] +
				prefs.children * prefs.customPlateMax * data.child[1]) *
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
				const reductionMultiplier = 0.8 // 20% reduction
				min *= reductionMultiplier
				max *= reductionMultiplier
				breakdown.push({
					label: 'Invitato Secondario (Ulteriore riduzione forfait -20%)',
					value: `€${Math.round(min)} - €${Math.round(max)}`,
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
					prefs.relation === 'family_cousin' ||
					prefs.relation === 'family_other')
			) {
				const multMin = 1.15 // +15%
				const multMax = 1.25 // +25%
				min *= multMin
				max *= multMax
				breakdown.push({
					label: 'Anzianità / Legame Storico (+15-25%)',
					value: `€${Math.round(min)} - €${Math.round(max)}`,
				})
			}

			// 6. Luxury
			if (prefs.isLuxury) {
				const luxuryMult = 1.2 // +20%
				min *= luxuryMult
				max *= luxuryMult
				breakdown.push({
					label: 'Location di Lusso (+20%)',
					value: `€${Math.round(min)} - €${Math.round(max)}`,
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
			min -= travelDeduction
			max -= travelDeduction

			// Floor logic using custom plate costs
			const floor =
				(prefs.adults * prefs.customPlateMin +
					prefs.children * (prefs.customPlateMin * 0.4)) *
				region.multiplier *
				eventMultiplier

			if (min < floor) {
				min = floor
				max = Math.max(max, floor * 1.1)
				breakdown.push({
					label: 'Detrazione Trasferta (Limitata per coprire costo pasto)',
					value: `€${Math.round(min)} - €${Math.round(max)}`,
				})
			} else {
				breakdown.push({
					label: 'Detrazione Trasferta (35% spese vive)',
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

		// 9. RAL / Economic Context
		const ralMultiplier = getRALMultiplier(prefs.ral)
		if (ralMultiplier !== 1.0) {
			min *= ralMultiplier
			max *= ralMultiplier
			const diff = Math.round((ralMultiplier - 1) * 100)
			breakdown.push({
				label: `Capacità di spesa (RAL €${prefs.ral.toLocaleString()})`,
				value: `${diff > 0 ? '+' : ''}${diff}%`,
			})
		}

		// 10. Investments
		if (prefs.hasInvestments) {
			min *= 0.9
			max *= 0.9
			breakdown.push({
				label: 'Fondo Investimenti Attivo',
				value: '-10%',
			})
		}

		// 10b. Serenata
		if (prefs.hasSerenata) {
			min *= 1.05
			max *= 1.05
			breakdown.push({
				label: 'Partecipazione Serenata',
				value: '+5%',
			})
		}

		// 11. Generosity
		const generosity = GENEROSITY_FACTORS[prefs.generosity]
		if (generosity.multiplier !== 1.0) {
			min *= generosity.multiplier
			max *= generosity.multiplier
			const diff = Math.round((generosity.multiplier - 1) * 100)
			breakdown.push({
				label: `Livello Generosità (${generosity.label})`,
				value: `+${diff}%`,
			})
		}

		// 12. Physical Gift
		if (prefs.isPhysicalGift) {
			if (prefs.physicalGiftAmount > 0) {
				const deduction = prefs.physicalGiftAmount
				min -= deduction
				max -= deduction
				breakdown.push({
					label: `Regalo Fisico Già Consegnato (Valore: €${deduction})`,
					value: `-€${deduction}`,
				})
			} else {
				min *= 0.8
				max *= 0.8
				breakdown.push({
					label: 'Regalo Fisico Già Consegnato (Valore non indicato)',
					value: '-20%',
				})
			}
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
