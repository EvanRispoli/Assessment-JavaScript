(() => {
  let app = {
    //Criando atributos pra facilitar a codificação
    tabuleiro: document.querySelector("#tabuleiro"),

    lista: "https://picsum.photos/v2/list?page=2&limit=8",
    imagemEspecifica: "https://picsum.photos/id/",
    fundo: `https://picsum.photos/id/125/80?grayscale`,

    // Cria 4 divs com class= "row"
    criaLinhas: function() {
      for (let i = 0; i < 4; i++) {
        let linha = document.createElement("div");
        linha.className = "row";
        this.tabuleiro.appendChild(linha);
      }
      this.criaColunas();
    },

    // Cria 4 divs com class="col-3" para cada uma das divs com class = "row"
    criaColunas: function() {
      var linhas = document.querySelectorAll(".row");
      for (let i = 0; i < linhas.length; i++) {
        for (let j = 0; j < 4; j++) {
          let coluna = document.createElement("div");
          coluna.className = "col-3";
          linhas[i].appendChild(coluna);
        }
      }
      this.criaImagens();
    },

    /* Cria 1 imagem para cada div class="col-3". As imagens possuem class="carta" e para cada uma delas foi atribuída um data-valor=0. */

    criaImagens:  function() {
      var colunas = document.querySelectorAll(".col-3");
      for (let i = 0; i < colunas.length; i++) {
        let imagem = document.createElement("img");
        imagem.className = "carta";
        imagem.src = this.fundo;
        imagem.setAttribute("data-valor", 0);
        colunas[i].appendChild(imagem);
      }
	  this.buscaImagens();
    },

    
    imagensSrc: [],
    /*Faz a busca das imagens na api da PicSum e armazena os id's das imagens 2 vezes em uma lista*/
    buscaImagens: function() {
      fetch(this.lista).then(resposta => resposta.json())
      .then(listaIMagens => {
        for (imagem of listaIMagens) {
          for (let i = 0; i < 2; i++) {
            this.imagensSrc.push(imagem.download_url);
          }
        }
        this.embaralhaCartas();
      });
    return this.imagensSrc;
    },

	
  };
  onload = () => {
    app.criaLinhas();
  };
})();
