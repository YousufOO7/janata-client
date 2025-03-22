import { Route, Routes } from "react-router"
import Root from "./components/Root/Root"
import StockChart from "./components/Home/StockChart"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<StockChart />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
