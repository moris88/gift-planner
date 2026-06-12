import { Calculator } from 'lucide-react'
import type React from 'react'
import type { UserPreferences } from '../../types'
import { AdditionalDetails } from './Inputs/AdditionalDetails'
import { FamilyInput } from './Inputs/FamilyInput'
import { ReciprocityInput } from './Inputs/ReciprocityInput'
import { RelationInput } from './Inputs/RelationInput'

interface CalculatorFormProps {
	prefs: UserPreferences
	updatePref: <K extends keyof UserPreferences>(
		key: K,
		value: UserPreferences[K],
	) => void
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
	prefs,
	updatePref,
}) => {
	return (
		<div className="space-y-6">
			<section className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
				<div className="flex items-center gap-2 border-slate-100 border-b pb-4">
					<Calculator className="h-5 w-5 text-rose-500" />
					<h2 className="font-semibold text-lg">Parametri di Calcolo</h2>
				</div>

				<div className="space-y-6">
					<FamilyInput
						adults={prefs.adults}
						infants={prefs.infants}
						updatePref={updatePref}
					>
						{prefs.children}
					</FamilyInput>

					<RelationInput relation={prefs.relation} updatePref={updatePref} />

					<ReciprocityInput
						reciprocity={prefs.reciprocity}
						eventType={prefs.eventType}
						receivedAmount={prefs.receivedAmount}
						receivedGroupSize={prefs.receivedGroupSize}
						updatePref={updatePref}
					/>

					<AdditionalDetails
						adults={prefs.adults}
						region={prefs.region}
						isLuxury={prefs.isLuxury}
						isLongDistance={prefs.isLongDistance}
						isPlusOne={prefs.isPlusOne}
						preWeddingSpend={prefs.preWeddingSpend}
						preWeddingAmount={prefs.preWeddingAmount}
						travelCostPerPerson={prefs.travelCostPerPerson}
						hotelNights={prefs.hotelNights}
						hotelNightCost={prefs.hotelNightCost}
						customPlateMin={prefs.customPlateMin}
						customPlateMax={prefs.customPlateMax}
						updatePref={updatePref}
					/>
				</div>
			</section>
		</div>
	)
}
