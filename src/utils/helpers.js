// src/utils/helpers.js
// Helper utility functions

/**
 * Generate a unique application number
 * Format: UPG-YYYY-XXXXXX (e.g., UPG-2024-001234)
 */
export function generateApplicationId() {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `UPG-${year}-${random}`;
}

/**
 * Format date to DD/MM/YYYY
 */
export function formatDate(dateStr) {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Format timestamp to readable date+time
 */
export function formatTimestamp(ts) {
  if (!ts) return '-';
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format currency to Indian Rupees
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Validate Indian mobile number (10 digits, starts with 6-9)
 */
export function isValidMobile(mobile) {
  return /^[6-9]\d{9}$/.test(mobile);
}

/**
 * Validate that file is an image
 */
export function isImageFile(file) {
  return file && file.type.startsWith('image/');
}

/**
 * Validate that file is PDF or image
 */
export function isPdfOrImage(file) {
  return file && (file.type === 'application/pdf' || file.type.startsWith('image/'));
}

/**
 * Convert file size bytes to human readable
 */
export function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

/**
 * Truncate text with ellipsis
 */
export function truncate(str, maxLen = 40) {
  return str && str.length > maxLen ? str.slice(0, maxLen) + '…' : str;
}
