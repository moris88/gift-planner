export type RelationType =
	| 'witness'
	| 'family_parent'
	| 'family_grandparent'
	| 'family_sibling'
	| 'family_uncle'
	| 'family_nephew'
	| 'family_cousin'
	| 'family_other'
	| 'friend_best'
	| 'friend_close'
	| 'friend_standard'
	| 'colleague'

export type EventType = 'full' | 'half_day' | 'evening'
export type SeniorityType = 'recent' | 'historical'
export type ReciprocityType = 'none' | 'received_similar' | 'to_match'
export type RegionType = 'north' | 'center' | 'south'
export type GenerosityType = 'normal' | 'medium' | 'high' | 'super'

export interface UserPreferences {
	adults: number
	children: number
	infants: number
	relation: RelationType
	eventType: EventType
	region: RegionType
	seniority: SeniorityType
	reciprocity: ReciprocityType
	isLuxury: boolean
	isLongDistance: boolean
	isPlusOne: boolean
	preWeddingSpend: boolean
	preWeddingAmount: number
	travelCostPerPerson: number
	hotelNights: number
	hotelNightCost: number
	receivedAmount: number
	receivedGroupSize: number
	customPlateMin: number
	customPlateMax: number
	ral: number
	hasInvestments: boolean
	generosity: GenerosityType
	isPhysicalGift: boolean
	physicalGiftAmount: number
}

export interface CalculationStep {
	label: string
	value: string
}

export interface CalculationResult {
	min: number
	max: number
	average: number
	externalExpenses: number
	effectiveRelation: string
	breakdown: CalculationStep[]
}
