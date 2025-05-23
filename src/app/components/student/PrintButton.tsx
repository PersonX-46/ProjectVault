'use client';

import { FaPrint } from "react-icons/fa";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex items-center gap-2"
    >
      <FaPrint /> Print Requests
    </button>
  );
}