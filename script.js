(() => {
  let app = {
    iniciaJogo: function() {
      //Criando atributos pra facilitar a codificação

      let tabuleiro = document.querySelector("#tabuleiro");
      let lista = "https://picsum.photos/v2/list?page=2&limit=8";
      let imagemEspecifica = "https://picsum.photos/id/";
      let fundo = `https://picsum.photos/id/125/80?grayscale`;
      let tamanhoImagem = 80;
      let imagensId = [];

      criaLinhas();
      // Cria 4 divs com class= "row"
      function criaLinhas() {
        console.log("inicio cria linhas");
        for (let i = 0; i < 4; i++) {
          let linha = document.createElement("div");
          linha.className = "row";
          tabuleiro.appendChild(linha);
        }
        criaColunas();
      }

      // Cria 4 divs com class="col-3" para cada uma das divs com class = "row"
      function criaColunas() {
        console.log("inicio cria colunas");
        var linhas = document.querySelectorAll(".row");
        for (let i = 0; i < linhas.length; i++) {
          for (let j = 0; j < 4; j++) {
            let coluna = document.createElement("div");
            coluna.className = "col-3";
            linhas[i].appendChild(coluna);
          }
        }
        criaImagens();
      }

      /* Cria 1 imagem para cada div class="col-3". As imagens possuem class="carta" e para cada uma delas foi atribuída um data-valor=0. */
      function criaImagens() {
        console.log("inicio cria imagens");
        var colunas = document.querySelectorAll(".col-3");
        for (let i = 0; i < colunas.length; i++) {
          let imagem = document.createElement("img");
          imagem.className = "carta";
          imagem.src = fundo;

          imagem.crossorigin = "anonymous";
          colunas[i].appendChild(imagem);
        }
        buscaImagens();
      }

      /*Faz a busca das imagens na api da PicSum e armazena os id's das imagens 2 vezes em uma lista*/
      async function buscaImagens() {
        console.log("inicio busca imagens");
        await fetch(lista)
          .then(resposta => resposta.json())
          .then(listaImagens => {
            for (imagem of listaImagens) {
              for (let i = 0; i < 2; i++) {
                imagensId.push(imagem.id);
              }
            }
            console.log("fim fetch");
            embaralhaCartas();
          });
      }
      //Embaralha os endereços na lista imagensId
      function embaralhaCartas() {
        console.log("inicio embaralhamento");
        for (let i = 0; i < imagensId.length; i++) {
          let p = Math.floor(Math.random() * imagensId.length);
          let aux = imagensId[p];
          imagensId[p] = imagensId[i];
          imagensId[i] = aux;
        }
        viraCartas();
      }
      /*Muda as src`s das imagens de acordo com a lista de Ids e atribui o id como valor de 
      referencia para a carta*/
      function viraCartas() {
        console.log("Vira Cartas");
        let imagens = document.querySelectorAll("#tabuleiro img");
        for (let i = 0; i < imagens.length; i++) {
          imagens[i].classList.add("virada");
          imagens[i].setAttribute("data-valor", imagensId[i]);
          imagens[i].src = `${imagemEspecifica}${imagensId[
            i
          ]}/${tamanhoImagem}`;
        }
        setTimeout(() => {
          desviraCartas();
        }, 5000);
      }
      // Retorna as src`s das imagens para a imagem de fundo
      function desviraCartas() {
        console.log("inicio desvira cartas");
        var imagens = document.querySelectorAll("#tabuleiro img");

        for (let i = 0; i < imagens.length; i++) {
          imagens[i].classList.remove("virada");
          imagens[i].src = `${fundo}`;
          imagens[i].crossorigin = "anonymous";
        }
      }

      //Variáveis auxiliares para controlar comportamento do jogo
      const cartas = document.querySelectorAll(".col-3 img");
      let cliqueTravado = false;
      let temCartaVirada = false;
      let posicaoCartaVirada = -1;
      let pontos = 0;
      let primeiraCarta = null;
      let segundaCarta = null;
      let valorCartaVirada = 0;
      // Vira uma carta
      function viraCarta() {
        if (cliqueTravado) return;
        if (this === primeiraCarta) return;

        this.classList.add("virada");
        this.src = `${imagemEspecifica}${this.getAttribute(
          "data-valor"
        )}/${tamanhoImagem}`;
        if (!temCartaVirada) {
          //primeiro click
          temCartaVirada = true;
          primeiraCarta = this;
          console.log(primeiraCarta);
          return;
        }
        // Segundo click
        segundaCarta= this

        verificaCombinacao();      
      }
      function verificaCombinacao(){
        let combina = primeiraCarta.dataset.valor === segundaCarta.dataset.valor;
        combina ? desabilitaCartas() : desviraCarta();
      }

      function desabilitaCartas() {
        primeiraCarta.removeEventListener('click', viraCarta);
        segundaCarta.removeEventListener('click', viraCarta);
      }

      function desviraCarta(){
        cliqueTravado = true;

        setTimeout(()=>{
          primeiraCarta.src = `${imagemEspecifica}${primeiraCarta.getAttribute("data-valor")}/${tamanhoImagem}`;
          primeiraCarta.classList.remove('virada');
          
          segundaCarta.classList.remove('virada');

          resetaTabuleiro();
        },2000)
      }
      function resetaTabuleiro(){
        [temCartaVirada, cliqueTravado] = [false, false];
  [primeiraCarta, segundaCarta] = [null, null];
      }

      cartas.forEach(carta => carta.addEventListener("click", viraCarta));
    }
  };
  

  onload = () => {
    //app.iniciaJogo();
    document.querySelector("#btInicio").onclick = app.iniciaJogo;
  };
})();
