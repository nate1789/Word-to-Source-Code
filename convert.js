function convertDocxToHtml() {
  const fileInput = document.getElementById('fileInput');
  const outputDiv = document.getElementById('output');
  const copyButton = document.getElementById('copyButton');

  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const arrayBuffer = e.target.result;

      mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
        .then(result => {
          const htmlContent = result.value;

          // Display the HTML content with tags as plain text
          outputDiv.textContent = htmlContent;

          // Show the "Copy" button
          copyButton.style.display = 'inline-block';
        })
        .catch(error => {
          console.error('Error converting .docx to HTML:', error);
          outputDiv.innerHTML = 'Error converting .docx to HTML. Please try again.';
        });
    };

    reader.readAsArrayBuffer(file);
  } else {
    alert('Please select a .docx file.');
  }
}

function copyToClipboard() {
  const outputDiv = document.getElementById('output');
  const textToCopy = outputDiv.textContent;

  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      alert('Text copied to clipboard!');
    })
    .catch(err => {
      console.error('Unable to copy text to clipboard:', err);
    });
}
