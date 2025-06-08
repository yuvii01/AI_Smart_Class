import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Main from './components/Main/Main';
import JeeNeet from './Home/Home';
// import Paper from './components/paper/Paper';
// import Quiz from './components/quiz/Quiz';
// import Revision from './components/revision/Revision';
import CurrentAffairs from './components/upsc/CurrentAffairs';
// import Division from './components/divisions/Division';
import DivisionJEE from './components/jee/DivisionJEE';
import DivisionNEET from './components/neet/DivisionNEET';
import DivisionUPSC from './components/upsc/DivisionUPSC';
import PaperJEE from './components/jee/PaperJEE';
import QuizJEE from './components/jee/QuizJEE';
import DoubtsJEE from './components/jee/DoubtsJEE';
import RevisionJEE from './components/jee/RevisionJEE';
import PaperNEET from './components/neet/PaperNEET';
import QuizNEET from './components/neet/QuizNEET';
import RevisionNEET from './components/neet/RevisionNEET';
import DoubtsNEET from './components/neet/DoubtsNEET';
import PaperUPSC from './components/upsc/PaperUPSC';
import DoubtsUPSC from './components/upsc/DoubtsUPSC';
import RevisionUPSC from './components/upsc/RevisionUPSC';
import Home from './Home/Home';
import DivisionNda from './components/nda/DivisionNda';
import DivisionRail from './components/railway/DivisionRail';
import DivisionSSC from './components/ssc/DivisionSSC';
import DivisionBanking from './components/banking/DivisionBanking';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jee" element={<DivisionJEE />} />
        <Route path="/jee/paper" element={<PaperJEE />} />
        <Route path="/jee/quiz" element={<QuizJEE />} />
        <Route path="/jee/doubts" element={<DoubtsJEE />} />
        <Route path="/jee/revision" element={<RevisionJEE />} />
        <Route path="/neet" element={<DivisionNEET/>} />
        <Route path="/neet/paper" element={<PaperNEET/>} />
        <Route path="/neet/quiz" element={<QuizNEET/>} />
        <Route path="/neet/revision" element={<RevisionNEET/>} />
        <Route path="/neet/doubts" element={<DoubtsNEET/>} />
        <Route path="/upsc" element={<DivisionUPSC />} />
        <Route path="/upsc/paper" element={<PaperUPSC />} />
        <Route path="/upsc/current_affairs" element={<CurrentAffairs/>} />
        <Route path="/upsc/doubts" element={<DoubtsUPSC />} />
        <Route path="/upsc/revision" element={<RevisionUPSC />} />
        <Route path="/nda" element={<DivisionNda />} />
        <Route path="/railway" element={<DivisionRail />} />
        <Route path="/ssc" element={<DivisionSSC />} />
        <Route path="/bank" element={<DivisionBanking />} />
      </Routes>
    </Router>
  );
};

export default App;