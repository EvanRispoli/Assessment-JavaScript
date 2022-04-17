(() => {
  let app = {
    //Criando atributos pra facilitar a codificação
    tabuleiro: document.querySelector("#tabuleiro"),
    lista: "https://picsum.photos/v2/list?page=2&limit=8",
    imagemEspecifica: "https://picsum.photos/id/",
    fundo: `https://picsum.photos/id/125/80?grayscale`,
    tamanhoImagem: 80,
    

    // Cria 4 divs com class= "row"
    criaLinhas: function() {
      console.log("inicio cria linhas")
      for (let i = 0; i < 4; i++) {
        let linha = document.createElement("div");
        linha.className = "row";
        this.tabuleiro.appendChild(linha);
      }
      this.criaColunas();
    },

    // Cria 4 divs com class="col-3" para cada uma das divs com class = "row"
    criaColunas: function() {
      console.log("inicio cria colunas")
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
      console.log("inicio cria imagens")
      var colunas = document.querySelectorAll(".col-3");
      for (let i = 0; i < colunas.length; i++) {
        let imagem = document.createElement("img");
        imagem.className = "carta";
        imagem.src = this.fundo;
        imagem.setAttribute("data-valor", 0);
        imagem.crossorigin = "anonymous"
        colunas[i].appendChild(imagem);
      }
	  this.buscaImagens();
    },
    
    imagensIds: [],
    /*Faz a busca das imagens na api da PicSum e armazena os id's das imagens 2 vezes em uma lista*/
    buscaImagens: function() {
      console.log("inicio busca imagens")
      fetch(this.lista).then(resposta => resposta.json())
      .then(listaImagens => {
        for (imagem of listaImagens) {
          for (let i = 0; i < 2; i++) {
            this.imagensIds.push(imagem.id);
          }
        }
        console.log("fim fetch")
        this.embaralhaCartas();
      });
      
    },
    
    viraCartas: function(){
      console.log("inicio vira cartas")
      var imagens = document.querySelectorAll('#tabuleiro img');
      for (let i = 0; i < imagens.length; i++) {
        imagens[i].src = `${this.imagemEspecifica}${this.imagensIds[i]}/${this.tamanhoImagem}`
      }
      setTimeout(() => {this.desviraCartas()}, 3000);
      setTimeout(() => {console.log("cartas viradas")}, 3000);
      
    },

    desviraCartas: function(){
      console.log("inicio vira cartas")
      var imagens = document.querySelectorAll('#tabuleiro img');
      console.log(`${this.fundo}${this.imagensIds[0]}${this.tamanhoImagem}`)
      for (let i = 0; i < imagens.length; i++) {
        imagens[i].src = `${this.fundo}${this.imagensIds[i]}/${this.tamanhoImagem}`
        imagens[i].crossorigin = "anonymous"
      }

    },


    //Embaralha os endereços na lista imagensSrc 
    embaralhaCartas: function() {
      console.log("inicio embaralhamento")
        for (let i = 0; i < this.imagensIds.length; i++) {
        let p = Math.floor(Math.random() * this.imagensIds.length);
        let aux = this.imagensIds[p];
        this.imagensIds[p] = this.imagensIds[i];
        this.imagensIds[i] = aux
      }
      this.viraCartas();
      
    }, 

   

	
  };
  onload = () => {
    app.criaLinhas();
  };
})();
