export type TUserRoleTYpe = keyof typeof USER__ROLE
export const USER__ROLE = {
    user:'user',
    admin:'admin',
    student:'student',
    faculty:'faculty'
} as const



