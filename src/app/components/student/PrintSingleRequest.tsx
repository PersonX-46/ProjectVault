'use client';

import { FaPrint } from "react-icons/fa";

export default function PrintSingleRequest({ request }: { request: any }) {
  const printSingleRequest = () => {
    const printContent = document.getElementById(`print-content-${request.id}`);
    const printWindow = window.open('', '', 'width=800,height=600');
    
    if (printWindow && printContent) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Borrow Request - ${request.project.title}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { color: #333; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              .status-approved { background-color: #d4edda; color: #155724; }
              .status-pending { background-color: #fff3cd; color: #856404; }
              .status-rejected { background-color: #f8d7da; color: #721c24; }
              .footer { margin-top: 30px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  };

  return (
    <button 
      onClick={printSingleRequest}
      className="text-blue-400 hover:text-blue-300 p-1 rounded-full hover:bg-blue-900/20 transition-colors"
      aria-label="Print this request"
    >
      <FaPrint />
    </button>
  );
}