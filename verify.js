const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'login', 'page.tsx');
const content = fs.readFileSync(filePath, 'utf-8');

console.log('File length:', content.length);
console.log('Exports function:', content.includes('export default function AuthPage'));
console.log('Has login form:', content.includes('mode === "login" && ('));
console.log('Has signup form:', content.includes('mode === "signup" && ('));
console.log('Has w-full PhoneInput:', content.includes('w-full pl-4 pr-4 py-3.5'));
console.log('Has tabClass:', content.includes('const tabClass'));
console.log('Has fix for mb-6:', content.includes('text-center mb-6'));
console.log('Has separate form for signup:', content.includes('mode === "signup" && ('));
console.log('Has back to home:', content.includes('بازگشت به صفحه اصلی'));
console.log('Has OTP step:', content.includes('isInOtpStep'));

const lines = content.split('\n');
console.log('\nTotal lines:', lines.length);

console.log('\nFirst 5 lines:');
for (let i = 0; i < Math.min(5, lines.length); i++) {
  console.log((i+1) + ': ' + lines[i]);
}

console.log('\nLast 5 lines:');
for (let i = Math.max(0, lines.length - 5); i < lines.length; i++) {
  console.log((i+1) + ': ' + lines[i]);
}
