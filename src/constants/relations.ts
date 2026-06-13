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
		adult: [3.33, 4.44], // 500/150, 800/180
		child: [1.0, 1.0], // 150/150
	},
	family_parent: {
		group: 'Famiglia (1° Grado)',
		label: 'Genitore',
		adult: [4.0, 5.55], // 600/150, 1000/180
		child: [1.0, 1.0],
	},
	family_sibling: {
		group: 'Famiglia (2° Grado)',
		label: 'Fratello / Sorella',
		adult: [2.66, 3.88], // 400/150, 700/180
		child: [1.0, 1.0],
	},
	family_grandparent: {
		group: 'Famiglia (2° Grado)',
		label: 'Nonno / Nonna',
		adult: [2.0, 2.77], // 300/150, 500/180
		child: [1.0, 1.0],
	},
	family_uncle: {
		group: 'Famiglia (3° Grado)',
		label: 'Zio / Zia',
		adult: [1.66, 2.5], // 250/150, 450/180
		child: [0.66, 0.66], // 100/150
	},
	family_nephew: {
		group: 'Famiglia (3° Grado)',
		label: 'Nipote (di Zio/a)',
		adult: [1.66, 2.5],
		child: [0.66, 0.66],
	},
	family_cousin: {
		group: 'Famiglia (4° Grado)',
		label: 'Cugino / Cugina',
		adult: [1.33, 1.66], // 200/150, 300/180
		child: [0.53, 0.55], // 80/150, 100/180
	},
	family_other: {
		group: 'Famiglia',
		label: 'Altro Parente',
		adult: [1.0, 1.11], // 150/150, 200/180
		child: [0.33, 0.33], // 50/150
	},
	friend_best: {
		group: 'Amici',
		label: 'Migliore Amico/a',
		adult: [1.66, 1.94], // 250/150, 350/180
		child: [0.66, 0.66],
	},
	friend_close: {
		group: 'Amici',
		label: 'Amico Stretto / Gruppo Storico',
		adult: [1.2, 1.38], // 180/150, 250/180
		child: [0.53, 0.53],
	},
	friend_standard: {
		group: 'Amici',
		label: 'Amico / Conoscente',
		adult: [1.0, 1.0], // 150/150, 180/180
		child: [0.33, 0.33],
	},
	colleague: {
		group: 'Lavoro',
		label: 'Collega di Lavoro',
		adult: [0.86, 0.83], // 130/150, 150/180
		child: [0.33, 0.33],
	},
}
