function generatePassword() {
    const length = document.getElementById('length').value;
    const useUppercase = document.getElementById('uppercase').checked;
    const useLowercase = document.getElementById('lowercase').checked;
    const useDigits = document.getElementById('digits').checked;
    const useSymbols = document.getElementById('symbols').checked;

    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";
    const symbols = "!@#$%^&*()-_=+[]{}|;:',.<>?/";

    let allChars = "";
    let password = [];

    // Check length first
    if (length < 8 || length > 15) {
        alert("Password length must be between 8 and 15!");
        return;
    }

    // Must select at least one type
    if (!useUppercase && !useLowercase && !useDigits && !useSymbols) {
        alert("Select at least one character type!");
        return;
    }

    // Force include one character of each selected type
    if (useUppercase) {
        allChars += uppercase;
        password.push(uppercase[Math.floor(Math.random() * uppercase.length)]);
    }
    if (useLowercase) {
        allChars += lowercase;
        password.push(lowercase[Math.floor(Math.random() * lowercase.length)]);
    }
    if (useDigits) {
        allChars += digits;
        password.push(digits[Math.floor(Math.random() * digits.length)]);
    }
    if (useSymbols) {
        allChars += symbols;
        password.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }

    // Fill the rest of the password
    while (password.length < length) {
        password.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    // Shuffle password array
    for (let i = password.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [password[i], password[j]] = [password[j], password[i]];
    }

    const finalPassword = password.join("");

    document.getElementById('password').innerText = finalPassword;
    checkStrength(finalPassword);
}

function checkStrength(password) {
    let strength = "Weak";
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[\W_]/.test(password)) score++;

    if (score >= 4) {
        strength = "Strong 💪";
    } else if (score >= 3) {
        strength = "Moderate 😐";
    } else {
        strength = "Weak 😟";
    }

    document.getElementById('strength').innerText = strength;
}
