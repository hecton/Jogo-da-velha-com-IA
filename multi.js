// variaveis do tabuleiro e placar
	var game = {
		tiles: [-1, -1, -1, -1, -1, -1, -1, -1, -1],
		quemJoga: -1,
		jogada: 0,
		playerScore: 0,
		player2Score: 0,
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
			document.getElementById('pontos2').innerHTML = 'Player 2: '+this.player2Score;
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
					this.player2Score++;
				}
				this.finished(0);
			}
			else if(this.jogada==9){
				this.finished(1);
			}
			else{
				if(who==1)
					info('Jogador 2 faz a proxima jogada','black');
				else
					info('Jogador 1 faz a proxima jogada','black');
			}
		},
		finished: function(tp){
			var color = 'green';
			if(tp==0){
				if(this.winner==1){
					info('O jogador 1 venceu.');
				}
				else{
					info('O Jogador 2 venceu.');
					color='orange'
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
				document.getElementById('tile'+i).setAttribute('onclick','played('+i+')');
				document.getElementById('tile'+i).style='';	
			}
			run();
		},

		dis: function(){
			if(game.quemJoga==1)
				this.playerScore++;
			else
				this.player2Score++;

			this.finishedUp();
		},

		reiniciar: function(){
			this.finishedUp();
			this.playerScore=0;
			this.player2Score=0;
		}
	}
// função que vai analisar e fazer a jogada.

	function played(tile){
		if(game.tiles[tile-1]!=-1){
			info('Já foi feito uma jogada nessa posição.', 'red');
		}else{
			var anterior = game.quemJoga;
			if(game.quemJoga==1){
				game.tiles[tile-1]=1;
				document.getElementById('tile'+tile).innerHTML = 'X';
				game.quemJoga=2;
			}
			else{
				game.tiles[tile-1]=2;
				document.getElementById('tile'+tile).innerHTML = 'O';
				console.clear();
				game.quemJoga=1;
			}
			game.jogada++;
			game.win(anterior);
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

	var inicio = Math.floor(Math.random()*10);
	if(inicio%2==0){
		info('Jogador 1 começa!', 'black');
		game.quemJoga=1;
	}else{
		info('Jogador 2 começou!', 'black');
		game.quemJoga=2;
	}
}

run();