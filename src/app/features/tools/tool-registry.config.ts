import { ToolConfig } from '../../shared/models/tool-config.model';

export const TOOL_REGISTRY: ToolConfig[] = [
  {
    slug: 'json-formatter',
    name: 'JSON Formatter & Validator Online',
    tagline: 'Free online JSON Beautifier, Validator, Pretty Printer & Minifier with real-time syntax error detection.',
    description: 'A free online developer utility to format, beautify, validate, pretty print, and minify JSON data instantly. Upload a JSON file or paste your code to clean it up and check for syntax errors in real-time.',
    category: 'JSON Utilities',
    iconClass: 'bi-braces-asterisk',
    keywords: [
      'json formatter',
      'json formatter online',
      'json validator',
      'json formatter online free',
      'json beautifier',
      'json beautifier online',
      'format json online',
      'json pretty print',
      'json pretty printer',
      'json validator online',
      'json minifier',
      'validate json online',
      'json syntax checker',
      'free json formatter online',
      'online json formatter and validator',
      'format json online free',
      'validate json online free',
      'beautify json online',
      'json syntax validator online',
      'json formatter for developers',
      'json formatter with error detection',
      'json formatter with line numbers'
    ],
    metaTitle: 'JSON Formatter & Validator Online – Free JSON Beautifier | ToolixPro',
    metaDescription: 'Free JSON Formatter & Validator online. Beautify, validate, pretty print, and minify JSON data instantly with real-time syntax error detection. 100% free.',
    popular: true,
    longDescription: 'The ToolixPro JSON Formatter & Validator is a free, 100% browser-based online developer utility built to format, clean, validate, pretty print, and minify JSON (JavaScript Object Notation) data instantly. Whether you are debugging backend REST API payloads, inspecting GraphQL query responses, or editing configuration files like package.json and tsconfig.json, raw JSON is often minified into a single dense line without indentation or line breaks. Our tool converts unformatted JSON text into a clean, human-readable structure with standard 2-space indentation. In addition to beautification, the integrated JSON Validator checks your payload against the RFC 8259 specification to detect syntax errors in real-time, providing line-level error location details so you can fix issues immediately. Because all computations execute locally inside your web browser via client-side JavaScript, confidential API payloads, passwords, customer records, and internal system logs remain strictly private.',
    keyFeatures: [
      'Real-time JSON syntax validation with instant error line indicators',
      'One-click JSON beautification with clean 2-space indentation',
      'One-click JSON minification to compress payload size for APIs',
      'Local JSON file upload (.json, .txt) and direct file downloading',
      '100% Browser-based client-side execution guaranteeing complete data privacy',
      'Instant copy to clipboard with state feedback'
    ],
    howToUse: [
      'Paste your raw, unformatted, or minified JSON string into the code editor input box, or click "Upload" to load a local JSON file.',
      'Click the "Beautify JSON" button to format the JSON with clean indentation and syntax structure.',
      'If your JSON contains syntax errors (like trailing commas or unquoted keys), the validation status banner will pinpoint the exact line and position of the issue.',
      'Use the "Minify JSON" button to remove all unnecessary whitespace for production API calls, or click "Copy" / "Download" to save your formatted code.'
    ],
    useCases: [
      'Debugging REST API response payloads and GraphQL data structures',
      'Formatting configuration files (like package.json, tsconfig.json, settings.json)',
      'Minifying JSON payloads to reduce HTTP request bandwidth',
      'Validating complex nested data structures before database ingestion'
    ],
    faqs: [
      {
        question: 'What is a JSON formatter?',
        answer: 'A JSON Formatter is an online developer tool that converts raw, compressed, or unformatted JSON text into a clean, human-readable format with proper line breaks and indentation.'
      },
      {
        question: 'How do I format JSON online?',
        answer: 'Paste your raw JSON data into the input box and click Beautify JSON. The tool instantly cleans up the code and displays the formatted JSON in the output panel.'
      },
      {
        question: 'What is a JSON validator?',
        answer: 'A JSON Validator checks your JSON data against the RFC 8259 specification to ensure it is syntactically correct and free of syntax errors like unquoted keys or trailing commas.'
      },
      {
        question: 'Why is my JSON invalid?',
        answer: 'Common causes include single quotes instead of double quotes, trailing commas after the last item in an object or array, unquoted keys, or missing closing brackets.'
      },
      {
        question: 'What is JSON beautification?',
        answer: 'JSON beautification is the process of adding proper 2-space or 4-space indentation and line breaks to dense JSON strings to improve code legibility.'
      },
      {
        question: 'What is JSON minification?',
        answer: 'JSON minification removes all unnecessary whitespace, tabs, and line breaks from a JSON string to reduce file size and optimize payload transmission for APIs.'
      },
      {
        question: 'Can I format a JSON file?',
        answer: 'Yes. Click Upload to select a .json or .txt file from your device, format or validate it, and view the formatted result instantly.'
      },
      {
        question: 'Can I download formatted JSON?',
        answer: 'Yes. After formatting or minifying your JSON, click the Download button to save the formatted .json file to your computer.'
      },
      {
        question: 'Is this JSON formatter free?',
        answer: 'Yes. The ToolixPro JSON Formatter & Validator is 100% free with no registration, no file size limits, and no hidden fees.'
      },
      {
        question: 'Is my JSON data uploaded to a server?',
        answer: 'No. All processing runs 100% client-side in your web browser using JavaScript. Your confidential API data, tokens, and records never leave your local device.'
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
    keywords: ['jwt decoder', 'decode jwt', 'json web token parser', 'jwt expiry checker', 'inspect jwt payload', 'jwt token debugger', 'jwt claims inspector'],
    metaTitle: 'Free JWT Decoder Online',
    metaDescription: 'Free JWT Decoder online. Decode JSON Web Tokens (JWT) to inspect header, payload claims, and expiration dates securely.',
    popular: true,
    longDescription: 'JSON Web Tokens (JWT) are widely used for authentication, authorization, and secure information exchange in modern web applications, microservices, and OAuth 2.0 / OpenID Connect flows. The ToolixPro JWT Decoder allows developers to instantly unpack encoded JWT strings (Header, Payload, and Signature) without sending sensitive bearer tokens or secret keys over the internet. It automatically extracts standard claims such as issuer (iss), subject (sub), audience (aud), issued at (iat), and expiration time (exp), providing an active countdown timer to verify if a token is valid, active, or expired.',
    keyFeatures: [
      'Instant client-side decoding of JWT Headers, Payloads, and Signatures',
      'Automatic parsing of "exp" claims with live active/expired countdown status',
      'Unicode-safe Base64Url decoding preventing character corruption',
      'Clean color-coded JSON view of header and payload objects',
      'Zero server calls—ensuring authentication tokens remain completely confidential',
      'One-click copy for decoded JSON payloads'
    ],
    howToUse: [
      'Copy your encoded JWT string (e.g., eyJhbGciOi...) from your browser storage, API client, or authorization header.',
      'Paste the token into the input area.',
      'The utility immediately parses the token into three distinct sections: Header (algorithm & type), Payload (user claims & data), and Signature verification info.',
      'Check the expiration banner at the top to see whether the token is currently active or expired.'
    ],
    useCases: [
      'Inspecting OAuth 2.0 / OIDC access tokens and ID tokens',
      'Debugging user authorization scopes, roles, and permission claims',
      'Checking token expiration timestamps during authentication troubleshooting',
      'Verifying JWT header algorithms (HS256, RS256, ES256)'
    ],
    faqs: [
      {
        question: 'Can this tool alter or re-sign my JWT signature?',
        answer: 'This utility decodes and displays token components (Header and Payload). It does not alter or re-sign tokens, keeping decoding safe, read-only, and transparent.'
      },
      {
        question: 'Is it safe to paste production API auth tokens here?',
        answer: 'Yes! The entire decoding process happens inside your browser DOM using JavaScript. No network requests are made, ensuring your production secrets and session tokens are never transmitted anywhere.'
      },
      {
        question: 'How does it display token expiration?',
        answer: 'It parses the Unix timestamp from the "exp" claim in the payload, converts it to your local timezone, and shows a status badge indicating whether the token is active or expired.'
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
    keywords: ['password generator', 'strong password creator', 'secure password generator', 'random password generator', 'exclude similar characters', 'csprng password maker', 'password strength calculator'],
    metaTitle: 'Free Password Generator Online',
    metaDescription: 'Free Password Generator online. Create strong, random passwords with custom lengths, symbols, numbers, and entropy meters.',
    popular: true,
    longDescription: 'In today\'s cybersecurity landscape, weak or reused passwords account for the vast majority of account break-ins and data breaches. The ToolixPro Password Generator empowers users and security engineers to create cryptographically secure, high-entropy passwords tailored to any complexity requirement. Powered by the browser\'s native Web Crypto API (Crypto.getRandomValues), every generated string benefits from cryptographically secure pseudorandom number generation (CSPRNG). You can customize length (up to 128 characters), toggle character classes (uppercase, lowercase, digits, symbols), exclude confusing ambiguous characters (such as 1, l, I, 0, O), and evaluate real-time entropy strength scores.',
    keyFeatures: [
      'Cryptographically secure random number generation (CSPRNG via Web Crypto API)',
      'Customizable password length slider from 4 to 128 characters',
      'Granular options for uppercase, lowercase, numbers, and special symbols',
      'Option to filter out ambiguous/similar characters (1, l, I, 0, O, Q)',
      'Real-time password entropy and security strength meter (Weak, Medium, Strong, Very Strong)',
      'Instant copy button with automatic clearance notification'
    ],
    howToUse: [
      'Adjust the password length slider to your desired character count (recommended: 16+ characters).',
      'Check or uncheck the character set options (Uppercase, Lowercase, Digits, Symbols) based on your system requirements.',
      'Enable "Exclude Similar Characters" if you plan to type the password manually without visual confusion.',
      'Click "Generate Password" or copy the generated password directly to your password manager.'
    ],
    useCases: [
      'Creating secure master passwords for password managers (1Password, Bitwarden, KeePass)',
      'Generating database credentials, API keys, and server root credentials',
      'Creating strong passwords for online accounts, cloud portals, and SSH keys',
      'Enforcing strict password complexity requirements in enterprise environments'
    ],
    faqs: [
      {
        question: 'How secure are passwords generated by this tool?',
        answer: 'They are generated using the browser\'s Web Crypto API (Crypto.getRandomValues), which relies on OS-level entropy sources. This makes the generated passwords cryptographically secure and resistant to brute-force predictions.'
      },
      {
        question: 'Are my generated passwords logged or saved?',
        answer: 'No. Password generation occurs exclusively in your browser session. We never log, store, or transmit generated passwords to any server.'
      },
      {
        question: 'What is password entropy?',
        answer: 'Entropy measures the randomness and unpredictability of a password in bits. Higher entropy means exponential protection against dictionary attacks and automated brute-forcing.'
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
    keywords: ['regex tester', 'regular expression debugger', 'regex matching online', 'test regex online', 'highlight regex matches', 'javascript regex tester', 'pattern matcher'],
    metaTitle: 'Free Regex Tester Online',
    metaDescription: 'Free Regex Tester online. Test and debug regular expressions in real-time with live match highlighting and pattern flags.',
    popular: true,
    longDescription: 'Regular expressions (Regex) are fundamental for string validation, data extraction, search-and-replace routines, and input sanitization across modern programming languages like JavaScript, Python, Java, Go, and PHP. The ToolixPro Regex Tester provides an interactive environment to test, validate, and debug regular expression patterns in real-time. As you type your expression and test text, the engine dynamically highlights every regex match, captures sub-groups, and reports match counts. Supporting essential flags such as Global (g), Case-Insensitive (i), and Multiline (m), it helps you fine-tune patterns safely.',
    keyFeatures: [
      'Real-time regular expression evaluation and live text match highlighting',
      'Full support for standard regex flags: Global (g), Ignore Case (i), and Multiline (m)',
      'Detailed match list displaying full match strings and index offsets',
      'Sanitized XSS-safe preview renderer preventing malicious script execution',
      'Client-side JavaScript RegExp engine for immediate sub-millisecond feedback',
      'Pre-populated sample test cases for instant testing'
    ],
    howToUse: [
      'Enter your Regular Expression pattern into the Regex input field (e.g., [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}).',
      'Select the desired regex flags (g for global search, i for case-insensitive, m for multiline).',
      'Type or paste your test text into the Test String input area.',
      'Review the highlighted matches in the preview container and inspect the captured matches list below.'
    ],
    useCases: [
      'Validating email addresses, phone numbers, URLs, and postal codes',
      'Extracting specific parameters, IDs, or log data from raw text files',
      'Testing search-and-replace patterns before executing them in IDEs or scripts',
      'Learning and mastering regular expression syntax interactively'
    ],
    faqs: [
      {
        question: 'Which regular expression flavor is used?',
        answer: 'This utility uses ECMAScript (JavaScript) native RegExp engine running directly inside your web browser.'
      },
      {
        question: 'What do the regex flags g, i, and m do?',
        answer: '"g" (global) finds all matching occurrences rather than stopping after the first match. "i" (ignore case) makes matching case-insensitive. "m" (multiline) treats line breaks as start/end anchors (^ and $).'
      },
      {
        question: 'Is my test string sent anywhere?',
        answer: 'No. All regex computations run locally in your browser DOM. Your source code and data remain strictly confidential.'
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
    keywords: ['base64 encoder', 'base64 decoder', 'base64 convert', 'encode file to base64', 'decode base64 text', 'utf8 base64 converter', 'base64 file tool'],
    metaTitle: 'Free Base64 Encoder & Decoder Online',
    metaDescription: 'Free Base64 Encoder and Decoder online. Convert text and files to Base64 format or decode Base64 strings back to plain text.',
    popular: true,
    longDescription: 'Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format using 64 printable characters (A-Z, a-z, 0-9, +, /). It is heavily utilized across web development, email transmission (MIME), data URLs, and API authentication payloads (Basic Auth). The ToolixPro Base64 Encoder / Decoder delivers full Unicode (UTF-8) character safety, allowing you to encode or decode strings containing emojis, non-English scripts, and special characters without encoding errors. You can also upload text documents directly to convert and download the resulting string.',
    keyFeatures: [
      'Bidirectional Base64 encoding and decoding',
      'Unicode (UTF-8) safety handling special characters, emojis, and international scripts',
      'Local file upload (.txt, .json, .csv) and instant download of converted output',
      'Clean monospaced text editor with one-click clipboard copying',
      '100% browser-based processing with zero server uploads',
      'Instant reset and clear functionality'
    ],
    howToUse: [
      'Paste your raw plain text or Base64 string into the input field, or upload a text file using the "Upload File" button.',
      'Click "Encode to Base64" to convert your plain text into a Base64 string.',
      'Click "Decode from Base64" to translate a Base64 string back into human-readable text.',
      'Copy the output to your clipboard or click "Download" to save the result as a text file.'
    ],
    useCases: [
      'Encoding Basic Auth header strings (username:password) for HTTP API calls',
      'Embedding small SVG images or fonts directly into CSS/HTML data URLs',
      'Decoding encoded payloads inside email headers, webhook notifications, or query strings',
      'Preparing configuration data for cloud deployments (Kubernetes secrets, environment vars)'
    ],
    faqs: [
      {
        question: 'Is Base64 encoding a form of encryption?',
        answer: 'No! Base64 is an encoding format for data transport, not encryption. Anyone can easily decode a Base64 string back to its original plain text. Never rely on Base64 alone to protect sensitive passwords or secrets.'
      },
      {
        question: 'Does this tool support Unicode and Emojis?',
        answer: 'Yes. Our encoder wraps binary character byte offsets inside TextEncoder and TextDecoder APIs, ensuring Unicode text and emojis encode and decode perfectly without corruption.'
      },
      {
        question: 'Are my files uploaded to your server?',
        answer: 'No. All file reading, encoding, and decoding take place inside your browser environment.'
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
    keywords: ['qr code generator', 'generate qr code', 'free qr code maker', 'custom qr code', 'qr code download', 'qr code png maker', 'high res qr code'],
    metaTitle: 'Free QR Code Generator Online',
    metaDescription: 'Free QR Code Generator online. Generate custom QR codes for URLs and text with adjustable error correction and PNG downloads.',
    popular: true,
    longDescription: 'Quick Response (QR) codes are two-dimensional matrix barcodes widely used to bridge physical media with digital experiences. The ToolixPro QR Code Generator enables businesses, marketers, and developers to create high-resolution QR codes for website URLs, Wi-Fi network credentials, email addresses, contact vCards, or plain text. You can fine-tune error correction levels (Low 7%, Medium 15%, Quartile 25%, High 30%), adjust pixel resolution, and customize foreground and background colors to match your brand design—all generated client-side on HTML5 Canvas and available for instant PNG download.',
    keyFeatures: [
      'Instant client-side QR Code rendering on HTML5 Canvas',
      'Customizable resolution options (128px, 256px, 350px, 512px)',
      'Adjustable Error Correction Levels (L, M, Q, H) ensuring scannability even when damaged',
      'Custom color pickers for foreground matrix blocks and background canvas',
      'One-click high-resolution PNG image download',
      '100% private generation with zero tracking or server requests'
    ],
    howToUse: [
      'Enter the website URL, text message, or content you want to encode into the input box.',
      'Select your desired Error Correction Level (e.g., High (30%) if placing a logo in the center or printing on outdoor signs).',
      'Choose the image size in pixels and select your custom foreground/background colors.',
      'Preview the live QR code and click "Download PNG" to save the image to your computer.'
    ],
    useCases: [
      'Creating scannable links for menus, event posters, business cards, and brochures',
      'Generating mobile App Store download links and Wi-Fi login codes',
      'Directing customers to promotional landing pages, feedback forms, or social profiles',
      'Embedding QR codes into invoice documents and product packaging'
    ],
    faqs: [
      {
        question: 'Do generated QR codes expire?',
        answer: 'No. The QR codes generated by ToolixPro are static matrix codes. The encoded data is permanently written into the barcode pattern itself and will work indefinitely as long as the underlying URL or content remains accessible.'
      },
      {
        question: 'What is Error Correction Level in QR codes?',
        answer: 'Error correction uses Reed-Solomon algorithms to restore data if the QR code is partially covered, smudged, or damaged. Higher levels (Q and H) allow up to 25% or 30% of the symbol to be obscured while remaining fully scannable.'
      },
      {
        question: 'Can I generate commercial QR codes for free?',
        answer: 'Yes, all QR codes generated on ToolixPro are 100% free for both personal and commercial applications.'
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
    keywords: ['uuid generator', 'guid generator', 'generate uuid v4', 'bulk uuid generator', 'random guid creator', 'rfc 4122 uuid', 'unique identifier generator'],
    metaTitle: 'Free UUID / GUID Generator Online',
    metaDescription: 'Free UUID Generator online. Create random RFC 4122 compliant version 4 UUIDs in bulk with custom casing and hyphens.',
    popular: true,
    longDescription: 'A Universally Unique Identifier (UUID) or Globally Unique Identifier (GUID) is a 128-bit identifier standardized by RFC 4122. Because UUID version 4 relies on 122 bits of cryptographically random data, the probability of generating duplicate UUIDs across systems is statistically negligible. The ToolixPro UUID / GUID Generator provides a fast, bulk generator for software developers, database architects, and QA engineers who need unique keys for database primary keys, session tokens, or transaction tracking IDs. You can generate up to 100 UUIDs at a time, toggle hyphens, and customize case formatting.',
    keyFeatures: [
      'RFC 4122 compliant Version 4 UUID generation using Web Crypto CSPRNG',
      'Bulk generation supporting 1, 5, 10, 20, 50, or 100 UUIDs in a single click',
      'Formatting controls to toggle hyphens on/off and switch between uppercase and lowercase',
      'One-click "Copy All" to grab the entire list for database scripts or fixtures',
      'Individual copy buttons for single UUID selection',
      '100% client-side execution ensuring zero network overhead'
    ],
    howToUse: [
      'Select the number of UUIDs you wish to generate from the dropdown menu (e.g., 1, 10, or 100).',
      'Toggle options like "Uppercase output" or "Include hyphens" depending on your database schema requirements.',
      'Click "Generate UUIDs" to refresh the list with new cryptographic values.',
      'Click "Copy All" to copy the entire batch into your clipboard or copy individual items.'
    ],
    useCases: [
      'Generating unique primary keys for distributed databases (PostgreSQL, MongoDB, DynamoDB)',
      'Creating unique request IDs for distributed microservice logging and tracing',
      'Generating mock UUIDs for unit tests, API integration tests, and database seeding',
      'Creating random session keys, API client secrets, and transaction IDs'
    ],
    faqs: [
      {
        question: 'What is the probability of a UUID v4 collision?',
        answer: 'The chance of generating a duplicate UUID v4 is virtually zero. To have a 50% probability of a single collision, you would need to generate approximately 2.3 quintillion (2.3 × 10^18) UUIDs.'
      },
      {
        question: 'What is the difference between UUID and GUID?',
        answer: 'UUID (Universally Unique Identifier) is the open IETF standard (RFC 4122), while GUID (Globally Unique Identifier) is Microsoft\'s implementation of the same 128-bit structure. Practically, they are identical.'
      },
      {
        question: 'Are generated UUIDs stored anywhere?',
        answer: 'No. UUIDs are generated directly inside your browser using JavaScript and are never saved on our server.'
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
    keywords: ['url encoder', 'url decoder', 'url encode decode', 'percent encoding', 'decode query parameters', 'encodeuri online', 'uri component converter'],
    metaTitle: 'Free URL Encoder & Decoder Online',
    metaDescription: 'Free URL Encoder and Decoder online. Convert text and special characters into percent-encoded URL strings or decode URLs.',
    popular: false,
    longDescription: 'Uniform Resource Locators (URLs) can only contain a limited set of ASCII characters. Characters outside the unreserved set (such as spaces, ampersands, slashes, question marks, and non-English scripts) must be converted into percent-encoded strings to prevent breaking HTTP web requests and query strings. The ToolixPro URL Encoder / Decoder simplifies this process by translating raw strings into RFC 3986 compliant percent-encoded values or decoding complex, escaped query strings back into human-readable text. It also supports local file imports for processing URL lists.',
    keyFeatures: [
      'Bidirectional URL encoding and URL decoding',
      'RFC 3986 percent-encoding standard compliant',
      'Local text file upload (.txt, .url) and direct output download options',
      'Monospaced code viewer with instant clear and copy buttons',
      'Handles multi-line strings and long query parameter strings smoothly',
      '100% browser-based client-side execution'
    ],
    howToUse: [
      'Paste your raw URL, query parameters, or percent-encoded text string into the input textarea.',
      'Click "Encode URL" to replace special characters with percent-encoded hex triplets (e.g., space becomes %20).',
      'Click "Decode URL" to restore percent-encoded strings back to plain text.',
      'Copy the output or click "Download" to export the result.'
    ],
    useCases: [
      'Encoding query parameter values (like search queries, OAuth redirect URLs, or callback links)',
      'Debugging web server request logs containing percent-encoded paths',
      'Sanitizing user inputs before passing them into URL routes or API endpoints',
      'Inspecting tracking links, UTM parameters, and affiliate links'
    ],
    faqs: [
      {
        question: 'Why do spaces become %20 or + in URLs?',
        answer: 'In standard URI percent-encoding, space characters are converted to %20 (hexadecimal ASCII 32). In application/x-www-form-urlencoded form data, spaces are often represented as a plus (+).'
      },
      {
        question: 'What characters get encoded by URL encoding?',
        answer: 'Reserved characters with special architectural meanings in URIs (such as ?, &, =, /, #, :, @) as well as unprintable ASCII characters and non-ASCII Unicode characters are percent-encoded.'
      },
      {
        question: 'Is my data transmitted to your servers?',
        answer: 'No. Encoding and decoding happen locally within your browser JavaScript context.'
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
    keywords: ['hash generator', 'md5 generator', 'sha256 generator', 'sha512 online', 'checksum calculator', 'sha1 generator', 'crypto hash online'],
    metaTitle: 'Free Hash Generator Online',
    metaDescription: 'Free Hash Generator online. Compute MD5, SHA-1, SHA-256, and SHA-512 cryptographic digests in real-time.',
    popular: true,
    longDescription: 'Cryptographic hash functions take an arbitrary block of text or data and transform it into a fixed-size bit string (digest). Hashing is a one-way mathematical function; it is computationally infeasible to invert a digest back into the original input. The ToolixPro Hash Generator allows developers, security auditors, and system administrators to compute real-time cryptographic checksums using popular algorithms: MD5 (128-bit), SHA-1 (160-bit), SHA-256 (256-bit), and SHA-512 (512-bit). Powered by the browser\'s native Web Crypto API, all hashes update instantaneously as you type.',
    keyFeatures: [
      'Simultaneous computation of MD5, SHA-1, SHA-256, and SHA-512 digests',
      'Real-time sub-millisecond calculation powered by Web Crypto API (SubtleCrypto)',
      'Toggle option to switch output hex strings between lowercase and uppercase',
      'One-click copy buttons for each individual hash algorithm output',
      '100% private local execution—your input strings are never sent over the network',
      'Clean grid dashboard displaying all checksum outputs side-by-side'
    ],
    howToUse: [
      'Type or paste your input text, password, or string into the main input textarea.',
      'Watch as MD5, SHA-1, SHA-256, and SHA-512 hashes calculate automatically in real-time.',
      'Toggle the "Uppercase Hashes" switch if your system or database requires uppercase hex strings.',
      'Click the "Copy" button next to any hash algorithm to copy its value to your clipboard.'
    ],
    useCases: [
      'Verifying data integrity and checking file checksums against expected hashes',
      'Generating SHA-256 / SHA-512 hashes for API signature headers and webhooks',
      'Testing password hashing outputs for mock datasets and database schemas',
      'Validating HMAC or API key digests during integration debugging'
    ],
    faqs: [
      {
        question: 'What is the difference between MD5, SHA-1, and SHA-256?',
        answer: 'MD5 produces a 128-bit digest, SHA-1 produces a 160-bit digest, and SHA-256 produces a 256-bit digest. MD5 and SHA-1 are legacy algorithms used mainly for non-critical checksums, whereas SHA-256 and SHA-512 are modern cryptographically secure standard algorithms.'
      },
      {
        question: 'Can a hash be decrypted back to plain text?',
        answer: 'No. Hashing is a one-way deterministic function. You cannot decrypt a hash; you can only compare it by hashing candidate text and matching the resulting digests.'
      },
      {
        question: 'Are my input texts uploaded or logged?',
        answer: 'No. All calculations are executed locally inside your browser DOM using JavaScript.'
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
    keywords: ['lorem ipsum generator', 'dummy text maker', 'placeholder text generator', 'lorem ipsum paragraphs', 'mock text creator', 'lorem ipsum generator online'],
    metaTitle: 'Free Lorem Ipsum Generator Online',
    metaDescription: 'Free Lorem Ipsum Generator online. Generate custom dummy placeholder text paragraphs, sentences, or word counts for designs.',
    popular: true,
    longDescription: 'Lorem Ipsum has been the graphic design and publishing industry\'s standard dummy text ever since the 1500s, when an unknown printer scrambled a section of Cicero\'s classical Latin literature "De Finibus Bonorum et Malorum" to make a type specimen book. The ToolixPro Lorem Ipsum Generator allows UI/UX designers, frontend developers, and content strategists to quickly generate realistic filler copy. You can specify exact counts for paragraphs, sentences, or individual words, choose whether to begin with the classic "Lorem ipsum dolor sit amet...", and instantly copy formatted copy directly into your Figma mockups, HTML templates, or CMS drafts.',
    keyFeatures: [
      'Generate custom placeholder copy by Paragraphs, Sentences, or Word counts',
      'Adjustable count settings from 1 up to 100 items',
      'Toggle option to start with the classic "Lorem ipsum dolor sit amet..." opening',
      'Natural sentence variations simulating real editorial copy flow',
      'One-click copy to clipboard with toast notification feedback',
      '100% browser-based rendering with instant output'
    ],
    howToUse: [
      'Enter the desired count in the number input field (e.g., 3 or 5).',
      'Select the generation mode from the dropdown: Paragraphs, Sentences, or Words.',
      'Check or uncheck the "Start with Lorem ipsum..." toggle based on your design preference.',
      'Click "Generate Text" or copy the generated dummy text immediately into your design software or editor.'
    ],
    useCases: [
      'Populating Figma, Adobe XD, or Sketch UI design mockups with realistic copy lengths',
      'Testing frontend typography, line heights, font sizes, and layout responsiveness',
      'Creating placeholder content for website templates, blog posts, and landing pages',
      'Filling email newsletter prototypes before final copy approval'
    ],
    faqs: [
      {
        question: 'What does "Lorem ipsum dolor sit amet" mean?',
        answer: 'It is derived from Cicero\'s 45 BC treatise on ethics. While it resembles classical Latin, the words have been intentionally altered and scrambled so that reader attention is focused on visual layout design rather than readable text content.'
      },
      {
        question: 'Is generated Lorem Ipsum text free to use?',
        answer: 'Yes! Lorem Ipsum text is in the public domain and free to use in any personal, commercial, or open-source project.'
      },
      {
        question: 'Can I generate exact word counts?',
        answer: 'Yes. Simply select "Words" mode and enter your target count (e.g., 50 words).'
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
