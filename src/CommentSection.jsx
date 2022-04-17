import React, { useEffect, useState } from 'react';
import Comment from './Comment.jsx';
import Input from './Input.jsx';

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
  const [userIsReplying, setUserIsReplying] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);

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
        setData={setData}
        setDelObj={setDelObj}
        setModalState={setModalState}
        setReplyingTo={setReplyingTo}
        setUserIsReplying={setUserIsReplying}
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
              setReplyingTo={setReplyingTo}
              setUserIsReplying={setUserIsReplying}
              timeSince={timeSince}
            />
          })
        }
        {
          userIsReplying && 
          <Input 
            data={data}
            isReply={true} 
            parentEl={comment}
            replyingTo={replyingTo}
            setReplyingTo={setReplyingTo}
            setData={setData}
            setUserIsReplying={setUserIsReplying}
            user={currentUser}
          />
        }
      </div>
    </section>
  )
}

export default CommentSection