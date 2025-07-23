// import "./App.css";
import { ArrowBack } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";

const Button = styled("button")(({ theme }) => ({
  backgroundColor: "red",
  color: "black",
  padding: "0.8rem",
  borderRadius: "0.5rem",
  border: "none",
}));

const dataLayerGTM = (event, action, category, label) => {
  window.dataLayer.push({
    event: event,
    action: action,
    category: category,
    label: label,
  });
};

function App() {
  useEffect(() => {
    const nonce = document
      .querySelector("meta[name='csp-nonce']")
      ?.getAttribute("content");
    const GTM_ID = "GTM-N4LRT4PK";

    const scriptTemplate = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;var n=d.querySelector('[nonce]');
    n&&j.setAttribute('nonce', '${nonce}');f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');`;

    const noScriptTemplate = `
    <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}&gtm_auth=&gtm_preview=&gtm_cookies_win=x"
      height="0" width="0" style="display:none;visibility:hidden" id="tag-manager"></iframe>`;

    const script = document.createElement("script");
    const noScript = document.createElement("noscript");

    if (nonce) {
      script.setAttribute("nonce", nonce);
    }

    script.textContent = scriptTemplate;
    noScript.textContent = noScriptTemplate;


    document.head.insertBefore(script, document.head.firstChild);
    document.body.insertBefore(noScript, document.body.firstChild);

    return () => {
      document.head.removeChild(script);
    };
  }, []);



  return (
    <div className="App">
      <ArrowBack sx={{ fontSize: "24px" }} />
      <Button
        onClick={() => {
          console.log(window.dataLayer)
          dataLayerGTM("click_tag", "Click", "Button", "Open link");
        }}
      >
        v5 MUI
      </Button>
      <p style={{ color: "red", fontSize: "24px" }}>Ininline style</p>
    </div>
  );
}

export default App;
