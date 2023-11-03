import { useEffect, useState } from "react";
import './App.css';

function App() {
  //useState (estados) para as contantes do autor, texto do comentário e para armazenar os comentários
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  //useEffect (efeitos) para sempre carregar os comentários salvos na local storage
  useEffect(() => {
    //Obter os comentários salvos na local storage
    const savedComments = localStorage.getItem("comments");
    //Se tiver comentários na Local Storage atualiza o estado "comments" com os comentários recuperados.
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  //Função acionada ao clicar no botão comentar
  function handleComment() {
    //Verifica se o autor ou texto estão vazios
    if (!author || !text) return;

    //Verifica se os dois estão preenchidos
    if (author && text) {
      //Cria um novo comentário (newComment) com autor, texto e data/hora atual
      const newComment = `${new Date().toLocaleString()}):${author}:${text}`;
      //Atualiza a lista de comentários e adiciona o novo comentário na parte superior
      setComments([newComment, ...comments]);
      //Salva os comentários na local storage em formato JSON
      localStorage.setItem("comments", JSON.stringify([newComment, ...comments]));
      //Limpa as inputs do autor e texto
      setAuthor("");
      setText("");
    }

  }
  //Retorna o formulário dos comentários
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
      <p>Total Comentários: {comments.length} 💚</p>
    </div>
  );
}

export default App;
