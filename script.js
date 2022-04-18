(() => {
  let app = {
    //Criando atributos pra facilitar a codificação
    tabuleiro: document.querySelector("#tabuleiro"),
    lista: "https://picsum.photos/v2/list?page=2&limit=8",
    imagemEspecifica: "https://picsum.photos/id/",
    fundo: `https://picsum.photos/id/125/80?grayscale`,
    tamanhoImagem: 80,
    imagensIds: [],

    iniciaJogo: function(){
      this.criaLinhas();
    },

    // Cria 4 divs com class= "row"
    criaLinhas: function() {
      console.log("inicio cria linhas");
      for (let i = 0; i < 4; i++) {
        let linha = document.createElement("div");
        linha.className = "row";
        this.tabuleiro.appendChild(linha);
      }
      this.criaColunas();
    },

    // Cria 4 divs com class="col-3" para cada uma das divs com class = "row"
    criaColunas: function() {
      console.log("inicio cria colunas");
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

    criaImagens: function() {
      console.log("inicio cria imagens");
      var colunas = document.querySelectorAll(".col-3");
      for (let i = 0; i < colunas.length; i++) {
        let imagem = document.createElement("img");
        imagem.className = "carta";
        imagem.src = this.fundo;
        
        imagem.crossorigin = "anonymous";
        colunas[i].appendChild(imagem);
      }
      this.buscaImagens();
    },

    /*Faz a busca das imagens na api da PicSum e armazena os id's das imagens 2 vezes em uma lista*/
    buscaImagens: function() {
      console.log("inicio busca imagens");
      fetch(this.lista).then(resposta => resposta.json()).then(listaImagens => {
        for (imagem of listaImagens) {
          for (let i = 0; i < 2; i++) {
            this.imagensIds.push(imagem.id);
          }
        }
        console.log("fim fetch");
        this.embaralhaCartas();
      });
    },

    //Embaralha os endereços na lista imagensId
    embaralhaCartas: function() {
      console.log("inicio embaralhamento");
      for (let i = 0; i < this.imagensIds.length; i++) {
        let p = Math.floor(Math.random() * this.imagensIds.length);
        let aux = this.imagensIds[p];
        this.imagensIds[p] = this.imagensIds[i];
        this.imagensIds[i] = aux;
      }
      this.viraCartas();
    },

    /*Muda as src`s das imagens de acordo com a lista de Ids e atribui o id como valor de 
    referencia para a carta*/
    viraCartas: function() {
      
      var imagens = document.querySelectorAll("#tabuleiro img");
      for (let i = 0; i < imagens.length; i++) {
        imagens[i].classList.add('virada')
        imagens[i].setAttribute("data-valor", this.imagensIds[i]);
        imagens[i].src = `${this.imagemEspecifica}${this.imagensIds[i]}/${this
          .tamanhoImagem}`;
      }
      setTimeout(() => {
        this.desviraCartas();
      }, 5000);
    },
    // Retorna as src`s das imagens para a imagem de fundo
    desviraCartas: function() {
      console.log("inicio desvira cartas");
      var imagens = document.querySelectorAll("#tabuleiro img");

      for (let i = 0; i < imagens.length; i++) {
        imagens[i].classList.remove('virada')
        imagens[i].src = `${this.fundo}`;
        imagens[i].crossorigin = "anonymous";
      }
    },

    //Variáveis auxiliares para controlar comportamento do jogo
    cliqueTravado: false,
    temCartaVirada: false,
    posicaoCartaVirada: -1,
    pontos: 0,
    primeiraCarta: null,
    segundaCarta: null,

    resetaEstadosJogo: function(){
      [this.cliqueTravado, this.temCartaVirada] = [false, false];
      [this.primeiraCarta, this.segundaCarta] = [null, null];
    },




     


  };
  onload = () => {
    app.criaLinhas();
    document.querySelector("#btInicio").onclick= app.viraCartas();

  };
})();
