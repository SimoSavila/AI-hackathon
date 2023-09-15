'use client';

import { useState } from "react";

export default function Home() {
  const [stories, setStories] = useState<string[]>([]);

  const genStory = async () => {
    const response = await fetch('http://localhost:3000/gen-story', { method: 'POST' });
    const body = await response.json();
    setStories([...stories, body.story]);
  };

  return (
    <div className="container">
      {
        stories.map((story, index) =>
          <div className="row" key={`${index}`}>
            <div className="col-sm-6 mx-auto">
              <p>{story}</p>
            </div>
          </div>
        )
      }

      <div className="row">
        <div className="col-sm-6 d-flex justify-content-center mx-auto">
          <button className="btn btn-primary" onClick={genStory}>Generate</button>
        </div>
      </div>
    </div>
  );
}
