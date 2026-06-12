import type React from 'react'
import { useMemo } from 'react'
import { RELATION_DATA } from '../../../constants/relations'
import type { RelationType, UserPreferences } from '../../../types'

interface RelationInputProps {
	relation: RelationType
	updatePref: <K extends keyof UserPreferences>(
		key: K,
		value: UserPreferences[K],
	) => void
}

export const RelationInput: React.FC<RelationInputProps> = ({
	relation,
	updatePref,
}) => {
	const groupedRelations = useMemo(() => {
		const groups: Record<string, { key: RelationType; label: string }[]> = {}
		Object.entries(RELATION_DATA).forEach(([key, data]) => {
			if (!groups[data.group]) groups[data.group] = []
			groups[data.group].push({ key: key as RelationType, label: data.label })
		})
		return groups
	}, [])

	return (
		<div className="space-y-2">
			<label
				htmlFor="relation"
				className="font-medium text-slate-500 text-sm uppercase tracking-wider"
			>
				Parentela con gli Sposi?
			</label>
			<select
				id="relation"
				value={relation}
				onChange={(e) => updatePref('relation', e.target.value as RelationType)}
				className="w-full cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
			>
				{Object.entries(groupedRelations).map(([group, options]) => (
					<optgroup key={group} label={group}>
						{options.map((opt) => (
							<option key={opt.key} value={opt.key}>
								{opt.label}
							</option>
						))}
					</optgroup>
				))}
			</select>
		</div>
	)
}
