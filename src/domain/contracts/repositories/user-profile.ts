export interface UserProfile {
    savePhoto: (input: UserProfile.Input) => Promise<void>
}

export namespace UserProfile {
    export type Input = { photoUrl?: string }
}
