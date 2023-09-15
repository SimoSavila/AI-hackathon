export default function Home() {
  const stories = ['Placeholder'];

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
          <button className="btn btn-primary">Generate</button>
        </div>
      </div>
    </div>
  );
}
