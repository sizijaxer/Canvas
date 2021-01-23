# Software Studio 2020 Spring
## Assignment 01 Web Canvas


### Scoring

| **Basic components**                             | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Basic control tools                              | 30%       | Y         |
| Text input                                       | 10%       | Y         |
| Cursor icon                                      | 10%       | Y         |
| Refresh button                                   | 10%       | Y         |

| **Advanced tools**                               | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Different brush shapes                           | 15%       | Y         |
| Un/Re-do button                                  | 10%       | Y         |
| Image tool                                       | 5%        | Y         |
| Download                                         | 5%        | Y         |

| **Other useful widgets**                         | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Name of widgets                                  | 1~5%     | N         |


---

## How to use 
自網頁中，依據每個button的內容使用:

### 1.以下工具為繪畫工具:
![](https://i.imgur.com/78NjD9N.png)
當按下任一button時，游標在canvas中會轉呈相對應的icon
及告知使用者目前正在使用的工具為何。
若要取消該工具或切換其他工具，只須點其他工具或者在點一次目前工具的button即可。

### 2.以下為打字工具:
![](https://i.imgur.com/v1L9Cnh.png)

當點開Text button 時，會跳出能輸入文字的input。
![](https://i.imgur.com/wWp3Wlz.png)

輸入完文字後，至Canvas中想要放置的位置點下，即可繪製出字串。


Size 與 Font button分別為調整字體大小以及字體樣式的工具，按下該button便能選擇想要呈現的字形。
![](https://i.imgur.com/HCuCdw8.png)


### 3.調整繪畫工具大小及顏色:
![](https://i.imgur.com/V5xk0i5.png)
點開方格會跳出調色盤，選擇欲使用的色彩便能改變其顏色

### 4.以下功能由左至右分別為:undo,redo以及clear:
![](https://i.imgur.com/6ut8wkR.png)
點下即可執行回復或清空功能

### 5.以下工具上下分別為:下在目前canvas 以及 上傳圖片
![](https://i.imgur.com/OSWcsed.png)
點下即可執行功能





## Function description
html檔的內容只要負責網頁骨架的規劃。
CSS負責外觀的美化。
Javascript 主要幾個重要的function如下:
### 1.在canvas中監聽滑鼠的動作:
![](https://i.imgur.com/pkqHkSQ.png)
滑鼠左鍵按下時，會進入開始繪畫的程序。
滑鼠移動時，會進入正在繪圖的程序。
滑鼠左鍵放開時，會進入結束繪畫的程序。
以上3個監聽function的callback為處理繪畫工具以及文字工具的函式動作

### 2.處理clear的方法主要以call fillRect()執行:
![](https://i.imgur.com/xUNvfsy.png)

### 3.處理undo/redo使用了兩個array(pre_pic 以及 next_pic)去記在clear前相對於目前Canvas狀況前後所有發生在Canvas上的過程:
![](https://i.imgur.com/mhceotO.png)


### 4.處理Download:
![](https://i.imgur.com/5u1tmMP.png)

### 5.處理upload:
![](https://i.imgur.com/vH7cZxu.png)

### 7.改變顏色:
![](https://i.imgur.com/OtWg1QH.png)
監聽調色盤是否改變來取得想要的顏色

### 8.所有繪圖過程的處理:
#### a.pen & eraser:
畫線條與用橡皮擦，主要過程已先在mousedown時發起beginPath()，並在mouse_move時draw()的function中進行lineTo(),stroke(),beginPath()並moveTo()對所有點，直到mouse_up call end_drawing()則停止。

#### b.shape:
若要畫圖型，則需先存取keydown時的位置當作換該圖形的起點
終點為mouse_up時滑鼠座標，並且須在draw()前利用ctx.getImageData取得當前狀況，並在draw()過程中禮用ctx.putImageData來預防拖曳圖形大小時所產生的過程殘像
以畫長方形為例:
![](https://i.imgur.com/hmJ4szp.png)

#### c.text:
若要將以輸入的文字放置於canvas上，則只需在mousedown call start_drawing()時依據滑鼠按下的位置放置即可完成該功能
![](https://i.imgur.com/dyWKrFn.png)

#### d.附註
在案button時，盡量往中心點按，確保有成功取得工具。








### Gitlab page link
"https://107062333.gitlab.io/AS_01_WebCanvas"

<style>
table th{
    width: 100%;
}
</style>