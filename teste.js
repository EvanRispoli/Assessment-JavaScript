  let imagensId = [];
  //Variaveis auxuliares para controlar comportamento do jogo
  let cliqueTravado = false;
  let temCartaVirada = false;
  let posicaoCartaVirada = -1;
  let valorCartaVirada = -1;
  let pontos = 0;
  let primeiraCarta, segundaCarta;
  let app = {
    tabuleiro: document.querySelector("#tabuleiro"),

    list: "https://picsum.photos/v2/list?page=2&limit=8",

    specific: "https://picsum.photos/id/",
    fundo: `https://picsum.photos/id/125/80?grayscale`,

    width: 80,

    montaEstrutura: function() {
      for (let index = 0; index < 4; index++) {
        let row = document.createElement("div");
        row.className = "row";
        this.tabuleiro.appendChild(row);
        for (let index = 0; index < 4; index++) {
          let col = document.createElement("div");
          col.className = "col-3";
          col.classList.add("carta-memoria")
          row.appendChild(col);

          let imagem = document.createElement("img");
          imagem.id = "";
          imagem.className = "carta";
          imagem.src = this.fundo;
          //imagem.style.opacity = "0.5";
          col.appendChild(imagem);
        }
      }

      let elementosImg = document.querySelectorAll(".carta");
      elementosImg.forEach((img, i) => {
        img.setAttribute("data-valor", i);
        img.setAttribute("id", `i${i}`);
      });
    },

    buscarImgs: function() {
      fetch(this.list).then(res => res.json()).then(listaImagens => {
        for (imagem of listaImagens) {
          imagensId.push(imagem.id);
          imagensId.push(imagem.id);
        }
      });
    }
  };
  function IniciaJogo() {
    function embaralha(){
      for (let i = 0; i < imagensId.length; i++) {
        let p = Math.floor(Math.random() * imagensId.length);
        let aux = imagensId[p];
        imagensId[p] = imagensId[i];
        imagensId[i] = aux;
      }
      cliqueTravado = false;
      temCartaVirada = false;
      posicaoCartaVirada = -1;
      valorCartaVirada = -1;
      pontos = 0;
     
    }
    embaralha();
    document.querySelector("#btInicio").disabled = true;
       

    const cliqueImagem = e => {
      if (cliqueTravado) return;
      const p = e.target.getAttribute("data-valor");
      var valor = imagensId[p];
      e.target.src = app.specific + valor + "/" + app.width;
      e.target.onclick = null;
      if (!temCartaVirada) {
        temCartaVirada = true;
        posicaoCartaVirada = p;
        valorCartaVirada = valor;
      } else {
        if (valor == valorCartaVirada) {
          pontos++;
        } else {
          cliqueTravado = true;
          const p0 = posicaoCartaVirada;
          cliquesTravados = true;
          setTimeout(() => {
            e.target.src = app.fundo;
            e.target.onclick = cliqueImagem;
            let img = document.querySelector("#tabuleiro #i" + p0);

            img.src = app.fundo;
            img.onclick = cliqueImagem;
            cliqueTravado = false;
          }, 1500);
        }
        temCartaVirada = false;
        posicaoCartaVirada = -1;
        valorCartaVirada = "";
      }

      if (pontos == 8) {
        //document.location.reload(true);
        document.querySelector("#btInicio").disabled = false;
        document.querySelector('#timer').style.backgroundColor = 'green'

        embaralha();
      }
    };
    let cartas = document.querySelectorAll("#tabuleiro img");
    cartas.forEach((img, i) => {
      img.style.opacity = "1";
      img.onclick = cliqueImagem;
      img.src = app.fundo;
      
    });

  


    ////////////////////////////
    
   
  }

  onload = () => {
    app.buscarImgs();
    app.montaEstrutura();

    document.querySelector("#btInicio").onclick = IniciaJogo;
  };