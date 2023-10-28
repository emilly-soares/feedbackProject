import React, { useEffect, useState } from "react";

function App() {

  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  return (
    <div>
      <h1>Feedbacks</h1>

      <div>
        <input type="text" placeholder="Autor" />
      </div>

      <div>
        <input type="text" placeholder="Comentário" />
      </div>

      <button>
        Comentar
      </button>

    </div>
  )
}

export default App
