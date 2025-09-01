import { NewsList } from "./features/news-list/ui/NewsList";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <NewsList />
    </div>
  );
}

export default App;
