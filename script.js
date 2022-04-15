(() => {
  let app = {
    //Criando atributos pra facilitar a codificacao
    tabuleiro : document.querySelector("#tabuleiro"),
    
    lista :"https://picsum.photos/v2/list?page=2&limit=8",
    imagemEspecifica : "https://picsum.photos/id/",
    fundo : `https://picsum.photos/id/125/80?grayscale`,

    criaLinhas : function(){
      for (let i = 0; i < 4; i++) {
        let linha = document.createElement("div");
        linha.className = "row";
        this.tabuleiro.appendChild(linha);
      }
    },


    
  }
  onload = () => {
    
    app.criaLinhas();
    app.criaColunas()
    
  }
})();
