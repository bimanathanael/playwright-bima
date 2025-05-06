const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'test-files');
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

// 1. example.txt
fs.writeFileSync(path.join(dir, 'exampleFile.txt'), 'Hello World');

// 2. special@#$F1l3.txt
fs.writeFileSync(path.join(dir, 'special@#$F1l3.txt'), 'Special characters filename');

// 3. empty.txt
fs.writeFileSync(path.join(dir, 'emptyFile.txt'), '');

// 4. image.jpg (1x1 px white pixel)
const base64Img = '/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAICAgICAgICAgICAwMDBAYEBAQEBAgGBgYGBgcICQgJCQoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoK/2wBDAwMDAwQEBAQEBAgICgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoK/3QAEAAf/2gAMAwEAAhEDEQA/AP8A/wD/2Q==';
fs.writeFileSync(path.join(dir, 'image.jpg'), Buffer.from(base64Img, 'base64'));

// 5. sample.pdf (basic PDF content)
const pdfContent = `%PDF-1.1\n1 0 obj\n<< /Type /Catalog >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF`;
fs.writeFileSync(path.join(dir, 'sample.pdf'), pdfContent);

// 6. script.exe (dummy binary file)
fs.writeFileSync(path.join(dir, 'script.exe'), Buffer.from([0x4D, 0x5A, 0x90, 0x00])); // MZ header

// 7. large.txt (6MB)
let largeText = 'A'.repeat(6 * 1024 * 1024); // ~6MB
fs.writeFileSync(path.join(dir, 'largefile.txt'), largeText);

// 8. same.txt (same content as exampleFile.txt)
fs.copyFileSync(path.join(dir, 'exampleFile.txt'), path.join(dir, 'same.txt'));

// 9. long file name 
fs.writeFileSync(path.join(dir, 'averylongfilename_thatisover100characters_longlonglonglonglonglong.txt'), 'Hello World');

// 10. UPPERCASE file name 
fs.writeFileSync(path.join(dir, 'UPPERCASE.TXT'), 'HELLO WORLD');

console.log('✅ Test files generated in test-files/');
