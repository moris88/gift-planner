import type React from 'react'
import { useEffect, useRef } from 'react'
import { CalculationInfo } from './components/Calculator/CalculationInfo'
import { CalculatorForm } from './components/Calculator/CalculatorForm'
import { GiftResults } from './components/Calculator/GiftResults'
import { LoadingAnimation } from './components/Calculator/LoadingAnimation'
import { Footer } from './components/Layout/Footer'
import { Header } from './components/Layout/Header'
import { useWeddingGift } from './hooks/useWeddingGift'

const App: React.FC = () => {
	const {
		prefs,
		updatePref,
		result,
		isCalculating,
		showResults,
		loadingMessage,
		calculate,
	} = useWeddingGift()

	const resultsRef = useRef<HTMLDivElement>(null)

	const WEDDING_QUOTES = [
		"Il matrimonio è l'unione di due anime che decidono di camminare insieme verso lo stesso tramonto.",
		'Possiate amarvi ogni giorno come il primo, ma scoprirvi nuovi ogni giorno di più.',
		"L'amore non consiste nel guardarsi l'un l'altro, ma nel guardare insieme nella stessa direzione.",
		'Che la gioia di questo giorno vi accompagni per tutta la vita, illuminando ogni vostro passo.',
		'Il segreto di un matrimonio felice è innamorarsi molte volte, sempre della stessa persona.',
		"Due cuori che battono all'unisono sono la più bella melodia che la vita possa offrire.",
		'Che il vostro viaggio insieme sia costellato di sorrisi, complicità e un amore senza confini.',
		"Il matrimonio non è un traguardo, ma l'inizio di una meravigliosa avventura da scrivere insieme.",
		"L'amore vero è quando la felicità dell'altro diventa la tua priorità assoluta.",
		'Possa la vostra casa essere sempre colma di risate e il vostro cuore sempre colmo di pace.',
		"Siete la dimostrazione che l'anima gemella esiste davvero. Buona vita insieme!",
		"Che la magia di questo 'Sì' risuoni per sempre nel vostro quotidiano.",
		"In un mondo che corre, l'amore è l'unico porto sicuro dove fermarsi e restare.",
		"Costruite la vostra felicità mattone dopo mattone, con la pazienza e la dolcezza dell'amore.",
		'Il matrimonio è un mosaico che si costruisce giorno dopo giorno, fatto di piccoli gesti infiniti.',
	]

	const randomQuote = useRef(
		WEDDING_QUOTES[Math.floor(Math.random() * WEDDING_QUOTES.length)],
	).current

	// Scroll to results when starting calculation
	useEffect(() => {
		if (isCalculating && resultsRef.current) {
			resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}, [isCalculating])

	return (
		<div className="min-h-screen bg-slate-50 pb-12 font-sans text-slate-900">
			<Header />

			<main className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-4 md:grid-cols-2">
				<CalculatorForm
					prefs={prefs}
					updatePref={updatePref}
					onCalculate={calculate}
					isCalculating={isCalculating}
				/>

				<div className="space-y-8" ref={resultsRef}>
					{isCalculating && <LoadingAnimation message={loadingMessage} />}

					{showResults && !isCalculating && (
						<div className="fade-in slide-in-from-right-4 animate-in space-y-8 duration-500">
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
					)}

					{!showResults && !isCalculating && (
						<div className="flex h-full min-h-100 flex-col items-center justify-center rounded-2xl border-2 border-slate-200 border-dashed bg-white/50 p-8 text-center text-slate-400">
							<div className="mb-4 rounded-full bg-slate-100 p-4">
								<svg
									className="h-8 w-8 text-slate-300"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<title>Icona calcolatrice</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
									/>
								</svg>
							</div>
							<p className="max-w-50 font-medium text-sm">
								Compila il modulo e clicca su "Calcola" per vedere il budget
								consigliato
							</p>
						</div>
					)}
				</div>
			</main>

			<section className="mx-auto mt-12 max-w-2xl px-4 text-center">
				<div className="mb-2 flex justify-center text-rose-300">
					<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
						<title>Icona cuore</title>
						<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
					</svg>
				</div>
				<p className="font-serif text-lg text-slate-500 italic leading-relaxed">
					"{randomQuote}"
				</p>
			</section>

			<Footer />
		</div>
	)
}

export default App
