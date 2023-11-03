import { useEffect, useState } from "react";
import './App.css';

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
      const newComment = `${new Date().toLocaleString()}):${author}:${text}`;
      setComments([newComment, ...comments]);
      localStorage.setItem("comments", JSON.stringify([newComment, ...comments]));
      setAuthor("");
      setText("");
    }
  }

  return (

    <div className="feedback">

      <h1>Feedbacks</h1>

      <div>
        <input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <div>
        <textarea
          placeholder="Comentário"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
        />
      </div>

      <button onClick={handleComment}>Comentar</button>

      <div>
        <section>
          {comments.map((comment, index) => (
            <div className="comment" key={index}>
              <h5>{comment.split(':')[3]}</h5>
              <p>{comment.split(':')[4]}</p>
              <small>{comment.split(')')[0]}💬</small>
            </div>
          ))}
        </section>
      </div>

      <p>Total Comments: {comments.length}</p>

    </div>
  );
}

export default App;
