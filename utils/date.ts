/**
 * Converts a Date object to string in dd-mm-yyyy format
 */
export const dateToDDMMYYYY = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid Date object');
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

/**
 * Converts a string in dd-mm-yyyy format to Date object
 */
export const ddMMYYYYToDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('-').map(Number);

  if (!day || !month || !year) {
    throw new Error('Invalid date string format. Expected dd-mm-yyyy');
  }

  const date = new Date(year, month - 1, day);

  // Validate constructed date
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    throw new Error('Invalid date values');
  }

  return date;
};
