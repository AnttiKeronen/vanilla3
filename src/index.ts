import "./styles.css";

const appElement = document.getElementById("app");

if (appElement) {
  appElement.innerHTML = `
    <h1>Hello Vanilla!</h1>
    <div>
      We use the same configuration as Parcel to bundle this sandbox, you can find more 
      info about Parcel 
      <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
    </div>`;
} else {
  console.error("Element with id 'app' not found.");
}
