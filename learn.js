import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);

// new versions on nodejs
const dname = import.meta.dirname;
console.log("dname:", dname)
console.log("dirname:", import.meta.dirname);
console.log("filename:", import.meta.filename);
