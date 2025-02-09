const convertRomanToKhmer = (romanNumeral: string): string => {
    const romanToKhmerDigitMap: Record<string, string> = {
        "1": "១",
        "2": "២",
        "3": "៣",
        "4": "៤",
        "5": "៥",
        "6": "៦",
        "7": "៧",
        "8": "៨",
        "9": "៩",
        "0": "០",
    };

    return romanNumeral
        ?.split("")
        .map((digit) => romanToKhmerDigitMap[digit] || digit) // Handle non-digit cases safely
        .join("");
};

export default convertRomanToKhmer;
