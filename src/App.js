import CommentSection from './CommentSection.jsx';
import Input from './Input.jsx';
import { useEffect, useState } from 'react';
import jsonData from './data.json';
import Modal from './Modal.jsx';

function App() {

  const [data, setData] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [delObj, setDelObj] = useState({});  

  useEffect(() => {
    
    let storedData = JSON.parse(localStorage.getItem('comment-data'));

    if (storedData) {
      setData(storedData);
    } else {
      setData(jsonData);
      localStorage.setItem('comment-data', JSON.stringify(jsonData));    
    }

  }, []);  

  const deleteComment = (obj) => {
    let tempData = data;

    if (!obj.isReply) {
      const found = tempData.comments.find(element => element.id === obj.id);
      const index = tempData.comments.indexOf(found);
      if (index > -1) {
        tempData.comments.splice(index, 1);
      }
    } else {
      // comment is a reply
      if (obj.comment.id === obj.id) {
        const index = obj.parentEl.replies.indexOf(obj.comment);
        if (index > -1) {
          obj.parentEl.replies.splice(index, 1);
        }
      }
    }

    setModalState(false)
    setDelObj({});
    setData({ ...tempData });
    localStorage.setItem('comment-data', JSON.stringify(tempData));
  }

  const timeSince = (timeInMileSec) => {
    let sec = ((Date.now() - timeInMileSec) / 1000).toFixed(0);
    let min = ((Date.now() - timeInMileSec) / (1000 * 60)).toFixed(0);
    let hrs = ((Date.now() - timeInMileSec) / (1000 * 60 * 60)).toFixed(0);
    let days = ((Date.now() - timeInMileSec) / (1000 * 60 * 60 * 24)).toFixed(0);
    let weeks = ((Date.now() - timeInMileSec) / (1000 * 60 * 60 * 24 * 7)).toFixed(0);
    let months = ((Date.now() - timeInMileSec) / (1000 * 60 * 60 * 24 * 31)).toFixed(0);
    let years = ((Date.now() - timeInMileSec) / (1000 * 60 * 60 * 24 * 12)).toFixed(0);

    if (sec < 60) {
      return "Seconds ago";
    } else if (min < 60) {
      if (min === '1') {
        return min + " minute ago";
      } else {
        return min + " minutes ago";
      }      
    } else if (hrs < 24) {
      if (hrs === '1') {
        return hrs + " hour ago";
      } else {
        return hrs + " hours ago";
      }
    } else if (days < 7) {
      if (days === '1') {
        return days + " day ago";
      } else {
        return days + " days ago";
      }
    } else if (weeks < 4) {
      if (weeks === '1') {
        return weeks + " week ago";
      } else {
        return weeks + " weeks ago";
      }
    } else if (months < 12) {
      if (months === '1') {
        return months + " month ago";
      } else {
        return months + " months ago";
      }
    } else {
      if (years === '1') {
        return years + " year ago";
      } else {
        return years + " years ago";
      }
    }
    
  }

  return (
    <div className="app-container flex">
      <Modal state={modalState} setModalState={setModalState} delObj={delObj} deleteComment={deleteComment}setDelObj={setDelObj} />
      { data.comments && data.comments
          .sort((a, b) => {
            return b.score - a.score;
        })
        .map((comment) => {
          return (<CommentSection 
                    key={comment.id}
                    comment={comment}
                    currentUser={data.currentUser}
                    data={data}
                    // returns an array
                    replies={comment.replies}
                    setData={setData}
                    setDelObj={setDelObj}
                    setModalState={setModalState}
                    timeSince={timeSince}
                  />);
        })
      }
      {
        data.currentUser && <Input 
                    // returns an object
                    data={data}
                    isReply={false}
                    user={data.currentUser}
                    setData={setData}
                  />
      }
    </div>
  );
}

export default App;
