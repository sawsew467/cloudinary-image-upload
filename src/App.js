import { useState } from "react";

function App() {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  function handleOnChange(changeEvent) {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );
    const formData = new FormData();
    for (const file of fileInput.files) {
      formData.append("file", file);
    }
    formData.append("upload_preset", "napacoin");
    const data = await fetch(
      "https://api.cloudinary.com/v1_1/de41uvd76/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());
    console.log(data);
    setImageSrc(data.url);
    setUploadData(data);
  }
  return (
    <>
      <h1>Image Uploader</h1>

      <p>Upload your image to Cloudinary</p>
      <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
        <p>
          <input type="file" name="file" />
        </p>
        <img src={imageSrc} />
        {imageSrc && !uploadData ? (
          <p>
            <button>Upload Files</button>
          </p>
        ) : (
          <p>
            Your url:
            <a href={imageSrc}>{imageSrc}</a>
          </p>
        )}
      </form>
    </>
  );
}

export default App;
