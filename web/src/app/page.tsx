'use client';

import { useState } from "react";

export default function Home() {
  const [stories, setStories] = useState<string[]>([]);
  const [generating, setGenerating] = useState<boolean>(false);

  const genStory = async () => {
    setGenerating(true);

    const response = await fetch('http://localhost:3000/gen-story', { method: 'POST' });
    const body = await response.json();
    setStories([...stories, body.story]);

    setGenerating(false);
  };

  return (
    <div className="container">
      {
        stories.map((story, storyIdx) =>
          <div className="my-3 row" key={`${storyIdx}`}>
            <div className="col-sm-6 mx-auto">
              <div className="card">
                <div className="card-body">
                  {
                    story.split('\n').map((paragraph, paragraphIdx) => (
                      <p key={`${storyIdx}-${paragraphIdx}`}>{paragraph}</p>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        )
      }

      <div className="my-3 row">
        <div className="col-sm-6 d-flex justify-content-center mx-auto">
          <button className="btn btn-primary" onClick={generating ? undefined : genStory} disabled={generating}>
            {
              generating
                ? <>
                    <span className="spinner-border spinner-border-sm"></span>
                    <span> </span>
                    <span>Generating...</span>
                  </>
                : <>Generate</>
            }
          </button>
        </div>
      </div>
    </div>
  );
}
