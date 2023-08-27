import './App.css'
import QuizImage from './component/QuizImage'
import MultipleChoice from './component/MultipleChoice'
import { RecoilRoot } from 'recoil'

function App() {

  return (
    <RecoilRoot>
    <div className="App">
      <QuizImage/>
      <MultipleChoice/>
    </div>
    </RecoilRoot>
  )
}

export default App
