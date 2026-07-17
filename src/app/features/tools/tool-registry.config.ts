import { ToolConfig } from '../../shared/models/tool-config.model';

export const TOOL_REGISTRY: ToolConfig[] = [
  {
    slug: 'json-formatter',
    name: 'JSON Formatter & Validator',
    tagline: 'Beautify, validate, minify, and format JSON data instantly.',
    description: 'A free online developer utility to format, beautify, validate, and minify JSON code. Upload a JSON file or paste your code to clean it up and check for syntax errors in real-time.',
    category: 'JSON Utilities',
    iconClass: 'bi-braces-asterisk',
    keywords: ['json formatter', 'beautify json', 'minify json', 'validate json', 'json validator', 'online json formatter'],
    metaTitle: 'Free JSON Formatter & Validator - Beautify & Minify JSON Online',
    metaDescription: 'Format, validate, beautify, and minify your JSON data in real-time. Fast, secure, client-side execution with file upload/download options.',
    popular: true,
    faqs: [
      {
        question: 'Is my JSON data sent to a server?',
        answer: 'No. All processing, formatting, and validation are completed client-side inside your browser. Your sensitive code never leaves your device.'
      },
      {
        question: 'How do I download the formatted JSON file?',
        answer: 'Simply format your JSON, then click the "Download" button to save the clean file directly to your computer.'
      }
    ]
  },
  {
    slug: 'jwt-decoder',
    name: 'JWT Decoder',
    tagline: 'Decode JSON Web Tokens and view header, payload, and expiry.',
    description: 'An online JSON Web Token (JWT) decoder. Paste your token to decode and inspect its header, payload, signature, and expiration details locally.',
    category: 'Security Utilities',
    iconClass: 'bi-shield-lock',
    keywords: ['jwt decoder', 'decode jwt', 'json web token parser', 'jwt expiry checker', 'inspect jwt payload'],
    metaTitle: 'JWT Decoder Online - Parse and Inspect JSON Web Tokens',
    metaDescription: 'Instantly decode JSON Web Tokens (JWT) to inspect their headers, payloads, and expiration times. 100% secure client-side decoding.',
    popular: true,
    faqs: [
      {
        question: 'Can this tool edit my JWT signature?',
        answer: 'This utility decodes and displays token parts (Header, Payload). It does not sign or alter tokens, keeping decoding safe and read-only.'
      },
      {
        question: 'How does it display token expiration?',
        answer: 'It parses the "exp" claim from the payload and displays the exact date and time, along with a countdown/status.'
      }
    ]
  },
  {
    slug: 'password-generator',
    name: 'Password Generator',
    tagline: 'Generate strong, customizable, secure passwords.',
    description: 'Create strong, random passwords instantly. Customize length, include uppercase, lowercase, numbers, symbols, and filter out similar characters like I, l, 1, O, 0.',
    category: 'Security Utilities',
    iconClass: 'bi-key',
    keywords: ['password generator', 'strong password creator', 'secure password generator', 'random password generator', 'exclude similar characters'],
    metaTitle: 'Random Password Generator - Create Secure Custom Passwords',
    metaDescription: 'Generate strong random passwords online. Customize length, choose character sets, exclude similar characters, and view password strength.',
    popular: true,
    faqs: [
      {
        question: 'How secure are the generated passwords?',
        answer: 'They are generated using cryptographically secure pseudorandom number generators (CSPRNG) via the Web Crypto API, making them highly secure and unpredictable.'
      },
      {
        question: 'Are my generated passwords stored on your servers?',
        answer: 'No, passwords are generated completely in your browser. We never log or store your generated passwords.'
      }
    ]
  },
  {
    slug: 'regex-tester',
    name: 'Regex Tester',
    tagline: 'Test and validate regular expressions in real-time.',
    description: 'A real-time Regular Expression (Regex) tester and debugger. Paste your regular expression and test string to view highlighted matches instantly.',
    category: 'Text & String Utilities',
    iconClass: 'bi-regex',
    keywords: ['regex tester', 'regular expression debugger', 'regex matching online', 'test regex online', 'highlight regex matches'],
    metaTitle: 'Online Regex Tester & Debugger - Live Match Highlighting',
    metaDescription: 'Write and test regular expressions in real-time. Support for standard regex flags (global, case-insensitive, multiline) and dynamic match highlighting.',
    popular: true,
    faqs: [
      {
        question: 'Which regular expression engine is used?',
        answer: 'The tool uses the native JavaScript RegExp engine running inside your browser.'
      },
      {
        question: 'What do the flags g, i, and m mean?',
        answer: '"g" stands for global (find all matches), "i" for case-insensitive, and "m" for multiline matching.'
      }
    ]
  },
  {
    slug: 'base64',
    name: 'Base64 Encoder / Decoder',
    tagline: 'Encode text to Base64 or decode Base64 back to plain text.',
    description: 'A simple utility to encode text into Base64 format or decode Base64 strings back to text. Supports local text file uploads and direct results downloading.',
    category: 'Text & String Utilities',
    iconClass: 'bi-file-binary',
    keywords: ['base64 encoder', 'base64 decoder', 'base64 convert', 'encode file to base64', 'decode base64 text'],
    metaTitle: 'Base64 Encoder & Decoder - Online Text Converter',
    metaDescription: 'Convert plain text to Base64 or decode Base64 strings back to readable text. Fast browser-based conversion with file download options.',
    popular: true,
    faqs: [
      {
        question: 'What is Base64 encoding used for?',
        answer: 'Base64 is used to encode binary data into an ASCII string format, allowing data to be transmitted over media that handle text format data safely.'
      },
      {
        question: 'Does this tool support file upload?',
        answer: 'Yes, you can upload a text file to encode or decode, and download the resulting string directly.'
      }
    ]
  },
  {
    slug: 'qr-generator',
    name: 'QR Code Generator',
    tagline: 'Generate and customize QR codes for text, URLs, and more.',
    description: 'A free online utility to generate high-quality QR codes. Input text, URLs, or contact details, select error correction levels, adjust sizes, and download the QR code as a PNG file.',
    category: 'Generator Utilities',
    iconClass: 'bi-qr-code',
    keywords: ['qr code generator', 'generate qr code', 'free qr code maker', 'custom qr code', 'qr code download'],
    metaTitle: 'Free QR Code Generator Online - Custom PNG Downloads',
    metaDescription: 'Create custom QR codes in seconds. Input URLs, text, adjust error correction, and download your high-quality QR code image client-side.',
    popular: true,
    faqs: [
      {
        question: 'Are my QR code inputs private?',
        answer: 'Yes. All QR code generation is performed locally in your browser using client-side JavaScript. None of your inputs are sent to our servers.'
      },
      {
        question: 'What is Error Correction Level?',
        answer: 'Error correction allows the QR code to remain scannable even if it is partially dirty or damaged. Levels range from Low (7%) to High (30%).'
      }
    ]
  },
  {
    slug: 'uuid-generator',
    name: 'UUID / GUID Generator',
    tagline: 'Generate secure, random version 4 UUIDs in bulk.',
    description: 'An online UUID/GUID generator that creates RFC 4122 compliant version 4 UUIDs. Supports bulk generation, formatting customization, and instant copying.',
    category: 'Generator Utilities',
    iconClass: 'bi-fingerprint',
    keywords: ['uuid generator', 'guid generator', 'generate uuid v4', 'bulk uuid generator', 'random guid creator'],
    metaTitle: 'UUID / GUID Generator Online - Bulk RFC 4122 UUID v4',
    metaDescription: 'Generate secure version 4 UUIDs online in bulk. Custom count generation, copy all functions, and uppercase/lowercase formatting. 100% secure.',
    popular: true,
    faqs: [
      {
        question: 'What version of UUID is generated?',
        answer: 'This utility generates UUID version 4, which is based on cryptographically secure pseudorandom numbers.'
      },
      {
        question: 'How many UUIDs can I generate at once?',
        answer: 'You can generate up to 100 UUIDs in a single click for quick copying and integration.'
      }
    ]
  },
  {
    slug: 'url-encoder-decoder',
    name: 'URL Encoder / Decoder',
    tagline: 'Encode or decode strings to make them URL-friendly.',
    description: 'An easy-to-use URL encoder and decoder. Convert special characters into safe percent-encoded values or decode percent-encoded URLs back into plain text.',
    category: 'Text & String Utilities',
    iconClass: 'bi-link-45deg',
    keywords: ['url encoder', 'url decoder', 'url encode decode', 'percent encoding', 'decode query parameters'],
    metaTitle: 'URL Encoder & Decoder Online - Percent Encoding Converter',
    metaDescription: 'Convert plain text into URL-encoded format or decode percent-encoded URLs back into readable text. Fast browser-based operations.',
    popular: false,
    faqs: [
      {
        question: 'What is URL encoding?',
        answer: 'URL encoding (percent-encoding) converts reserved or special characters in a URL to a "%" followed by two hexadecimal digits, ensuring safe HTTP requests.'
      },
      {
        question: 'Are decoded query parameters private?',
        answer: 'Yes. All URL translations are processed completely locally in your browser to maintain privacy.'
      }
    ]
  },
  {
    slug: 'hash-generator',
    name: 'Hash Generator (MD5, SHA)',
    tagline: 'Compute MD5, SHA-1, SHA-256, and SHA-512 hashes.',
    description: 'Compute checksums and hashes for text queries in real-time. Supports MD5, SHA-1, SHA-256, and SHA-512 cryptographic hashing functions.',
    category: 'Security Utilities',
    iconClass: 'bi-hash',
    keywords: ['hash generator', 'md5 generator', 'sha256 generator', 'sha512 online', 'checksum calculator'],
    metaTitle: 'Online Hash Generator - Compute MD5, SHA-1, SHA-256, SHA-512',
    metaDescription: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes in real-time. Compute secure checksums for texts locally in your browser.',
    popular: true,
    faqs: [
      {
        question: 'Is MD5 hashing secure?',
        answer: 'MD5 is not considered cryptographically secure due to collision vulnerabilities, but it remains popular for verifying file checksum integrity.'
      },
      {
        question: 'How are SHA hashes calculated?',
        answer: 'SHA-256 and SHA-512 hashes are computed natively using the browser Web Crypto API (SubtleCrypto) for optimal speed and security.'
      }
    ]
  },
  {
    slug: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    tagline: 'Generate dummy placeholder text for layouts and mockups.',
    description: 'An online Lorem Ipsum generator. Create custom dummy text paragraphs, sentences, or words to populate layout mockups, prototypes, and typography previews.',
    category: 'Generator Utilities',
    iconClass: 'bi-justify-left',
    keywords: ['lorem ipsum generator', 'dummy text maker', 'placeholder text generator', 'lorem ipsum paragraphs', 'mock text creator'],
    metaTitle: 'Lorem Ipsum Generator - Create Dummy Placeholder Text',
    metaDescription: 'Generate custom placeholder text paragraphs, sentences, or word counts. Toggle start with standard Lorem Ipsum text locally.',
    popular: true,
    faqs: [
      {
        question: 'What is Lorem Ipsum?',
        answer: 'Lorem Ipsum is a standard placeholder text used in design and publishing to demonstrate visual layout features without distracting readable copy.'
      },
      {
        question: 'Can I copy the generated text directly?',
        answer: 'Yes, just click the "Copy" button to grab the generated dummy text immediately.'
      }
    ]
  }
];

export const CATEGORIES = [
  { name: 'JSON Utilities', iconClass: 'bi-braces' },
  { name: 'Security Utilities', iconClass: 'bi-shield-check' },
  { name: 'Text & String Utilities', iconClass: 'bi-file-text' },
  { name: 'Generator Utilities', iconClass: 'bi-grid-3x3-gap' }
];
