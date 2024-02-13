function convertDocxToHtml(inputId) {
  const fileInput = document.getElementById(inputId);
  const outputDiv = document.getElementById('output');
  const copyButton = document.getElementById('copyButton');

  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const arrayBuffer = e.target.result;

      mammoth.extractRawText({ arrayBuffer: arrayBuffer })
        .then(result => {
          const plainText = result.value;

          // Display the plain text
          outputDiv.textContent = plainText;

          // Show the "Copy" button
          copyButton.style.display = 'inline-block';
        })
        .catch(error => {
          console.error('Error extracting raw text:', error);
          outputDiv.innerHTML = 'Error extracting raw text. Please try again.';
        });
    };

    reader.readAsArrayBuffer(file);
  } else {
    alert('Please select a .docx file.');
  }
}

function convertTextToHtml(inputId) {
  const textInput = document.getElementById(inputId);
  const outputDiv = document.getElementById('output');
  const copyButton = document.getElementById('copyButton');

  const text = textInput.value;

  mammoth.extractRawText({ arrayBuffer: new TextEncoder().encode(text) })
    .then(result => {
      const plainText = result.value;

      // Display the plain text
      outputDiv.textContent = plainText;

      // Show the "Copy" button
      copyButton.style.display = 'inline-block';
    })
    .catch(error => {
      console.error('Error extracting raw text:', error);
      outputDiv.innerHTML = 'Error extracting raw text. Please try again.';
    });
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
