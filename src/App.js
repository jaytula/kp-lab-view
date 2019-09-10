import React from "react";
import { makeStyles } from "@material-ui/styles";

import data from "./data/pt";

const useStyles = makeStyles({
  app: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: "1080px",
    "& a:link, & a:visited": {
      color: "blue"
    }
  },
  resultTitle: {
    fontWeight: "bold",
    display: "grid",
    gridTemplateColumns: "auto 1fr 1fr",
    gridColumnGap: "8px"
  },
  result: { margin: "8px", padding: "8px", border: "1px solid #ccc" },
  resultItem: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    padding: "4px 0"
  },
  href: {
    textAlign: "right"
  }
});

function createMarkup(html) {
  return {
    __html: html.replace("Your value", "").replace("Standard range", "")
  };
}
const ResultItem = ({ item }) => {
  const classes = useStyles();

  return (
    <div className={classes.resultItem}>
      <div dangerouslySetInnerHTML={createMarkup(item.name)} />
      <div dangerouslySetInnerHTML={createMarkup(item.value)} />
      <div dangerouslySetInnerHTML={createMarkup(item.range)} />
    </div>
  );
};

const Result = ({ result }) => {
  const classes = useStyles();

  return (
    <div className={classes.result}>
      <div className={classes.resultTitle}>
        <div>{result.date}</div>
        <div>{result.title}</div>
        <div className={classes.href}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://healthy.kaiserpermanente.org/${result.href}`}
          >
            Details
          </a>
        </div>
      </div>
      <div className={classes.resultItems}>
        {result.items.map((item, key) => {
          return <ResultItem key={key} item={item}></ResultItem>;
        })}
      </div>
    </div>
  );
};

function App() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      {data.map((item, key) => (
        <Result result={item} key={key}></Result>
      ))}
    </div>
  );
}

export default App;
