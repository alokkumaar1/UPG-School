// src/utils/generateReceipt.js
// Generate admission receipt PDF using jsPDF

import { jsPDF } from 'jspdf';
import { SCHOOL, ADMISSION } from '../config/constants';
import { formatDate, formatCurrency, formatTimestamp } from './helpers';

/**
 * Generate and download admission receipt PDF
 * @param {Object} application - Application data from Firestore
 */
export function generateReceipt(application) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  const pageW = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = margin;

  // ── Header band ──────────────────────────────────────
  doc.setFillColor(0, 40, 130);
  doc.rect(0, 0, pageW, 38, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(SCHOOL.fullName, pageW / 2, 14, { align: 'center' });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(SCHOOL.location, pageW / 2, 21, { align: 'center' });
  doc.text(`Affiliation: ${SCHOOL.affiliation}`, pageW / 2, 27, { align: 'center' });

  // Receipt title
  doc.setFillColor(245, 158, 11);
  doc.rect(0, 38, pageW, 10, 'F');
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('ADMISSION RECEIPT / CONFIRMATION', pageW / 2, 45, { align: 'center' });

  y = 58;

  // ── Application info box ──────────────────────────────
  doc.setFillColor(240, 244, 255);
  doc.roundedRect(margin, y, pageW - 2 * margin, 28, 3, 3, 'F');
  doc.setDrawColor(0, 40, 130);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, y, pageW - 2 * margin, 28, 3, 3, 'S');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 40, 130);
  doc.text('Application ID:', margin + 5, y + 9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text(application.applicationId || '-', margin + 42, y + 9);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 40, 130);
  doc.text('Session:', margin + 100, y + 9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text(ADMISSION.sessionYear, margin + 120, y + 9);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 40, 130);
  doc.text('Date:', margin + 5, y + 19);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text(formatTimestamp(application.createdAt), margin + 20, y + 19);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(9, 150, 105);
  doc.text('Payment Status:', margin + 100, y + 19);
  doc.setTextColor(9, 150, 105);
  doc.setFont('helvetica', 'bold');
  doc.text(application.paymentStatus || 'PAID', margin + 133, y + 19);

  y += 36;

  // ── Helper to draw a section ─────────────────────────
  const drawSection = (title, rows) => {
    // Section header
    doc.setFillColor(0, 40, 130);
    doc.rect(margin, y, pageW - 2 * margin, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(title.toUpperCase(), margin + 4, y + 5.5);
    y += 8;

    rows.forEach(([label, value], i) => {
      doc.setFillColor(i % 2 === 0 ? 249 : 255, i % 2 === 0 ? 250 : 255, i % 2 === 0 ? 255 : 255);
      doc.rect(margin, y, pageW - 2 * margin, 8, 'F');

      doc.setTextColor(80, 80, 80);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(label + ':', margin + 4, y + 5.5);

      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.text(String(value || '-'), margin + 65, y + 5.5);
      y += 8;
    });
    y += 4;
  };

  // Student Details
  drawSection('Student Details', [
    ['Student Name', application.studentName],
    ['Date of Birth', formatDate(application.dob)],
    ['Gender', application.gender],
    ['Class Applied For', `Class ${application.class}`],
  ]);

  // Parent Details
  drawSection('Parent / Guardian Details', [
    ["Father's Name", application.fatherName],
    ["Mother's Name", application.motherName],
    ['Mobile Number', application.mobile],
    ['Address', application.address],
  ]);

  // Payment Details
  drawSection('Payment Details', [
    ['Admission Fee', formatCurrency(ADMISSION.fee)],
    ['Payment ID', application.paymentId || 'N/A'],
    ['Payment Status', application.paymentStatus || 'PAID'],
  ]);

  y += 4;

  // ── Important notice ─────────────────────────────────
  doc.setFillColor(255, 251, 235);
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(margin, y, pageW - 2 * margin, 22, 2, 2, 'FD');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(146, 64, 14);
  doc.text('IMPORTANT INSTRUCTIONS:', margin + 4, y + 7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 60, 0);
  doc.text('1. Please bring this receipt along with original documents on the day of admission.', margin + 4, y + 13);
  doc.text('2. Admission is subject to verification of documents and seat availability.', margin + 4, y + 19);

  y += 30;

  // ── Signature line ────────────────────────────────────
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.3);
  doc.line(pageW - margin - 55, y, pageW - margin, y);
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  doc.setFont('helvetica', 'normal');
  doc.text('Principal / Authorized Signatory', pageW - margin - 55, y + 5);
  doc.text(SCHOOL.fullName, pageW - margin - 45, y + 10);

  // ── Footer ────────────────────────────────────────────
  doc.setFillColor(0, 40, 130);
  doc.rect(0, 287, pageW, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.text(`This is a computer-generated receipt. ${SCHOOL.address}`, pageW / 2, 293, { align: 'center' });

  // Download
  doc.save(`Admission_Receipt_${application.applicationId}.pdf`);
}
