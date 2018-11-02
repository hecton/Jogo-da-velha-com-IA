// variaveis do tabuleiro e placar
	var game = {
		tiles: [-1, -1, -1, -1, -1, -1, -1, -1, -1],
		jogada: 0,
		playerScore: 0,
		cpuScore: 0,
		winner: 0,
		posi: [0, 3, 6],
		teste: function(who, init, comp, mod, v1, v2){
			var winnr=0;
			var i=init;
			while(i<=comp){
				if(game.tiles[i]==who && game.tiles[i+v1]==who && game.tiles[i+v2]==who ){
					winnr=who;
					this.posi = [i, i+v1+1, i+v2+1];
				}
				i+=mod;
			}
			return winnr;
		},

		rezero: function(){
			this.tiles= [-1, -1, -1, -1, -1, -1, -1, -1, -1];
			this.jogada= 0;
			this.vez= 0;
			this.winner= 0;
			document.getElementById('pontos1').innerHTML = 'Player 1: '+this.playerScore;
			document.getElementById('pontos2').innerHTML = 'Player 2: '+this.cpuScore;
			for(var i=1; i<=9; i++){
				document.getElementById('tile'+i).innerHTML = '';
			}
		},

		win: function(who){
			console.log("*Função win()");
			this.winner = this.teste(1, 0, 2, 1, 3, 6);
			if(this.winner==0){ this.winner = this.teste(1, 0, 6, 3, 1, 2);}
			if(this.winner==0){ this.winner = this.teste(1, 0, 0, 1, 4, 8);}
			if(this.winner==0){ this.winner = this.teste(1, 2, 2, 1, 2, 4);}

			if(this.winner==0){ this.winner = this.teste(2, 0, 2, 1, 3, 6);}
			if(this.winner==0){ this.winner = this.teste(2, 0, 6, 3, 1, 2);}
			if(this.winner==0){ this.winner = this.teste(2, 0, 0, 1, 4, 8);}
			if(this.winner==0){ this.winner = this.teste(2, 2, 2, 1, 2, 4);}

			this.posi[0]++;
			if(this.winner!=0){
				if(this.winner==1){
					this.playerScore++;
				}else{
					this.cpuScore++;
				}
				this.finished(0);
			}
			else if(this.jogada==9){
				this.finished(1);
			}
			else{
				if(who==1){
					ia.run();
				}
			}
		},
		finished: function(tp){
			var color = 'orange';
			if(tp==0){
				if(this.winner==1){
					info('O jogador venceu!');
				}
				else{
					info('O CPU venceu.');
					color='red';
				}
				document.getElementById('tile'+this.posi[0]).style='background: '+color+';';
				document.getElementById('tile'+this.posi[1]).style='background: '+color+';';
				document.getElementById('tile'+this.posi[2]).style='background: '+color+';';

			}else{
				info('Deu empate.');
			}

			document.getElementById('btn_finish').style = 'display: block;';
			document.getElementById('menu').style = 'display: none;';
			for(var i=1; i<=9; i++){
				document.getElementById('tile'+i).setAttribute('onclick','');
			}
			
		},
		finishedUp: function(){
			this.rezero();
			document.getElementById('btn_finish').style = 'display: none;';
			document.getElementById('menu').style = 'display: block;';
			for(var i=1; i<=9; i++){
				document.getElementById('tile'+i).setAttribute('onclick','played('+i+', 1)');
				document.getElementById('tile'+i).style='';	
			}
			run();
		},
		dis: function(){
			this.cpuScore++;
			this.finishedUp();
		},
		reiniciar: function(){
			this.finishedUp();
			this.playerScore=0;
			this.cpuScore=0;
		}
	}
