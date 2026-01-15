import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type {IResumeService} from "./Resume.interface";

export class ResumeService implements IResumeService {

    public async generatePDF(elementId: string, filename: string = 'resume.pdf') {
        const element = document.getElementById(elementId);
        if (!element) return;

        // Salva o estilo original de transformação
        const originalTransform = element.style.transform;
        // Remove a transformação para capturar em tamanho real e sem distorções
        element.style.transform = 'none';

        try {
            const canvas = await html2canvas(element, {
                scale: 2, // Aumenta a resolução
                useCORS: true,
                logging: false,
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            // Se o conteúdo for maior que uma página A4, cria novas páginas
            const pageHeight = pdf.internal.pageSize.getHeight();
            let heightLeft = pdfHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(filename);
        } finally {
            // Restaura o estilo original
            element.style.transform = originalTransform;
        }
    }

    public async generateImage(elementId: string, format: 'png' | 'jpeg', filename: string = 'resume') {
        const element = document.getElementById(elementId);
        if (!element) return;

        const originalTransform = element.style.transform;
        element.style.transform = 'none';

        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true
            });
            
            const link = document.createElement('a');
            link.download = `${filename}.${format}`;
            link.href = canvas.toDataURL(`image/${format}`);
            link.click();
        } finally {
            element.style.transform = originalTransform;
        }
    }
}