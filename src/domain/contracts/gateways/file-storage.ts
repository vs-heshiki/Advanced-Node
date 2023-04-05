export interface UploadFile {
    update: (input: UploadFile.Input) => Promise<UploadFile.Output>
}

export namespace UploadFile {
    export type Input = { file: Buffer, key: string }
    export type Output = string
}
