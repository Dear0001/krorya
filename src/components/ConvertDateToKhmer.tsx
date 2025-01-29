export const formatDateToKhmer = (isoDateString: string | number | Date) => {
    if (!isoDateString) return 'N/A'; // Handle null or undefined inputs

    const date = new Date(isoDateString);
    if (isNaN(date.getTime())) return 'Invalid Date'; // Handle invalid date formats

    const day = date.getDate().toString().padStart(2, '0'); // Ensure two-digit format
    const year = date.getFullYear();

    // Convert month name to Khmer
    const khmerMonths = [
        "មករា", "កុម្ភៈ", "មិនា", "មេសា", "ឧសភា", "មិថុនា",
        "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"
    ];
    const khmerMonth = khmerMonths[date.getMonth()];

    return `${day}-${khmerMonth}-${year}`;
};
