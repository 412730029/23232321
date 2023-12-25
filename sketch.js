var sound1;
function preload(){
  sound1 = loadSound("47538_feveran_strong_rock.mp3")
}

var pos_x=[]
var pos_y=[]
var sizes=[]
var colors=[]
var v_y=[]    //移動速度y軸
var v_x=[]    //移動速度x軸
var txts   //宣告一個變數，txts變數存放著文字框內容
var face_move_var = false   //臉物件移動條件，如果為true，臉物件就會移動，如果為false就不會移動

function setup() {
  createCanvas(windowWidth,windowHeight);
  analyzer = new p5.Amplitude();
  analyzer.setInput(sound1);

  //文字框的設定
  inputElement = createInput("我是熊本熊")  //產生一個文字方塊，""內的文字為預設顯示的文字
  inputElement.position(20,10)   //把文字方塊放置(10,10)
  inputElement.size(140,80)      //文字框的寬與高

  //以下的style，可以搜尋HTML、INPUT、CSS找到相關資料
  inputElement.style("font-size","20px")        //文字框內的文字大小
  inputElement.style("color","#fff")           //文字框內的文字顏色
  inputElement.style("background","#bde0fe")   //文字框的背景顏色
  inputElement.style("border","none")         //文字框沒有框線

  //"音樂"按鈕的設定
  btnMoveElement = createButton("播放音樂")       //產生一個按鈕，上面有"移動"的字
  btnMoveElement.position(200,10)            //按鈕的位置170，高度10
  btnMoveElement.size(250,80)                 //按鈕的寬與高
  btnMoveElement.style("font-size","40px")   //文字框內的文字大小
  btnMoveElement.style("color","255")       //文字框內的文字顏色
  btnMoveElement.style("background","45")   //文字框的背景顏色
  btnMoveElement.mousePressed(face_move)      //按鈕按下後會執行face_move函數
  
  
  //"暫停音樂"按鈕的設定
  btnStopElement = createButton("暫停音樂")
  btnStopElement.position(500,10)             //按鈕的位置
  btnStopElement.size(250,80)                //按鈕的寬與高
  btnStopElement.style("font-size","40px")   //按鈕內的文字大小
  btnStopElement.style("color","255")       //按鈕內的文字顏色
  btnStopElement.style("background","45")  
  btnStopElement.mousePressed(face_stop)    //按鈕被按下後會執行face_move的函數    

}

function draw() {
  background("#edede9");
  for(var i=0;i<pos_x.length;i=i+1)   //依照pos_x內有n筆資料，就產生n個物件
  {
    push()
      txts = inputElement.value();
       translate(pos_x[i],pos_y[i])
       drawface(colors[i],0,sizes[i])
    pop()
    pos_y[i] = pos_y[i] + v_y[i]   //移動的計算，改變物件的位置


  //============================碰到邊會消失的Code============================
    if(pos_y[i]>height || pos_y[i]<0)      //判斷有沒有碰到上下邊，碰到時就刪除所有陣列的該筆資料
    {
      pos_x.splice(i,1)                    //將碰到邊的陣列元素刪除，把第i筆資料刪除1筆資料
      pos_y.splice(i,1)
      sizes.splice(i,1)
      colors.splice(i,1)
      v_y.splice(i,1)
    }
  }

}

function drawface(face_clr=255,eye_clr=0,size=1){       //255與0為預設的值
push()   //自行設定格式

  scale(size)  //宣告放大縮小的比例尺
  

  //文字框的顯示格式
  fill("#333d29")
  textSize(80)
  text(txts,700,700)   //顯示文字

  fill(face_clr)

  //頭
  fill(0)
  ellipse(900,300,360)

  //左眼
  fill(255)
  ellipse(830,250,75)
  fill(0)             //左眼球
  ellipse(830,250,24)

  //右眼
  fill(255)
  ellipse(980,250,75)
  fill(0)             //右眼球
  ellipse(980,250,24)

  //嘴巴
  push()
    fill(255)   
    ellipse(905,370,130,80)
  pop()

  //臉頰
  fill("#e63946")
  ellipse(740,348,100)   //左臉頰
  fill("#e63946")
  ellipse(1060,348,100)  //右臉頰

  //耳朵
  fill(0)
  ellipse(790,155,120)
  fill(0)
  ellipse(1015,155,120)

  fill(255)
  ellipse(790,155,55)
  fill(255)
  ellipse(1017,152,55)

  //身體
  push()
    fill(0)
		ellipseMode(CORNER)   
		ellipse(730,470,345,100)
	pop()

pop()   //原本設定的格式全部取消

}

function mousePressed(){
 if(mouseY>60){          //設定y軸為0~60間的座標值都不產生新的物件
  pos_x.push(mouseX)   //放一筆新的資料到pos_x陣列內，資料為按下滑鼠的x軸
  pos_y.push(mouseY)   //放一筆新的資料到pos_y陣列內，資料為按下滑鼠的y軸
  sizes.push(random(0.5,0.3))   //放一筆新的資料到sizes陣列內，資料為產生一個亂數，為物件的大小
  colors.push(face_colors[int(random(face_colors.length))])   //放一筆新資料到colors列內，資料為顏色序列face_colors內亂數取
  v_y.push(random(-1,1))   //放一筆新資料到v_y陣列內，資料為物件移動的y軸速度，速度值為亂數取-1到1之間，負值為往下，正值為往下
  }
}

function face_move(){
  face_move_var = true
  sound1.play();
}

function face_stop(){
  face_move_var = false
  sound1.stop();

}


var face_colors = "edede9-d6ccc2-f5ebe0-e3d5ca-d5bdaf".split("-").map(a=>"#"+a)
var eye_colors = "e7ecef-274c77-6096ba-a3cef1-8b8c89".split("-").map(a=>"#"+a)