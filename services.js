// services.js

//document.addEventListener('DOMContentLoaded', () => {
  //  const queryString = window.location.search;
    //const urlParams = new URLSearchParams(queryString);
   // const submittedText = urlParams.get('text');
  
    //const wordCountBtn = document.getElementById('wordCountBtn');
    //const charCountBtn = document.getElementById('charCountBtn');
    //const reverseTextBtn = document.getElementById('reverseTextBtn');
    //const textAnalysisBtn = document.getElementById('textAnalysisBtn');
   // const textConversionBtn = document.getElementById('textConversionBtn');
 //   const textChainBtn = document.getElementById('textChainBtn');
  
   // wordCountBtn.addEventListener('click', () => activateService('word-count'));
    //charCountBtn.addEventListener('click', () => activateService('char-count'));
    //reverseTextBtn.addEventListener('click', () => activateService('reverse-text'));
    //textAnalysisBtn.addEventListener('click', () => activateService('text-analysis'));
    //textConversionBtn.addEventListener('click', () => activateService('text-conversion'));
    //textChainBtn.addEventListener('click', () => activateService('text-chain'));
  
    //function activateService(serviceName) {
      // Example: Send a request to activate the selected service
      //fetch(`/activate-service/${serviceName}?text=${encodeURIComponent(submittedText)}`, { method: 'POST' })
        //.then(response => {
          //if (!response.ok) {
            //throw new Error('Failed to activate service');
          //}
          //alert(`${serviceName} Microservice Activated!`);
        //})
        //.catch(error => {
          //console.error('Error:', error);
          //alert('An error occurred, please try again!');
       // });
   // }
  //});
  // services.js

document.addEventListener('DOMContentLoaded', () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const submittedText = urlParams.get('text');
  
    const textConversionBtn = document.getElementById('textConversionBtn');
  
    textConversionBtn.addEventListener('click', () => {
      // Send a request to activate the text conversion service
      fetch('/activate-service/text-conversion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: submittedText })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to activate service');
        }
        return response.json();
      })
      .then(data => {
        alert(`Text Conversion Microservice Activated!\n\nUppercase: ${data.result.uppercase}\nLowercase: ${data.result.lowercase}`);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred, please try again!');
      });
    });
  });
  