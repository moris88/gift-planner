import { Heart, Sparkles } from 'lucide-react'
import type React from 'react'

interface LoadingAnimationProps {
	message: string
}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
	message,
}) => {
	return (
		<div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-rose-100 bg-white p-12 text-center shadow-xl">
			{/* Sfondo decorativo con sfumature morbide */}
			<div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-rose-50 opacity-50 blur-3xl" />
			<div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-rose-50 opacity-50 blur-3xl" />

			<div className="relative mb-8 flex h-32 w-32 items-center justify-center">
				{/* Fedi Nuziali animate */}
				<div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
					<div className="absolute top-0 left-1/2 h-10 w-10 -translate-x-1/2 rounded-full border-4 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]" />
				</div>
				<div className="absolute inset-0 animate-[spin_4s_linear_infinite_reverse] [animation-delay:-2s]">
					<div className="absolute bottom-0 left-1/2 h-10 w-10 -translate-x-1/2 rounded-full border-4 border-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.2)]" />
				</div>

				{/* Cuore centrale pulsante */}
				<div className="relative z-10 flex items-center justify-center">
					<Heart
						className="h-12 w-12 animate-[pulse_1.5s_ease-in-out_infinite] fill-rose-500 text-rose-500"
						strokeWidth={1.5}
					/>
					<div className="absolute h-12 w-12 animate-ping opacity-30">
						<Heart className="h-12 w-12 fill-rose-300 text-rose-300" />
					</div>
				</div>

				{/* Scintille sparse */}
				<Sparkles className="absolute top-2 right-2 h-5 w-5 animate-pulse text-amber-400" />
				<Sparkles className="absolute bottom-4 left-2 h-4 w-4 animate-bounce text-rose-300 delay-300" />
			</div>

			<div className="relative z-10 space-y-4">
				<div className="space-y-1">
					<h3 className="font-serif text-2xl text-slate-800 italic">
						Momento di magia...
					</h3>
					<div className="mx-auto h-1 w-12 rounded-full bg-rose-200" />
				</div>

				<p className="fade-in slide-in-from-bottom-4 mx-auto max-w-xs animate-in text-slate-500 italic duration-1000">
					"{message}"
				</p>
			</div>
		</div>
	)
}
