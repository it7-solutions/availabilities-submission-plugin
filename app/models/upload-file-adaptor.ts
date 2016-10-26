export interface UploadAdaptor {
    // Component calls this method during initialization
    onInit: (o: UploadAdaptorOptions) => void
}
export interface UploadAdaptorOptions {
    // The adapter calls this method on the file has finished downloading
    onProgress?: (p: number) => void
    onUploaded: (f: UploadedResult) => void
    onError: (f: UploadedResult) => void
}
export interface UploadedResult {
    status: string
    msg: string
    file: string
}
