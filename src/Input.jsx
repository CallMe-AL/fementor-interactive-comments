import React, { useState, useEffect, useRef } from 'react';

const Input = ({ 
  data, 
  isReply, 
  parentEl, 
  replyingTo, 
  setData, 
  setReplyingTo, 
  setUserIsReplying, 
  user 
}) => {

  const inputRef = useRef();
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    if (isReply) {
      inputRef.current.focus();
      setTextInput(`@${replyingTo} `);
    }
  }, []);  

  const createNewComment = (e) => {
    e.preventDefault();
    if (textInput === '') return;
    let tempData = data;
    const id = Math.floor(Math.random() * 1000);
    const date = Date.now();
    tempData.comments.push(
      {
        id: id,
        content: textInput,
        createdAt: date,
        score: 0,
        user: {
          image: { 
            png: process.env.PUBLIC_URL + user.image.png,
            webp: process.env.PUBLIC_URL + user.image.webp
          },
          username: user.username
        },
        replies: []
      }
    )
    setData({ ...tempData });
    localStorage.setItem('comment-data', JSON.stringify(tempData));
    setTextInput('');
  }

  const createNewReply = (e) => {
    e.preventDefault();
    if (textInput === '') return;
    let tempData = data;
    const indexOfSpace = textInput.indexOf(' ');
    const newInput = textInput.substring(indexOfSpace + 1);
    const id = Math.floor(Math.random() * 1000);
    const date = Date.now();
    parentEl.replies.push(
      {
        id: id,
        content: newInput,
        createdAt: date,
        replyingTo: replyingTo,
        score: 0,
        user: {
          image: { 
            png: process.env.PUBLIC_URL + user.image.png,
            webp: process.env.PUBLIC_URL + user.image.webp
          },
          username: user.username
        }
      }
    )
    setData({ ...tempData });
    localStorage.setItem('comment-data', JSON.stringify(tempData));
    setTextInput('');
    setUserIsReplying(false);
    setReplyingTo(null);
  }

  return (
    <section className="input-section">
      <div className="profile-pic-desktop">
        <img className="currentuser-img" src={process.env.PUBLIC_URL + user.image.png} alt="current user's photo" />
      </div>
      <form className='input-form'>
        <div className="label-wrap">
          <label htmlFor="addcomment"></label>
          <textarea 
              className="textarea-styles add-comment" 
              onChange={(e) => setTextInput(e.target.value)} 
              id="addcomment" 
              name="addcomment" 
              rows="3" 
              placeholder='Add a new comment...' 
              ref={inputRef}
              value={textInput}>
            </textarea>
        </div>
        <div className="form-bottom flex">
          <img className="currentuser-img" src={process.env.PUBLIC_URL + user.image.png} alt="current user's photo" />
          {
            isReply
            ? <div className='reply-btn-wrap flex'>
                <button className="input-btns cancel-reply-btn" aria-label="Cancel a new reply" onClick={() => setUserIsReplying(false)}>Cancel</button>
                <button className="input-btns send-reply-btn" aria-label="Create new reply" onClick={createNewReply}>Reply</button>
              </div>
            
            : <button className="input-btns send-btn" aria-label="Create new comment" onClick={createNewComment}>Send</button>
          }
          
        </div>
      </form>
      
    </section >
  )
}

export default Input