import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type {IResumeService} from "./Resume.interface";

export class ResumeService implements IResumeService {

    public async generatePDF(elementId: string, filename: string = 'resume.pdf') {
        const element = document.getElementById(elementId);
        if (!element) return;

        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(filename);
    }

    public async generateImage(elementId: string, format: 'png' | 'jpeg', filename: string = 'resume') {
        const element = document.getElementById(elementId);
        if (!element) return;

        const canvas = await html2canvas(element);
        const link = document.createElement('a');
        link.download = `${filename}.${format}`;
        link.href = canvas.toDataURL(`image/${format}`);
        link.click();
    }
}