// função de inteligencia artifificial
	var ia = {
		dificuldade: 2,

		dificult: function(valor){
			this.dificuldade=valor;
			document.getElementById('level1').style='background: lightgreen;';
			document.getElementById('level2').style='background: orange;';
			document.getElementById('level3').style='background: red;';
			for(var i=1; i<=3; i++){
				document.getElementById('level'+i).innerHTML='<p>Level '+i+'<p>';
			}
			document.getElementById('level'+ia.dificuldade).style='background: lightgrey; color: white;';
			document.getElementById('level'+ia.dificuldade).innerHTML= '<p>>>LEVEL '+valor+'<<<p>';

		},

		run: function(){
			console.log('*IA iniciada');
			switch(this.dificuldade){
				case 1:
					this.lvl1();
				break;
				case 2:
					this.lvl2();
				break;
				case 3:
					this.lvl3();
			}
		},

		lvl1: function(){
			console.log("  jogada level1");

			var tile = -1;
			do{
				do{
					tile = Math.floor(Math.random()*10)
				}while(tile<1 || tile>9);
			}while(game.tiles[tile-1]!=-1);
			played(tile, 2);
		},

		teste: function(init, comp, mod, v1, v2, teste){
			var jogada = -1;
			var i=init
			do{
				if(game.tiles[i]== teste && game.tiles[i+v1] == teste && game.tiles[i+v2]==-1) { jogada=i+v2+1;}
				i+=mod;
			}while(i<=comp);
			return jogada;
		},

		resultado: function(teste){
			var resultado = this.teste(0, 2, 1, 3, 6,teste);
			if(resultado==-1){ resultado = this.teste(0, 6, 3, 1, 2,teste);}
			if(resultado==-1){ resultado = this.teste(0, 0, 1, 4, 8,teste)}
			if(resultado==-1){ resultado = this.teste(2, 2, 1, 2, 4,teste)}

			if(resultado==-1){ resultado = this.teste(6, 8, 1, -3, -6, teste)}
			if(resultado==-1){ resultado = this.teste(2, 8, 3, -1, -2, teste)}
			if(resultado==-1){ resultado = this.teste(8, 8, 1, -4, -8, teste)}
			if(resultado==-1){ resultado = this.teste(6, 6, 1, -2, -4, teste)}

			if(resultado==-1){ resultado = this.teste(0, 2, 1, 6, 3, teste)}
			if(resultado==-1){ resultado = this.teste(0, 6, 3, 2, 1, teste)}
			if(resultado==-1){ resultado = this.teste(0, 0, 1, 8, 4, teste)}
			if(resultado==-1){ resultado = this.teste(2, 2, 1, 4, 2, teste)}
			return resultado;
		},

		lvl2: function(){
			var tile = this.resultado(1);
			if(tile != -1){
				console.log('  Jogada level2');
				console.log('   <defesa>');
				played(tile, 2);
			}
			else{
				this.lvl1();
			}

		},

		lvl3: function(){
			var tile = this.resultado(2);
			if(tile!=-1){
				console.log('  Jogada level3');
				console.log('   <ataque>');
				played(tile, 2);
			}else{
				this.lvl2();
			}
		}
	}
// função que vai analisar e fazer a jogada.
	function played(tile, who){
		if(game.tiles[tile-1]!=-1){
			info('Já foi feito uma jogada nessa posição.', 'red');
		}else{
			if(who==1){
				game.tiles[tile-1]=1;
				document.getElementById('tile'+tile).innerHTML = 'X';
				console.clear();
			}
			else{
				game.tiles[tile-1]=2;
				document.getElementById('tile'+tile).innerHTML = 'O';
			}
			game.jogada++;
			game.win(who);
		}
	}

// função que vai colocar as informações na barra de informações.
function info(txt, status){
	document.getElementById('txt').innerHTML = txt;
	document.getElementById('txt').style = 'color: '+status+';';
}

// função que vai iniciar o jogo.
function run(){
	console.clear();
	console.log('*Função run()');

	document.getElementById('level'+ia.dificuldade).style='background: lightgrey; color: white;';
	document.getElementById('level'+ia.dificuldade).innerHTML= '<p>>>LEVEL 2<<<p>';

	var inicio = Math.floor(Math.random()*10);
	if(inicio%2==0){
		info('Jogador começa!', 'black');
	}else{
		info('CPU começou!', 'black');
		ia.run();
	}
}

run();