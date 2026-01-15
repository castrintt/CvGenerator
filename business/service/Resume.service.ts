import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type {IResumeService} from "./Resume.interface";

export class ResumeService implements IResumeService {

    private addPageBreaks(element: HTMLElement) {
        const PAGE_HEIGHT_PX = 1122.5;
        const MARGIN_BUFFER_PX = 50;

        const elements = Array.from(element.querySelectorAll('section, article, div > div, p, h1, h2, h3, h4, li'));

        const relevantElements = elements.filter(el => {
            const rect = el.getBoundingClientRect();
            return rect.height > 20 && rect.height < 800;
        });

        relevantElements.sort((a, b) => {
            const rectA = a.getBoundingClientRect();
            const rectB = b.getBoundingClientRect();
            return rectA.top - rectB.top;
        });

        for (const el of relevantElements) {
            const rect = el.getBoundingClientRect();
            const elementTop = rect.top;
            const elementBottom = elementTop + rect.height;

            const startPage = Math.floor(elementTop / PAGE_HEIGHT_PX);
            const endPage = Math.floor(elementBottom / PAGE_HEIGHT_PX);

            if (startPage !== endPage) {
                const pageTop = endPage * PAGE_HEIGHT_PX;
                if (Math.abs(elementTop - pageTop) < 50) continue;

                const pushDistance = (endPage * PAGE_HEIGHT_PX) - elementTop + MARGIN_BUFFER_PX;
                
                if (pushDistance > 0 && pushDistance < PAGE_HEIGHT_PX) {
                    (el as HTMLElement).style.marginTop = `${pushDistance}px`;
                }
            }
        }
    }

    private async captureCanvas(elementId: string): Promise<HTMLCanvasElement | null> {
        const originalElement = document.getElementById(elementId);
        if (!originalElement) return null;

        const clone = originalElement.cloneNode(true) as HTMLElement;

        clone.style.position = 'absolute';
        clone.style.left = '0';
        clone.style.top = '0';
        clone.style.transform = 'none';
        clone.style.width = '210mm';
        clone.style.minHeight = '297mm';
        clone.style.height = 'auto';
        clone.style.margin = '0';
        clone.style.padding = '0';
        clone.style.overflow = 'visible';
        clone.style.boxShadow = 'none';

        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '0';
        container.style.width = '210mm';
        container.appendChild(clone);
        document.body.appendChild(container);

        await new Promise(resolve => setTimeout(resolve, 100));
        
        this.addPageBreaks(clone);

        try {
            const canvas = await html2canvas(clone, {
                scale: 1.5,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });
            return canvas;
        } catch (error) {
            console.error("Erro ao gerar canvas:", error);
            return null;
        } finally {
            document.body.removeChild(container);
        }
    }

    public async generatePDF(elementId: string, filename: string = 'resume.pdf') {
        try {
            const canvas = await this.captureCanvas(elementId);
            if (!canvas) return;

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            
            const ratio = canvasWidth / pdfWidth;
            const imgHeight = canvasHeight / ratio;

            let heightLeft = imgHeight;
            let position = 0;
            let pageCount = 0;
            const MAX_PAGES = 10;

            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;

            while (heightLeft > 5 && pageCount < MAX_PAGES) {
                position -= pdfHeight;
                pageCount++;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                heightLeft -= pdfHeight;
            }

            pdf.save(filename);
        } catch (error) {
            console.error("Erro ao gerar PDF:", error);
            alert("Ocorreu um erro ao gerar o PDF. Tente reduzir o conteúdo ou usar outro navegador.");
        }
    }

    public async generateImage(elementId: string, format: 'png' | 'jpeg', filename: string = 'resume') {
        const canvas = await this.captureCanvas(elementId);
        if (!canvas) return;
        
        const link = document.createElement('a');
        link.download = `${filename}.${format}`;
        link.href = canvas.toDataURL(`image/${format}`, 1.0);
        link.click();
    }
}