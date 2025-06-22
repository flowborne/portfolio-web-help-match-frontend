

export interface SecurityQuestion {
  value: string
  labelKey: string
}

export const SECURITY_QUESTIONS: SecurityQuestion[] = [
  { value: 'firstPet',         labelKey: 'securityQuestions.firstPet'         },
  { value: 'firstCar',         labelKey: 'securityQuestions.firstCar'         },
  { value: 'birthCity',        labelKey: 'securityQuestions.birthCity'        },
  { value: 'motherMaidenName', labelKey: 'securityQuestions.motherMaidenName' },
  { value: 'elementarySchool', labelKey: 'securityQuestions.elementarySchool' },
  { value: 'childhoodNickname',labelKey: 'securityQuestions.childhoodNickname'},
  { value: 'streetGrewUp',     labelKey: 'securityQuestions.streetGrewUp'     },
  { value: 'bestFriendHS',     labelKey: 'securityQuestions.bestFriendHS'     },
  { value: 'favoriteBookMovie',labelKey: 'securityQuestions.favoriteBookMovie'},
  { value: 'firstEmployer',    labelKey: 'securityQuestions.firstEmployer'    },
] as const
