import { unstable_noStore as noStore } from 'next/cache';
import axios from 'axios';

export async function POST(request: Request) {
  noStore();
  const { texto } = await request.json();
  const apiKey = process.env.GOOGLE_API_KEY
  const endpoint = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${apiKey}`
  const payload = {
    "audioConfig": {
      "audioEncoding": "MP3",
      "pitch": 0,
      "speakingRate": 0.80
    },
    "input": {
      "text": texto
    },
    "voice": {
      "languageCode": "pt-BR",
      "name": "pt-BR-Standard-D"
    }
  }

  //const response = await axios.post(endpoint, payload);
    //const audioContent = response.data.audioContent; // O áudio vem em base64

    // Converte o base64 para binário e retorna como resposta
    //const audioBuffer = Buffer.from(audioContent, 'base64');
    
    // return new Response(audioBuffer, {
    //   headers: {
    //     'Content-Type': 'audio/mpeg',
    //     'Content-Disposition': 'attachment; filename="output.mp3"',
    //   },
    //   status: 200,
    // });

}
