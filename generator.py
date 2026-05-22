import base64

with open('Somesh_Resume.pdf', 'rb') as f:
    pdf_bytes = f.read()

b64_str = base64.b64encode(pdf_bytes).decode('utf-8')

with open('resume.js', 'w', encoding='utf-8') as f:
    f.write(f'const resumeBase64 = "{b64_str}";\n')

print("Successfully generated resume.js")
