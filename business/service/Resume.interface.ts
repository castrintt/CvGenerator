export interface IResumeService {
    generatePDF(
        elementId: string,
        filename?: string,
    ): Promise<void>

    generateImage(
        elementId: string,
        format: "png" | "jpeg",
        filename?: string,
    ): Promise<void>
}