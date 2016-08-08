/*===================================
 * fileName: main.js
 * author: Tentel
 * version: 1.0
 * description: 2048's javascript
 ===================================*/


var poxArray = [];
var flow = false;
var num = $('.score_num').html();



/*get init Date*/
function initDate() {
	for (var i = 1; i < 5; i++) {
		poxArray[i] = [];
		for (var j = 1; j < 5; j++) {
			poxArray[i][j] = 0;
		};
	};

};

/*init page*/
(function init () {
	var tableData = [];
	tableData.push('<table>');
	for (var i = 0; i < 4; i++) {
		tableData.push('<tr>');
		for (var j = 0; j < 4; j++) {
			tableData.push('<td><div class="item" id="'+(i+1)+'_'+(j+1)+'"></div></td>');
		};
		tableData.push('</tr>');
	};
	tableData.push('</table>');
	tableData = tableData.join('');
	$('#game_box').append(tableData);
})();

/*random 2/4 */
function randomFuc () {
	var flow = true;
	while(1){
		var X = Math.round(Math.random()*3 + 1);
	    var Y = Math.round(Math.random()*3 + 1);
	    var num = Math.round(Math.random()*4) < 3 ? 2 : 4;
	    if(poxArray[X][Y] == 0 ){
        	poxArray[X][Y] = num;
        	break;
	    }
	}
	showNum();
};


/*refresh DOM*/
function showNum (array) {
	for (var i = 1; i < 5 ; i++) {
		for (var j = 1; j < 5; j++){
			$('#'+i+'_'+j+'').attr('class','item');
			$('#'+i+'_'+j+'').html('');
			if(poxArray[i][j] !== 0){
            	$('#'+i+'_'+j+'').addClass('item'+poxArray[i][j]);
            	$('#'+i+'_'+j+'').html(poxArray[i][j]);
			}
		}
	};
};


/*move*/
function toLeft (i) {
	var len = poxArray.length;
	for (var j = 1; j < len-1; j++) {
		if(poxArray[i][j] == 0 && poxArray[i][j+1] !==0 ){
			flow = true;
			poxArray[i][j] = poxArray[i][j+1];
			poxArray[i][j+1] = 0;
			toLeft(i);
		}
	};
	
}

function toRight (i) {
	var len = poxArray.length;
	for (var j = len-1; j > 1 ; j--) {
		if(poxArray[i][j] == 0 && poxArray[i][j-1] !==0 ){
			flow = true;
			poxArray[i][j] = poxArray[i][j-1];
			poxArray[i][j-1] = 0;
			toRight(i);
		}
	};
	
}

function toTop (i) {
	var len = poxArray.length;
	for (var j = 1; j < len-1; j++) {
		if(poxArray[j][i] == 0 && poxArray[j+1][i] !==0 ){
			flow = true;
			poxArray[j][i] = poxArray[j+1][i];
			poxArray[j+1][i] = 0;
			toTop(i);
		}
	};
	
}

function toBottom (i) {
	var len = poxArray.length;
	for (var j = len-1; j > 1 ; j--) {
		if(poxArray[j][i] == 0 && poxArray[j-1][i] !==0 ){
			flow = true;
			poxArray[j][i] = poxArray[j-1][i];
			poxArray[j-1][i]= 0;
			toBottom(i);
		}
	};
	
}

/*left Combination*/
function leftComb (i) {
	var len = poxArray.length;
	for (var j = 1; j < len-1; j++) {
		if(poxArray[i][j] ==  poxArray[i][j+1] && poxArray[i][j+1] !==0 ){
			poxArray[i][j] = poxArray[i][j+1]*2;
			poxArray[i][j+1] = 0;
			toLeft(i);
		}
	};
}

function rightComb (i) {
	var len = poxArray.length;
	for (var j = len-1; j > 1 ; j--) {
		if(poxArray[i][j] ==  poxArray[i][j-1] && poxArray[i][j-1] !==0 ){
			poxArray[i][j] = poxArray[i][j-1]*2;
			poxArray[i][j-1] = 0;
			toRight(i);
		}
	};
}

function topComb (i) {
	var len = poxArray.length;
	for (var j = 1; j < len-1; j++) {
		if(poxArray[j][i] ==  poxArray[j+1][i] && poxArray[j+1][i] !==0 ){
			poxArray[j][i] = poxArray[j+1][i]*2;
			poxArray[j+1][i] = 0;
			toTop(i);
		}
	};
}

function bottomComb (i) {
	var len = poxArray.length;
	for (var j = len-1; j > 1 ; j--) {
		if(poxArray[j][i] ==  poxArray[j-1][i] && poxArray[j-1][i] !==0 ){
			poxArray[j][i] = poxArray[j-1][i]*2;
			poxArray[j-1][i] = 0;
			toBottom(i);
		}
	};
}

/*游戏失败*/
function gameover () {

	var len = poxArray.length;
	var cNum = 0;
	for (var i = 1; i < len; i++) {
		for (var j = 1; j < len; j++) {
			if(poxArray[i][j] !== 0){
				cNum++;
			}
		};
	};
	if(cNum == 16){
		for (var i = 1; i < len; i++) {
			for (var j = 1; j < len-1; j++) {
				if(poxArray[i][j]==poxArray[i][j+1]||poxArray[j][i]==poxArray[j+1][i]){return;}
			};
		};
		alert('game over!');
		$('.begin').html('try agin');
	}
}


$(document).keydown(function(e) {
	flow = false;
	var len = poxArray.length;
	if(e.keyCode == 37){
		for (var i = 1; i < poxArray.length; i++) {
			toLeft(i);
			leftComb(i);
		}
	};
	if(e.keyCode == 38){
		for (var i = 1; i < poxArray.length; i++) {
			toTop(i);
			topComb(i);
		}
	};
	if(e.keyCode == 39){
		for (var i = 1; i < poxArray.length; i++) {
			toRight(i);
			rightComb(i);
		}
	};
	if(e.keyCode == 40){
		for (var i = 1; i < poxArray.length; i++) {
			toBottom(i);
			bottomComb(i);
		}
	};
	for (var i = 1; i < len; i++) {
		for (var j = 1; j < len; j++) {
			if(num < poxArray[i][j]){
				num = poxArray[i][j];
			}
		};
	};
	$('.score_num').html(num);
	if(flow){
		randomFuc();
	}else{
		gameover();
	}
	showNum();
	if(num === 2048){
		alert('you are win!')
	}
});

$('.begin').click(function() {
	initDate();
	randomFuc();
	$('.score_num').html('0');
});

$('.tips').click(function() {
	$(this).hide();
	$('#tips').animate({left: '15px'}, 500)
	setTimeout(function() {
	$('#tips').animate({left: '-270px'}, 500)
	$('.tips').show(500);
	}, 3000);
});




	
