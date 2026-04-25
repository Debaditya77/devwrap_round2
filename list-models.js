const { GoogleGenerativeAI } = require('@google/generative-ai');

async function run() {
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyAQ1mdRt_Bn558gROCfNds5WXibyZPZmjU');
    const data = await response.json();
    if (data.models) {
        console.log("AVAILABLE MODELS:\n", data.models.map(m => m.name).join('\n'));
    } else {
        console.log("ERROR:\n", data);
    }
  } catch (e) {
    console.error(e);
  }
}
run();
