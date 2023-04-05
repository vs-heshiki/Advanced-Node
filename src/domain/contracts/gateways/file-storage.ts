export interface UploadFile {
    update: (input: UploadFile.Input) => Promise<void>
}

export namespace UploadFile {
    export type Input = { file: Buffer, key: string }
}
