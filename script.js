(() => {
  let app = {
    //Criando atributos pra facilitar a codificacao
    tabuleiro : document.querySelector("#tabuleiro"),
    
    lista :"https://picsum.photos/v2/list?page=2&limit=8",
    imagemEspecifica : "https://picsum.photos/id/",
    fundo : `https://picsum.photos/id/125/80?grayscale`,

    criaTabuleiro : function(){
      //Cria 4 divs com classe row
      for (let i = 0; i < 4; i++) {
        let linha = document.createElement("div");
        linha.className = "row";
        this.tabuleiro.appendChild(linha);
        // Cria 4 divs com classe Col-3 dentro de cada uma das rows
        for (let i = 0; i < 4 ; i++){
          let coluna = document.createElement("div")
          coluna.className = ("col-3")
          linha.appendChild(coluna)
          // Cria uma imagem para cada coluna e atribui class= carta e id= vazio
        let imagem = document.createElement("img");
        imagem.id = "";
        imagem.className = "carta";
        imagem.src = this.fundo;
        imagem.style.opacity = "0.5";
        coluna.appendChild(imagem);
        }
      }

    },

    criaColunas : function(){
      
    }


    
  }
  onload = () => {
    
    app.criaTabuleiro();
    //app.criaColunas()
    
  }
})();
