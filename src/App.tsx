import React, { useEffect, useState } from "react";

function App() {

  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [comments, setComments] = useState<string[]>([]);


  useEffect(() => {
    const savedComments = localStorage.getItem("comments");

    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  function handleComment() {
    if (!author || !text) return;

    if (author && text) {
      const newComment = `${author}:${text}`;
      setComments([newComment, ...comments]);
      localStorage.setItem("comments", JSON.stringify([newComment, ...comments]));

      setAuthor("");
      setText("");
    }

  }

  return (
    <div>

      <h1>Feedbacks</h1>

      <div>
        <input type="text" placeholder="Autor" value={author}
          onChange={(e) => setAuthor(e.target.value)} />
      </div>

      <div>
        <input type="text" placeholder="Comentário" value={text}
          onChange={(e) => setText(e.target.value)} />
      </div>

      <button onClick={handleComment}>
        Comentar
      </button>

      <div>
        <section>
          {comments.map((comment, index) => (
            <span key={index}>
              <p>{comment}</p>
            </span>
          ))}
        </section>
      </div>

    </div>
  )
}

export default App
