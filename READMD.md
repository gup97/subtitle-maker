---
title: '자막생성기 기능구현'
date: 2021-12-01 09:17:00
category: 'sub-project'
draft: false
---


[![미리보기](https://images.velog.io/images/gup97/post/cef5ceb6-6089-4886-bbd8-d3cd733b011c/image.png)](https://gup97.github.io/subtitle-maker/)

## 어디서 본거같은데?

>주의! React공부하기전 맛보기로 만들어서 코드가 비효율적입니다!!  
React 공부 후 다시 손보겠습니다

그렇습니다. 이 프로젝트는 [곽철용 짤 생성기](https://wormwlrm.github.io/2019/10/13/Kwakcheolyong-Image-Creator-Development-Story.html)와 [배너생성기](https://velog.io/@godori/banner-maker)를 보고 만들어야겠다고 생각한 프로젝트입니다. 그래서 그런지 인터페이스부터 코드 부 까지 영향을 많이 받았는데, 코드만 딱 긁어서 자기 것처럼 쓰는 거로 보일까 봐 걱정되네요.

우선 처음 저 짤 생성기 포스팅을 봤을 때 깜짝 놀랐습니다. 제가 아는 기술 블로그 포스팅은 보고 있을 때 공부를 하는 기분이었는데 저 포스트는 웹툰을 보는 것처럼 술술 익혔기 때문입니다. 글재주도, 말재주도 없는 저는 저렇게 작성해보고 싶다는 생각 때문에 더욱 관심을 갖고 본 것 같습니다.
>
_우선 포스팅해준 재그지그님에게 감사하다는 말부터 전하고 싶습니다.
그리고 프로젝트부터 포스트까지 클론코딩하여 죄송합니다...._

곽철용 짤 생성기의 글은 기능부와 코드 작성 과정을 순차적으로 상세히 나타내고 있는데 , 중간중간 재밌는 이미지를 같이 넣어 재미을 더했습니다. 하지만 이미지를 보다 보니 갑자기 옛날에 커뮤니티를 돌아다닐때 본 이미지들이 기억났습니다.  그건바로..

![아귀자막](https://images.velog.io/images/gup97/post/85f63764-e7e7-4332-9790-21b891d7bdae/%EC%95%84%EA%B7%80_%EC%9E%90%EB%A7%89.png)

여러분들은 기억나시나요? 짤방이라는 용어와 싱하형, X나 좋군? 등의 짤방들이 유행했던 시절, 영화장면에 상황에 맞지 않는 자막을 붙여서 재밌게 봤던 짤방이 몇가지 기억났습니다. 그래서 저도 위에서 언급한 두 프로젝트를 활용하여 만들어 보고 싶어서 자막생성기를 만들게 되었습니다.

### 그래서 어떻게 만들꺼야?

![공유딱지](https://images.velog.io/images/gup97/post/168590b1-4b01-4afa-8541-fe6b64770052/sample%20(1).png)

제가 만들 사이트는 SPA(싱글 페이지 애플리케이션)이기 때문에 평소 자바스크립트로만 끄적이던 저는 이번 기회에 React를 공부하려고 정했습니다. 호기롭게 시작했던 저는 `npx create-react-app` 도 해본적 없는 아가였습니다. 그래서 어디서부터 어떻게 포스팅할까 생각해봤는데, 우선 목표는 리액트 프로젝트를 생성할 수 있는 사람부터는 편하게 볼 수 있도록 작성하기로 했습니다.
> _코드 중 `props`와 `state`를 이상하게 다루는 부분이나 더욱 깔끔하게 활용할 방법이 생각날 때, 댓글로 알려주신다면 너무나도 감사하겠습니다.
_

### 일단 시작하기

우선 프로젝트를 끝내려면 설계를 세워야 합니다. 하지만 어떤 기술이 어떻게 동작하는지, 내가 어디까지 구현할 수 있는지 잘 모르는 저는 어떤 기능까지 구현 가능한지 하나하나 만들어 보는 방법을 택했습니다.
_(프로그래머라면 구조를 미리 정해둬야 한다고 했는데..)_

처음 목표는 사진이 담긴 캔버스를 생성하는 것입니다. 자바스크립트로 캔버스를 사용하여 [관련 프로젝트](https://velog.io/@gup97/velog-coffee)를 만들어본 적이 있는 저는 이전의 경험을 살리지도 못한 채, 이번에도 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage) 의 도움을 받았습니다. 흑흑

## 캔버스 생성

일단 `ctrl`+`j` 눌러서 cmd 열어서 프로젝트 만든 후, 폴더 이동하고

```terminal
npx create-react-app subtitle-maker
cd subtitle-maker
```

`src`폴더안에 `components` 폴더와 그 안에`assets` 폴더를 만들어주세요
우선 프로젝트를 시작하기에 앞서 원하는 이미지를 하나 다운 받은 후,
`intro.png` 로 이름을 바꾼 후 `assets` 폴더에 넣어주세요.
그리고 이제 `App.js` 를 작성해보겠습니다.

### 전체 코드

```jsx
import React from 'react';
import 도지 from './components/assets/intro.png';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: "500",
      height: "500",
      img: 도지,
    };
    this.canvasRef = React.createRef();
  }
  createCanvas() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { text,img } = this.state;
    const image = new Image();
    image.src = img;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      //this.setFont(canvas, text);
    }
  }
  componentDidMount() {
    this.createCanvas();
  }
  render() {
    return (
      <div>
        <h1>자막생성기 BETA</h1>
        <div className="canvasTab">
          <canvas ref={this.canvasRef} className="previewCanvas" />
        </div>
      </div>
    )
  }
}
export default App;

```

코드로 보니 어렵죠? 쉽다고요? 저는 매우 어려웠습니다.
그래서 코드 하나하나 떼어서 확인했습니다. 우선 `constructor` 먼저 보겠습니다.

```js
  constructor(props) {
    super(props);
    this.state = {
      width: "500",
      height: "500",
      img: 도지,
    };
    this.canvasRef = React.createRef();
  }
```

저는 잘 모르는데 `constructor` 는 생성자로 유명하죠? 아마`index.js` 에서  `App` 이 생성될 때 시작하는거 같아요. 우선 우린 초보니까 자세한 내용들은 차차 공부하고 **`constructor`는 처음 만들어질때 시작되고, `state` 와 `canvasRef`를 가지는구나? 라고만 생각하겠습니다.**
> constructor 메서드는 클래스의 인스턴스 객체를 생성하고 초기화하는 특별한 메서드입니다. -[자세한 내용은 MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes/constructor)-

그 다음은 `canvas` 에 이미지를 넣어 출력하는 함수를 보겠습니다.

```js
  createCanvas() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { img } = this.state;
    const image = new Image();
    image.src = img;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
  }
```

아까 만든 `canvasRef.current` 에서 현재 상태를 가져오고,
`canvas.getContext(2D)` 로 2차원 렌더링 컨텍스트를 생성하고,
`image` 객체를 생성하고,
`image.src`에서 아까 `state` 에 담겨있던 `img`를 넣고
`image.onload` 에서 비동기로 생성한 후,
캔버스의 가로 세로는 이미지의 가로 세로만큼 지정하고,
`ctx.drawImage` 로 이미지를 그린다.
> 도움받았습니다 [이번에도 MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)

```js
  componentDidMount() {
    this.createCanvas();
  }
```

그리고 컴포넌트가 마운트된 직후, 즉 트리에 삽입된 직후에 호출되는
`componentDidMount()`에서 아까 만든 함수를 불러오면 캔버스가 나옵니다.
> `componentDidMount()`는 뭔데? -> [참고자료](https://ko.reactjs.org/docs/react-component.html#componentdidmount)

### Canvas 완성본

그럼 이렇게 완성된다. 도지가 슬픈 눈으로 바라보고있다.![캡쳐](https://images.velog.io/images/gup97/post/39276cbd-3e42-4241-8603-3091225562fa/image.png)

---

## 이미지 업로드

이미지를 업로드하여 원하는 이미지를 출력해보는걸 목표로
일단 `components` 폴더에 `UploadImage.js` 하나 생성합니다.

 전체 코드

```js
//UploadImage.js
import React, { Component } from "react";
class UploadImage extends Component {
    inputFile = (e) => {
        const [file] = e.target.files
        if (file) {
            const { imageChange } = this.props;
            const fileURL = URL.createObjectURL(file)
            imageChange(fileURL);
        }
    };
    render() {
        return (
            <div className="upload-tab">
                <input
                    accept="image/*"
                    type='file'
                    id="imgInp"
                    onChange={this.inputFile}
                />
            </div>
        );
    }
};
export default UploadImage;
```

```js
//App.js
import UploadImage from './components/UploadImage';
... //in class App 
 handleImgChange = fileURL => {
    this.setState({ img: fileURL });
  };
... //in return
<UploadImage imageChange={this.handleImgChange} />

```

업로드 버튼을 컴포넌트화 시켜봤습니다.( _제대로 한건지 의문이네요.)_
`state`안의 `img`는 이미지파일의 주소를 가지고 있는데,
업로드 버튼이 눌리면 파일 확인을 하여 `state.img` 를 변경해주는 겁니다.

`App` 의 `return`부터 보면
`<UploadImage imageChange={this.handleImgChange} />`
부모(`App`)가 자식(`UploadImage`)에게 접근할 수 있는 함수를 줍니다.
그건 바로 `handleImgChange`인데요, 자식은 `this.props.imageChange` 로서 사용할 수 있습니다. 이 함수는 현재 `state` 중 `img` 값을 변경하는데 이 함수를 접근 가능하게 함으로서 자식이 부모의 `state.img`를 변경할 수 있게 되는 거죠.
> _😥저도 지금 공부중이라 최선의 방법이 아닐수도 있습니다._

그리고 `UploadImage.js` 를 확인하겠습니다.

```js
        return (
            <div className="upload-tab">
                <input
                    accept="image/*"
                    type='file'
                    id="imgInp"
                    onChange={this.inputFile}
                />
            </div>
```

`<input>` 하나 생성해주고 `accept`를 통해 들어올 값이 `image`임을 알려줍시다. 그리고 `type` 설정하고 , `onChange` 변경시 시작할 함수를 이제 만들어줄 `inputFile()` 로 지정합시다

```js
    inputFile = (e) => {
        const [file] = e.target.files
        if (file) {
            const { imageChange } = this.props;
            const fileURL = URL.createObjectURL(file)
            imageChange(fileURL);
        }
    };
```

`e` 라는 이벤트를 받게한 후, `file`을 확인하고 파일의 `URL`을 생성해준 후 `state.img` 를 바꾸기위해 아까 전달받은 `this.props.imageChange`를 사용합시다.

> 저도 [스택플로우](https://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded)에서 도움받았습니다.

```js
  componentDidUpdate() {
    this.createCanvas();
  }
```

`componentDidMount()` 기억나시나요?
**`componentDidUpdate()`는 갱신이 일어난 직후에 호출됩니다. 이 메서드는 최초 렌더링에서는 호출되지 않습니다. 컴포넌트 갱신시 호출되는 이 메서드는**  다운로드와 텍스트 입력에서도 호출되는데요, 이번경우에선 이미지 업데이트시 캔버스의 상태를 변경해주기위해 사용됩니다.
> `componentDidUpdate()`는 뭔데? -> [참고자료](https://ko.reactjs.org/docs/react-component.html#componentdidmount)

---

## 이미지 다운로드

> [![링크](https://images.velog.io/images/gup97/post/9a140c64-63d4-4e18-bd29-2d3986e16ff9/sample%20(2).png)](https://www.youtube.com/watch?v=sqj7KxwWdHg)사진을 클릭하면 5분 쉴 수있습니다.

이미지 다운로드도 똑같이 코드 전체부터 확인해보자

```js
//DownloadImage.js
import React, { Component } from "react";
class DownloadImage extends Component {
    inputDownloadBtn = (e) => {
        const { href, handleCanvasHref } = this.props;
        const canvasRef = this.props.canvas;
        const canvas = canvasRef.current;
        const url = canvas.toDataURL();
        href !== url && handleCanvasHref(url);
    };
    render() {
        return (
            <a
                onClick={this.inputDownloadBtn}
                href={this.props.href}
                className="download-button"
                download="sample.png">
                Download
            </a>
        );
    }
};
export default DownloadImage;
```

```js
//App.js
import DownloadImage from './components/DownloadImage';
... //in class App 
  handleCanvasHref = href => {
    this.setState({ href });
  };
... //in return
     <DownloadImage href={this.state.href}
          canvas={this.canvasRef}
          handleCanvasHref={this.handleCanvasHref} />
```

다운로드도 업로드처럼 구성하였습니다. 업로드와 차이점이라면 `href` 와 `canvas` 를 받는건데 이것은 다운로드의 `inputDownloadBtn`를 보면 이해하기 편합니다. 다운로드버튼을 눌렀을 때, 캔버스의 현재상태를 가져와서 다운받게 해주는데, 이 부분은 [배너 생성기](https://velog.io/@godori/banner-maker#%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C)의 도움을 많이 받았습니다.

> 갑자기 분위기 디스전![느린타자](https://images.velog.io/images/gup97/post/405e9b08-32e8-4cac-bdb5-62fa9e004c93/1.gif)다만 차이점이라면 저 배너생성기에서 `setState(href)`가 `componentUpdate()`에서 이루어져 컴포넌트의 변경 시 업데이트가 두번씩 호출되어 타자가 빠를시 살짝 불편해지는 문제 때문에 저는 `canvas`생성을 `App.js`로 이동시켰습니다.
_(이 부분에 관해선 공부한 후 글 하나 더 쓰려고 합니다.)_

---

## 텍스트 입력

이때까지 했던 것 처럼 비슷하게 합니다

```js
//App.js
import TextInput from './components/TextInput';
...
  handleTextChange = e => {
    this.setState({ text: e.target.value });
  };
...
```

```js
//TextInput.js
import React, { Component } from "react";
class TextInput extends Component {
    render() {
        return (
            <input className="textInput"
                onChange={this.props.onChange}
                type="text"
                size="40"
                placeholder="Type text here!" />
        );
    }
};
export default TextInput;
```

텍스트가 입력되면 `App`의 `state.text` 를 변경해주는거죠.
똑같은 구조가 반복되었으니 넘어가도록 하겠습니다🙄

---

## 텍스트 출력

텍스트는 캔버스에 이미지가 전부 로드된 다음 그려져야 하기 때문에 `canvas` 의 `image.onload`가 있는`App.js`에 코드를 넣었습니다. 사실 `canvas` 부분을 따로 컴포넌트화 못시킨 상황에서 실력 부족을 느껴 저 자신과 타협한 부분입니다. 만약 다른 컴포넌트에서 캔버스를 만들고 다른 컴포넌트에서 접근할 수 있는 방법을 아시는분은 **제발 훈수 부탁드립니다**

```js
//App.js
...
this.state={      
      fontFamily: 'Nanum Gothic',
      fontColor: "White",
      fontSize: 30,}
...
createCanvas(){
 ...
    image.onload=()=>{
     ...
        //이 부분에 한줄 추가 
        this.setFont(canvas, text);
    }
}
  setFont(canvas, text) {
    const ctx = canvas.getContext("2d");
    const { fontFamily, fontSize, fontColor } = this.state;
    const { textBorder } = 'black';

    ctx.fillStyle = fontColor;
    ctx.textAlign = 'center';
    ctx.textBaseLine = 'middle';
    ctx.font = `normal ${fontSize}px ${fontFamily}`;

    const lines = text.split('\n');
    lines.forEach((line, index) => {
      ctx.lineWidth = fontSize / 6;
      ctx.strokeStyle = `${textBorder}`;
      ctx.strokeText(
        line,
        canvas.width / 2,
        canvas.height - fontSize * (lines.length - index) * 1.5,
      );

      ctx.fillStyle = fontColor;
      ctx.fillText(
        line,
        canvas.width / 2,
        canvas.height - fontSize * (lines.length - index) * 1.5,
      );
    });
  };
...
return(...<TextInput onChange={this.handleTextChange} />)
```

네 이 코드를 보면 [곽철용 짤 생성기](https://wormwlrm.github.io/2019/10/13/Kwakcheolyong-Image-Creator-Development-Story.html)의 코드와 거의 비슷한걸 느낄 수 있습니다. 단 하나의 차이점이라면 `ctx.lineWidth = fontSize / 6` 으로 글자가 커졌을 때 그림자 적용이 있겠네요...

`state`에서 `text`조건들을 추가하고 이를 사용하여 `canvas`에 `text`를 그려줍니다. 자세한 내용은 [블로그](https://wormwlrm.github.io/2019/10/13/Kwakcheolyong-Image-Creator-Development-Story.html)에서 확인하세요
> 억짤![홍보](https://images.velog.io/images/gup97/post/8dc9d8fd-0e54-4151-8bcd-d7b5e9669402/sample%20(3).png)성의 없어 보이지만 블로그에 정리가 잘돼있기도 하고, 큰 변경 점이 없는 코드여서 이렇게 했습니다. 꼭 한번 놀러가보세요

---

## 텍스트 옵션

텍스트 옵션은 나중에 UI 바꾸면서 같이 작업하려고 아껴뒀지만..

> ![기훈이형](https://images.velog.io/images/gup97/post/02e15ae0-cab4-4326-8c2c-aa1aa88cf499/2.gif)텍스트 크기가 작아 화내는게 무섭지가 않다.

모바일에서 테스트했을때, 이미지가 커졌을때에  폰트크기가 못따라오는 문제덕분에 급하게 넣었습니다. 빠르게 `TextOption.js` 파일 만들어서 집어넣고

```js
//TextOption.js
import React, { Component } from "react";
class TextOption extends Component {
    render() {
        return (
            <div>
                <span>text size : </span>
                <input type="number"
                    value={this.props.fontSize}
                    onChange={this.props.onChange}>
                </input>
            </div>
        );
    }
};
export default TextOption;
```

```js
//App.js
import TextOption from './components/TextOption';
...
  handleFontSizeChange = e => {
    this.setState({ fontSize: e.target.value });
  };
...
   return(...
     <TextOption fontSize={this.state.fontSize}
          onChange={this.handleFontSizeChange} />
  )
```

이러면 깔끔하게 텍스트 사이즈를 조정할 수 있다.
![기훈이형2](https://images.velog.io/images/gup97/post/b744f15e-e4e7-4bb5-a1eb-5cef58d0cf3b/3.gif)

---

## 최소의 CSS

`css` 전체파일은 [github](https://github.com/gup97/subtitle-maker) 에 있습니다(App.css)
나중에 더 이쁘게 만들면 그때 봐주시길 부탁드립니다..
하지만 혹시 모르는 사람이 있을 수도 있으니 하나만 올리고 끝내겠습니다.

```css
canvas {
  width: 100%;
 ...
}
```

스마트폰 카메라로 찍은 사진들은 다른 사진보다 훨씬 크기 때문에 화면을 뚫고 지나가는 경우가 많습니다. `width`를 `100%` 로 정의해줘야 깔끔하게 나옵니다. 간단하지만 저는 몰라서 구글링까지 했습니다...흑흑
![비교사진](https://images.velog.io/images/gup97/post/34c1cc84-c5b1-40cc-be34-b5b24d247e1e/image.png)

---

## 후기

아직 해결해야 할 문제도 쌓여있고, 공부할 것도 많이 남았지만, 결과물을 보니 마음이 따뜻해지네요. 그리고 글 쓰는 게 익숙지 않아 2일 만에 만든 이 작업물도 글 쓰려니 하루를 모조리 다 태워도 부족했습니다. 딱딱한 형식을 거스르고 편한 말투를 유지하려고 노력하지만 나도 모르게 말투가 보고서처럼 딱딱하게 바뀌곤 하는 걸 보고 아직 글쓰는게 익숙치 않다고 생각하고... 말투 뿐만 아니라 글도 다시 읽어보니 두서없어서 글도 좀 많이 써봐야 점점 잘 쓸 거 같네요

> 어찌됐든 부족한글 읽어주셔서 감사합니다.
코드보기 : [GitHub](https://github.com/gup97/subtitle-maker) // 직접 가서보기 :  [GitHub Page](https://gup97.github.io/subtitle-maker/)

![성공의반대](https://images.velog.io/images/gup97/post/a61bd995-ae9c-4bf8-8a02-63660b90c92e/%EB%9E%84_%EC%84%B1%EA%B3%B5%EC%9D%98%EB%B0%98%EB%8C%80.gif)

> 나중에 작성할 글 목록 + 나중에 해결해야할 문제

- 왜 `<canvas>`를 다른 컴포넌트가 아닌 `App.js`에서 만들게 되었나?
- `ref` 속성에 대하여
- `image` 를 `import`해서 써야하는 이유
- `state` 안에서 객체를 사용하는 방법
- `scss` 로 꾸미기 / `font Option`들 추가
