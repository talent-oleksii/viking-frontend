import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request) {

  console.log('inside')

  // Extract the face and audio data from the received FormData
  const receivedFormData = await request.formData();
  const faceData = receivedFormData.get('image');
  const audioData = receivedFormData.get('audio');

  // Create two new FormData objects for face and audio
  const faceFormData = new FormData();
  const audioFormData = new FormData();

  // Populate the new FormData objects
  faceFormData.append('face', faceData);
  audioFormData.append('audio', audioData);

  try {
    const response = await replicate.run(
      "devxpy/cog-wav2lip:8d65e3f4f4298520e079198b493c25adfc43c058ffec924f2aefc8010ed25eef",
      {
        input: {
          face: faceFormData,
          audio: audioFormData,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json()
    console.log(data)

    return new Response(JSON.stringify(data));

  } catch (error) {
    console.error("Server Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
