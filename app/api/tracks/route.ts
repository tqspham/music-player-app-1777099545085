export async function GET(): Promise<Response> {
  try {
    const tracks = [
      {
        id: "1",
        name: "Summer Vibes",
        artist: "The Groove Band",
        duration: 240,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        thumbnail: "https://loremflickr.com/200/200/summer",
      },
      {
        id: "2",
        name: "Midnight Dreams",
        artist: "Luna Echo",
        duration: 198,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        thumbnail: "https://loremflickr.com/200/200/midnight",
      },
      {
        id: "3",
        name: "Electric Pulse",
        artist: "Synth Wave",
        duration: 210,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        thumbnail: "https://loremflickr.com/200/200/electric",
      },
      {
        id: "4",
        name: "Ocean Breeze",
        artist: "Coastal Sounds",
        duration: 225,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        thumbnail: "https://loremflickr.com/200/200/ocean",
      },
      {
        id: "5",
        name: "Urban Jungle",
        artist: "City Beats",
        duration: 195,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        thumbnail: "https://loremflickr.com/200/200/urban",
      },
      {
        id: "6",
        name: "Starlight Serenade",
        artist: "Cosmic Jazz",
        duration: 260,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        thumbnail: "https://loremflickr.com/200/200/starlight",
      },
    ];

    return Response.json({ tracks }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return Response.json(
      { error: `Failed to fetch tracks: ${errorMessage}` },
      { status: 500 }
    );
  }
}