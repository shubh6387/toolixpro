import { Injectable } from '@angular/core';

export interface BlogPost {
  title: string;
  slug: string;
  toolSlug: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  category: string;
  featuredImage: string;
  author: string;
  publishedDate: string;
  readingTime: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogs: BlogPost[] = [
    {
      title: 'The Ultimate Guide to JSON Formatting, Validation, and Minification',
      slug: 'ultimate-guide-to-json-formatting-and-validation',
      toolSlug: 'json-formatter',
      description: 'Master JSON data structures, troubleshoot syntax errors like trailing commas or unquoted keys, and learn when to beautify or minify JSON payloads.',
      metaTitle: 'Guide to JSON Formatting, Validation & Minification - ToolixPro Blog',
      metaDescription: 'Learn how to format, validate, and minify JSON data online. Master JSON syntax debugging and client-side formatting techniques.',
      keywords: ['json formatting guide', 'validate json tutorial', 'json syntax errors', 'beautify json online', 'minify json payloads'],
      category: 'JSON Utilities',
      featuredImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
      author: 'ToolixPro Engineering',
      publishedDate: '2026-08-01T00:00:00Z',
      readingTime: '5 min read',
      content: `
        <p>JavaScript Object Notation (JSON) has become the undisputed standard data-interchange format across modern web APIs, microservices, and configuration management systems. Its lightweight, language-independent key-value structure allows systems written in Python, Java, Go, Node.js, and C# to seamlessly exchange data.</p>
        
        <h2 class="mt-4 mb-3 text-body fw-bold">Why Validating JSON is Critical for Web APIs</h2>
        <p>Unlike loose programming formats, the JSON specification (RFC 8259) is strict. A single misplaced comma, unquoted property key, or missing bracket will cause standard JSON parsers like <code>JSON.parse()</code> to throw fatal runtime exceptions and break API consumers.</p>

        <h3 class="mt-4 mb-2 text-body fw-bold">Common JSON Syntax Pitfalls</h3>
        <ul>
          <li><strong>Trailing Commas:</strong> Placing a comma after the final key-value pair in an object or array (e.g., <code>{"key": "value",}</code>).</li>
          <li><strong>Single Quotes:</strong> Using single quotes instead of double quotes for string values or object keys (e.g., <code>{'id': 1}</code>).</li>
          <li><strong>Unquoted Keys:</strong> Omitting double quotes around object property names (e.g., <code>{name: "Alice"}</code>).</li>
          <li><strong>Unescaped Special Characters:</strong> Failing to escape double quotes or newlines within string literals.</li>
        </ul>

        <h2 class="mt-4 mb-3 text-body fw-bold">Beautifying vs. Minifying JSON Payloads</h2>
        <p>During local development and API debugging, <strong>JSON Beautification</strong> adds consistent 2-space or 4-space indentation and line breaks, enabling developers to inspect complex nested structures instantly. Conversely, <strong>JSON Minification</strong> strips out all non-essential whitespace, comments, and line breaks, reducing payload bandwidth by up to 30% for production HTTP requests.</p>

        <h2 class="mt-4 mb-3 text-body fw-bold">Client-Side Privacy Advantage</h2>
        <p>Using online tools that process data on remote servers risks leaking sensitive user records, database connection strings, or authorization tokens. On ToolixPro, all JSON formatting, validation, and minification run 100% locally inside your web browser using JavaScript TextEncoder and JSON engine APIs, keeping your data confidential.</p>
      `
    },
    {
      title: 'How to Decode and Debug JSON Web Tokens (JWT) Safely Online',
      slug: 'how-to-decode-and-debug-jwt-tokens-online',
      toolSlug: 'jwt-decoder',
      description: 'Understand JWT architecture (Header, Payload, Signature), verify token expiration times, inspect user scopes, and decode bearer tokens securely.',
      metaTitle: 'How to Decode & Debug JWT Tokens Online - ToolixPro Blog',
      metaDescription: 'Master JWT decoding, payload inspection, header algorithms, and token expiration tracking with browser-side privacy.',
      keywords: ['jwt decoder guide', 'parse json web token', 'jwt claims inspection', 'token expiration exp claim', 'oauth 2.0 bearer token debug'],
      category: 'Security Utilities',
      featuredImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
      author: 'Security & Auth Team',
      publishedDate: '2026-08-02T00:00:00Z',
      readingTime: '6 min read',
      content: `
        <p>JSON Web Tokens (JWT) are an open, industry-standard (RFC 7519) method for representing claims securely between two parties. JWTs are ubiquitous across modern web applications, OAuth 2.0 authorization servers, OpenID Connect (OIDC) identity providers, and microservices architectures.</p>

        <h2 class="mt-4 mb-3 text-body fw-bold">The Three-Part Structure of a JWT</h2>
        <p>A standard JWT string consists of three Base64URL-encoded strings separated by dots (<code>.</code>):</p>
        <ol>
          <li><strong>Header:</strong> Specifies the token type (JWT) and cryptographic hashing algorithm (e.g., HS256, RS256, ES256).</li>
          <li><strong>Payload:</strong> Contains claims—statements about an entity (typically the user) and additional metadata such as <code>iss</code> (issuer), <code>sub</code> (subject), <code>exp</code> (expiration time), and <code>roles</code>.</li>
          <li><strong>Signature:</strong> Created by taking the encoded header, encoded payload, and a secret/private key using the specified algorithm to verify authenticity.</li>
        </ol>

        <h2 class="mt-4 mb-3 text-body fw-bold">Understanding Token Expiration (exp Claim)</h2>
        <p>The <code>exp</code> claim represents the timestamp (in Unix epoch seconds) after which the JWT must not be accepted for processing. Inspecting token expiration timestamps is critical during authentication debugging to ensure refresh token loops and session expiry triggers work as intended.</p>

        <h2 class="mt-4 mb-3 text-body fw-bold">Why You Should Never Paste Live Production Tokens into Unknown Servers</h2>
        <p>Many online JWT tools transmit your token to third-party logging servers. If your token contains session keys, email addresses, or admin privileges, bad actors could capture them. ToolixPro decodes JWTs exclusively within your local browser DOM, ensuring bearer tokens remain private.</p>
      `
    },
    {
      title: 'Generating Cryptographically Secure Passwords Using Web Crypto CSPRNG',
      slug: 'generating-cryptographically-secure-passwords',
      toolSlug: 'password-generator',
      description: 'Learn how cryptographically secure random number generators (CSPRNG) prevent brute-force attacks and create high-entropy master passwords.',
      metaTitle: 'Guide to Cryptographically Secure Passwords - ToolixPro Blog',
      metaDescription: 'Learn how cryptographically secure random number generators (CSPRNG) create high-entropy passwords to stop brute-force attacks.',
      keywords: ['csprng password generator', 'password entropy explained', 'web crypto api random', 'strong password creation', 'prevent brute force'],
      category: 'Security Utilities',
      featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      author: 'Security & Auth Team',
      publishedDate: '2026-08-03T00:00:00Z',
      readingTime: '5 min read',
      content: `
        <p>Weak or reused passwords remain the single most exploited vulnerability leading to credential stuffing attacks and account takeovers. Creating passwords with high information entropy is the first line of defense against modern GPU-accelerated brute-force crackers.</p>

        <h2 class="mt-4 mb-3 text-body fw-bold">Math vs. Crypto: Pseudo-Random vs. CSPRNG</h2>
        <p>Standard programming language random functions (like <code>Math.random()</code> in JavaScript) use deterministic algorithms designed for speed, not security. Given a sequence of outputs, an attacker can predict future numbers.</p>
        <p>In contrast, <strong>Cryptographically Secure Pseudorandom Number Generators (CSPRNG)</strong>—such as the browser\'s <code>window.crypto.getRandomValues()</code>—draw randomness from hardware entropy pools (thermal noise, interrupt timing, hardware events), producing unpredictable sequences immune to mathematical prediction.</p>

        <h2 class="mt-4 mb-3 text-body fw-bold">What is Password Entropy?</h2>
        <p>Password entropy measures the unpredictability of a password string in bits of information. It is calculated using the formula:</p>
        <pre class="bg-body-tertiary p-3 rounded text-primary"><code>Entropy = Length × log2(Pool Size)</code></pre>
        <ul>
          <li>A 16-character password containing uppercase, lowercase, numbers, and symbols has over 100 bits of entropy.</li>
          <li>An attacker attempting 1 trillion guesses per second would require billions of years to crack a 100-bit entropy password.</li>
        </ul>
      `
    },
    {
      title: 'Mastering Regular Expressions: A Complete Guide to Live Regex Testing',
      slug: 'mastering-regular-expressions-regex-testing-guide',
      toolSlug: 'regex-tester',
      description: 'Master regular expression syntax, flags (g, i, m), capture groups, lookaheads, and pattern validation techniques for developers.',
      metaTitle: 'Mastering Regular Expressions & Regex Testing - ToolixPro Blog',
      metaDescription: 'Learn regular expression patterns, flags (g, i, m), grouping, and live regex debugging for web developers.',
      keywords: ['regex testing guide', 'regular expression syntax', 'regex pattern tutorial', 'javascript regex flags', 'regex capture groups'],
      category: 'Text & String Utilities',
      featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      author: 'Frontend Engineering',
      publishedDate: '2026-08-04T00:00:00Z',
      readingTime: '7 min read',
      content: `
        <p>Regular Expressions (Regex) are powerful text processing engines used across JavaScript, Python, Java, Go, and SQL to search, validate, extract, and replace string patterns. Mastering regex syntax unlocks sub-second data manipulation capabilities.</p>

        <h2 class="mt-4 mb-3 text-body fw-bold">Key Regex Modifiers & Flags</h2>
        <ul>
          <li><code>g</code> (Global): Finds all matching pattern occurrences in the target string rather than stopping after the first match.</li>
          <li><code>i</code> (Ignore Case): Performs case-insensitive character matching (e.g., <code>/abc/i</code> matches <code>ABC</code> and <code>Abc</code>).</li>
          <li><code>m</code> (Multiline): Changes anchors <code>^</code> and <code>$</code> to match the start and end of each individual line instead of the entire string.</li>
        </ul>

        <h2 class="mt-4 mb-3 text-body fw-bold">Common Regex Patterns for Web Developers</h2>
        <pre class="bg-body-tertiary p-3 rounded text-primary"><code>// Email Validation
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$

// URL Slug Matcher
^[a-z0-9]+(?:-[a-z0-9]+)*$</code></pre>
      `
    },
    {
      title: 'Understanding Base64 Encoding & Decoding: UTF-8 & Unicode Guide',
      slug: 'understanding-base64-encoding-decoding-unicode-guide',
      toolSlug: 'base64',
      description: 'Learn how Base64 binary-to-text encoding works, how Data URLs embed images, and how to safely convert UTF-8 Unicode characters.',
      metaTitle: 'Base64 Encoding & Decoding UTF-8 Guide - ToolixPro Blog',
      metaDescription: 'Deep dive into Base64 binary-to-text encoding schemes, Data URLs, Unicode UTF-8 character safety, and API payloads.',
      keywords: ['base64 encoding guide', 'base64 utf8 unicode', 'data uri scheme', 'binary to text converter', 'basic auth header base64'],
      category: 'Text & String Utilities',
      featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
      author: 'Web Architecture',
      publishedDate: '2026-08-04T00:00:00Z',
      readingTime: '5 min read',
      content: `
        <p>Base64 is a binary-to-text encoding scheme that converts binary data (images, files, bytes) into 64 ASCII printable characters. It is fundamental to email attachments (MIME), HTTP Basic Authentication, and inline CSS/HTML Data URIs.</p>

        <h2 class="mt-4 mb-3 text-body fw-bold">The UTF-8 Unicode Encoding Trap</h2>
        <p>Native browser functions like <code>btoa()</code> and <code>atob()</code> only support 8-bit ASCII characters. Attempting to encode Unicode characters, emojis, or international scripts (like <code>Hello 🌍</code>) will throw a <code>DOMException: String contains characters outside the Latin1 range</code>.</p>
        <p>ToolixPro solves this by passing strings through <code>TextEncoder</code> byte buffers, guaranteeing 100% UTF-8 Unicode encoding safety.</p>
      `
    },
    {
      title: 'How to Create Custom QR Codes: Error Correction & High-Res PNG Exports',
      slug: 'how-to-create-custom-qr-codes-error-correction-guide',
      toolSlug: 'qr-generator',
      description: 'Understand QR code matrix structures, error correction levels (L, M, Q, H), and client-side canvas rendering for high-resolution vector and PNG exports.',
      metaTitle: 'Guide to QR Codes & Error Correction Levels - ToolixPro Blog',
      metaDescription: 'Learn how QR code matrix generation works, error correction levels (L, M, Q, H), and client-side canvas rendering.',
      keywords: ['qr code generation guide', 'qr error correction levels', 'reed solomon error correction', 'canvas qr code png', 'custom qr code generator'],
      category: 'Generator Utilities',
      featuredImage: 'https://images.unsplash.com/photo-1595079672139-cee4c0849f4d?w=800&auto=format&fit=crop&q=80',
      author: 'Frontend Engineering',
      publishedDate: '2026-08-05T00:00:00Z',
      readingTime: '4 min read',
      content: `
        <p>Quick Response (QR) codes are 2D matrix barcodes designed to encode URLs, text, vCard contacts, and Wi-Fi configurations into scannable square patterns.</p>

        <h2 class="mt-4 mb-3 text-body fw-bold">Understanding QR Code Error Correction Levels</h2>
        <p>QR codes use <strong>Reed-Solomon Error Correction</strong> algorithms to recover missing or damaged data modules:</p>
        <ul>
          <li><strong>Level L (Low):</strong> 7% of data can be restored. Ideal for small print sizes where data space is tight.</li>
          <li><strong>Level M (Medium):</strong> 15% of data can be restored. Recommended for standard web links and digital displays.</li>
          <li><strong>Level Q (Quartile):</strong> 25% of data can be restored. Great for industrial scanners and outdoor posters.</li>
          <li><strong>Level H (High):</strong> 30% of data can be restored. Essential if embedding custom logo graphics in the center of the barcode.</li>
        </ul>
      `
    },
    {
      title: 'Demystifying UUID v4 & GUID Generation for Distributed Systems',
      slug: 'demystifying-uuid-v4-guid-generation-in-distributed-systems',
      toolSlug: 'uuid-generator',
      description: 'Explore RFC 4122 Version 4 UUID structures, collision math, database primary key indexing, and bulk UUID generation.',
      metaTitle: 'UUID v4 & GUID Generation in Distributed Systems - ToolixPro Blog',
      metaDescription: 'Understand RFC 4122 Version 4 UUIDs, collision probabilities, database primary keys, and bulk GUID generation.',
      keywords: ['uuid v4 guide', 'rfc 4122 uuid standard', 'database primary key uuid', 'guid generation tutorial', 'uuid collision odds'],
      category: 'Generator Utilities',
      featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
      author: 'Backend & Systems',
      publishedDate: '2026-08-05T00:00:00Z',
      readingTime: '5 min read',
      content: `
        <p>Universally Unique Identifiers (UUID) are 128-bit numbers standardized under RFC 4122. They enable distributed systems to generate unique identifiers without central coordination authority or database lock bottlenecks.</p>

        <h2 class="mt-4 mb-3 text-body fw-bold">The Anatomy of a Version 4 UUID</h2>
        <p>A UUID v4 is represented as 32 hexadecimal digits formatted into five hyphen-separated groups (8-4-4-4-12):</p>
        <pre class="bg-body-tertiary p-3 rounded text-primary"><code>123e4567-e89b-12d3-a456-426614174000</code></pre>
        <p>Out of 128 total bits, 6 bits are reserved for variant and version metadata, leaving <strong>122 bits of pure cryptographic randomness</strong>. This yields 2^122 (approx. 5.3 × 10^36) unique values.</p>

        <h2 class="mt-4 mb-3 text-body fw-bold">Collision Odds</h2>
        <p>To experience a 50% probability of a single UUID collision, you would need to generate <strong>2.3 quintillion (2,300,000,000,000,000,000)</strong> UUIDs—a number far exceeding the storage capacity of humanity\'s global server infrastructure.</p>
      `
    },
    {
      title: 'A Complete Guide to URL Encoding, Percent-Encoding, and Query Strings',
      slug: 'guide-to-url-encoding-percent-encoding-query-parameters',
      toolSlug: 'url-encoder-decoder',
      description: 'Master URI percent-encoding standards (RFC 3986), reserved characters, query parameter escaping, and URL route sanitization.',
      metaTitle: 'Guide to URL Encoding & Percent-Encoding - ToolixPro Blog',
      metaDescription: 'Master URI percent-encoding standards (RFC 3986), handling special characters, query parameters, and URL escaping.',
      keywords: ['url encoding guide', 'percent encoding rfc 3986', 'encodeuricomponent tutorial', 'query string escaping', 'sanitize url params'],
      category: 'Text & String Utilities',
      featuredImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80',
      author: 'Web Architecture',
      publishedDate: '2026-08-05T00:00:00Z',
      readingTime: '4 min read',
      content: `
        <p>URLs can only transmit characters from the unreserved ASCII character set (letters, digits, hyphen, period, underscore, tilde). All other characters must be percent-encoded to prevent breaking HTTP request paths and query string delimiters.</p>

        <h2 class="mt-4 mb-3 text-body fw-bold">Reserved vs. Unreserved URI Characters</h2>
        <ul>
          <li><strong>Reserved Characters:</strong> <code>: / ? # [ ] @ ! $ & ' ( ) * + , ; =</code> (These characters have special syntactic meanings in URIs).</li>
          <li><strong>Percent-Encoding Format:</strong> A percent sign (<code>%</code>) followed by two hexadecimal digits representing the character\'s ASCII/UTF-8 byte value (e.g., Space becomes <code>%20</code>, <code>&amp;</code> becomes <code>%26</code>).</li>
        </ul>
      `
    },
    {
      title: 'Cryptographic Hash Functions Explained: MD5, SHA-1, SHA-256, and SHA-512',
      slug: 'cryptographic-hash-functions-md5-sha1-sha256-sha512-explained',
      toolSlug: 'hash-generator',
      description: 'Explore cryptographic hash functions, deterministic one-way digests, file integrity checksums, and Web Crypto SubtleCrypto API execution.',
      metaTitle: 'Cryptographic Hash Functions (MD5, SHA-256) Explained - ToolixPro',
      metaDescription: 'Explore cryptographic hash algorithms, checksum integrity verification, Web Crypto SubtleCrypto API, and one-way digests.',
      keywords: ['cryptographic hash functions', 'md5 vs sha256', 'one way hash function', 'checksum verification', 'subtlecrypto sha512'],
      category: 'Security Utilities',
      featuredImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
      author: 'Security & Auth Team',
      publishedDate: '2026-08-06T00:00:00Z',
      readingTime: '6 min read',
      content: `
        <p>A cryptographic hash function takes an arbitrary block of input data and converts it into a fixed-size hex string digest. Hashing is deterministic, collision-resistant, and strictly one-way.</p>

        <h2 class="mt-4 mb-3 text-body fw-bold">Comparing Popular Hash Algorithms</h2>
        <ul>
          <li><strong>MD5 (128-bit):</strong> Legacy algorithm fast for non-cryptographic checksum verification. Vulnerable to collision attacks; not recommended for passwords.</li>
          <li><strong>SHA-1 (160-bit):</strong> Historically used in Git commits and SSL certificates. Deprecated for security use.</li>
          <li><strong>SHA-256 (256-bit):</strong> Modern cryptographic gold standard used in Bitcoin blockchain, TLS certificates, and API security.</li>
          <li><strong>SHA-512 (512-bit):</strong> High-security 512-bit digest optimal for 64-bit hardware architectures.</li>
        </ul>
      `
    },
    {
      title: 'The History and Usage of Lorem Ipsum Dummy Text in UI/UX Design',
      slug: 'the-history-and-usage-of-lorem-ipsum-placeholder-text',
      toolSlug: 'lorem-ipsum',
      description: 'Discover the origins of Cicero\'s classical Latin text, its role in visual typography testing, and how dummy text helps UI/UX designers focus on visual layout.',
      metaTitle: 'History & Usage of Lorem Ipsum in UI Design - ToolixPro Blog',
      metaDescription: 'Discover the origins of Cicero\'s Latin text in modern graphic design, typography testing, and placeholder text generation.',
      keywords: ['lorem ipsum history', 'dummy text ui design', 'placeholder copy tutorial', 'cicero latin text', 'typography testing placeholder'],
      category: 'Generator Utilities',
      featuredImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
      author: 'UI/UX Design Team',
      publishedDate: '2026-08-06T00:00:00Z',
      readingTime: '4 min read',
      content: `
        <p>Lorem Ipsum has served as the printing and typesetting industry\'s standard dummy text ever since the 1500s. Its scrambled Latin word distribution simulates natural English letter frequency without distracting reviewers with readable story content.</p>

        <h2 class="mt-4 mb-3 text-body fw-bold">Origins in Classical Literature</h2>
        <p>Contrary to popular belief, Lorem Ipsum is not random gibberish. It originates from sections 1.10.32 and 1.10.33 of Marcus Tullius Cicero\'s 45 BC treatise on ethics, <em>"De Finibus Bonorum et Malorum"</em> (The Extremes of Good and Evil).</p>

        <h2 class="mt-4 mb-3 text-body fw-bold">Why Designers Use Lorem Ipsum</h2>
        <p>Using readable English text in design prototypes causes clients and stakeholders to critique copy rather than evaluating visual hierarchy, whitespace, grid layout, and font typography. Lorem Ipsum provides a natural visual weight while preserving focus on layout design.</p>
      `
    }
  ];

  getAllBlogs(): BlogPost[] {
    return this.blogs;
  }

  getBlogBySlug(slug: string): BlogPost | undefined {
    return this.blogs.find(b => b.slug === slug);
  }

  getBlogByToolSlug(toolSlug: string): BlogPost | undefined {
    return this.blogs.find(b => b.toolSlug === toolSlug);
  }
}
