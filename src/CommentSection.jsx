import React, { useEffect, useState } from 'react';
import Comment from './Comment.jsx';

const CommentSection = ({ 
    comment, 
    createdAt, 
    currentUser, 
    content, 
    data,
    decreaseScore, 
    increaseScore, 
    replies,
    setData, 
    setDelObj,
    setModalState,
    timeSince
  }) => {

  const [currentReplies, setCurrentReplies] = useState([]);
  

  useEffect(() => {
    if (replies) {
      setCurrentReplies(replies);
    }
  }, []);

  return (
    <section className='comment-wrap'>
      <Comment 
        data={data}
        comment={comment}
        createdAt={createdAt}
        content={content}
        currentUser={currentUser}
        decreaseScore={decreaseScore}
        increaseScore={increaseScore}
        isReply={false}
        parentEl={comment}
        setData={setData}
        setDelObj={setDelObj}
        setModalState={setModalState}
        timeSince={timeSince}
      />
      <div className="replies-wrap">
        {
          currentReplies && currentReplies.map((reply) => {
            return <Comment 
              key={reply.id}
              data={data}
              comment={reply}
              isReply={true}
              replyingTo={reply.replyingTo}
              currentUser={currentUser}
              decreaseScore={decreaseScore}
              increaseScore={increaseScore}
              parentEl={comment}
              // returns an array
              replies={reply.replies}
              setData={setData}
              setDelObj={setDelObj}
              setModalState={setModalState}
              timeSince={timeSince}
            />
          })
        }
        
      </div>
    </section>
  )
}

export default CommentSection