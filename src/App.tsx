import type React from 'react'
import { CalculationInfo } from './components/Calculator/CalculationInfo'
import { CalculatorForm } from './components/Calculator/CalculatorForm'
import { GiftResults } from './components/Calculator/GiftResults'
import { Footer } from './components/Layout/Footer'
import { Header } from './components/Layout/Header'
import { useWeddingGift } from './hooks/useWeddingGift'

const App: React.FC = () => {
	const { prefs, updatePref, result } = useWeddingGift()

	return (
		<div className="min-h-screen bg-slate-50 pb-12 font-sans text-slate-900">
			<Header />

			<main className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-4 md:grid-cols-2">
				<CalculatorForm prefs={prefs} updatePref={updatePref} />

				<div className="space-y-8">
					<GiftResults result={result} />

					<CalculationInfo
						eventType={prefs.eventType}
						isLongDistance={prefs.isLongDistance}
						externalExpenses={result.externalExpenses}
						preWeddingSpend={prefs.preWeddingSpend}
						breakdown={result.breakdown}
						customPlateMin={prefs.customPlateMin}
						customPlateMax={prefs.customPlateMax}
					/>
				</div>
			</main>

			<Footer />
		</div>
	)
}

export default App
