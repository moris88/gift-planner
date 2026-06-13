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
		adult: [500, 800],
		child: [150, 150],
	},
	family_parent: {
		group: 'Famiglia (1° Grado)',
		label: 'Genitore',
		adult: [600, 1000],
		child: [150, 150],
	},
	family_sibling: {
		group: 'Famiglia (2° Grado)',
		label: 'Fratello / Sorella',
		adult: [400, 700],
		child: [150, 150],
	},
	family_grandparent: {
		group: 'Famiglia (2° Grado)',
		label: 'Nonno / Nonna',
		adult: [300, 500],
		child: [150, 150],
	},
	family_uncle: {
		group: 'Famiglia (3° Grado)',
		label: 'Zio / Zia',
		adult: [250, 450],
		child: [100, 100],
	},
	family_nephew: {
		group: 'Famiglia (3° Grado)',
		label: 'Nipote (di Zio/a)',
		adult: [250, 450],
		child: [100, 100],
	},
	family_cousin: {
		group: 'Famiglia (4° Grado)',
		label: 'Cugino / Cugina',
		adult: [200, 300],
		child: [80, 100],
	},
	family_other: {
		group: 'Famiglia',
		label: 'Altro Parente',
		adult: [150, 200],
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
		adult: [180, 250],
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
