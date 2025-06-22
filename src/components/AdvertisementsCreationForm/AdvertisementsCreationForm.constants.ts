export interface Option {
  value: string
  labelKey: string
}

export const CATEGORY_OPTIONS: Option[] = [
  { value: 'military',    labelKey: 'categories.military'    },
  { value: 'medicine',    labelKey: 'categories.medicine'    },
  { value: 'pets',        labelKey: 'categories.pets'        },
  { value: 'clothes',     labelKey: 'categories.clothes'     },
  { value: 'technique',   labelKey: 'categories.technique'   },
  { value: 'food',        labelKey: 'categories.food'        },
  { value: 'auto',        labelKey: 'categories.auto'        },
  { value: 'other',       labelKey: 'categories.other'       },
]

export const PURPOSE_OPTIONS: Option[] = [
  { value: 'needs',     labelKey: 'purposes.needs'     },
  { value: 'proposals', labelKey: 'purposes.proposals' },
]
