export function getContactEmailHtml(name, email, subject, message) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #334155;
            background-color: #f8fafc;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 30px;
            margin: 0 auto;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          }
          .header {
            border-bottom: 2px solid #2563eb;
            padding-bottom: 15px;
            margin-bottom: 20px;
          }
          .header h2 {
            margin: 0;
            color: #1e3a8a;
            font-size: 20px;
          }
          .field-row {
            margin-bottom: 16px;
          }
          .field-label {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #64748b;
            margin-bottom: 4px;
          }
          .field-value {
            font-size: 15px;
            color: #0f172a;
            font-weight: 500;
          }
          .message-box {
            background-color: #f8fafc;
            border-left: 4px solid #2563eb;
            padding: 15px;
            border-radius: 4px 8px 8px 4px;
            font-size: 14px;
            line-height: 1.6;
            color: #334155;
            white-space: pre-line;
          }
          .footer {
            margin-top: 30px;
            border-top: 1px solid #e2e8f0;
            padding-top: 15px;
            font-size: 12px;
            color: #94a3b8;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Portfolio Contact Message</h2>
          </div>
          
          <div class="field-row">
            <div class="field-label">Sender Name</div>
            <div class="field-value">${name}</div>
          </div>
          
          <div class="field-row">
            <div class="field-label">Email Address</div>
            <div class="field-value"><a href="mailto:${email}">${email}</a></div>
          </div>
          
          <div class="field-row">
            <div class="field-label">Subject</div>
            <div class="field-value">${subject || 'No Subject'}</div>
          </div>
          
          <div class="field-row">
            <div class="field-label">Message Details</div>
            <div class="message-box">${message}</div>
          </div>
          
          <div class="footer">
            <p>Sent from your Portfolio contact form on Muhammad Abdullah's website.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
