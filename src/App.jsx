import EditablePage from "./pages/EditablePage";

const App = () => {
  return (
    <div>
      <p className="Intro">
        Hi, Write you ideas instantly. Your can continue typing later on even if
        you leave the page. Type <span className="Code">/</span> to see
        available elements.
      </p>
      <EditablePage />
    </div>
  );
};

export default App;
