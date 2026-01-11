import { ResumeService } from '../../../business/service/Resume.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Mock dependencies
jest.mock('jspdf');
jest.mock('html2canvas');

describe('ResumeService', () => {
    let resumeService: ResumeService;
    let mockElement: HTMLElement;

    beforeEach(() => {
        resumeService = new ResumeService();
        mockElement = document.createElement('div');
        mockElement.id = 'test-element';
        document.body.appendChild(mockElement);
        
        // Reset mocks
        (html2canvas as unknown as jest.Mock).mockReset();
        (jsPDF as unknown as jest.Mock).mockReset();
    });

    afterEach(() => {
        document.body.removeChild(mockElement);
    });

    it('generates PDF correctly', async () => {
        const mockCanvas = {
            height: 1000,
            width: 500,
            toDataURL: jest.fn().mockReturnValue('data:image/png;base64,test'),
        };
        (html2canvas as unknown as jest.Mock).mockResolvedValue(mockCanvas);

        const mockPdf = {
            internal: {
                pageSize: {
                    getWidth: jest.fn().mockReturnValue(210),
                },
            },
            addImage: jest.fn(),
            save: jest.fn(),
        };
        (jsPDF as unknown as jest.Mock).mockImplementation(() => mockPdf);

        await resumeService.generatePDF('test-element', 'test.pdf');

        expect(html2canvas).toHaveBeenCalledWith(mockElement);
        expect(mockPdf.addImage).toHaveBeenCalled();
        expect(mockPdf.save).toHaveBeenCalledWith('test.pdf');
    });

    it('generates image correctly', async () => {
        const mockCanvas = {
            toDataURL: jest.fn().mockReturnValue('data:image/png;base64,test'),
        };
        (html2canvas as unknown as jest.Mock).mockResolvedValue(mockCanvas);

        // Mock anchor element click
        const mockLink = {
            click: jest.fn(),
            download: '',
            href: '',
        };
        jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any);

        await resumeService.generateImage('test-element', 'png', 'test-image');

        expect(html2canvas).toHaveBeenCalledWith(mockElement);
        expect(mockLink.download).toBe('test-image.png');
        expect(mockLink.href).toBe('data:image/png;base64,test');
        expect(mockLink.click).toHaveBeenCalled();
    });

    it('handles missing element gracefully', async () => {
        await resumeService.generatePDF('non-existent-element');
        expect(html2canvas).not.toHaveBeenCalled();
    });
});
