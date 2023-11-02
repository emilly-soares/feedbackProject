import { useEffect, useState } from "react";
import './App.css'; // Importe o arquivo CSS para aplicar o estilo

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
      const newComment = `${author}:${text} (${new Date().toLocaleString()})`;
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
              <h5>{comment.split(':')[0]}</h5>
              <p>{comment.split(':')[1]}</p>
              <small>{comment.split('(')[1]}</small>
            </div>
          ))}
        </section>
      </div>
      <p>Total Comments: {comments.length}</p>
    </div>
  );
}

export default App;
