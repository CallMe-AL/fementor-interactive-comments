import React, { useState } from 'react';
import Score from './buttons/Score.jsx';
import ReplyBtn from './buttons/ReplyBtn.jsx';
import DeleteBtn from './buttons/DeleteBtn.jsx';
import EditBtn from './buttons/EditBtn.jsx';
import Input from './Input.jsx';


const Comment = ({ 
  comment,  
  currentUser,
  data,
  isReply,
  parentEl, 
  setData,
  setDelObj,
  setModalState,
  timeSince
}) => {

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);
  const [userIsReplying, setUserIsReplying] = useState(false);
  const [parentReply, setParentReply] = useState(null);

  const increaseScore = (comment, reply, id) => {
    let tempData = data;
    if (upVoted) return;
    // if the comment is not a reply (reply passed as a boolean)
    if (!reply) {
      const found = tempData.comments.find(element => element.id === id);
      // checks if comment has already been downvoted
      // if so, allows an extra upvote to return score back to normal, in case user accidentally downvoted or changes mind
      if (downVoted) {
        found.score++;
        setDownVoted(false);
      } else {
        found.score++;
        setUpVoted(true);
      }    
    } else {
      // comment is a reply
      if (comment.id === id) {
        if (downVoted) {
          comment.score++;
          setDownVoted(false);
        } else {
          comment.score++;
          setUpVoted(true);
        }  
      }
    }

    setData({ ...tempData });
    localStorage.setItem('comment-data', JSON.stringify(tempData));
  }

  const decreaseScore = (comment, reply, id) => {
    let tempData = data;
    if (downVoted) return;
    // if the comment is not a reply (reply passed as a boolean)
    if (!reply) {
      const found = tempData.comments.find(element => element.id === id);
      // checks if comment has already been upvoted
      // if so, allows an extra downvote to return score back to normal, in case user accidentally upvoted or changes mind
      if (upVoted) {
        found.score--;
        setUpVoted(false);
      } else {
        found.score--;
        setDownVoted(true);
      }
    } else {
      // comment is a reply
      if (comment.id === id) {
        if (upVoted) {
          comment.score--;
          setUpVoted(false);
        } else {
          comment.score--;
          setDownVoted(true);
        }
      }
    }

    setData({ ...tempData });
    localStorage.setItem('comment-data', JSON.stringify(tempData));
  }

  const updateComment = (e) => {
    e.preventDefault();
    // if content is the same, return immediately
    if (content === comment.content) {
      setIsEditing(false);
      return;
    }
    let tempData = data;
    setContent(content);
    comment.content = content;
    setData({ ...tempData });
    localStorage.setItem('comment-data', JSON.stringify(tempData));
    setIsEditing(false);    
  }

  return (
    <>
      <div className="comment">
        {/* score display for desktop */}
        <div className="desktop-score">
          <Score comment={comment} decreaseScore={decreaseScore} increaseScore={increaseScore} isReply={isReply}/>
        </div>
        <div className="inner-comment-wrap">      
        <div className="comment-head flex">
          <img className="comment-image headshot-img" src={process.env.PUBLIC_URL + comment.user.image.png} alt={'headshot of ' + comment.user.username} />
          <p className="commenter flex">{comment.user.username}{comment.user.username === currentUser.username && <span className='you-tag'>you</span>}</p>
          {
            // checks if creation time is a number -- it'll be one we created
            // if not, it's from the dummy file that came with this package
            typeof comment.createdAt === 'number'
            ? <p className="date-posted">{timeSince(comment.createdAt)}</p>
            : <p className="date-posted">{comment.createdAt}</p>
          } 
          <div className="desktop-reply-wrap">
            {comment.user.username === currentUser.username 
              ? <>
                  <DeleteBtn 
                    comment={comment} 
                    isReply={isReply} 
                    parentEl={parentEl} 
                    setDelObj={setDelObj}
                    setModalState={setModalState}
                    /> 
                    <EditBtn setIsEditing={setIsEditing}/>
                </>
              : <ReplyBtn username={comment.user.username} setParentReply={setParentReply} setUserIsReplying={setUserIsReplying}/>          
            }
          </div>       
        </div>
        {
          isEditing
          ? 
            <form className="edit-form">
              <div className="edit-label-wrap">
                <label htmlFor="editcomment"></label>
                <textarea 
                    className="textarea-styles edit-comment" 
                    onChange={(e) => setContent(e.target.value)}
                    id="editcomment" 
                    name="editcomment" 
                    placeholder='Add a new comment...'
                    value={content}>
                  </textarea>
              </div>
              <div className="edit-btns-wrap flex">
                <button className="input-btns cancel-edit-btn" aria-label="Cancel a new reply" onClick={() => setIsEditing(false)}>Cancel</button>
                <button className="input-btns update-btn" aria-label="update comment" onClick={(e) => updateComment(e, comment)}>Update</button>
              </div>
            </form>
          : <p className="comment-content">{comment.replyingTo && <span className='reply-tag'>{`@${comment.replyingTo}`}</span>} {content}</p>
        }
        
        <div className="comment-bottom flex">
          <Score comment={comment} decreaseScore={decreaseScore} increaseScore={increaseScore} isReply={isReply}/>
          <div className="btns-wrap flex">
            {comment.user.username === currentUser.username 
              ? <>
                  <DeleteBtn 
                    comment={comment} 
                    isReply={isReply} 
                    parentEl={parentEl} 
                    setDelObj={setDelObj}
                    setModalState={setModalState}
                    /> 
                    <EditBtn setIsEditing={setIsEditing}/>
                </>
              : <ReplyBtn username={comment.user.username} setParentReply={setParentReply} setUserIsReplying={setUserIsReplying}/>          
            }          
          </div>        
        </div>
        </div>      
      </div>
      {
        userIsReplying && 
        <Input 
          data={data}
          isReply={true} 
          parentEl={parentEl}
          parentReply={parentReply}
          setParentReply={setParentReply}
          setData={setData}
          setUserIsReplying={setUserIsReplying}
          user={currentUser}
        />
        }
    </>
  )
}

export default Comment;