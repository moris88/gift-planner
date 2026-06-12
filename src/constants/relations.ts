import type { RelationType } from '../types'

export const RELATION_DATA: Record<
	RelationType,
	{
		label: string
		group: string
		adult: [number, number]
		child: [number, number]
	}
> = {
	witness: {
		group: 'Ruoli Speciali',
		label: 'Testimone di Nozze',
		adult: [500, 700],
		child: [150, 150],
	},
	family_parent: {
		group: 'Famiglia',
		label: 'Genitore',
		adult: [600, 1000],
		child: [150, 150],
	},
	family_sibling: {
		group: 'Famiglia',
		label: 'Fratello / Sorella',
		adult: [400, 600],
		child: [150, 150],
	},
	family_close: {
		group: 'Famiglia',
		label: 'Parente Stretto',
		adult: [250, 400],
		child: [100, 100],
	},
	family_distant: {
		group: 'Famiglia',
		label: 'Cugino / Zio',
		adult: [180, 250],
		child: [80, 100],
	},
	family_remote: {
		group: 'Famiglia',
		label: 'Parente Lontano',
		adult: [150, 180],
		child: [50, 50],
	},
	friend_best: {
		group: 'Amici',
		label: 'Migliore Amico/a',
		adult: [250, 350],
		child: [100, 120],
	},
	friend_close: {
		group: 'Amici',
		label: 'Amico Stretto / Gruppo Storico',
		adult: [180, 220],
		child: [80, 80],
	},
	friend_standard: {
		group: 'Amici',
		label: 'Amico / Conoscente',
		adult: [150, 180],
		child: [50, 50],
	},
	colleague: {
		group: 'Lavoro',
		label: 'Collega di Lavoro',
		adult: [130, 150],
		child: [50, 50],
	},
}
